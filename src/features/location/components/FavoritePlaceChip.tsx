import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { Place } from '../interfaces/location';
import { formatLocationLabel } from '../lib/location';

interface FavoritePlaceChipProps {
  place: Place;
  isActive: boolean;
  onSelect: (place: Place) => void;
}

export const FavoritePlaceChip = ({ place, isActive, onSelect }: FavoritePlaceChipProps) => (
  <li className="shrink-0">
    <button
      type="button"
      onClick={() => onSelect(place)}
      aria-current={isActive ? 'location' : undefined}
      title={formatLocationLabel(place.label)}
      className={cn(
        'group flex items-center gap-1.5 rounded-sm py-1 font-medium text-muted transition-colors hover:text-primary',
        isActive && 'text-primary',
      )}
    >
      <Star aria-hidden="true" className="size-4 fill-accent text-accent" />
      <span
        className={cn(
          'decoration-accent decoration-2 underline-offset-[6px] group-hover:underline',
          isActive && 'underline',
        )}
      >
        {place.label.city}
      </span>
    </button>
  </li>
);
