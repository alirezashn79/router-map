'use client';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { cn } from '@/utils/cn';
import { blueDotIcon } from '@/utils/mapIcons';
import { ErrorEvent, LocationEvent } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Circle, Marker, Popup, useMap } from 'react-leaflet';
import { BounceLoader } from 'react-spinners';

export default function LocationPosition() {
  const {
    currentPosition,
    setCurrentPosition,
    accuracy,
    setAccuracy,
    setOrigin,
    setRoutingStack,
  } = useMapStore();
  const { isLoading, setIsLoading } = useGlobalStore();
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
      setOrigin(null);
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
      setOrigin([lat, lng]);
      setRoutingStack('destination');

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
  }, [map, setAccuracy, setCurrentPosition, setIsLoading, setOrigin]);

  return (
    <>
      <button
        onClick={findLocationHandler}
        className='btn absolute start-4 top-20 z-[999] flex h-12 cursor-pointer items-center justify-center gap-4 rounded-xl px-4 shadow transition-all sm:top-4'
      >
        <div className='shrink-0'>
          {isLoading ? (
            <BounceLoader color='#2b7fff' size={24} />
          ) : (
            <LocateFixed className={cn('size-6 text-blue-500')} />
          )}
        </div>
      </button>

      {currentPosition && (
        <>
          <Circle center={currentPosition} radius={accuracy ?? 0} weight={1} />
          <Marker position={currentPosition} icon={blueDotIcon}>
            <Popup>salam</Popup>
          </Marker>
        </>
      )}
    </>
  );
}
