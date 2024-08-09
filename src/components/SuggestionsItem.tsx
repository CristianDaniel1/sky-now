import { type CurrentLocale, type Location } from '../types.ts';

interface SuggestionsItemProps {
  infoLocal: Location;
  onChangeCoords: (lat: number, lon: number, locale: CurrentLocale) => void;
}

export const SuggestionsItem = ({
  infoLocal,
  onChangeCoords,
}: SuggestionsItemProps) => {
  const { name: city, state, country } = infoLocal;

  return (
    <li
      className="text-sm hover:bg-gray-100 px-1 sm:px-2 py-[2px] duration-150 border-b border-sky-100"
      onClick={() =>
        onChangeCoords(infoLocal.lat, infoLocal.lon, { city, state, country })
      }
    >
      {`${city ? city + ',' : ''} ${state ? state + ',' : ''} ${
        country ? country : ''
      }`}
    </li>
  );
};
