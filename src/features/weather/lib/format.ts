import fallbackIcon from '@/assets/weatherIcons/02d.png';
import { COMPASS_POINTS } from '../data/compass';
import { WEATHER_ICONS } from '../data/weather-icons';

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
