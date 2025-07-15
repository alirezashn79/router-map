import getRoutesService from '@/services/getRoutesService';
import useGlobalStore from '@/store/global';
import useMapStore from '@/store/map';
import { cn } from '@/utils/cn';
import { getDirectionIcon } from '@/utils/getDirectionIcon';
import translateInstruction from '@/utils/translateInstruction';
import { ClockLoader } from 'react-spinners';

export default function Box() {
  const {
    currentPosition,
    routingStack,
    setRoutingStack,
    origin,
    destination,
    steps,
    setOrigin,
    setDestination,
    setRouteLines,
    setSteps,
    setDistance,
    setDuration,
    distance,
    duration,
    inRoute,
    routeCompleted,
    setInRoute,
    setRouteCompleted,
  } = useMapStore();
  const { isLoading, setIsLoading } = useGlobalStore();

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
    setSteps(null);
    setDistance(null);
    setDuration(null);
    setRouteCompleted(false);
    setInRoute(false);
  };
  const routing = async ({
    f,
    t,
  }: {
    f: [number, number];
    t: [number, number];
  }) => {
    const data = await getRoutesService({ origin: f, destination: t });
    if (data) {
      setRouteLines(data.routes);
      setDuration(data.duration);
      setDistance(data.distance);
      setSteps(data.steps);
    }
  };

  //   const handleSwapRoutes = async () => {
  //     setOrigin(destination);
  //     setDestination(origin);
  //   };

  const handleStartRouting = async () => {
    if (!origin || !destination) return;
    try {
      setIsLoading(true);
      await routing({ f: origin, t: destination });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-base-200 absolute start-1/2 bottom-8 z-[99999] w-80 translate-x-1/2 rounded-xl p-4 shadow-lg transition-all duration-300 sm:w-96'>
      <div
        className={cn(
          'bg-base-100 invisible size-0 scale-0 overflow-y-auto rounded-lg opacity-0 transition-all duration-300',
          !!steps && 'visible size-auto h-40 scale-100 p-4 opacity-100',
        )}
      >
        <ul className='divide-y text-sm font-bold'>
          {steps?.map((step, index) => (
            <li key={index} className='flex items-center gap-2 py-2'>
              {getDirectionIcon(step.instruction)}
              <span>{translateInstruction(step.instruction)}</span>
            </li>
          ))}
        </ul>
      </div>

      {distance && duration && (
        <div className='bg-base-100 my-2 flex items-center justify-between rounded-lg p-4'>
          <p>
            <span className='text-sm'>فاصله تقریبی: </span>
            <span className='text-primary font-bold'>
              {distance >= 1000
                ? `${(distance / 1000).toFixed(1)} کیلومتر`
                : `${Math.round(distance)} متر`}
            </span>
          </p>

          <p>
            <span className='text-sm'>زمان تقریبی: </span>
            <span className='text-primary font-bold'>
              {duration >= 3600
                ? `${(duration / 3600).toFixed(1)} ساعت`
                : `${Math.round(duration / 60)} دقیقه`}
            </span>
          </p>
        </div>
      )}
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
              onClick={() => setRoutingStack('origin')}
              className={cn(
                'btn btn-soft w-full cursor-pointer justify-start rounded-md p-2',
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

            {/* <button
              onClick={handleSwapRoutes}
              disabled={!origin || !destination || inRoute}
              className='bg-primary absolute end-4 bottom-1/2 z-20 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'
            >
              <ArrowDownUp className='text-base-300 size-4' />
            </button> */}
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
              {inRoute ? (
                <button className='btn btn-soft flex w-full cursor-pointer items-center gap-2 rounded-md p-2'>
                  <span>در حال پیمودن</span>
                  <ClockLoader size={16} color='#ffffff' />
                </button>
              ) : routeCompleted ? (
                <button
                  onClick={handleCancelRouting}
                  className='btn btn-block btn-error'
                >
                  به مقصد رسیدید! (بستن)
                </button>
              ) : (
                <>
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
                  <button
                    onClick={handleCancelRouting}
                    className='btn btn-error'
                  >
                    لفو
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
