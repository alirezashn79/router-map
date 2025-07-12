import { create } from 'zustand';

interface IMapStore {
  currentPosition: [number, number] | null;
  setCurrentPosition: (position: [number, number] | null) => void;
}

const useMapStore = create<IMapStore>((set) => ({
  currentPosition: null,
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
}));

export default useMapStore;
