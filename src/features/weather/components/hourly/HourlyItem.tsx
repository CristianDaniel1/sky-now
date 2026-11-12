import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import type { HourlyPoint } from '../../interfaces/weather';
import { getWeatherIcon } from '../../lib/format';
import { RainChance } from '../details/RainChance';

interface HourlyItemProps {
  point: HourlyPoint;
}

export const HourlyItem = ({ point }: HourlyItemProps) => (
  <li className="flex snap-start flex-col items-center gap-2 rounded-lg bg-surface p-5 shadow-sm">
    <p className="font-medium text-primary">{point.hour}</p>
    <img src={getWeatherIcon(point.icon)} alt="" aria-hidden="true" width={60} height={60} />
    <p className="flex items-center gap-2 text-xl font-bold text-primary tabular-nums">
      {point.temp}°C
      <img
        src={WEATHER_DETAIL_ICONS.thermometer.src}
        alt=""
        aria-hidden="true"
        width={25}
        height={25}
      />
    </p>
    <p className="text-center text-sm first-letter:uppercase">{point.description}</p>
    <RainChance percentage={point.rainChance} />
  </li>
);
