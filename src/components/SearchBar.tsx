import { ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { useCoordsStore } from '../store/weatherStore.ts';
import { useGeo } from '../hooks/useGeo.ts';

import { ErrorMessage } from './ErrorMessage.tsx';
import { SuggestionsList } from './SuggestionsList.tsx';
import { SuggestionsItem } from './SuggestionsItem.tsx';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon.tsx';
import { type CurrentLocale } from '../types.ts';

const classes = 'bg-white absolute top-full left-0 mt-1 p-4 rounded-sm border-2 border-slate-200';

export const SearchBar = () => {
  const resetForm = useRef<HTMLFormElement>(null);
  const lastChange = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const changeCoords = useCoordsStore((state) => state.changeCoords);
  const changeLocale = useCoordsStore((state) => state.changeLocale);

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
      (ele) => ele.name.toLowerCase().trim() === searchTerm?.toLowerCase().trim(),
    );

    if (local) {
      const { name: city, state, country } = local;
      handleChangeCoords(local.lat, local.lon, { city, state, country });
    }

    setSearchTerm(undefined);
    event.currentTarget.reset();
  }

  function handleChangeCoords(lat: number, lon: number, locale: CurrentLocale) {
    const { city, state, country } = locale;
    console.log(locale);

    changeCoords(lat, lon);
    changeLocale({ city, state, country });
    setSearchTerm(undefined);

    resetForm.current!.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative order-3 w-full sm:order-1 sm:ml-0 sm:w-auto"
      ref={resetForm}
    >
      <MagnifyingGlassIcon className="absolute top-1/2 left-2 z-10 -translate-y-1/2 text-sky-800" />
      <div className="flex items-center gap-2 rounded-full bg-slate-100 text-sky-800 outline outline-slate-100 focus-within:outline focus-within:outline-gray-200">
        <input
          type="search"
          placeholder="Pesquisar"
          className="z-20 block w-full bg-transparent px-4 py-1 pl-8 outline-hidden sm:w-80 sm:py-2"
          onChange={handleChange}
        />
        {isFetching && <div className={classes}>...</div>}
        {isError && (
          <div className={classes}>
            <ErrorMessage title="Ops!" message={error?.message || 'Tente novamente mais tarde.'} />
          </div>
        )}
        {data && data.length > 0 && searchTerm && (
          <SuggestionsList className={classes}>
            {data.map((local) => (
              <SuggestionsItem
                infoLocal={local}
                key={local.lat + local.lon}
                onChangeCoords={handleChangeCoords}
              />
            ))}
          </SuggestionsList>
        )}
      </div>
    </form>
  );
};
