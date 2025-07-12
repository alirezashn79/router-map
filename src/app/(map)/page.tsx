'use client';
import Box from '@/components/Box';
import IsLoading from '@/components/IsLoading';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <div className='h-screen w-screen'>
      <Map />
      <Box />
      <IsLoading />
    </div>
  );
}
