import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import type { CurrentWeather } from '../../interfaces/weather';
import {
  formatTemperature,
  formatVisibility,
  formatWindSpeed,
  getWeatherIcon,
} from '../../lib/format';
import { DetailItem } from '../details/DetailItem';
import { TempMinMax } from '../details/TempMinMax';

interface TodayWeatherInfoProps {
  weather: CurrentWeather;
}

export const TodayWeatherInfo = ({ weather }: TodayWeatherInfoProps) => {
  const [condition] = weather.weather;
  const { main } = weather;

  return (
    <div className="flex items-center justify-around gap-4 pt-4 md:block md:w-1/3">
      <img
        src={getWeatherIcon(condition.icon)}
        alt="Clima de hoje"
        width={150}
        height={150}
        className="mx-auto w-28 sm:w-[150px]"
      />
      <div className="mt-8 mb-4 flex w-2/3 flex-col gap-2 rounded-md border border-gray-200 bg-color-slate p-4 text-sm xs:w-1/2 sm:text-base md:w-auto">
        <DetailItem
          icon={WEATHER_DETAIL_ICONS.humidity}
          label="Umidade"
          value={`${main.humidity}%`}
        />
        <DetailItem
          icon={WEATHER_DETAIL_ICONS.wind}
          label="Vento"
          value={formatWindSpeed(weather.wind.speed)}
        />
        <DetailItem
          icon={WEATHER_DETAIL_ICONS.visibility}
          label="Visibilidade"
          value={formatVisibility(weather.visibility)}
        />
        <DetailItem
          icon={WEATHER_DETAIL_ICONS.thermometer}
          label="Sensação Térmica"
          value={formatTemperature(main.feels_like)}
        />
        <div className="mt-4">
          <TempMinMax max={main.temp_max} min={main.temp_min} />
        </div>
      </div>
    </div>
  );
};
