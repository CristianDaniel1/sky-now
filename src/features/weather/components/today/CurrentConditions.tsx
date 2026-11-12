import { useLocationStore } from '@/features/location';
import { formatTemperature, useUnitSystem } from '@/features/units';
import { WEATHER_DETAIL_ICONS } from '../../data/detail-icons';
import { useForecast } from '../../hooks/useForecast';
import type { CurrentWeather } from '../../interfaces/weather';
import { formatClockTime, formatHour, formatLongDate } from '../../lib/dates';
import { getNext24HoursRange, toHourlyPoints } from '../../lib/forecast';
import { getWeatherIcon } from '../../lib/format';
import { TempMinMax } from '../details/TempMinMax';
import { DaySummary } from './DaySummary';
import { TodayDetails } from './TodayDetails';

interface CurrentConditionsProps {
  weather: CurrentWeather;
  updatedAt: number;
}

export const CurrentConditions = ({ weather, updatedAt }: CurrentConditionsProps) => {
  const selectedCity = useLocationStore((store) => store.label.city);
  const { data: forecast } = useForecast();
  const system = useUnitSystem();

  const [condition] = weather.weather;
  const { main, timezone } = weather;
  const temperature = formatTemperature(main.temp, system);
  const range = forecast
    ? getNext24HoursRange(forecast, main.temp)
    : { min: main.temp_min, max: main.temp_max };
  const points = forecast ? toHourlyPoints(forecast) : [];
  const [nextHour] = points;

  return (
    <>
      <title>{`${temperature} em ${selectedCity || weather.name} | SkyNow`}</title>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-10">
        <div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-medium text-balance text-accent sm:text-4xl lg:text-3xl">
              {formatLongDate(weather.dt, timezone)}
            </h3>
            <p className="pt-1 text-sm text-muted">
              {formatHour(weather.dt, timezone)} no horário local. Atualizado às{' '}
              {formatClockTime(updatedAt)}.
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <img
              src={getWeatherIcon(condition.icon)}
              alt={condition.description}
              width={144}
              height={144}
              className="w-28 shrink-0 sm:w-32"
            />
            <div className="text-center sm:text-left">
              <p className="text-2xl font-medium text-primary capitalize sm:text-3xl">
                {condition.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
                <p className="flex items-center gap-2 text-5xl font-bold text-primary tabular-nums sm:text-6xl">
                  {temperature}
                  <img
                    src={WEATHER_DETAIL_ICONS.thermometer.src}
                    alt=""
                    aria-hidden="true"
                    width={56}
                    height={56}
                    className="w-12 sm:w-14"
                  />
                </p>
                <TempMinMax range={range} className="text-lg" />
              </div>
            </div>
          </div>
          <DaySummary weather={weather} points={points} />
        </div>
        <TodayDetails weather={weather} rainChance={nextHour?.rainChance} />
      </div>
    </>
  );
};
