'use client';

import useGlobalStore from '@/store/global';

export default function IsLoading() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  if (!isLoading) return null;

  return (
    <div className='absolute end-1/2 top-1/2 min-w-18 translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2'>
      <div className='mx-auto mb-2 size-6 animate-spin rounded-full border-t-2 border-solid border-blue-500'></div>
      <p className='text-center text-xs text-gray-600'>Loading</p>
    </div>
  );
}
