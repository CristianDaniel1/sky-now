import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { MagnifyingGlassIcon } from '@/shared/components/icons/MagnifyingGlassIcon';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { LOCATION_SEARCH_DEBOUNCE_MS } from '../constants/location';
import { SEARCH_POPOVER_CLASSES } from '../constants/styles';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { useSuggestionNavigation } from '../hooks/useSuggestionNavigation';
import type { GeoLocation } from '../interfaces/location';
import { findExactMatch, toLocationLabel } from '../lib/location';
import { getSuggestionId } from '../lib/suggestions';
import { useLocationStore } from '../store/location.store';
import { SuggestionsList } from './SuggestionsList';

export const SearchBar = () => {
  const listId = useId();
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const searchTerm = useDebouncedValue(trimmedQuery, LOCATION_SEARCH_DEBOUNCE_MS);
  const selectLocation = useLocationStore((store) => store.selectLocation);
  const { data: locations = [], isFetching, isError, error } = useLocationSearch(searchTerm);
  const { isOpen, activeIndex, activeLocation, open, close, handleKeyDown } =
    useSuggestionNavigation(locations);

  const isSearchSettled = !!trimmedQuery && searchTerm === trimmedQuery;
  const showPanel = isOpen && isSearchSettled;
  const hasSuggestions = showPanel && !isFetching && !!locations.length;
  const hasNoResults = showPanel && !isFetching && !isError && !locations.length;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    open();
  };

  const handleSelect = (location: GeoLocation) => {
    selectLocation({ lat: location.lat, lon: location.lon }, toLocationLabel(location));
    setQuery('');
    close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSearchSettled) return;

    const location = activeLocation ?? findExactMatch(locations, searchTerm) ?? locations[0];
    if (location) handleSelect(location);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative order-3 w-full sm:order-1 sm:ml-0 sm:w-auto"
    >
      <MagnifyingGlassIcon className="absolute top-1/2 left-2 z-10 -translate-y-1/2 text-sky-800" />
      <div className="flex items-center gap-2 rounded-full bg-slate-100 text-sky-800 outline outline-slate-100 focus-within:outline focus-within:outline-gray-200">
        <input
          type="search"
          role="combobox"
          placeholder="Pesquisar"
          aria-label="Pesquisar cidade"
          aria-autocomplete="list"
          aria-expanded={hasSuggestions}
          aria-controls={listId}
          aria-activedescendant={
            hasSuggestions && activeIndex >= 0 ? getSuggestionId(listId, activeIndex) : undefined
          }
          value={query}
          onChange={handleChange}
          onFocus={open}
          onBlur={close}
          onKeyDown={handleKeyDown}
          className="z-20 block w-full bg-transparent px-4 py-1 pl-8 outline-hidden sm:w-80 sm:py-2"
        />
        {showPanel && isFetching && (
          <div role="status" className={SEARCH_POPOVER_CLASSES}>
            Buscando...
          </div>
        )}
        {showPanel && isError && (
          <div className={SEARCH_POPOVER_CLASSES}>
            <ErrorMessage title="Ops!" message={error.message || 'Tente novamente mais tarde.'} />
          </div>
        )}
        {hasNoResults && (
          <div role="status" className={SEARCH_POPOVER_CLASSES}>
            Nenhum local encontrado.
          </div>
        )}
        {hasSuggestions && (
          <SuggestionsList
            id={listId}
            locations={locations}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        )}
      </div>
    </form>
  );
};
