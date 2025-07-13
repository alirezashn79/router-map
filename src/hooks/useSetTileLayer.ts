import { TILE_LAYERS } from '@/constants';
import useTileLayerStore, { ETileLayer } from '@/store/Tile';
import { useEffect, useState } from 'react';

export default function useSetTileLayer() {
  const { currentTileLayer } = useTileLayerStore();
  const [tileLayer, setTileLayer] = useState(TILE_LAYERS.light);

  useEffect(() => {
    switch (currentTileLayer) {
      case ETileLayer.LIGHT:
        setTileLayer(TILE_LAYERS.light);
        break;
      case ETileLayer.DARK:
        setTileLayer(TILE_LAYERS.dark);
        break;
      case ETileLayer.SAT:
        setTileLayer(TILE_LAYERS.sat);
        break;

      default:
        setTileLayer(TILE_LAYERS.light);
        break;
    }
  }, [currentTileLayer]);

  return tileLayer;
}
