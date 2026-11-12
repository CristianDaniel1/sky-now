import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib/safe-storage';
import { INSTALL_OFFER_STORAGE_KEY } from '../constants/pwa';
import type { InstallOfferState } from '../interfaces/pwa';

/** When the user last postponed the install offer, remembered between visits. */
export const useInstallOfferStore = create<InstallOfferState>()(
  persist(
    (set) => ({
      dismissedAt: null,
      dismiss: () => set({ dismissedAt: Date.now() }),
    }),
    {
      name: INSTALL_OFFER_STORAGE_KEY,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ dismissedAt: state.dismissedAt }),
    },
  ),
);
