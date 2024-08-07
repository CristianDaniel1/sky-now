import { create } from 'zustand';

interface CoordsType {
  coords: { lat: number; lon: number };
  changeCoords: (lat: number, lon: number) => void;
}

export const useCoordsStore = create<CoordsType>(set => {
  return {
    coords: { lat: -23.563394, lon: -46.567036 },
    changeCoords: (lat, lon) => {
      set({ coords: { lat, lon } });
    },
  };
});
