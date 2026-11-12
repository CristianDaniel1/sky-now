import { skipToken, useQuery } from '@tanstack/react-query';
import { searchLocations } from '../api/geo';

/**
 * Fetches the places that match a search term.
 *
 * @param query - Search term; an empty term skips the request.
 * @returns The query state with the matching places.
 */
export const useLocationSearch = (query: string) =>
  useQuery({
    queryKey: ['geo', query],
    queryFn: query ? ({ signal }) => searchLocations({ query, signal }) : skipToken,
    staleTime: Infinity,
  });
