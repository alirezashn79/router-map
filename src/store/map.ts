import { PositionType } from '@/types/global';
import { create } from 'zustand';

interface IMapStore {
  currentPosition: PositionType;
  accuracy: number | null;
  origin: PositionType;
  destination: PositionType;
  routingStack: 'origin' | 'destination' | null;
  routeLines: Array<[number, number]> | null;
  setCurrentPosition: (position: PositionType) => void;
  setAccuracy: (accuracy: number | null) => void;
  setOrigin: (origin: PositionType) => void;
  setDestination: (destination: PositionType) => void;
  setRoutingStack: (routingStack: 'origin' | 'destination' | null) => void;
  setRouteLines: (routeLines: Array<[number, number]> | null) => void;
}

const useMapStore = create<IMapStore>((set) => ({
  currentPosition: null,
  accuracy: null,
  origin: null,
  destination: null,
  routingStack: null,
  routeLines: null,
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  setAccuracy: (accuracy) => set({ accuracy }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setRoutingStack: (routingStack) => set({ routingStack }),
  setRouteLines: (routeLines) => set({ routeLines }),
}));

export default useMapStore;
