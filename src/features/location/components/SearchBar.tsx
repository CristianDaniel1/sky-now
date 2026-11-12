import { Search } from 'lucide-react';
import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { LOCATION_SEARCH_DEBOUNCE_MS } from '../constants/location';
import { SEARCH_POPOVER_CLASSES, SEARCH_STATUS_CLASSES } from '../constants/styles';
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
      className="relative order-3 w-full sm:order-none sm:max-w-md sm:flex-1"
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-sky-800 dark:text-sky-300"
      />
      <input
        type="search"
        role="combobox"
        placeholder="Pesquisar cidade"
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
        className="block h-11 w-full rounded-full border border-transparent bg-slate-100 pr-4 pl-10 text-sky-800 transition-colors placeholder:text-sky-800/60 hover:border-line focus:bg-surface dark:bg-subtle dark:text-sky-100 dark:placeholder:text-sky-100/60"
      />
      {showPanel && isFetching && (
        <div role="status" className={SEARCH_POPOVER_CLASSES}>
          <p className={SEARCH_STATUS_CLASSES}>Buscando…</p>
        </div>
      )}
      {showPanel && isError && (
        <div className={SEARCH_POPOVER_CLASSES}>
          <p role="alert" className={SEARCH_STATUS_CLASSES}>
            {error.message || 'Não foi possível buscar agora. Tente de novo.'}
          </p>
        </div>
      )}
      {hasNoResults && (
        <div role="status" className={SEARCH_POPOVER_CLASSES}>
          <p className={SEARCH_STATUS_CLASSES}>Nenhuma cidade encontrada com esse nome.</p>
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
    </form>
  );
};
