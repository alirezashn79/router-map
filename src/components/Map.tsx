'use client';

import { CENTER_POSITION } from '@/constants';
import useMapStore from '@/store/map';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet';
import LocationPosition from './LocationPosition';
import useSetTileLayer from '@/hooks/useSetTileLayer';

const blueDotIcon = new L.Icon({
  iconUrl: '/blue-dot.avif',
  iconSize: [16, 16],
  iconAnchor: [10, 10],
  className: 'animate-pulse',
});

export default function Map() {
  const currentPosition = useMapStore((state) => state.currentPosition);
  const tileLayer = useSetTileLayer();
  const accuracy = useMapStore((state) => state.accuracy);
  return (
    <div className='relative size-full'>
      <MapContainer
        center={CENTER_POSITION}
        zoom={16}
        scrollWheelZoom={true}
        className='z-0 h-full w-full'
      >
        <TileLayer url={tileLayer} maxZoom={20} />
        <LocationPosition />
        {currentPosition && (
          <>
            <Circle
              center={currentPosition}
              radius={accuracy ?? 0}
              weight={1}
            />
            <Marker position={currentPosition} icon={blueDotIcon} />
            <Marker position={CENTER_POSITION} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
