import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib/safe-storage';
import {
  DEFAULT_COORDS,
  DEFAULT_LOCATION_LABEL,
  LOCATION_STORAGE_KEY,
} from '../constants/location';
import type { LocationState } from '../interfaces/location';

/** Place whose weather is shown, remembered between visits. */
export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      coords: DEFAULT_COORDS,
      label: DEFAULT_LOCATION_LABEL,
      selectLocation: (coords, label) => set({ coords, label }),
    }),
    {
      name: LOCATION_STORAGE_KEY,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ coords: state.coords, label: state.label }),
    },
  ),
);
