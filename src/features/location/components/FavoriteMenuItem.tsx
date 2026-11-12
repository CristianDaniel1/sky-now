import { Check, Star } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { Place } from '../interfaces/location';
import { formatLocationLabel } from '../lib/location';

interface FavoriteMenuItemProps {
  place: Place;
  isCurrent: boolean;
  onSelect: (place: Place) => void;
}

export const FavoriteMenuItem = ({ place, isCurrent, onSelect }: FavoriteMenuItemProps) => (
  <li>
    <button
      type="button"
      onClick={() => onSelect(place)}
      aria-current={isCurrent ? 'location' : undefined}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-subtle',
        isCurrent && 'font-semibold',
      )}
    >
      <Star aria-hidden="true" className="size-4 shrink-0 fill-accent text-accent" />
      <span className="flex-1">{formatLocationLabel(place.label)}</span>
      {isCurrent && <Check aria-hidden="true" className="size-4 shrink-0 text-heading" />}
    </button>
  </li>
);
