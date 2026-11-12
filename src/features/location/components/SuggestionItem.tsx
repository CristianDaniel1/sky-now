import type { GeoLocation } from '../interfaces/location';
import { formatLocationLabel, toLocationLabel } from '../lib/location';

interface SuggestionItemProps {
  location: GeoLocation;
  onSelect: (location: GeoLocation) => void;
}

export const SuggestionItem = ({ location, onSelect }: SuggestionItemProps) => (
  <li
    className="border-b border-sky-100 px-1 py-0.5 text-sm duration-150 hover:bg-gray-100 sm:px-2"
    onClick={() => onSelect(location)}
  >
    {formatLocationLabel(toLocationLabel(location))}
  </li>
);
