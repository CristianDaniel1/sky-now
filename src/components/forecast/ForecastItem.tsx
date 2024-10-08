import { thermometer, weatherIcons } from '../../data.ts';
import { Humidity } from '../weatherInfo/Humidity.tsx';
import { TempMinMax } from '../weatherInfo/TempMinMax.tsx';
import { Wind } from '../weatherInfo/Wind.tsx';
import { type ListItem } from '../../types.ts';
import { findIcon, getDate } from '../../utils/helpers.ts';

interface ForecastItemProps {
  weatherInfo: ListItem;
  order: number;
}

export const ForecastItem = ({ weatherInfo, order }: ForecastItemProps) => {
  const [{ description, icon }] = weatherInfo.weather;
  const { temp, humidity, temp_max, temp_min } = weatherInfo.main;

  const iconWeather = findIcon(weatherIcons, icon);

  const isBig = order < 2;
  const { weekday } = getDate(weatherInfo.dt);

  return (
    <li
      className={`bg-secundary shadow p-6 rounded-xl ${
        isBig ? 'lg:col-span-3 md:px-10' : 'lg:col-span-2'
      } col-start-1 xs:col-start-2 col-span-full xs:col-span-4 sm:col-span-3`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="pb-6 text-xl font-light text-balance">
            {(order === 0 && 'Amanhã - ') ||
              (order === 1 && 'Depois de amanhã - ') ||
              ''}
            {weekday}
          </h3>
          <div
            className={`${
              isBig ? 'md:text-4xl' : ''
            } font-bold text-primary flex gap-2 items-center mb-4 text-2xl sm:text-3xl`}
          >
            {temp.toFixed(1)}°C
            <img
              src={thermometer.img}
              alt={thermometer.alt}
              width={40}
              height={40}
              className="w-10"
            />
          </div>
          <Humidity humidityValue={humidity} />
          <Wind windValue={weatherInfo.wind.speed} />
        </div>
        <img
          src={iconWeather}
          alt="clima atual"
          width={60}
          height={60}
          className={`${isBig ? 'md:w-20' : 'md:w-[60px]'} w-20`}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="capitalize text-xl text-primary">{description}</p>
        <TempMinMax maxValue={temp_max} minValue={temp_min} />
      </div>
    </li>
  );
};
