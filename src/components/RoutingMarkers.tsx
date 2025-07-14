'use client';

import useMapStore from '@/store/map';
import { destinationMarkerIcon, originMarkerIcon } from '@/utils/mapIcons';
import { type Marker as LMarker } from 'leaflet';
import { useRef } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';

export default function RoutingMarkers() {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    routingStack,
    setRoutingStack,
  } = useMapStore();

  const originMarkerRef = useRef<LMarker>(null);
  const destinationMarkerRef = useRef<LMarker>(null);

  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    if (routingStack === 'origin') {
      setOrigin([lat, lng]);
      setRoutingStack('destination');
      return;
    }
    if (routingStack === 'destination') {
      setDestination([lat, lng]);
      if (!origin) setRoutingStack('origin');
      else setRoutingStack(null);
      return;
    }
  });

  if (!origin && !destination) return null;
  return (
    <>
      {origin && (
        <Marker ref={originMarkerRef} position={origin} icon={originMarkerIcon}>
          <Popup autoPan={false} closeButton={false}>
            <p className='text-base/tight font-bold'>مبدا</p>
          </Popup>
        </Marker>
      )}
      {destination && (
        <Marker
          ref={destinationMarkerRef}
          position={destination}
          icon={destinationMarkerIcon}
        >
          <Popup autoPan={false} closeButton={false}>
            <p className='text-base/tight font-bold'>مقصد</p>
          </Popup>
        </Marker>
      )}
    </>
  );
}
