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
    <li className="flex flex-col items-center gap-2 rounded-lg bg-secundary p-6 shadow-sm">
      <div className="text-primary">
        {hours > 11
          ? `${hours - 12 === 0 ? '12' : hours - 12} PM`
          : `${hours === 0 ? '12' : hours} AM`}
      </div>
      <img src={iconWeather} alt="Clima nesta hora" width={60} height={60} />
      <div className={`flex items-center gap-2 text-xl font-bold text-primary`}>
        {temp.toFixed(1)}°C
        <img src={thermometer.img} alt={thermometer.alt} width={25} height={25} />
      </div>
      <p className="text-center">{description}</p>
    </li>
  );
};
