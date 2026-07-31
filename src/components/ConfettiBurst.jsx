import confetti from 'canvas-confetti';

export function fireConfetti(options = {}) {
  const defaults = {
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#E8737A', '#B94F5C', '#F4A6B7', '#F8D7DE', '#FFF8F3'],
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    ...options,
  });
}

export function fireHeartConfetti() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: '❤️', scalar });

  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    shapes: [heart],
    scalar,
  };

  confetti({
    ...defaults,
    particleCount: 30,
    origin: { x: 0.5, y: 0.5 },
  });
}
