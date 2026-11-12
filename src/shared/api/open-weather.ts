import { OPEN_WEATHER_BASE_URL } from '@/shared/constants/api';

/**
 * Builds an OpenWeatherMap URL with the API key and encoded query parameters.
 *
 * @param path - Endpoint path, e.g. `/data/2.5/weather`.
 * @param params - Query parameters of the request.
 * @returns The full request URL.
 */
export const buildOpenWeatherUrl = (path: string, params: Record<string, string | number>) => {
  const url = new URL(path, OPEN_WEATHER_BASE_URL);

  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value));
  url.searchParams.set('appid', import.meta.env.VITE_API_KEY);

  return url;
};
