import { useFindLocation } from '@/hooks/useFindLocation';
import { getRouteLinesService } from '@/services/getRouteLinesService';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { cn } from '@/utils/cn';
import { ArrowDownUp, LocateFixed } from 'lucide-react';
import { BounceLoader } from 'react-spinners';

export default function Box() {
  const {
    currentPosition,
    routingStack,
    setRoutingStack,
    origin,
    destination,
    setOrigin,
    setDestination,
    setRouteLines,
  } = useMapStore();
  const { isLoading, setIsLoading } = useGlobalStore();
  const { findLocationHandler } = useFindLocation();

  const handleChangeRouteStackrtRouting = () => {
    if (currentPosition) {
      setRoutingStack('destination');
    } else {
      setRoutingStack('origin');
    }
  };

  const handleCancelRouting = () => {
    setRoutingStack(null);
    setOrigin(null);
    setDestination(null);
    setRouteLines(null);
  };

  const handleSwapRoutes = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleStartRouting = async () => {
    if (!origin || !destination) return;
    try {
      setIsLoading(true);
      const data = await getRouteLinesService({ origin, destination });
      if (data) setRouteLines(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-base-200 absolute start-1/2 bottom-8 z-[99990] w-80 translate-x-1/2 rounded-xl p-4 shadow-lg sm:w-96'>
      <div className='flex size-full items-center justify-center transition-all duration-300'>
        {!routingStack && !origin && !destination ? (
          <button
            onClick={handleChangeRouteStackrtRouting}
            className='btn btn-primary'
          >
            شروع مسیریابی
          </button>
        ) : (
          <div className='relative w-full space-y-2'>
            <div className='flex items-center gap-1'>
              <button
                onClick={findLocationHandler}
                className='btn basis-1/6 bg-blue-500 p-2'
              >
                {isLoading ? (
                  <BounceLoader size={24} />
                ) : (
                  <LocateFixed className={cn('size-6')} />
                )}
              </button>
              <button
                onClick={() => setRoutingStack('origin')}
                className={cn(
                  'btn btn-soft basis-5/6 cursor-pointer justify-start rounded-md p-2',
                  routingStack === 'origin' && 'bg-primary/20',
                )}
              >
                <p
                  className={cn(
                    'transition-all',
                    routingStack === 'origin' &&
                      'text-primary scale-105 font-bold',
                  )}
                >
                  <span>مبدا</span>
                  {routingStack === 'origin' && (
                    <>
                      <span> را انتخاب کنید </span>
                      <span> (با کلیک روی نقشه) </span>
                    </>
                  )}
                  {origin && routingStack !== 'origin' && (
                    <span>
                      {' '}
                      {origin[0].toFixed(3)} , {origin[1].toFixed(3)}{' '}
                    </span>
                  )}
                </p>
              </button>
            </div>

            <button
              onClick={handleSwapRoutes}
              disabled={!origin || !destination}
              className='bg-primary absolute end-4 bottom-1/2 z-20 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'
            >
              <ArrowDownUp className='text-base-300 size-4' />
            </button>
            <button
              onClick={() => setRoutingStack('destination')}
              className={cn(
                'btn btn-soft w-full cursor-pointer justify-start rounded-md p-2',
                routingStack === 'destination' && 'bg-primary/20',
              )}
            >
              <p
                className={cn(
                  'transition-all',
                  routingStack === 'destination' &&
                    'text-primary scale-105 font-bold',
                )}
              >
                <span>مقصد</span>
                {routingStack === 'destination' && (
                  <>
                    <span> را انتخاب کنید </span>
                    <span> (با کلیک روی نقشه) </span>
                  </>
                )}
                {destination && routingStack !== 'destination' && (
                  <span>
                    {' '}
                    {destination[0].toFixed(3)} ,{' '}
                    {destination[1].toFixed(3)}{' '}
                  </span>
                )}
              </p>
            </button>

            <div className='mt-4 flex items-center gap-2'>
              <button
                onClick={handleStartRouting}
                disabled={!origin || !destination || isLoading}
                className='btn btn-primary grow'
              >
                {isLoading ? (
                  <span className='loading loading-dots loading-md'></span>
                ) : (
                  <span>مسیریابی</span>
                )}
              </button>
              <button onClick={handleCancelRouting} className='btn btn-error'>
                لفو
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
