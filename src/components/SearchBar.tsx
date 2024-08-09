import { ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { useCoordsStore } from '../store/weatherStore.ts';
import { useGeo } from '../hooks/useGeo.ts';

import { ErrorMessage } from './ErrorMessage.tsx';
import { SuggestionsList } from './SuggestionsList.tsx';
import { SuggestionsItem } from './SuggestionsItem.tsx';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon.tsx';
import { type CurrentLocale } from '../types.ts';

const classes =
  'bg-white absolute top-full left-0 mt-1 p-4 rounded border-2 border-slate-200';

export const SearchBar = () => {
  const resetForm = useRef<HTMLFormElement>(null);
  const lastChange = useRef<number | null>();

  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const changeCoords = useCoordsStore(state => state.changeCoords);
  const changeLocale = useCoordsStore(state => state.changeLocale);

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
      className="relative sm:ml-0 order-3 sm:order-1 w-full sm:w-auto"
      ref={resetForm}
    >
      <MagnifyingGlassIcon className="text-sky-800 z-10 absolute top-1/2 -translate-y-1/2 left-2" />
      <div className="flex gap-2 items-center bg-slate-100 rounded-full text-sky-800 outline outline-slate-100 focus-within:outline focus-within:outline-gray-200">
        <input
          type="search"
          placeholder="Pesquisar"
          className="w-full sm:w-80 block bg-transparent outline-none py-1 px-4 pl-8 sm:py-2 z-20"
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
