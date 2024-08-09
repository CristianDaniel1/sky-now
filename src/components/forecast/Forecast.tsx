import { ForecastItem } from './ForecastItem.tsx';
import { useForecast } from '../../hooks/useForecast.ts';
import { CalendarIcon } from '../icons/CalendarIcon.tsx';
import { type ListItem } from '../../types.ts';
import { LoadingMessage } from '../LoadingMessage.tsx';
import { ErrorMessage } from '../ErrorMessage.tsx';
import { useCoordsStore } from '../../store/weatherStore.ts';

export const Forecast = () => {
  const coords = useCoordsStore(state => state.coords);
  const { data, isPending, isError, error } = useForecast(
    coords.lat,
    coords.lon
  );

  const nextDays: ListItem[] = [];

  if (data) {
    const forecasts = data.list.slice(7);

    for (let i = 0; i < forecasts.length; i += 8) {
      nextDays.push(forecasts[i]);
    }
  }

  return (
    <section className="pt-4 pb-8">
      <h2 className="text-2xl sm:text-3xl text-sky-600 font-light px-4 sm:px-6 py-6 flex items-center gap-2">
        <CalendarIcon />
        <div className="text-balance">
          <span className="font-medium">Previsão</span> - Próximos dias
        </div>
      </h2>
      {data && (
        <ol className="grid grid-cols-6 grid-rows-none lg:grid-rows-2 gap-4 justify-center">
          {nextDays.map((weather, index) => {
            return (
              <ForecastItem
                key={weather.dt_txt}
                order={index}
                weatherInfo={weather}
              />
            );
          })}
        </ol>
      )}
      {isPending && (
        <LoadingMessage
          message="Espere..."
          className="bg-secundary rounded-md p-6"
        />
      )}
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
