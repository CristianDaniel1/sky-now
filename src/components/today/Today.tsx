import { useCoordsStore } from '../../store/weatherStore.ts';
import { useCurrentWeather } from '../../hooks/useCurrentWeather.ts';

import { Chart } from './Chart.tsx';
import { LoadingMessage } from '../LoadingMessage.tsx';
import { ErrorMessage } from '../ErrorMessage.tsx';
import { CalendarIcon } from '../icons/CalendarIcon.tsx';
import { TodayWeatherInfo } from './TodayWeatherInfo.tsx';
import { CurrentLocale } from '../CurrentLocale.tsx';

import { findIcon, getCurrentDate } from '../../utils/helpers.ts';
import { thermometer, weatherIcons } from '../../data.ts';

export const Today = () => {
  const coords = useCoordsStore(state => state.coords);
  const { data, isPending, isError, error } = useCurrentWeather(
    coords.lat,
    coords.lon
  );

  let content;

  if (data) {
    const [{ description, icon }] = data.weather;
    const { temp, humidity, feels_like, temp_max, temp_min } = data.main;

    const iconWeather = findIcon(weatherIcons, icon);
    const date = getCurrentDate(data.dt);

    content = (
      <>
        <div className="md:w-2/3">
          <h2 className="text-2xl text-center sm:text-left sm:text-4xl font-medium text-orange-400 pb-4 sm:pb-8">
            {date[0].toUpperCase() + date.slice(1)}
          </h2>
          <div className="text-2xl sm:text-4xl flex font-bold text-primary gap-2 items-center justify-center sm:justify-start">
            <p className="text-2xl sm:text-4xl capitalize text-primary font-medium sm:mr-8">
              {description}
            </p>
            {temp.toFixed(1)}°C
            <img
              src={thermometer.img}
              alt={thermometer.alt}
              width={56}
              height={56}
              className="w-10 sm:w-14"
            />
          </div>
          <div className="h-56 sm:h-80 bg-color-slate p-1 sm:p-4 mt-10 rounded border border-gray-200">
            <Chart />
          </div>
        </div>
        <TodayWeatherInfo
          icon={iconWeather!}
          humidity={humidity}
          wind={data.wind.speed}
          visibility={data.visibility}
          feelsLike={feels_like}
          max={temp_max}
          min={temp_min}
        />
      </>
    );
  }

  return (
    <section className="my-4">
      <div className="flex justify-between items-center flex-wrap pt-4">
        <h2 className="text-2xl sm:text-3xl text-sky-600 font-light px-4 sm:px-6 py-3 sm:py-6 flex items-center gap-2">
          <CalendarIcon />
          <div>
            <span className="font-medium">Tempo</span> - Hoje
          </div>
        </h2>
        <CurrentLocale />
      </div>
      <div className="bg-secundary px-5 py-8 sm:p-10 rounded-xl shadow md:flex gap-10 min-h-96">
        {isPending && (
          <LoadingMessage message="Carrengando dados do tempo..." />
        )}
        {isError && (
          <ErrorMessage
            title="Ops! Ocorreu um erro"
            message={error?.message || 'Erro ao carregar dados do clima'}
          />
        )}
        {content}
      </div>
    </section>
  );
};
