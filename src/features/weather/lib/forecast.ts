import { FORECAST_SLOTS_PER_DAY } from '../constants/weather';
import type { ForecastSlot, TemperaturePoint } from '../interfaces/weather';
import { formatHour } from './dates';

/**
 * Picks the forecast slots of the next 24 hours.
 *
 * @param slots - Forecast slots, in chronological order.
 * @returns The first 8 slots (3 hours each).
 */
export const getNext24Hours = (slots: ForecastSlot[]) => slots.slice(0, FORECAST_SLOTS_PER_DAY);

/**
 * Picks one forecast slot for each upcoming day.
 *
 * @param slots - Forecast slots, in chronological order.
 * @returns One slot every 24 hours, starting about a day from now.
 */
export const getUpcomingDays = (slots: ForecastSlot[]) =>
  slots
    .slice(FORECAST_SLOTS_PER_DAY - 1)
    .filter((_, index) => index % FORECAST_SLOTS_PER_DAY === 0);

/**
 * Builds the temperature chart points of the next 24 hours.
 *
 * @param slots - Forecast slots, in chronological order.
 * @returns The hour label and temperature of each slot.
 */
export const toTemperaturePoints = (slots: ForecastSlot[]): TemperaturePoint[] =>
  getNext24Hours(slots).map((slot) => ({ hour: formatHour(slot.dt), temp: slot.main.temp }));
