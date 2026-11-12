import type { Coordinates } from '@/shared/interfaces/coordinates';
import type { LocationLabel } from '../interfaces/location';

/** Coordinates shown before the user picks a place (Mexico City). */
export const DEFAULT_COORDS: Coordinates = { lat: 19.4326296, lon: -99.1331785 };

/** Label of the place shown before the user picks one. */
export const DEFAULT_LOCATION_LABEL: LocationLabel = { city: 'Mexico City', country: 'MX' };

/** Label used when the browser position is selected. */
export const CURRENT_POSITION_LABEL: LocationLabel = { city: '', country: 'Local Atual' };

/** Time without typing before searching places, in milliseconds. */
export const LOCATION_SEARCH_DEBOUNCE_MS = 500;

/** Maximum number of places returned by a search. */
export const GEO_SEARCH_LIMIT = 5;
