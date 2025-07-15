'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import useMapStore from '@/store/map';

interface RouteAnimatorProps {
  animationSpeed?: number;
  smoothRotation?: boolean;
}

export default function RouteAnimator({
  animationSpeed = 150,
  smoothRotation = true,
}: RouteAnimatorProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const { routeLines, setRouteCompleted, setInRoute } = useMapStore();

  const calculateBearing = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number => {
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;

    const y = Math.sin(dLng) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);

    const bearing = Math.atan2(y, x);
    return ((bearing * 180) / Math.PI + 360) % 360;
  };

  const getRotationDirection = (from: number, to: number): number => {
    let diff = to - from;

    if (diff > 180) {
      diff -= 360;
    } else if (diff < -180) {
      diff += 360;
    }

    return from + diff;
  };

  useEffect(() => {
    if (!map || !routeLines || routeLines.length < 2) return;
    setInRoute(true);

    const createRotatedIcon = (rotation: number) => {
      return L.divIcon({
        html: `
          <div style="
            width: 32px;
            height: 32px;
            rotate: 180deg;
            background-image: url('/car.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            transform-origin: center;
            transform: rotate(${rotation}deg);
            transition: ${smoothRotation ? 'transform 0.3s ease' : 'none'};
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          "></div>
        `,
        iconSize: [32, 32],
        className: 'animated-car-marker',
      });
    };

    const initialBearing = calculateBearing(
      routeLines[0][0],
      routeLines[0][1],
      routeLines[1][0],
      routeLines[1][1],
    );

    const marker = L.marker(routeLines[0], {
      icon: createRotatedIcon(initialBearing),
    }).addTo(map);

    markerRef.current = marker;

    let index = 0;
    let currentBearing = initialBearing;

    const animate = () => {
      if (index >= routeLines.length - 1) {
        console.log('Animation completed');
        setRouteCompleted(true);
        setInRoute(false);
        return;
      }

      const currentPoint = routeLines[index];
      const nextPoint = routeLines[index + 1];

      let newBearing = calculateBearing(
        currentPoint[0],
        currentPoint[1],
        nextPoint[0],
        nextPoint[1],
      );

      if (smoothRotation) {
        newBearing = getRotationDirection(currentBearing, newBearing);
      }

      marker.setLatLng(nextPoint);
      marker.setIcon(createRotatedIcon(newBearing));

      currentBearing = newBearing;
      index++;

      animationRef.current = setTimeout(animate, animationSpeed);
    };

    animationRef.current = setTimeout(animate, animationSpeed);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [map, routeLines, animationSpeed, smoothRotation]);

  return null;
}
