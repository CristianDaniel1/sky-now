import { FORECAST_SLOTS_PER_DAY, REPRESENTATIVE_DAY_HOUR } from '../constants/weather';
import type {
  DailyForecast,
  Forecast,
  ForecastSlot,
  HourlyPoint,
  TemperatureRange,
} from '../interfaces/weather';
import { formatHour, getPlaceDayKey, getPlaceHour } from './dates';

const toPercentage = (probability: number) => Math.round(probability * 100);

/**
 * Picks the forecast slots of the next 24 hours.
 *
 * @param slots - Forecast slots, in chronological order.
 * @returns The first 8 slots (3 hours each).
 */
export const getNext24Hours = (slots: ForecastSlot[]) => slots.slice(0, FORECAST_SLOTS_PER_DAY);

/**
 * Builds the hourly timeline of the next 24 hours.
 *
 * @param forecast - Forecast of the place.
 * @returns The local time, temperature in degrees Celsius, rain chance and condition of each slot.
 */
export const toHourlyPoints = (forecast: Forecast): HourlyPoint[] =>
  getNext24Hours(forecast.list).map((slot) => {
    const [condition] = slot.weather;

    return {
      time: slot.dt,
      hour: formatHour(slot.dt, forecast.city.timezone),
      temp: slot.main.temp,
      rainChance: toPercentage(slot.pop),
      icon: condition.icon,
      description: condition.description,
    };
  });

/**
 * Finds the lowest and highest temperatures from now until 24 hours ahead.
 *
 * @param forecast - Forecast of the place.
 * @param currentTemperature - Temperature right now, in degrees Celsius.
 * @returns The range of the next 24 hours, in degrees Celsius.
 */
export const getNext24HoursRange = (
  forecast: Forecast,
  currentTemperature: number,
): TemperatureRange => {
  const temperatures = [
    currentTemperature,
    ...getNext24Hours(forecast.list).map((slot) => slot.main.temp),
  ];

  return {
    min: Math.min(...temperatures),
    max: Math.max(...temperatures),
  };
};

const groupSlotsByDay = (slots: ForecastSlot[], timezoneOffset: number) => {
  const days = new Map<string, ForecastSlot[]>();

  for (const slot of slots) {
    const dayKey = getPlaceDayKey(slot.dt, timezoneOffset);
    const daySlots = days.get(dayKey);

    if (daySlots) daySlots.push(slot);
    else days.set(dayKey, [slot]);
  }

  return days;
};

const distanceFromRepresentativeHour = (slot: ForecastSlot, timezoneOffset: number) =>
  Math.abs(getPlaceHour(slot.dt, timezoneOffset) - REPRESENTATIVE_DAY_HOUR);

const pickRepresentativeSlot = (
  [firstSlot, ...otherSlots]: [ForecastSlot, ...ForecastSlot[]],
  timezoneOffset: number,
) =>
  otherSlots.reduce(
    (closest, slot) =>
      distanceFromRepresentativeHour(slot, timezoneOffset) <
      distanceFromRepresentativeHour(closest, timezoneOffset)
        ? slot
        : closest,
    firstSlot,
  );

const summarizeDay = (
  dayKey: string,
  daySlots: ForecastSlot[],
  timezoneOffset: number,
): DailyForecast | null => {
  const [firstSlot, ...otherSlots] = daySlots;
  if (!firstSlot) return null;

  return {
    dayKey,
    slot: pickRepresentativeSlot([firstSlot, ...otherSlots], timezoneOffset),
    min: Math.min(...daySlots.map((slot) => slot.main.temp_min)),
    max: Math.max(...daySlots.map((slot) => slot.main.temp_max)),
    rainChance: toPercentage(Math.max(...daySlots.map((slot) => slot.pop))),
  };
};

/**
 * Summarizes the forecast of each day after today, in the place's local time.
 *
 * @param forecast - Forecast of the place.
 * @param now - Current Unix time in seconds, used to find "today".
 * @returns One summary per upcoming day, with its lowest and highest temperatures.
 */
export const getUpcomingDays = (forecast: Forecast, now: number) => {
  const timezoneOffset = forecast.city.timezone;
  const todayKey = getPlaceDayKey(now, timezoneOffset);
  const days = groupSlotsByDay(forecast.list, timezoneOffset);
  const upcomingDays: DailyForecast[] = [];

  for (const [dayKey, daySlots] of days) {
    if (dayKey <= todayKey) continue;

    const summary = summarizeDay(dayKey, daySlots, timezoneOffset);
    if (summary) upcomingDays.push(summary);
  }

  return upcomingDays;
};
