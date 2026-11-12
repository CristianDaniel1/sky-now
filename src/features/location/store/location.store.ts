import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib/safe-storage';
import {
  DEFAULT_COORDS,
  DEFAULT_LOCATION_LABEL,
  LOCATION_STORAGE_KEY,
  LOCATION_STORE_VERSION,
} from '../constants/location';
import type { LocationState } from '../interfaces/location';

const markReturningVisitor = (persistedState: unknown) => ({
  ...(persistedState as Partial<LocationState>),
  isFirstVisit: false,
});

/** Place whose weather is shown, remembered between visits. */
export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      coords: DEFAULT_COORDS,
      label: DEFAULT_LOCATION_LABEL,
      isFirstVisit: true,
      selectLocation: ({ coords, label }) => set({ coords, label, isFirstVisit: false }),
      dismissFirstVisit: () => set({ isFirstVisit: false }),
    }),
    {
      name: LOCATION_STORAGE_KEY,
      version: LOCATION_STORE_VERSION,
      storage: createJSONStorage(() => safeStorage),
      migrate: markReturningVisitor,
      partialize: (state) => ({
        coords: state.coords,
        label: state.label,
        isFirstVisit: state.isFirstVisit,
      }),
    },
  ),
);
