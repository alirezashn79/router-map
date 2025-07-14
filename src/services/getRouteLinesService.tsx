interface IGetRouteLinesService {
  origin: [number, number];
  destination: [number, number];
}

export async function getRouteLinesService({
  origin,
  destination,
}: IGetRouteLinesService) {
  if (!origin || !destination) return;

  const [originLat, originLng] = origin;
  const [destinationLat, destinationLng] = destination;

  const url = `http://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destinationLng},${destinationLat}?overview=full&geometries=geojson`;

  const response = await fetch(url);
  const data = await response.json();
  const coordinates = (
    data.routes?.[0]?.geometry?.coordinates as Array<[number, number]>
  )?.map(([lng, lat]) => [lat, lng]) as Array<[number, number]>;
  return coordinates;
}
