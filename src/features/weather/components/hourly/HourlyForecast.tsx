import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Skeleton } from '@/shared/components/Skeleton';
import { useForecast } from '../../hooks/useForecast';
import { toHourlyPoints } from '../../lib/forecast';
import { HourlyItem } from './HourlyItem';

export const HourlyForecast = () => {
  const { data: forecast, isPending, isError, error, refetch } = useForecast();

  if (isPending) return <Skeleton className="h-52 rounded-lg" />;

  if (isError)
    return (
      <ErrorMessage
        title="Não foi possível carregar a previsão por hora"
        message={error.message}
        onRetry={() => void refetch()}
        className="rounded-lg bg-surface p-6 shadow-sm"
      />
    );

  return (
    <ol
      aria-label="Previsão das próximas 24 horas"
      className="relative grid snap-x grid-cols-[repeat(8,minmax(9.5rem,1fr))] gap-4 overflow-x-auto pb-2"
    >
      {toHourlyPoints(forecast).map((point) => (
        <HourlyItem key={point.time} point={point} />
      ))}
    </ol>
  );
};
