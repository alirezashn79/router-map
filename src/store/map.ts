import { IStep } from './../services/getRoutesService';
import { PositionType } from '@/types/global';
import { create } from 'zustand';

interface IMapStore {
  currentPosition: PositionType;
  accuracy: number | null;
  origin: PositionType;
  destination: PositionType;
  routingStack: 'origin' | 'destination' | null;
  routeLines: Array<[number, number]> | null;
  steps: IStep[] | null;
  distance: number | null;
  duration: number | null;
  routeCompleted: boolean;
  inRoute: boolean;
  setCurrentPosition: (position: PositionType) => void;
  setAccuracy: (accuracy: number | null) => void;
  setOrigin: (origin: PositionType) => void;
  setDestination: (destination: PositionType) => void;
  setRoutingStack: (routingStack: 'origin' | 'destination' | null) => void;
  setRouteLines: (routeLines: Array<[number, number]> | null) => void;
  setSteps: (steps: IStep[] | null) => void;
  setDistance: (distance: number | null) => void;
  setDuration: (duration: number | null) => void;
  setRouteCompleted: (routeCompleted: boolean) => void;
  setInRoute: (inRoute: boolean) => void;
}

const useMapStore = create<IMapStore>((set) => ({
  currentPosition: null,
  accuracy: null,
  origin: null,
  destination: null,
  routingStack: null,
  routeLines: null,
  steps: null,
  distance: null,
  duration: null,
  inRoute: false,
  routeCompleted: false,
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  setAccuracy: (accuracy) => set({ accuracy }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setRoutingStack: (routingStack) => set({ routingStack }),
  setRouteLines: (routeLines) => set({ routeLines }),
  setSteps: (steps) => set({ steps }),
  setDistance: (distance) => set({ distance }),
  setDuration: (duration) => set({ duration }),
  setRouteCompleted: (routeCompleted) => set({ routeCompleted }),
  setInRoute: (inRoute) => set({ inRoute }),
}));

export default useMapStore;
