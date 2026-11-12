import fallbackIcon from '@/assets/weatherIcons/02d.png';
import { METERS_PER_SECOND_TO_KM_PER_HOUR } from '../constants/weather';
import { WEATHER_ICONS } from '../data/weather-icons';

/**
 * Formats a temperature in Celsius with one decimal place.
 *
 * @param celsius - Temperature in degrees Celsius.
 * @returns The temperature with its unit, e.g. "21.5°C".
 */
export const formatTemperature = (celsius: number) => `${celsius.toFixed(1)}°C`;

/**
 * Converts a wind speed to kilometers per hour and formats it with one decimal place.
 *
 * @param metersPerSecond - Wind speed returned by the API, in meters per second.
 * @returns The speed in km/h, e.g. "12.6 km/h".
 */
export const formatWindSpeed = (metersPerSecond: number) =>
  `${(metersPerSecond * METERS_PER_SECOND_TO_KM_PER_HOUR).toFixed(1)} km/h`;

/**
 * Formats a visibility distance in kilometers.
 *
 * @param meters - Visibility in meters, when the API reports it.
 * @returns The distance in kilometers, or a dash when unknown.
 */
export const formatVisibility = (meters: number | undefined) => {
  if (meters === undefined) return '—';
  return `${meters / 1000}km`;
};

/**
 * Finds the image of an OpenWeatherMap condition icon.
 *
 * @param code - Icon code from the API, e.g. `01d`.
 * @returns The image URL, or a generic cloud when the code is unknown.
 */
export const getWeatherIcon = (code: string) => WEATHER_ICONS[code] ?? fallbackIcon;
