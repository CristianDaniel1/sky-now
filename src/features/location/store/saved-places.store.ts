import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib/safe-storage';
import { SAVED_PLACES_STORAGE_KEY } from '../constants/location';
import type { SavedPlacesState } from '../interfaces/location';
import { addRecentPlace, toggleFavoritePlace } from '../lib/places';

/** Favorite and recently selected places, remembered between visits. */
export const useSavedPlacesStore = create<SavedPlacesState>()(
  persist(
    (set) => ({
      favorites: [],
      recents: [],
      toggleFavorite: (place) =>
        set((current) => ({ favorites: toggleFavoritePlace(current.favorites, place) })),
      addRecent: (place) => set((current) => ({ recents: addRecentPlace(current.recents, place) })),
    }),
    {
      name: SAVED_PLACES_STORAGE_KEY,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ favorites: state.favorites, recents: state.recents }),
    },
  ),
);
