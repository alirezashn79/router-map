'use client';

import { CENTER_POSITION } from '@/constants';
import useSetTileLayer from '@/hooks/useSetTileLayer';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationPosition from './LocationPosition';
import RoutingMarkers from './RoutingMarkers';
import GeoSearchControlComponent from './Search';
import RouteLines from './RouteLines';
import RouteAnimator from './RouteAnimator';

export default function Map() {
  const tileLayer = useSetTileLayer();
  return (
    <div className='relative size-full'>
      <MapContainer
        center={CENTER_POSITION}
        zoom={16}
        scrollWheelZoom={true}
        className='z-0 h-full w-full'
      >
        <TileLayer url={tileLayer} maxZoom={18} />
        <GeoSearchControlComponent />
        <LocationPosition />
        <RoutingMarkers />
        <RouteLines />
        <RouteAnimator />
      </MapContainer>
    </div>
  );
}
