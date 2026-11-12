import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { LOCATION_SEARCH_DEBOUNCE_MS } from '../constants/location';
import { toPlace } from '../lib/location';
import { buildRecentPlaceGroups, indexPlaceGroups } from '../lib/suggestions';
import { useSavedPlacesStore } from '../store/saved-places.store';
import { useLocationSearch } from './useLocationSearch';

/**
 * Lists the places to suggest: recent places while the search is empty, search results otherwise.
 *
 * @param query - Text typed in the search input.
 * @returns The suggestion groups, their places in display order and the search state.
 */
export const usePlaceSuggestions = (query: string) => {
  const trimmedQuery = query.trim();
  const searchTerm = useDebouncedValue(trimmedQuery, LOCATION_SEARCH_DEBOUNCE_MS);
  const { data: locations = [], isFetching, isError, error } = useLocationSearch(searchTerm);
  const recents = useSavedPlacesStore((store) => store.recents);

  const isShowingRecents = !trimmedQuery;
  const groups = isShowingRecents
    ? buildRecentPlaceGroups(recents)
    : indexPlaceGroups([{ kind: 'results', places: locations.map(toPlace) }]);

  return {
    searchTerm,
    isShowingRecents,
    isSearchSettled: !isShowingRecents && searchTerm === trimmedQuery,
    groups,
    places: groups.flatMap((group) => group.places),
    isFetching,
    isError,
    error,
  };
};
