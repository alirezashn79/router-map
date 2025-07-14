'use client';
import { useFindLocation } from '@/hooks/useFindLocation';
import useMapStore from '@/store/map';
import { cn } from '@/utils/cn';
import { blueDotIcon } from '@/utils/mapIcons';
import { LocateFixed } from 'lucide-react';
import { Circle, Marker, Popup } from 'react-leaflet';
import { BounceLoader } from 'react-spinners';

export default function LocationPosition() {
  const { currentPosition, accuracy } = useMapStore();
  const { findLocationHandler, isLoading } = useFindLocation();

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
