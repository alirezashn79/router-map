import useMapStore from '@/store/map';
import { cn } from '@/utils/cn';
import { CheckCircle2 } from 'lucide-react';

export default function Header() {
  const { routingStack, origin, destination } = useMapStore();

  return (
    <div
      className={cn(
        'bg-base-100 absolute start-1/2 -top-44 z-50 w-80 translate-x-1/2 scale-0 rounded-lg p-4 transition-all duration-300 sm:w-96',
        (!!routingStack || !!origin || !!destination) &&
          'top-4 scale-100 rotate-0',
      )}
    >
      {/* {!!routingStack && routingStack === 'origin'
        ? 'انتخاب مبدا'
        : 'انتخاب مقصد'} */}
      <div className='flex items-center gap-2'>
        <div
          className={cn(
            'flex items-center gap-2',
            origin && 'text-success',
            routingStack === 'origin' && 'text-info animate-bounce',
          )}
        >
          <p>مبدا</p>
          {origin && <CheckCircle2 className='size-5' />}
        </div>
        <div
          className={cn(
            'h-px grow translate-y-1 border-t border-dashed',
            destination && 'text-success border-[1.5px]',
          )}
        ></div>
        <div
          className={cn(
            'flex items-center gap-2',
            destination && 'text-success',
            routingStack === 'destination' && 'text-info animate-bounce',
          )}
        >
          <p>مقصد</p>
          {destination && <CheckCircle2 className='size-5' />}
        </div>
      </div>
    </div>
  );
}
