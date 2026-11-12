import { ForecastItem } from './ForecastItem.tsx';
import { useForecast } from '../../hooks/useForecast.ts';
import { CalendarIcon } from '../icons/CalendarIcon.tsx';
import { type ListItem } from '../../types.ts';
import { LoadingMessage } from '../LoadingMessage.tsx';
import { ErrorMessage } from '../ErrorMessage.tsx';
import { useCoordsStore } from '../../store/weatherStore.ts';

export const Forecast = () => {
  const coords = useCoordsStore((state) => state.coords);
  const { data, isPending, isError, error } = useForecast(coords.lat, coords.lon);

  const nextDays: ListItem[] = [];

  if (data) {
    const forecasts = data.list.slice(7);

    for (let i = 0; i < forecasts.length; i += 8) {
      nextDays.push(forecasts[i]);
    }
  }

  return (
    <section className="pt-4 pb-8">
      <h2 className="flex items-center gap-2 px-4 py-6 text-2xl font-light text-sky-600 sm:px-6 sm:text-3xl">
        <CalendarIcon />
        <div className="text-balance">
          <span className="font-medium">Previsão</span> - Próximos dias
        </div>
      </h2>
      {data && (
        <ol className="grid grid-cols-6 grid-rows-none justify-center gap-4 lg:grid-rows-2">
          {nextDays.map((weather, index) => {
            return <ForecastItem key={weather.dt_txt} order={index} weatherInfo={weather} />;
          })}
        </ol>
      )}
      {isPending && <LoadingMessage message="Espere..." className="rounded-md bg-secundary p-6" />}
      {isError && (
        <ErrorMessage
          title="Não foi possível carregar a previsão!"
          className="py-6"
          message={error?.message || 'Não foi possível realizar a previsão'}
        />
      )}
    </section>
  );
};
