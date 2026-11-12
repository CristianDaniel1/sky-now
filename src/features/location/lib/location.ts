import type { GeoLocation, LocationLabel } from '../interfaces/location';

/**
 * Formats a place as "city, state, country", skipping empty parts.
 *
 * @param label - Place to format.
 * @returns The text shown for the place.
 */
export const formatLocationLabel = ({ city, state, country }: LocationLabel) =>
  [city, state, country].filter((part) => !!part).join(', ');

/**
 * Converts a geocoding result into the label shown for a place.
 *
 * @param location - Place returned by the geocoding API.
 * @returns The place label.
 */
export const toLocationLabel = (location: GeoLocation): LocationLabel => ({
  city: location.name,
  state: location.state,
  country: location.country,
});

/**
 * Finds the place whose name is exactly the search term, ignoring case.
 *
 * @param locations - Places returned by the search.
 * @param searchTerm - Text typed by the user.
 * @returns The matching place, if any.
 */
export const findExactMatch = (locations: GeoLocation[], searchTerm: string) =>
  locations.find((location) => location.name.toLowerCase() === searchTerm.toLowerCase());
