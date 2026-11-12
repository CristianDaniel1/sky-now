import { useState, type FormEvent } from 'react';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { MagnifyingGlassIcon } from '@/shared/components/icons/MagnifyingGlassIcon';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { LOCATION_SEARCH_DEBOUNCE_MS } from '../constants/location';
import { SEARCH_POPOVER_CLASSES } from '../constants/styles';
import { useLocationSearch } from '../hooks/useLocationSearch';
import type { GeoLocation } from '../interfaces/location';
import { findExactMatch, toLocationLabel } from '../lib/location';
import { useLocationStore } from '../store/location.store';
import { SuggestionsList } from './SuggestionsList';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const searchTerm = useDebouncedValue(query.trim(), LOCATION_SEARCH_DEBOUNCE_MS);
  const selectLocation = useLocationStore((store) => store.selectLocation);
  const { data: locations, isFetching, isError, error } = useLocationSearch(searchTerm);

  const isSearching = !!query.trim() && !!searchTerm;

  const handleSelect = (location: GeoLocation) => {
    selectLocation({ lat: location.lat, lon: location.lon }, toLocationLabel(location));
    setQuery('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const match = findExactMatch(locations ?? [], searchTerm);
    if (match) handleSelect(match);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative order-3 w-full sm:order-1 sm:ml-0 sm:w-auto">
      <MagnifyingGlassIcon className="absolute top-1/2 left-2 z-10 -translate-y-1/2 text-sky-800" />
      <div className="flex items-center gap-2 rounded-full bg-slate-100 text-sky-800 outline outline-slate-100 focus-within:outline focus-within:outline-gray-200">
        <input
          type="search"
          placeholder="Pesquisar"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="z-20 block w-full bg-transparent px-4 py-1 pl-8 outline-hidden sm:w-80 sm:py-2"
        />
        {isSearching && isFetching && <div className={SEARCH_POPOVER_CLASSES}>...</div>}
        {isSearching && isError && (
          <div className={SEARCH_POPOVER_CLASSES}>
            <ErrorMessage title="Ops!" message={error.message || 'Tente novamente mais tarde.'} />
          </div>
        )}
        {isSearching && !!locations?.length && (
          <SuggestionsList locations={locations} onSelect={handleSelect} />
        )}
      </div>
    </form>
  );
};
