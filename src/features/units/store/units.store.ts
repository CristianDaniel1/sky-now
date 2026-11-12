import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib/safe-storage';
import { UNITS_STORAGE_KEY } from '../constants/units';
import type { UnitsState } from '../interfaces/units';

/** Unit system chosen by the user, remembered between visits. */
export const useUnitsStore = create<UnitsState>()(
  persist(
    (set) => ({
      system: 'metric',
      setSystem: (system) => set({ system }),
    }),
    {
      name: UNITS_STORAGE_KEY,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ system: state.system }),
    },
  ),
);
