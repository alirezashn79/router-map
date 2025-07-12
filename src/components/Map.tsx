'use client';

import { CENTER_POSITION } from '@/constants';
import useMapStore from '@/store/map';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import LocationPosition from './LocationPosition';

export default function Map() {
  const currentPosition = useMapStore((state) => state.currentPosition);
  return (
    <div className='relative size-full'>
      <MapContainer
        center={CENTER_POSITION}
        zoom={16}
        scrollWheelZoom={true}
        className='z-0 h-full w-full'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationPosition />
        {currentPosition && (
          <Marker position={currentPosition}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
