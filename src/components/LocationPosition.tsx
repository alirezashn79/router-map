'use client';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { LocateFixed } from 'lucide-react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function LocationPosition() {
  const setCurrentPosition = useMapStore((state) => state.setCurrentPosition);
  const setAccuracy = useMapStore((state) => state.setAccuracy);
  const currentPosition = useMapStore((state) => state.currentPosition);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const map = useMap();

  const findLocationHandler = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    setCurrentPosition(null);

    map.locate({
      watch: true,
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    map.on('locationfound', (e) => {
      const { latlng, accuracy } = e;
      setAccuracy(accuracy);

      console.log(
        `Latitude: ${latlng.lat}, Longitude: ${latlng.lng}, Accuracy: ${accuracy}m`,
      );

      setCurrentPosition([latlng.lat, latlng.lng]);
      map.stopLocate();
      setIsLoading(false);
    });

    map.on('locationerror', (e) => {
      console.error('Error getting location:', e.message);
      alert('Unable to retrieve your location. Please allow location access.');
      map.stopLocate();
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!currentPosition) return;
    map.flyTo(currentPosition, 18, {
      duration: 1.5,
      animate: true,
    });
  }, [currentPosition, map]);

  useEffect(() => {
    return () => {
      map.stopLocate();
    };
  }, [map]);

  return (
    <button
      onClick={findLocationHandler}
      className='absolute end-4 top-4 z-[999] flex size-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow'
    >
      <LocateFixed className='size-6 animate-pulse text-blue-500' />
    </button>
  );
}
