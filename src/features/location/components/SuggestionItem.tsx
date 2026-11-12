import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { Place } from '../interfaces/location';
import { formatLocationLabel } from '../lib/location';

interface SuggestionItemProps {
  id: string;
  place: Place;
  icon: LucideIcon | null;
  isActive: boolean;
  onSelect: (place: Place) => void;
}

export const SuggestionItem = ({
  id,
  place,
  icon: Icon,
  isActive,
  onSelect,
}: SuggestionItemProps) => (
  <li
    id={id}
    role="option"
    aria-selected={isActive}
    className={cn(
      'flex cursor-pointer items-center gap-2 border-b border-line px-2 py-1.5 last:border-b-0 hover:bg-subtle',
      isActive && 'bg-subtle',
    )}
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => onSelect(place)}
  >
    {Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-muted" />}
    {formatLocationLabel(place.label)}
  </li>
);
