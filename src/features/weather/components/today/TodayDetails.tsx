import { Gauge, Sunrise, Sunset, Umbrella } from 'lucide-react';
import {
  formatTemperature,
  formatVisibility,
  formatWindSpeed,
  useUnitSystem,
} from '@/features/units';
import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import type { CurrentWeather } from '../../interfaces/weather';
import { formatHour } from '../../lib/dates';
import { getCompassPoint } from '../../lib/format';
import { DetailImage } from '../details/DetailImage';
import { DetailTile } from '../details/DetailTile';

interface TodayDetailsProps {
  weather: CurrentWeather;
  rainChance: number | undefined;
}

export const TodayDetails = ({ weather, rainChance }: TodayDetailsProps) => {
  const { main, wind, sys, timezone } = weather;
  const system = useUnitSystem();

  return (
    <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-line pt-8 md:grid-cols-4 lg:mt-0 lg:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
      <DetailTile
        icon={<DetailImage image={WEATHER_DETAIL_ICONS.thermometer} />}
        label="Sensação térmica"
        value={formatTemperature(main.feels_like, system)}
      />
      <DetailTile
        icon={<DetailImage image={WEATHER_DETAIL_ICONS.humidity} />}
        label="Umidade"
        value={`${main.humidity}%`}
      />
      <DetailTile
        icon={<DetailImage image={WEATHER_DETAIL_ICONS.wind} />}
        label="Vento"
        value={`${formatWindSpeed(wind.speed, system)} (${getCompassPoint(wind.deg)})`}
      />
      <DetailTile
        icon={<Umbrella aria-hidden="true" className="size-5 text-rain" />}
        label="Chuva em 3h"
        value={rainChance === undefined ? '—' : `${rainChance}%`}
      />
      <DetailTile
        icon={<DetailImage image={WEATHER_DETAIL_ICONS.visibility} />}
        label="Visibilidade"
        value={formatVisibility(weather.visibility, system)}
      />
      <DetailTile
        icon={<Gauge aria-hidden="true" className="size-5 text-heading" />}
        label="Pressão"
        value={`${main.pressure} hPa`}
      />
      <DetailTile
        icon={<Sunrise aria-hidden="true" className="size-5 text-accent" />}
        label="Nascer do sol"
        value={formatHour(sys.sunrise, timezone)}
      />
      <DetailTile
        icon={<Sunset aria-hidden="true" className="size-5 text-accent-strong" />}
        label="Pôr do sol"
        value={formatHour(sys.sunset, timezone)}
      />
    </dl>
  );
};
