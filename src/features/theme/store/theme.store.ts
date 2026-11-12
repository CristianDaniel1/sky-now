import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib/safe-storage';
import { THEME_STORAGE_KEY } from '../constants/theme';
import type { ThemeState } from '../interfaces/theme';

/** Color theme chosen by the user, remembered between visits. */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: THEME_STORAGE_KEY,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ preference: state.preference }),
    },
  ),
);
