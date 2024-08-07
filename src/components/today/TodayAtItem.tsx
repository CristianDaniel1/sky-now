import { thermometer, weatherIcons } from '../../data.ts';
import { type ListItem } from '../../types.ts';
import { findIcon, getDate } from '../../utils/helpers.ts';

interface ForecastItemProps {
  weatherInfo: ListItem;
}

export const TodayAtItem = ({ weatherInfo }: ForecastItemProps) => {
  const [{ description, icon }] = weatherInfo.weather;
  const { temp } = weatherInfo.main;

  const iconWeather = findIcon(weatherIcons, icon);

  const { hours } = getDate(weatherInfo.dt);

  return (
    <li className="bg-white rounded-lg p-6 flex flex-col items-center gap-2 shadow">
      <div className="text-primary">
        {hours > 12 ? `${hours} PM` : `${hours} AM`}
      </div>
      <img src={iconWeather} alt="Clima nesta hora" width={60} height={60} />
      <div className={`font-bold text-primary flex gap-2 items-center text-xl`}>
        {temp.toFixed(1)}°C
        <img
          src={thermometer.img}
          alt={thermometer.alt}
          width={25}
          height={25}
        />
      </div>
      <p className="text-center">{description}</p>
    </li>
  );
};
