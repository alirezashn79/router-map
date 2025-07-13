import L from 'leaflet';

export const blueDotIcon = new L.Icon({
  iconUrl: '/blue-dot.avif',
  iconSize: [16, 16],
  iconAnchor: [10, 10],
  className: 'animate-pulse',
});

export const originMarkerIcon = new L.Icon({
  iconUrl: '/origin.png',
  iconSize: [40, 40],
});

export const destinationMarkerIcon = new L.Icon({
  iconUrl: '/destination.png',
  iconSize: [40, 40],
});
