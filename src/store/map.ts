import { create } from 'zustand';

interface IMapStore {
  currentPosition: [number, number] | null;
  setCurrentPosition: (position: [number, number] | null) => void;
  accuracy: number | null;
  setAccuracy: (accuracy: number | null) => void;
}

const useMapStore = create<IMapStore>((set) => ({
  currentPosition: null,
  accuracy: null,
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  setAccuracy: (accuracy) => set({ accuracy }),
}));

export default useMapStore;
