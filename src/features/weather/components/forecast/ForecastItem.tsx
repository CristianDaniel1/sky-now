import { formatTemperature, formatWindSpeed, useUnitSystem } from '@/features/units';
import { cn } from '@/shared/lib/cn';
import { HIGHLIGHTED_FORECAST_DAYS } from '../../constants/weather';
import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import { UPCOMING_DAY_NAMES } from '../../data/forecast-labels';
import type { DailyForecast } from '../../interfaces/weather';
import { formatWeekday } from '../../lib/dates';
import { getCompassPoint, getWeatherIcon } from '../../lib/format';
import { DetailImage } from '../details/DetailImage';
import { DetailItem } from '../details/DetailItem';
import { RainChance } from '../details/RainChance';
import { TempMinMax } from '../details/TempMinMax';

interface ForecastItemProps {
  day: DailyForecast;
  position: number;
  timezoneOffset: number;
}

export const ForecastItem = ({ day, position, timezoneOffset }: ForecastItemProps) => {
  const { slot } = day;
  const system = useUnitSystem();
  const [condition] = slot.weather;
  const isHighlighted = position < HIGHLIGHTED_FORECAST_DAYS;
  const dayName = UPCOMING_DAY_NAMES[position];

  return (
    <li
      className={cn(
        'col-span-full col-start-1 rounded-xl bg-surface p-6 shadow-sm xs:col-span-4 xs:col-start-2 sm:col-span-3',
        isHighlighted ? 'md:px-10 lg:col-span-3' : 'lg:col-span-2',
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="pb-5 text-xl font-light text-balance first-letter:uppercase">
            {dayName && `${dayName} - `}
            {formatWeekday(slot.dt, timezoneOffset)}
          </h3>
          <p
            className={cn(
              'mb-4 flex items-center gap-2 text-2xl font-bold text-primary tabular-nums sm:text-3xl',
              isHighlighted && 'md:text-4xl',
            )}
          >
            {formatTemperature(slot.main.temp, system)}
            <img
              src={WEATHER_DETAIL_ICONS.thermometer.src}
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="w-10"
            />
          </p>
          <dl className="flex flex-col gap-1">
            <DetailItem
              icon={<DetailImage image={WEATHER_DETAIL_ICONS.humidity} />}
              label="Umidade"
              value={`${slot.main.humidity}%`}
            />
            <DetailItem
              icon={<DetailImage image={WEATHER_DETAIL_ICONS.wind} />}
              label="Vento"
              value={`${formatWindSpeed(slot.wind.speed, system)} (${getCompassPoint(slot.wind.deg)})`}
            />
          </dl>
        </div>
        <img
          src={getWeatherIcon(condition.icon)}
          alt=""
          aria-hidden="true"
          width={80}
          height={80}
          className={cn('w-20 shrink-0', !isHighlighted && 'lg:w-16')}
        />
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xl text-primary first-letter:uppercase">{condition.description}</p>
          <RainChance percentage={day.rainChance} />
        </div>
        <TempMinMax range={day} />
      </div>
    </li>
  );
};
