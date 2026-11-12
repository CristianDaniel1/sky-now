import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Skeleton } from '@/shared/components/Skeleton';
import { useForecast } from '../../hooks/useForecast';
import { getUpcomingDays } from '../../lib/forecast';
import { SectionTitle } from '../SectionTitle';
import { ForecastItem } from './ForecastItem';

export const Forecast = () => {
  const { data: forecast, dataUpdatedAt, isPending, isError, error, refetch } = useForecast();

  return (
    <section className="pt-4 pb-8">
      <SectionTitle title="Previsão" subtitle="Próximos dias" />
      {isPending && <Skeleton className="h-64 rounded-xl" />}
      {isError && (
        <ErrorMessage
          title="Não foi possível carregar a previsão"
          message={error.message}
          onRetry={() => void refetch()}
          className="rounded-xl bg-surface p-6 shadow-sm"
        />
      )}
      {forecast && (
        <ol className="grid grid-cols-6 justify-center gap-4">
          {getUpcomingDays(forecast, dataUpdatedAt / 1000).map((day, index) => (
            <ForecastItem
              key={day.dayKey}
              day={day}
              position={index}
              timezoneOffset={forecast.city.timezone}
            />
          ))}
        </ol>
      )}
    </section>
  );
};
