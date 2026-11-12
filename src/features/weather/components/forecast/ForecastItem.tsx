import { cn } from '@/shared/lib/cn';
import { HIGHLIGHTED_FORECAST_DAYS } from '../../constants/weather';
import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import { UPCOMING_DAY_NAMES } from '../../data/forecast-labels';
import type { DailyForecast } from '../../interfaces/weather';
import { formatWeekday } from '../../lib/dates';
import { formatTemperature, formatWindSpeed, getWeatherIcon } from '../../lib/format';
import { DetailItem } from '../details/DetailItem';
import { TempMinMax } from '../details/TempMinMax';

interface ForecastItemProps {
  day: DailyForecast;
  position: number;
  timezoneOffset: number;
}

export const ForecastItem = ({ day, position, timezoneOffset }: ForecastItemProps) => {
  const { slot } = day;
  const [condition] = slot.weather;
  const { main } = slot;
  const { thermometer } = WEATHER_DETAIL_ICONS;

  const isHighlighted = position < HIGHLIGHTED_FORECAST_DAYS;
  const dayName = UPCOMING_DAY_NAMES[position];

  return (
    <li
      className={cn(
        'col-span-full col-start-1 rounded-xl bg-secundary p-6 shadow-sm xs:col-span-4 xs:col-start-2 sm:col-span-3',
        isHighlighted ? 'md:px-10 lg:col-span-3' : 'lg:col-span-2',
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="pb-6 text-xl font-light text-balance">
            {dayName && `${dayName} - `}
            {formatWeekday(slot.dt, timezoneOffset)}
          </h3>
          <div
            className={cn(
              'mb-4 flex items-center gap-2 text-2xl font-bold text-primary sm:text-3xl',
              isHighlighted && 'md:text-4xl',
            )}
          >
            {formatTemperature(main.temp)}
            <img
              src={thermometer.src}
              alt={thermometer.alt}
              width={40}
              height={40}
              className="w-10"
            />
          </div>
          <DetailItem
            icon={WEATHER_DETAIL_ICONS.humidity}
            label="Umidade"
            value={`${main.humidity}%`}
          />
          <DetailItem
            icon={WEATHER_DETAIL_ICONS.wind}
            label="Vento"
            value={formatWindSpeed(slot.wind.speed)}
          />
        </div>
        <img
          src={getWeatherIcon(condition.icon)}
          alt="Clima previsto"
          width={60}
          height={60}
          className={cn('w-20', isHighlighted ? 'md:w-20' : 'md:w-[60px]')}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl text-primary capitalize">{condition.description}</p>
        <TempMinMax max={day.max} min={day.min} />
      </div>
    </li>
  );
};
