import { fetchJson } from '@/shared/api/http';
import { buildOpenWeatherUrl } from '@/shared/api/open-weather';
import { GEO_SEARCH_LIMIT } from '../constants/location';
import { geoLocationsSchema } from './schemas';

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
    url: buildOpenWeatherUrl('/geo/1.0/direct', { q: query, limit: GEO_SEARCH_LIMIT }),
    schema: geoLocationsSchema,
    signal,
    errorMessage: 'Erro ao procurar local, tente mais tarde.',
  });
