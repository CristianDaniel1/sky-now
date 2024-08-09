import { create } from 'zustand';
import { type CurrentLocale } from '../types.ts';
import { DEFAULT_COORDS, DEFAULT_LOCALE } from '../data.ts';

interface CoordsType {
  coords: { lat: number; lon: number };
  currentLocale: CurrentLocale;
  changeCoords: (lat: number, lon: number) => void;
  changeLocale: (locale: CurrentLocale) => void;
}

const { lat, lon } = DEFAULT_COORDS;
const { city, state, country } = DEFAULT_LOCALE;

export const useCoordsStore = create<CoordsType>(set => {
  return {
    coords: { lat, lon },
    currentLocale: { city, state, country },
    changeCoords: (lat, lon) => {
      set({ coords: { lat, lon } });
    },
    changeLocale: locale => {
      set({
        currentLocale: {
          city: locale.city,
          state: locale.state,
          country: locale.country,
        },
      });
    },
  };
});
