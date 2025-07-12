import { create } from 'zustand';

interface IGlobalStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useGlobalStore = create<IGlobalStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useGlobalStore;
