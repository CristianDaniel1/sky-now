import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { MAX_FAVORITE_PLACES } from '../constants/location';
import { getFavoriteHint, hasPlace } from '../lib/places';
import { useLocationStore } from '../store/location.store';
import { useSavedPlacesStore } from '../store/saved-places.store';

export const FavoriteButton = () => {
  const coords = useLocationStore((store) => store.coords);
  const label = useLocationStore((store) => store.label);
  const isFavorite = useSavedPlacesStore((store) => hasPlace(store.favorites, coords));
  const isFull = useSavedPlacesStore((store) => store.favorites.length >= MAX_FAVORITE_PLACES);
  const toggleFavorite = useSavedPlacesStore((store) => store.toggleFavorite);

  if (!label.city) return null;

  const hint = getFavoriteHint(isFavorite, isFull);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite({ coords, label })}
      disabled={!isFavorite && isFull}
      aria-pressed={isFavorite}
      aria-label={`Favoritar ${label.city}`}
      title={hint}
      className="flex size-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-slate-200/70 disabled:opacity-50 disabled:hover:bg-transparent dark:hover:bg-subtle"
    >
      <Star aria-hidden="true" className={cn('size-6', isFavorite && 'fill-accent text-accent')} />
    </button>
  );
};
