import React, { useState, useEffect, useRef } from 'react';

export default function CursorHearts() {
  const [hearts, setHearts] = useState([]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const spawnHeart = (x, y) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 70) return; // Throttle to 70ms
      lastTimeRef.current = now;

      const newHeart = {
        id: now + Math.random(),
        x,
        y,
        size: Math.floor(Math.random() * 8) + 12, // 12px - 20px
        rotation: Math.floor(Math.random() * 40) - 20,
      };

      setHearts((prev) => [...prev.slice(-15), newHeart]); // Keep max 15 active
    };

    const handleMouseMove = (e) => {
      spawnHeart(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        spawnHeart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Remove heart after 800ms
  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-[#E8737A] pointer-events-none select-none transition-all"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            fontSize: `${h.size}px`,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`,
            animation: 'cursorHeartDrift 0.8s ease-out forwards',
          }}
        >
          ❤️
        </span>
      ))}
      <style>{`
        @keyframes cursorHeartDrift {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.3) translateY(-40px);
          }
        }
      `}</style>
    </div>
  );
}
