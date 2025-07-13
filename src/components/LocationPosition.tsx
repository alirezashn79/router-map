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
  const isLoading = useGlobalStore((state) => state.isLoading);
  const map = useMap();
  const initialLocationSet = useRef(false);
  const fallbackTried = useRef(false);

  const findLocation = (highAccuracy: boolean) => {
    map.locate({
      setView: true,
      maxZoom: 18,
      enableHighAccuracy: highAccuracy,
      timeout: 15000,
      watch: false,
    });
  };

  const findLocationHandler = () => {
    if (!initialLocationSet.current) {
      setIsLoading(true);
      setCurrentPosition(null);
    }
    fallbackTried.current = false;
    findLocation(true);
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
      }
      setIsLoading(false);
    };

    const onLocationError = (e: ErrorEvent) => {
      console.error('Error getting location:', e);

      if (!fallbackTried.current) {
        fallbackTried.current = true;
        console.log('Retrying location with low accuracy...');
        findLocation(false);
        return;
      }

      let errorMessage = 'خطا در دریافت موقعیت مکانی. ';

      switch (e.code) {
        case 1:
          errorMessage += 'دسترسی به موقعیت مکانی مسدود شده.';
          break;
        case 2:
          errorMessage += 'اطلاعات موقعیت مکانی در دسترس نیست.';
          break;
        case 3:
          errorMessage +=
            'درخواست موقعیت مکانی زمان‌بر بود. لطفاً دوباره تلاش کنید.';
          break;
        default:
          errorMessage += 'خطای ناشناخته.';
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
      className='bg-base-100 absolute end-4 top-4 z-[999] flex h-12 cursor-pointer items-center justify-center gap-4 rounded-xl px-4 shadow'
    >
      <LocateFixed className='size-6 shrink-0 text-blue-500' />
    </button>
  );
}
