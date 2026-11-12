import { APP_LOCALE } from '@/shared/constants/locale';
import { METERS_PER_KILOMETER, METERS_PER_MILE } from '../constants/units';
import { UNIT_SYSTEM_DETAILS } from '../data/unit-systems';
import type { UnitSystem } from '../interfaces/units';

const formatDecimal = (value: number) =>
  value.toLocaleString(APP_LOCALE, { maximumFractionDigits: 1 });

/**
 * Converts a temperature to the unit system, rounded to whole degrees.
 *
 * @param celsius - Temperature in degrees Celsius.
 * @param system - Unit system to show.
 * @returns The rounded temperature in °C or °F.
 */
export const convertTemperature = (celsius: number, system: UnitSystem) => {
  const { temperatureScale, temperatureOffset } = UNIT_SYSTEM_DETAILS[system];
  return Math.round(celsius * temperatureScale + temperatureOffset);
};

/**
 * Gets the temperature symbol of a unit system.
 *
 * @param system - Unit system to show.
 * @returns "°C" or "°F".
 */
export const getTemperatureSymbol = (system: UnitSystem) =>
  UNIT_SYSTEM_DETAILS[system].temperatureSymbol;

/**
 * Formats a temperature in the unit system.
 *
 * @param celsius - Temperature in degrees Celsius.
 * @param system - Unit system to show.
 * @returns The temperature with its unit, e.g. "21°C" or "70°F".
 */
export const formatTemperature = (celsius: number, system: UnitSystem) =>
  `${convertTemperature(celsius, system)}${getTemperatureSymbol(system)}`;

/**
 * Formats a wind speed in the unit system.
 *
 * @param metersPerSecond - Wind speed returned by the API, in meters per second.
 * @param system - Unit system to show.
 * @returns The rounded speed with its unit, e.g. "9 km/h" or "6 mph".
 */
export const formatWindSpeed = (metersPerSecond: number, system: UnitSystem) => {
  const { speedFactor, speedUnit } = UNIT_SYSTEM_DETAILS[system];
  return `${Math.round(metersPerSecond * speedFactor)} ${speedUnit}`;
};

/**
 * Formats a visibility distance in the unit system.
 *
 * @param meters - Visibility in meters, when the API reports it.
 * @param system - Unit system to show.
 * @returns The distance in km (or m below one kilometer) or in miles, or a dash when unknown.
 */
export const formatVisibility = (meters: number | undefined, system: UnitSystem) => {
  if (meters === undefined) return '—';
  if (system === 'imperial') return `${formatDecimal(meters / METERS_PER_MILE)} mi`;
  if (meters < METERS_PER_KILOMETER) return `${meters} m`;
  return `${Math.round(meters / METERS_PER_KILOMETER)} km`;
};
