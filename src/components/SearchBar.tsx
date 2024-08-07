import { ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { useCoordsStore } from '../store/weatherStore.ts';
import { useGeo } from '../hooks/useGeo.ts';

import { ErrorMessage } from './ErrorMessage.tsx';
import { SuggestionsList } from './SuggestionsList.tsx';
import { SuggestionsItem } from './SuggestionsItem.tsx';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon.tsx';

const classes =
  'bg-white absolute top-full left-0 mt-1 p-4 rounded border-2 border-slate-200';

export const SearchBar = () => {
  const resetForm = useRef<HTMLFormElement>(null);
  const lastChange = useRef<number | null>();

  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const changeCoords = useCoordsStore(state => state.changeCoords);

  const { data, isFetching, isError, error } = useGeo(searchTerm);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (lastChange.current) clearTimeout(lastChange.current);

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const local = data?.find(
      ele => ele.name.toLowerCase().trim() === searchTerm?.toLowerCase().trim()
    );

    if (local) handleChangeCoords(local.lat, local.lon);

    setSearchTerm(undefined);
    event.currentTarget.reset();
  }

  function handleChangeCoords(lat: number, lon: number) {
    changeCoords(lat, lon);
    setSearchTerm(undefined);
    resetForm.current!.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="relative" ref={resetForm}>
      <div className="pl-4 flex gap-2 items-center bg-slate-100 rounded-full text-sky-800 outline outline-slate-100 focus-within:outline focus-within:outline-gray-200">
        <MagnifyingGlassIcon />
        <input
          type="search"
          placeholder="Pesquisar"
          className="w-2 md:w-80 block bg-transparent outline-none md:pr-4 py-1 md:py-2"
          onChange={handleChange}
        />
        {isFetching && <div className={classes}>...</div>}
        {isError && (
          <div className={classes}>
            <ErrorMessage
              title="Ops!"
              message={error?.message || 'Tente novamente mais tarde.'}
            />
          </div>
        )}
        {data && data.length > 0 && searchTerm && (
          <SuggestionsList className={classes}>
            {data.map(local => (
              <SuggestionsItem
                infoLocal={local}
                key={local.country + local.name}
                onChangeCoords={handleChangeCoords}
              />
            ))}
          </SuggestionsList>
        )}
      </div>
    </form>
  );
};
