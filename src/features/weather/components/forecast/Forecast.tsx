import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { LoadingMessage } from '@/shared/components/LoadingMessage';
import { useForecast } from '../../hooks/useForecast';
import { getUpcomingDays } from '../../lib/forecast';
import { SectionTitle } from '../SectionTitle';
import { ForecastItem } from './ForecastItem';

export const Forecast = () => {
  const { data: forecast, dataUpdatedAt, isPending, isError, error } = useForecast();

  return (
    <section className="pt-4 pb-8">
      <SectionTitle title="Previsão" subtitle="Próximos dias" />
      {forecast && (
        <ol className="grid grid-cols-6 grid-rows-none justify-center gap-4 lg:grid-rows-2">
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
      {isPending && <LoadingMessage message="Espere..." className="rounded-md bg-secundary p-6" />}
      {isError && (
        <ErrorMessage
          title="Não foi possível carregar a previsão!"
          className="py-6"
          message={error.message || 'Não foi possível realizar a previsão'}
        />
      )}
    </section>
  );
};
