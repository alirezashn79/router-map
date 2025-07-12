'use client';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { LocateFixed } from 'lucide-react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function LocationPosition() {
  const setCurrentPosition = useMapStore((state) => state.setCurrentPosition);
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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setCurrentPosition([latitude, longitude]);
        setIsLoading(false); // فقط بعد از موفقیت
      },
      (error) => {
        console.error('Error getting location:', error);
        alert(
          'Unable to retrieve your location. Please allow location access in your browser settings.',
        );
        setIsLoading(false); // اگر خطا داشت هم خاموش کن
      },
    );
  };

  useEffect(() => {
    if (!currentPosition) return;
    map.flyTo(currentPosition, 18, {
      duration: 1.5,
      animate: true,
    });
  }, [currentPosition, map]);

  return (
    <button
      onClick={findLocationHandler}
      className='absolute end-4 top-4 z-[999] flex size-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow'
    >
      <LocateFixed className='size-6 text-blue-500' />
    </button>
  );
}
