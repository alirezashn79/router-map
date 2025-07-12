'use client';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { ErrorEvent, LocationEvent } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function LocationPosition() {
  const setCurrentPosition = useMapStore((state) => state.setCurrentPosition);
  const setAccuracy = useMapStore((state) => state.setAccuracy);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const map = useMap();

  const findLocationHandler = async () => {
    // بررسی پشتیبانی از geolocation
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    // بررسی HTTPS در production
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      alert('Geolocation requires HTTPS connection.');
      return;
    }

    // بررسی permissions
    try {
      const permission = await navigator.permissions.query({
        name: 'geolocation',
      });
      if (permission.state === 'denied') {
        alert(
          'Location access is denied. Please enable it in your browser settings.',
        );
        return;
      }
    } catch (error) {
      console.warn('Permission API not supported:', error);
    }

    setIsLoading(true);
    setCurrentPosition(null);

    // استفاده از map.locate با watch برای دقت بهتر
    map.locate({
      setView: true, // خودکار نقشه را به موقعیت کاربر می‌برد
      maxZoom: 18, // حداکثر زوم
      enableHighAccuracy: true, // درخواست دقت بالا
      timeout: 15000, // timeout افزایش یافته برای production
      maximumAge: 0, // عدم استفاده از cache برای دقت بهتر
      watch: true, // watch کردن مداوم موقعیت برای دقت بهتر
    });
  };

  useEffect(() => {
    let initialLocationSet = false;

    // Event listener برای موفقیت‌آمیز بودن locate
    const onLocationFound = (e: LocationEvent) => {
      const { lat, lng } = e.latlng;
      const accuracy = e.accuracy;

      setAccuracy(accuracy);
      setCurrentPosition([lat, lng]);

      // loading را فقط در اولین موقعیت یافته شده متوقف کنیم
      if (!initialLocationSet) {
        setIsLoading(false);
        initialLocationSet = true;
      }

      // اگر دقت خوبی داشتیم، watching را متوقف کنیم
      if (accuracy <= 50) {
        // دقت کمتر از 50 متر
        map.stopLocate();
      }
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
