import type { Place, PlaceGroup, PlaceGroupInput } from '../interfaces/location';
import { hasPlace } from './places';

/**
 * Moves the highlighted suggestion, wrapping around the ends of the list.
 *
 * @param currentIndex - Highlighted position, or -1 when none is highlighted.
 * @param step - Positions to move: 1 for down, -1 for up.
 * @param count - Number of suggestions.
 * @returns The new highlighted position.
 */
export const getNextSuggestionIndex = (currentIndex: number, step: number, count: number) => {
  if (currentIndex < 0) return step > 0 ? 0 : count - 1;
  return (currentIndex + step + count) % count;
};

/**
 * Builds the DOM id of a suggestion, referenced by the search input.
 *
 * @param listId - Id of the suggestions list.
 * @param index - Position of the suggestion.
 * @returns The suggestion id.
 */
export const getSuggestionId = (listId: string, index: number) => `${listId}-option-${index}`;

/**
 * Adds to each group the position of its first place in the whole suggestions list.
 *
 * @param groups - Groups in display order.
 * @returns The groups with their start position.
 */
export const indexPlaceGroups = (groups: PlaceGroupInput[]): PlaceGroup[] => {
  let startIndex = 0;

  return groups.map((group) => {
    const indexedGroup = { ...group, startIndex };
    startIndex += group.places.length;
    return indexedGroup;
  });
};

/**
 * Builds the groups shown before typing: favorites, then recent places that are not favorites.
 *
 * @param favorites - Favorite places.
 * @param recents - Recently selected places, newest first.
 * @returns The non-empty groups.
 */
export const buildSavedPlaceGroups = (favorites: Place[], recents: Place[]) => {
  const groups: PlaceGroupInput[] = [
    { kind: 'favorites', places: favorites },
    { kind: 'recents', places: recents.filter((recent) => !hasPlace(favorites, recent.coords)) },
  ];
  return indexPlaceGroups(groups.filter((group) => !!group.places.length));
};
