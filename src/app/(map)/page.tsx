'use client';
import Box from '@/components/Box';
import Header from '@/components/Header';
import TileLayerSwitcher from '@/components/TileLayerSwitcher';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <div className='h-screen w-screen'>
      <Header />
      <Map />
      <Box />
      <TileLayerSwitcher />
    </div>
  );
}
