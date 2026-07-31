import React, { useMemo } from 'react';

export default function FloatingHearts({ count = 16 }) {
  // Respect prefers-reduced-motion
  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const actualCount = isReducedMotion ? 5 : count;

  const hearts = useMemo(() => {
    return Array.from({ length: actualCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: Math.floor(Math.random() * 12) + 10, // 10px - 22px
      duration: Math.random() * 10 + (isReducedMotion ? 25 : 12), // seconds
      delay: Math.random() * 10, // seconds
      opacity: Math.random() * 0.4 + 0.3,
      rotate: Math.floor(Math.random() * 40) - 20,
    }));
  }, [actualCount, isReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-[#E8737A]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
