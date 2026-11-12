import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import type { CurrentWeather } from '../../interfaces/weather';
import { formatLongDate } from '../../lib/dates';
import { formatTemperature } from '../../lib/format';
import { TemperatureChart } from './TemperatureChart';
import { TodayWeatherInfo } from './TodayWeatherInfo';

interface CurrentConditionsProps {
  weather: CurrentWeather;
}

export const CurrentConditions = ({ weather }: CurrentConditionsProps) => {
  const [condition] = weather.weather;
  const { thermometer } = WEATHER_DETAIL_ICONS;

  return (
    <>
      <div className="md:w-2/3">
        <h2 className="pb-4 text-center text-2xl font-medium text-orange-400 sm:pb-8 sm:text-left sm:text-4xl">
          {formatLongDate(weather.dt)}
        </h2>
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary sm:justify-start sm:text-4xl">
          <p className="text-2xl font-medium text-primary capitalize sm:mr-8 sm:text-4xl">
            {condition.description}
          </p>
          {formatTemperature(weather.main.temp)}
          <img
            src={thermometer.src}
            alt={thermometer.alt}
            width={56}
            height={56}
            className="w-10 sm:w-14"
          />
        </div>
        <div className="mt-10 h-56 rounded-sm border border-gray-200 bg-color-slate p-1 sm:h-80 sm:p-4">
          <TemperatureChart />
        </div>
      </div>
      <TodayWeatherInfo weather={weather} />
    </>
  );
};
