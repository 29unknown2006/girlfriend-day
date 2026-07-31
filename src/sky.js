// Sky and Time-of-Day Configuration for Girlfriend's Day Website
// Maps journey step indices to sky color palettes, ambient glows, and particle themes.

export const SKY_STAGES = {
  // Step 0: Loading (Soft neutral peach start)
  0: {
    name: 'sunrise',
    skyTop: '#FFF8F3',
    skyMid: '#FDE8EC',
    skyBottom: '#FDEDE1',
    particleColor: '#F4A6B7',
    ambientGlow: 'rgba(254, 215, 226, 0.4)',
    clouds: true,
  },
  // Step 1: Landing Page (🌅 Sunrise)
  1: {
    name: 'sunrise',
    skyTop: '#FFF5EB',
    skyMid: '#FDE8EC',
    skyBottom: '#F8D7DE',
    particleColor: '#E8737A',
    ambientGlow: 'rgba(255, 234, 210, 0.6)',
    sunGlow: true,
  },
  // Step 2: Game 1 - Find My Heart (☀️ Morning)
  2: {
    name: 'morning',
    skyTop: '#E6F0FA',
    skyMid: '#F1E6FA',
    skyBottom: '#FDE8EC',
    particleColor: '#E8737A',
    ambientGlow: 'rgba(230, 240, 250, 0.5)',
    breeze: true,
  },
  // Step 3: Game 2 - Love Meter (🌇 Sunset)
  3: {
    name: 'sunset',
    skyTop: '#FDEDE1',
    skyMid: '#F8D7DE',
    skyBottom: '#E8737A',
    particleColor: '#FFF',
    ambientGlow: 'rgba(232, 115, 122, 0.5)',
    dynamicSunset: true,
  },
  // Step 4: Game 3 - Catch The Hearts (🌆 Dusk)
  4: {
    name: 'dusk',
    skyTop: '#5A3D5C',
    skyMid: '#8B4A62',
    skyBottom: '#D87A7F',
    particleColor: '#FFE57F', // Firefly glow
    ambientGlow: 'rgba(139, 74, 98, 0.6)',
    fireflies: true,
  },
  // Step 5: Transition (🌌 Night Begins)
  5: {
    name: 'night',
    skyTop: '#0F172A',
    skyMid: '#1E1B4B',
    skyBottom: '#31103F',
    particleColor: '#F4A6B7',
    ambientGlow: 'rgba(244, 166, 183, 0.3)',
    nightSky: true,
  },
  // Step 6: Envelope (🌌 Night)
  6: {
    name: 'night',
    skyTop: '#0D1426',
    skyMid: '#1C1945',
    skyBottom: '#30103B',
    particleColor: '#F4A6B7',
    ambientGlow: 'rgba(244, 166, 183, 0.35)',
    nightSky: true,
  },
  // Step 7: Letter (🌌 Night)
  7: {
    name: 'night',
    skyTop: '#0C1222',
    skyMid: '#1A1C40',
    skyBottom: '#2D1B36',
    particleColor: '#F4A6B7',
    ambientGlow: 'rgba(232, 115, 122, 0.35)',
    nightSky: true,
  },
  // Step 8: Collage (🌌 Starlit Deep Night)
  8: {
    name: 'night',
    skyTop: '#090D18',
    skyMid: '#151433',
    skyBottom: '#28142B',
    particleColor: '#FFF',
    ambientGlow: 'rgba(255, 255, 255, 0.3)',
    nightSky: true,
  },
  // Step 9: Final Message (🌌 Magical Starlit End)
  9: {
    name: 'night',
    skyTop: '#070913',
    skyMid: '#121028',
    skyBottom: '#220F24',
    particleColor: '#F4A6B7',
    ambientGlow: 'rgba(244, 166, 183, 0.4)',
    nightSky: true,
  },
};
