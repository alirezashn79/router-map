'use client';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { ErrorEvent, LocationEvent } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';

export default function LocationPosition() {
  const setCurrentPosition = useMapStore((state) => state.setCurrentPosition);
  const accuracy = useMapStore((state) => state.accuracy);
  const setAccuracy = useMapStore((state) => state.setAccuracy);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const [isFound, setIsFound] = useState(false);
  const map = useMap();
  const initialLocationSet = useRef(false);

  const findLocationHandler = async () => {
    setIsLoading(true);
    setCurrentPosition(null);

    map.locate({
      setView: true,
      maxZoom: 18,
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
      watch: true,
    });
  };

  useEffect(() => {
    const onLocationFound = (e: LocationEvent) => {
      const { lat, lng } = e.latlng;
      const accuracy = e.accuracy;

      setAccuracy(accuracy);
      setCurrentPosition([lat, lng]);

      if (!initialLocationSet.current) {
        setIsLoading(false);
        initialLocationSet.current = true;
      }

      if (accuracy <= 100) {
        map.stopLocate();
        setIsFound(true);
      }
      setIsLoading(false);
    };

    const onLocationError = (e: ErrorEvent) => {
      console.error('Error getting location:', e);

      let errorMessage = 'Unable to retrieve your location. ';

      if (e.code === 1) {
        errorMessage +=
          'Please allow location access in your browser settings.';
      } else if (e.code === 2) {
        errorMessage += 'Location information is unavailable.';
      } else if (e.code === 3) {
        errorMessage += 'Location request timed out. Please try again.';
      } else {
        errorMessage += 'An unknown error occurred.';
      }

      alert(errorMessage);
      setIsLoading(false);
      map.stopLocate();
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
      map.stopLocate();
    };
  }, [map, setAccuracy, setCurrentPosition, setIsLoading]);

  return (
    <button
      disabled={isLoading}
      onClick={findLocationHandler}
      className='absolute end-4 top-4 z-[999] flex h-12 cursor-pointer items-center justify-center gap-4 rounded-xl bg-white px-4 shadow'
    >
      {!isFound && accuracy && (
        <p className='rounded-lg bg-blue-400 p-1.5 text-xs font-bold text-white'>
          دقت: {Math.round(accuracy)} متر
        </p>
      )}

      <LocateFixed className='size-6 shrink-0 text-blue-500' />
    </button>
  );
}
