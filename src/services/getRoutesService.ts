interface IProps {
  origin: [number, number];
  destination: [number, number];
}

export interface IStep {
  distance: number;
  duration: number;
  instruction: string;
  name: string;
  type: number;
}

interface IData {
  features: Array<{
    geometry: {
      coordinates: Array<[number, number]>;
    };
    properties: {
      segments: Array<{
        distance: number;
        duration: number;
        steps: Array<IStep>;
      }>;
    };
  }>;
}

export default async function getRoutesService({
  origin,
  destination,
}: IProps) {
  if (!origin || !destination) return;

  const url =
    'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
  const apiKey = process.env.NEXT_PUBLIC_ROUTING_API_KEY;

  const coordinates = [origin.reverse(), destination.reverse()];

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ coordinates }),
    headers: {
      Authorization: apiKey!,
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as IData;
  console.log(data);
  const steps = data.features[0].properties.segments[0].steps;
  const distance = data.features[0].properties.segments[0].distance;
  const duration = data.features[0].properties.segments[0].duration;
  const routes = data.features[0].geometry.coordinates.map(([lng, lat]) => [
    lat,
    lng,
  ]) as [number, number][];
  return { steps, distance, duration, routes };
}
