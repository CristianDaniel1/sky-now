import { fetchJson } from '@/shared/api/http';
import { buildOpenWeatherUrl } from '@/shared/api/open-weather';
import type { Coordinates } from '@/shared/interfaces/coordinates';
import { GEO_SEARCH_LIMIT } from '../constants/location';
import { geoLocationsSchema } from './schemas';

interface ReverseGeocodeInput extends Coordinates {
  signal: AbortSignal;
}

interface SearchLocationsInput {
  query: string;
  signal: AbortSignal;
}

/**
 * Searches places by name with the OpenWeatherMap geocoding API.
 *
 * @param input - Text typed by the user and the abort signal of the query.
 * @returns The places that match the text.
 */
export const searchLocations = ({ query, signal }: SearchLocationsInput) =>
  fetchJson({
    url: buildOpenWeatherUrl('geo-direct', { q: query, limit: GEO_SEARCH_LIMIT }),
    schema: geoLocationsSchema,
    signal,
    errorMessage: 'Erro ao procurar local, tente mais tarde.',
  });

/**
 * Finds the place at a pair of coordinates with the OpenWeatherMap reverse geocoding API.
 *
 * @param input - Coordinates to look up and the abort signal of the request.
 * @returns The places at the coordinates, the closest first.
 */
export const reverseGeocode = ({ lat, lon, signal }: ReverseGeocodeInput) =>
  fetchJson({
    url: buildOpenWeatherUrl('geo-reverse', { lat, lon, limit: 1 }),
    schema: geoLocationsSchema,
    signal,
    errorMessage: 'Erro ao identificar o local atual.',
  });
