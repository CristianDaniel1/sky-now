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
  const coords = useCoordsStore((state) => state.coords);
  const { data, isPending, isError, error } = useCurrentWeather(coords.lat, coords.lon);

  let content;

  if (data) {
    const [{ description, icon }] = data.weather;
    const { temp, humidity, feels_like, temp_max, temp_min } = data.main;

    const iconWeather = findIcon(weatherIcons, icon);
    const date = getCurrentDate(data.dt);

    content = (
      <>
        <div className="md:w-2/3">
          <h2 className="pb-4 text-center text-2xl font-medium text-orange-400 sm:pb-8 sm:text-left sm:text-4xl">
            {date[0].toUpperCase() + date.slice(1)}
          </h2>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary sm:justify-start sm:text-4xl">
            <p className="text-2xl font-medium text-primary capitalize sm:mr-8 sm:text-4xl">
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
          <div className="mt-10 h-56 rounded-sm border border-gray-200 bg-color-slate p-1 sm:h-80 sm:p-4">
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
      <div className="flex flex-wrap items-center justify-between pt-4">
        <h2 className="flex items-center gap-2 px-4 py-3 text-2xl font-light text-sky-600 sm:px-6 sm:py-6 sm:text-3xl">
          <CalendarIcon />
          <div>
            <span className="font-medium">Tempo</span> - Hoje
          </div>
        </h2>
        <CurrentLocale />
      </div>
      <div className="min-h-96 gap-10 rounded-xl bg-secundary px-5 py-8 shadow-sm sm:p-10 md:flex">
        {isPending && <LoadingMessage message="Carrengando dados do tempo..." />}
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
