'use client';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { ErrorEvent, LocationEvent } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

export default function LocationPosition() {
  const setCurrentPosition = useMapStore((state) => state.setCurrentPosition);
  const setAccuracy = useMapStore((state) => state.setAccuracy);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
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

      if (accuracy <= 50) {
        map.stopLocate();
      }
      setIsLoading(false);
    };

    // Event listener برای خطا در locate
    const onLocationError = (e: ErrorEvent) => {
      console.error('Error getting location:', e);

      // پیام خطای دقیق‌تر بر اساس نوع خطا
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

    // اضافه کردن event listeners
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // پاک کردن event listeners در cleanup
    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
      map.stopLocate(); // متوقف کردن watching در cleanup
    };
  }, [map, setAccuracy, setCurrentPosition, setIsLoading]);

  return (
    <button
      onClick={findLocationHandler}
      className='absolute end-4 top-4 z-[999] flex size-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow'
    >
      <LocateFixed className='size-6 text-blue-500' />
    </button>
  );
}
