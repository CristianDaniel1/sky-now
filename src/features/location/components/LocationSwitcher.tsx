import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import { useDismissableMenu } from '@/shared/hooks/useDismissableMenu';
import { cn } from '@/shared/lib/cn';
import type { Place } from '../interfaces/location';
import { formatLocationLabel } from '../lib/location';
import { getPlaceKey, isSamePlace } from '../lib/places';
import { useLocationStore } from '../store/location.store';
import { useSavedPlacesStore } from '../store/saved-places.store';
import { FavoriteMenuItem } from './FavoriteMenuItem';

interface LocationSwitcherProps {
  className?: string | undefined;
}

export const LocationSwitcher = ({ className }: LocationSwitcherProps) => {
  const menuId = useId();
  const coords = useLocationStore((store) => store.coords);
  const label = useLocationStore((store) => store.label);
  const selectLocation = useLocationStore((store) => store.selectLocation);
  const favorites = useSavedPlacesStore((store) => store.favorites);
  const { isOpen, containerRef, triggerRef, toggle, close } = useDismissableMenu();

  const text = formatLocationLabel(label);
  const hasOtherFavorites = favorites.some((favorite) => !isSamePlace(favorite.coords, coords));

  if (!hasOtherFavorites) return <p className={className}>{text}</p>;

  const handleSelect = (place: Place) => {
    selectLocation(place);
    close();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={cn(
          'flex items-center gap-1.5 rounded-md text-left transition-colors hover:text-heading',
          className,
        )}
      >
        {text}
        <span className="sr-only">, trocar para uma cidade favorita</span>
        <ChevronDown
          aria-hidden="true"
          className={cn('size-5 shrink-0 motion-safe:transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <nav
          id={menuId}
          aria-label="Cidades favoritas"
          className="absolute top-full left-0 z-30 mt-2 w-max max-w-[calc(100vw-2rem)] min-w-60 rounded-lg border border-line bg-surface p-1.5 shadow-lg sm:right-0 sm:left-auto"
        >
          <ul>
            {favorites.map((favorite) => (
              <FavoriteMenuItem
                key={getPlaceKey(favorite.coords)}
                place={favorite}
                isCurrent={isSamePlace(favorite.coords, coords)}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
