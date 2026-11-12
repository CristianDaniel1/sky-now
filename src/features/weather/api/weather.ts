import { fetchJson } from '@/shared/api/http';
import { buildOpenWeatherUrl } from '@/shared/api/open-weather';
import { OPEN_WEATHER_LANGUAGE, OPEN_WEATHER_UNITS } from '@/shared/constants/api';
import type { Coordinates } from '@/shared/interfaces/coordinates';
import { currentWeatherSchema, forecastSchema } from './schemas';

interface WeatherRequest extends Coordinates {
  signal: AbortSignal;
}

/**
 * Fetches the current weather of a place.
 *
 * @param request - Coordinates of the place and the abort signal of the query.
 * @returns The current weather.
 */
export const fetchCurrentWeather = ({ lat, lon, signal }: WeatherRequest) =>
  fetchJson({
    url: buildOpenWeatherUrl('/data/2.5/weather', {
      lat,
      lon,
      units: OPEN_WEATHER_UNITS,
      lang: OPEN_WEATHER_LANGUAGE,
    }),
    schema: currentWeatherSchema,
    signal,
    errorMessage: 'Ocorreu um erro ao carregar os dados',
  });

/**
 * Fetches the 5 day forecast of a place, in 3-hour slots.
 *
 * @param request - Coordinates of the place and the abort signal of the query.
 * @returns The forecast.
 */
export const fetchForecast = ({ lat, lon, signal }: WeatherRequest) =>
  fetchJson({
    url: buildOpenWeatherUrl('/data/2.5/forecast', {
      lat,
      lon,
      units: OPEN_WEATHER_UNITS,
      lang: OPEN_WEATHER_LANGUAGE,
    }),
    schema: forecastSchema,
    signal,
    errorMessage: 'Erro ao obter dados da previsão do tempo',
  });
