'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L, { IconOptions } from 'leaflet';
import 'leaflet-geosearch/dist/geosearch.css';
import '@/styles/search.css';
import useMapStore from '@/store/map';

// Type definitions for leaflet-geosearch
interface SearchResult {
  label: string;
  bounds: L.LatLngBounds;
  x: number;
  y: number;
}

interface GeoSearchEvent extends L.LeafletEvent {
  location: {
    x: number;
    y: number;
  };
}

interface GeoSearchControlOptions {
  provider: OpenStreetMapProvider;
  style: string;
  classNames: {
    container: string;
    input: string;
    active: string;
    result: string;
    button: string;
    form: string;
  };
  showMarker: boolean;
  showPopup: boolean;
  autoComplete: boolean;
  autoCompleteDelay: number;
  retainZoomLevel: boolean;
  animateZoom: boolean;
  keepResult: boolean;
  marker: {
    icon: L.Icon<IconOptions>;
    draggable: boolean;
  };
  popupFormat: (data: { result: SearchResult }) => string;
  searchLabel: string;
}

// Extend the GeoSearchControl constructor type
interface GeoSearchControlConstructor {
  new (options: GeoSearchControlOptions): L.Control;
}

export default function GeoSearchControlComponent() {
  const map = useMap();
  const { setDestination, setRoutingStack, origin } = useMapStore();

  map.on('geosearch/showlocation', (e) => {
    const event = e as unknown as GeoSearchEvent;
    const { x, y } = event.location;
    setDestination([y, x]);
    if (!origin) setRoutingStack('origin');
    else setRoutingStack(null);
  });

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl =
      new (GeoSearchControl as unknown as GeoSearchControlConstructor)({
        provider,
        style: 'bar',
        classNames: {
          container: 'bg-primary',
          input: 'bg-base-100 text-white !px-4 !h-full',
          active: '!bg-base-100',
          result: '!bg-base-100 !h-full',
          button: '!btn !h-full',
          form: '!bg-base-100 !rounded-lg !h-10 !font-bold',
        },
        showMarker: true,
        showPopup: true,
        autoComplete: true,
        autoCompleteDelay: 300,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        marker: {
          icon: new L.Icon({
            iconUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconRetinaUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
          draggable: false,
        },
        popupFormat: ({ result }: { result: SearchResult }) => result.label,
        searchLabel: 'مکان مورد نظر را جستجو کنید...',
      });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}
