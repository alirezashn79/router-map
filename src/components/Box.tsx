import { getRouteLinesService } from '@/services/getRouteLinesService';
import useMapStore from '@/store/map';
import { ArrowDownUp } from 'lucide-react';

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

  const handleSelectRoute = (route: 'origin' | 'destination') => {
    setRoutingStack(route);
  };

  const handleSwapRoutes = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleStartRouting = async () => {
    if (!origin || !destination) return;
    try {
      const data = await getRouteLinesService({ origin, destination });
      if (data) setRouteLines(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='bg-base-200 absolute start-1/2 bottom-8 z-50 w-80 translate-x-1/2 rounded-xl p-4 shadow-lg sm:w-96'>
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
            <button
              onClick={() => handleSelectRoute('origin')}
              className='btn btn-soft w-full cursor-pointer justify-start rounded-md p-2'
            >
              {origin
                ? `${Math.round(origin[0])},${Math.round(origin[1])}`
                : 'مبدا'}
            </button>

            <button
              onClick={handleSwapRoutes}
              disabled={!origin || !destination}
              className='bg-primary absolute end-4 bottom-1/2 z-20 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'
            >
              <ArrowDownUp className='text-base-300 size-4' />
            </button>
            <button
              onClick={() => handleSelectRoute('destination')}
              className='btn btn-soft w-full cursor-pointer justify-start rounded-md p-2'
            >
              {destination
                ? `${Math.round(destination[0])},${Math.round(destination[1])}`
                : 'مقصد'}
            </button>

            <div className='mt-4 flex items-center gap-2'>
              <button
                onClick={handleStartRouting}
                disabled={!origin || !destination}
                className='btn btn-primary grow'
              >
                شروع مسیریابی
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
