import type { Coordinates } from '@/shared/interfaces/coordinates';
import type { LocationLabel } from '../interfaces/location';

/** Coordinates shown before the user picks a place (Mexico City). */
export const DEFAULT_COORDS: Coordinates = { lat: 19.4326296, lon: -99.1331785 };

/** Label of the place shown before the user picks one. */
export const DEFAULT_LOCATION_LABEL: LocationLabel = { city: 'Mexico City', country: 'MX' };

/** Label used when the browser position is selected. */
export const CURRENT_POSITION_LABEL: LocationLabel = { city: '', country: 'Local Atual' };

/** `localStorage` key of the last selected place. */
export const LOCATION_STORAGE_KEY = 'sky-now:location';

/** Time without typing before searching places, in milliseconds. */
export const LOCATION_SEARCH_DEBOUNCE_MS = 500;

/** Maximum number of places returned by a search. */
export const GEO_SEARCH_LIMIT = 5;

/** Maximum wait for the reverse geocoding request, in milliseconds. */
export const REVERSE_GEOCODE_TIMEOUT_MS = 8000;

/** Maximum wait for the browser to report the position, in milliseconds. */
export const GEOLOCATION_TIMEOUT_MS = 10_000;

/** Age of a cached browser position that can still be reused, in milliseconds. */
export const GEOLOCATION_MAX_AGE_MS = 5 * 60 * 1000;
