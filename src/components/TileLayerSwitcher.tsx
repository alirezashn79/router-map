import useTileLayerStore, { ETileLayer } from '@/store/Tile';
import React from 'react';

export default function TileLayerSwitcher() {
  const { currentTileLayer, setCurrentTileLayer } = useTileLayerStore();
  return (
    <div className='absolute start-4 top-20 flex items-center gap-4'>
      <button
        className='btn h-12 rounded-lg p-4'
        popoverTarget='popover-1'
        style={{ anchorName: '--anchor-1' } as React.CSSProperties}
      >
        حالت نقشه ({currentTileLayer})
      </button>

      <ul
        dir='rtl'
        className='dropdown menu rounded-box bg-base-100 m-0.5 w-52 shadow-sm'
        popover='auto'
        id='popover-1'
        style={{ positionAnchor: '--anchor-1' } as React.CSSProperties}
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
  );
}
