import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import type { ForecastSlot } from '../../interfaces/weather';
import { formatHour } from '../../lib/dates';
import { formatTemperature, getWeatherIcon } from '../../lib/format';

interface TodayAtItemProps {
  slot: ForecastSlot;
  timezoneOffset: number;
}

export const TodayAtItem = ({ slot, timezoneOffset }: TodayAtItemProps) => {
  const [condition] = slot.weather;
  const { thermometer } = WEATHER_DETAIL_ICONS;

  return (
    <li className="flex flex-col items-center gap-2 rounded-lg bg-secundary p-6 shadow-sm">
      <div className="text-primary">{formatHour(slot.dt, timezoneOffset)}</div>
      <img src={getWeatherIcon(condition.icon)} alt="Clima nesta hora" width={60} height={60} />
      <div className="flex items-center gap-2 text-xl font-bold text-primary">
        {formatTemperature(slot.main.temp)}
        <img src={thermometer.src} alt={thermometer.alt} width={25} height={25} />
      </div>
      <p className="text-center">{condition.description}</p>
    </li>
  );
};
