'use client';

import useGlobalStore from '@/store/global';
import { BeatLoader } from 'react-spinners';

export default function IsLoading() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  if (!isLoading) return null;

  return (
    <div className='absolute end-1/2 top-1/2 flex min-w-18 translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-white p-4'>
      {/* <div className='mx-auto mb-2 size-6 animate-spin rounded-full border-t-2 border-solid border-blue-500'></div> */}
      <BeatLoader color='#2b7fff' size={10} className='mx-auto' />
      <p className='animate-pulse text-center text-xs font-bold text-blue-500'>
        در حال یافتن موقعیت شما
      </p>
    </div>
  );
}
