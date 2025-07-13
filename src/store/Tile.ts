import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum ETileLayer {
  DARK = 'dark',
  LIGHT = 'light',
  SAT = 'sat',
}

interface ITileStore {
  currentTileLayer: ETileLayer;
  setCurrentTileLayer: (currentTileLayer: ETileLayer) => void;
}

const useTileLayerStore = create(
  persist<ITileStore>(
    (set) => ({
      currentTileLayer: ETileLayer.LIGHT,
      setCurrentTileLayer: (currentTileLayer) => set({ currentTileLayer }),
    }),
    {
      name: 'tile-layer',
    },
  ),
);

export default useTileLayerStore;
