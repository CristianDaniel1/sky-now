import { Search } from 'lucide-react';
import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { SEARCH_POPOVER_CLASSES, SEARCH_STATUS_CLASSES } from '../constants/styles';
import { usePlaceSuggestions } from '../hooks/usePlaceSuggestions';
import { useSuggestionNavigation } from '../hooks/useSuggestionNavigation';
import type { Place } from '../interfaces/location';
import { findExactMatch } from '../lib/location';
import { getSuggestionId } from '../lib/suggestions';
import { useLocationStore } from '../store/location.store';
import { useSavedPlacesStore } from '../store/saved-places.store';
import { SuggestionsList } from './SuggestionsList';

export const SearchBar = () => {
  const listId = useId();
  const [query, setQuery] = useState('');
  const selectLocation = useLocationStore((store) => store.selectLocation);
  const addRecent = useSavedPlacesStore((store) => store.addRecent);
  const {
    searchTerm,
    isShowingSaved,
    isSearchSettled,
    groups,
    places,
    isFetching,
    isError,
    error,
  } = usePlaceSuggestions(query);
  const { isOpen, activeIndex, activePlace, open, close, handleKeyDown } =
    useSuggestionNavigation(places);

  const showSearchPanel = isOpen && isSearchSettled;
  const canListPlaces = isShowingSaved ? isOpen : showSearchPanel && !isFetching;
  const hasSuggestions = canListPlaces && !!places.length;
  const hasNoResults = showSearchPanel && !isFetching && !isError && !places.length;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    open();
  };

  const handleSelect = (place: Place) => {
    selectLocation(place);
    addRecent(place);
    setQuery('');
    close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const highlightedPlace = hasSuggestions ? activePlace : undefined;
    if (highlightedPlace) {
      handleSelect(highlightedPlace);
      return;
    }
    if (!isSearchSettled) return;

    const place = findExactMatch(places, searchTerm) ?? places[0];
    if (place) handleSelect(place);
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
      {showSearchPanel && isFetching && (
        <div role="status" className={SEARCH_POPOVER_CLASSES}>
          <p className={SEARCH_STATUS_CLASSES}>Buscando…</p>
        </div>
      )}
      {showSearchPanel && isError && (
        <div className={SEARCH_POPOVER_CLASSES}>
          <p role="alert" className={SEARCH_STATUS_CLASSES}>
            {error?.message || 'Não foi possível buscar agora. Tente de novo.'}
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
          label={isShowingSaved ? 'Locais salvos' : 'Locais encontrados'}
          groups={groups}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />
      )}
    </form>
  );
};
