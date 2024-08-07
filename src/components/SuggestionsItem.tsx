import { type Location } from '../types.ts';

interface SuggestionsItemProps {
  infoLocal: Location;
  onChangeCoords: (lat: number, lon: number) => void;
}

export const SuggestionsItem = ({
  infoLocal,
  onChangeCoords,
}: SuggestionsItemProps) => {
  return (
    <li
      key={infoLocal.lat + infoLocal.lon}
      className="text-sm hover:bg-gray-100 px-2 py-[2px] duration-150"
      onClick={() => onChangeCoords(infoLocal.lat, infoLocal.lon)}
    >
      {`${infoLocal.name ? infoLocal.name + ',' : ''} ${
        infoLocal.state ? infoLocal.state + ',' : ''
      } ${infoLocal.country ? infoLocal.country : ''}`}
    </li>
  );
};
