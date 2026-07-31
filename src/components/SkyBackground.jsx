import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SKY_STAGES } from '../sky';
import { useDayProgress } from '../context/DayProgressContext';

export default function SkyBackground() {
  const { currentStep, game2LoveValue } = useDayProgress();
  const [shootingStar, setShootingStar] = useState(null);

  // Check prefers-reduced-motion
  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stage = SKY_STAGES[currentStep] || SKY_STAGES[0];

  // Dynamic Sunset color modulation for Game 2 (Step 3)
  const currentColors = useMemo(() => {
    if (currentStep === 3) {
      // Modulate sunset colors based on slider value (0 - 100)
      const ratio = game2LoveValue / 100;
      return {
        top: ratio > 0.5 ? '#9333EA' : stage.skyTop, // shifts towards deeper purple-magenta
        mid: ratio > 0.5 ? '#E11D48' : stage.skyMid, // shifts towards rich rose
        bottom: ratio > 0.5 ? '#F97316' : stage.skyBottom, // deep sunset orange
      };
    }
    return {
      top: stage.skyTop,
      mid: stage.skyMid,
      bottom: stage.skyBottom,
    };
  }, [currentStep, game2LoveValue, stage]);

  // Generate fixed stars for night sky
  const stars = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 85,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }));
  }, []);

  // Shooting star loop for Night stage (Steps 5-8)
  useEffect(() => {
    if (stage.name !== 'night' || isReducedMotion) {
      setShootingStar(null);
      return;
    }

    const triggerShootingStar = () => {
      const startX = Math.random() * 60 + 20; // 20% to 80%
      const startY = Math.random() * 40 + 5;  // 5% to 45%
      setShootingStar({
        id: Date.now(),
        x: startX,
        y: startY,
        angle: Math.random() * 20 + 35, // 35 - 55 deg
      });

      // Clear after animation ends
      setTimeout(() => setShootingStar(null), 1200);
    };

    // Trigger every 8 - 14 seconds
    const interval = setInterval(() => {
      triggerShootingStar();
    }, Math.random() * 6000 + 8000);

    return () => clearInterval(interval);
  }, [stage.name, isReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Smoothly Interpolating Sky Gradient */}
      <motion.div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        animate={{
          background: `linear-gradient(180deg, ${currentColors.top} 0%, ${currentColors.mid} 50%, ${currentColors.bottom} 100%)`,
        }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* Sun / Sunlight Glow (Sunrise & Morning) */}
      {(stage.name === 'sunrise' || stage.name === 'morning') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-gradient-radial from-[#FFE5B4] to-transparent blur-3xl"
        />
      )}

      {/* Ambient Radial Glow */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 40%, ${stage.ambientGlow} 0%, transparent 70%)`,
        }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      />

      {/* Night Sky: Stars & Shooting Star (Steps 5-8) */}
      {stage.name === 'night' && (
        <div className="absolute inset-0">
          {/* Twinkling Stars */}
          {stars.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white animate-sparkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                boxShadow: `0 0 ${s.size * 2}px #FFF`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}

          {/* Shooting Star */}
          {shootingStar && (
            <motion.div
              key={shootingStar.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: 180, y: 140, opacity: 0, scale: 0.2 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${shootingStar.x}%`,
                top: `${shootingStar.y}%`,
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(244,166,183,0.8) 40%, transparent 100%)',
                transform: `rotate(${shootingStar.angle}deg)`,
                transformOrigin: 'left center',
                boxShadow: '0 0 10px #FFF',
              }}
            />
          )}

          {/* Soft Aurora Glow */}
          {!isReducedMotion && (
            <motion.div
              animate={{
                opacity: [0.15, 0.3, 0.15],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#B94F5C]/20 via-[#F4A6B7]/10 to-transparent blur-2xl"
            />
          )}
        </div>
      )}
    </div>
  );
}
