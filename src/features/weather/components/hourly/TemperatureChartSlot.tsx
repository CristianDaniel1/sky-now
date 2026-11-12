import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '@/shared/components/Skeleton';
import { reportError } from '@/shared/lib/report-error';
import { useForecast } from '../../hooks/useForecast';
import { toHourlyPoints } from '../../lib/forecast';
import { LazyTemperatureChart } from './lazy-temperature-chart';

const CHART_ERROR = (
  <p className="grid h-full place-items-center text-sm text-muted">
    Não foi possível carregar o gráfico.
  </p>
);

export const TemperatureChartSlot = () => {
  const { data: forecast, isError } = useForecast();

  if (isError) return CHART_ERROR;
  if (!forecast) return <Skeleton className="size-full rounded-md" />;

  return (
    <ErrorBoundary
      fallback={CHART_ERROR}
      onError={(error) => reportError('weather: load temperature chart', error)}
    >
      <Suspense fallback={<Skeleton className="size-full rounded-md" />}>
        <LazyTemperatureChart points={toHourlyPoints(forecast)} />
      </Suspense>
    </ErrorBoundary>
  );
};
