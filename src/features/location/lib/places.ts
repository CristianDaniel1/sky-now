import type { Coordinates } from '@/shared/interfaces/coordinates';
import { MAX_FAVORITE_PLACES, MAX_RECENT_PLACES, PLACE_KEY_PRECISION } from '../constants/location';
import type { Place } from '../interfaces/location';

/**
 * Builds a key that is the same for coordinates of the same place.
 *
 * @param coords - Coordinates of the place.
 * @returns The place key.
 */
export const getPlaceKey = ({ lat, lon }: Coordinates) =>
  `${lat.toFixed(PLACE_KEY_PRECISION)},${lon.toFixed(PLACE_KEY_PRECISION)}`;

/**
 * Checks whether a list contains the place at the given coordinates.
 *
 * @param places - Places to look in.
 * @param coords - Coordinates of the place.
 * @returns Whether the place is in the list.
 */
export const hasPlace = (places: Place[], coords: Coordinates) => {
  const key = getPlaceKey(coords);
  return places.some((place) => getPlaceKey(place.coords) === key);
};

/**
 * Removes the place at the given coordinates from a list.
 *
 * @param places - Places to filter.
 * @param coords - Coordinates of the place to remove.
 * @returns The list without the place.
 */
export const withoutPlace = (places: Place[], coords: Coordinates) => {
  const key = getPlaceKey(coords);
  return places.filter((place) => getPlaceKey(place.coords) !== key);
};

/**
 * Moves a place to the top of the recent places, keeping the list short.
 *
 * @param recents - Recently selected places, newest first.
 * @param place - Place just selected.
 * @returns The updated recent places.
 */
export const addRecentPlace = (recents: Place[], place: Place) =>
  [place, ...withoutPlace(recents, place.coords)].slice(0, MAX_RECENT_PLACES);

/**
 * Adds a place to the favorites, or removes it when it is already there.
 *
 * @param favorites - Favorite places.
 * @param place - Place to toggle.
 * @returns The updated favorites; unchanged when the list is full.
 */
export const toggleFavoritePlace = (favorites: Place[], place: Place) => {
  if (hasPlace(favorites, place.coords)) return withoutPlace(favorites, place.coords);
  if (favorites.length >= MAX_FAVORITE_PLACES) return favorites;
  return [...favorites, place];
};

/**
 * Describes what the favorite button does for the current place.
 *
 * @param isFavorite - Whether the place is a favorite.
 * @param isFull - Whether the favorites list is full.
 * @returns The hint shown on the button.
 */
export const getFavoriteHint = (isFavorite: boolean, isFull: boolean) => {
  if (isFavorite) return 'Remover dos favoritos';
  if (isFull) return `Limite de ${MAX_FAVORITE_PLACES} favoritos atingido`;
  return 'Salvar nos favoritos';
};
