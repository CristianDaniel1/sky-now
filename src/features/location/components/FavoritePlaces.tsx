import { getPlaceKey, isSamePlace } from '../lib/places';
import { useLocationStore } from '../store/location.store';
import { useSavedPlacesStore } from '../store/saved-places.store';
import { FavoritePlaceChip } from './FavoritePlaceChip';

export const FavoritePlaces = () => {
  const favorites = useSavedPlacesStore((store) => store.favorites);
  const coords = useLocationStore((store) => store.coords);
  const selectLocation = useLocationStore((store) => store.selectLocation);

  if (!favorites.length) return null;

  return (
    <nav aria-label="Cidades favoritas" className="pt-6">
      <ul className="-mx-4 flex gap-x-6 gap-y-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {favorites.map((favorite) => (
          <FavoritePlaceChip
            key={getPlaceKey(favorite.coords)}
            place={favorite}
            isActive={isSamePlace(favorite.coords, coords)}
            onSelect={selectLocation}
          />
        ))}
      </ul>
    </nav>
  );
};
