'use client';

import { CENTER_POSITION } from '@/constants';
import useSetTileLayer from '@/hooks/useSetTileLayer';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import LocationPosition from './LocationPosition';

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
        <LocationPosition />

        <Marker position={CENTER_POSITION} />
      </MapContainer>
    </div>
  );
}
