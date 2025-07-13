const CENTER_POSITION: [number, number] = [
  35.699947698524674, 51.33798687550249,
];

const TILE_LAYERS = {
  light: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark: 'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=3c0857c53baf416abd21404283a8418a',
  sat: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

export { CENTER_POSITION, TILE_LAYERS };
