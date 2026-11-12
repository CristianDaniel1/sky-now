import { useUnitsStore } from '../store/units.store';

/**
 * Reads the unit system chosen by the user.
 *
 * @returns "metric" or "imperial".
 */
export const useUnitSystem = () => useUnitsStore((store) => store.system);
