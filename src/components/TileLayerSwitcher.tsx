import useTileLayerStore, { ETileLayer } from '@/store/Tile';
import { Layers2 } from 'lucide-react';
import React from 'react';

export default function TileLayerSwitcher() {
  const { setCurrentTileLayer } = useTileLayerStore();
  return (
    <div className='absolute start-4 top-36 flex items-center gap-4 sm:top-20'>
      {/* ------------------------------------------- */}
      <div className='dropdown'>
        <div tabIndex={0} role='button' className='btn m-1 h-12 rounded-lg p-4'>
          <Layers2 className='size-5' />
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'
        >
          <li>
            <button
              onClick={() => setCurrentTileLayer(ETileLayer.LIGHT)}
              className='flex w-full'
            >
              روشن
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentTileLayer(ETileLayer.DARK)}
              className='flex w-full'
            >
              تاریک
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentTileLayer(ETileLayer.SAT)}
              className='flex w-full'
            >
              ماهواره
            </button>
          </li>
        </ul>
      </div>

      {/* ------------------------------------------- */}
    </div>
  );
}
