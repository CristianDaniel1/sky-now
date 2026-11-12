import fallbackIcon from '@/assets/weatherIcons/02d.png';
import { METERS_PER_SECOND_TO_KM_PER_HOUR } from '../constants/weather';
import { COMPASS_POINTS } from '../data/compass';
import { WEATHER_ICONS } from '../data/weather-icons';

/**
 * Formats a temperature rounded to whole degrees Celsius.
 *
 * @param celsius - Temperature in degrees Celsius.
 * @returns The temperature with its unit, e.g. "21°C".
 */
export const formatTemperature = (celsius: number) => `${Math.round(celsius)}°C`;

/**
 * Converts a wind speed to kilometers per hour, rounded.
 *
 * @param metersPerSecond - Wind speed returned by the API, in meters per second.
 * @returns The speed in km/h.
 */
export const toKilometersPerHour = (metersPerSecond: number) =>
  Math.round(metersPerSecond * METERS_PER_SECOND_TO_KM_PER_HOUR);

/**
 * Formats a visibility distance in kilometers, or meters below one kilometer.
 *
 * @param meters - Visibility in meters, when the API reports it.
 * @returns The distance with its unit, or a dash when unknown.
 */
export const formatVisibility = (meters: number | undefined) => {
  if (meters === undefined) return '—';
  if (meters < 1000) return `${meters} m`;
  return `${Math.round(meters / 1000)} km`;
};

/**
 * Gets the compass point a wind comes from.
 *
 * @param degrees - Wind direction in meteorological degrees (0 = from the north).
 * @returns The compass point in Portuguese, e.g. "NE".
 */
export const getCompassPoint = (degrees: number) => {
  const index = Math.round((((degrees % 360) + 360) % 360) / 45) % COMPASS_POINTS.length;
  return COMPASS_POINTS[index] ?? 'N';
};

/**
 * Finds the image of an OpenWeatherMap condition icon.
 *
 * @param code - Icon code from the API, e.g. `01d`.
 * @returns The image URL, or a generic cloud when the code is unknown.
 */
export const getWeatherIcon = (code: string) => WEATHER_ICONS[code] ?? fallbackIcon;
