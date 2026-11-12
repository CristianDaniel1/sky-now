import { create } from 'zustand';
import { DEFAULT_COORDS, DEFAULT_LOCATION_LABEL } from '../constants/location';
import type { LocationState } from '../interfaces/location';

/** Place whose weather is shown. */
export const useLocationStore = create<LocationState>()((set) => ({
  coords: DEFAULT_COORDS,
  label: DEFAULT_LOCATION_LABEL,
  selectLocation: (coords, label) => set({ coords, label }),
}));
