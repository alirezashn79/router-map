import useMapStore from '@/store/map';
import React from 'react';
import { Polyline } from 'react-leaflet';

export default function RouteLines() {
  const { routeLines } = useMapStore();
  if (!routeLines) return null;

  return <Polyline positions={routeLines} weight={6} opacity={0.7} />;
}
