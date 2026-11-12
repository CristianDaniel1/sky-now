import { OPEN_WEATHER_PROXY_PATH } from '@/shared/constants/api';
import type { OpenWeatherEndpoint } from '@/shared/interfaces/open-weather';

/**
 * Builds the URL of an OpenWeatherMap request sent through the app's server proxy.
 *
 * @param endpoint - OpenWeatherMap endpoint allowed by the proxy, e.g. `weather`.
 * @param params - Query parameters of the request.
 * @returns The full request URL.
 */
export const buildOpenWeatherUrl = (
  endpoint: OpenWeatherEndpoint,
  params: Record<string, string | number>,
) => {
  const url = new URL(OPEN_WEATHER_PROXY_PATH, window.location.origin);

  url.searchParams.set('endpoint', endpoint);
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value));

  return url;
};
