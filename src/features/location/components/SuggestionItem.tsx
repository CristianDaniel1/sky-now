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
      'cursor-pointer border-b border-line px-2 py-1.5 last:border-b-0 hover:bg-subtle',
      isActive && 'bg-subtle',
    )}
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => onSelect(location)}
  >
    {formatLocationLabel(toLocationLabel(location))}
  </li>
);
