import { cn } from '@/shared/lib/cn';
import type { GeoLocation } from '../interfaces/location';
import { formatLocationLabel, toLocationLabel } from '../lib/location';

interface SuggestionItemProps {
  id: string;
  location: GeoLocation;
  isActive: boolean;
  onSelect: (location: GeoLocation) => void;
}

export const SuggestionItem = ({ id, location, isActive, onSelect }: SuggestionItemProps) => (
  <li
    id={id}
    role="option"
    aria-selected={isActive}
    className={cn(
      'cursor-pointer border-b border-sky-100 px-1 py-0.5 text-sm duration-150 hover:bg-gray-100 sm:px-2',
      isActive && 'bg-gray-100',
    )}
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => onSelect(location)}
  >
    {formatLocationLabel(toLocationLabel(location))}
  </li>
);
