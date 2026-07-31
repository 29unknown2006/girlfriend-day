import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GAME3_CONTENT } from '../content';
import { fireConfetti } from '../components/ConfettiBurst';
import GlowButton from '../components/GlowButton';

export default function Game3({ onNext }) {
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [basketX, setBasketX] = useState(50); // percentage (0-100)
  const [items, setItems] = useState([]);
  
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const nextIdRef = useRef(0);
  const isWonRef = useRef(false);

  // Target and current smoothed X positions for ultra-smooth lerp movement
  const targetBasketXRef = useRef(50);
  const currentBasketXRef = useRef(50);

  useEffect(() => {
    isWonRef.current = isWon;
  }, [isWon]);

  // Smooth pointer tracking (mouse & touch)
  const updateBasketTarget = (clientX) => {
    if (isWonRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(10, Math.min(90, x));
    targetBasketXRef.current = clampedX;
  };

  const handlePointerMove = (e) => {
    updateBasketTarget(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updateBasketTarget(e.touches[0].clientX);
    }
  };

  // Keyboard arrow keys controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isWonRef.current) return;
      if (e.key === 'ArrowLeft') {
        targetBasketXRef.current = Math.max(10, targetBasketXRef.current - 12);
      } else if (e.key === 'ArrowRight') {
        targetBasketXRef.current = Math.min(90, targetBasketXRef.current + 12);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Game Loop: Smooth lerp basket + multiple slow floating hearts + collision detection
  useEffect(() => {
    if (isWon) return;

    let lastSpawn = Date.now();

    const gameLoop = () => {
      const now = Date.now();

      // Smoothly lerp current basket position towards target for buttery smooth movement
      const lerpSpeed = 0.35; // 35% towards target per frame
      currentBasketXRef.current += (targetBasketXRef.current - currentBasketXRef.current) * lerpSpeed;
      setBasketX(currentBasketXRef.current);

      // Spawn 2-3 items simultaneously every 550ms for a faster romantic falling stream
      if (now - lastSpawn > 550 && !isWonRef.current) {
        lastSpawn = now;

        const countToSpawn = Math.random() < 0.6 ? 2 : 3; // 2 or 3 items together
        const newBatch = Array.from({ length: countToSpawn }).map(() => {
          const isBroken = Math.random() < 0.25; // 25% chance broken heart (penalty)
          return {
            id: nextIdRef.current++,
            x: Math.random() * 76 + 12, // 12% - 88% horizontal range
            y: -6,
            speed: Math.random() * 0.22 + 0.38, // Faster energetic fall (0.38 - 0.60 % per frame)
            type: isBroken ? '💔' : '❤️',
            rotation: Math.floor(Math.random() * 30) - 15,
          };
        });

        setItems((prev) => [...prev, ...newBatch]);
      }

      // Move items & test collisions against smoothed basket position
      setItems((prevItems) => {
        const nextItems = [];
        let scoreDelta = 0;
        const currentX = currentBasketXRef.current;

        for (const item of prevItems) {
          const newY = item.y + item.speed;

          // Catch zone: vertical y between 80% and 93%
          if (newY >= 80 && newY <= 93) {
            const distance = Math.abs(item.x - currentX);
            if (distance < 14) {
              // Item Caught!
              if (item.type === '❤️') {
                scoreDelta += 1;
              } else {
                scoreDelta -= 1; // Penalty for broken heart
              }
              continue; // remove caught item
            }
          }

          // Keep items falling until past bottom
          if (newY < 102) {
            nextItems.push({ ...item, y: newY });
          }
        }

        if (scoreDelta !== 0) {
          setScore((s) => {
            const newScore = Math.max(0, s + scoreDelta);
            if (newScore >= GAME3_CONTENT.goalScore && !isWonRef.current) {
              setIsWon(true);
              fireConfetti({ particleCount: 100, spread: 100 });
            }
            return newScore;
          });
        }

        return nextItems;
      });

      if (!isWonRef.current) {
        animFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isWon]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 my-4"
    >
      <div className="w-full max-w-md glass-card rounded-3xl p-5 sm:p-7 shadow-2xl text-center flex flex-col items-center">
        
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#B94F5C] mb-1">
          {GAME3_CONTENT.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#3A2E33]/80 mb-4 font-medium">
          {GAME3_CONTENT.subtitle}
        </p>

        {/* Score Header showing 29 Target */}
        <div className="flex items-center justify-between w-full px-4 py-2 bg-white/60 rounded-2xl mb-4 border border-[#F4A6B7]/40 shadow-xs">
          <span className="text-sm font-semibold text-[#3A2E33]/70">Score:</span>
          <span className="text-xl font-bold font-serif-heading text-[#B94F5C]">
            {score} / {GAME3_CONTENT.goalScore} ❤️
          </span>
        </div>

        {/* Catch Game Arena */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#FFF8F3] via-[#FDE8EC] to-[#F8D7DE] rounded-2xl overflow-hidden border border-[#F4A6B7]/50 shadow-inner cursor-crosshair touch-none select-none"
        >
          {/* Gentle Floating Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl sm:text-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xs"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                willChange: 'top, left',
              }}
            >
              {item.type}
            </div>
          ))}

          {/* Smooth Lerped Basket */}
          <div
            className="absolute bottom-2 h-11 w-20 sm:w-24 bg-gradient-to-r from-[#E8737A] to-[#B94F5C] rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg transform -translate-x-1/2 border-2 border-white/90"
            style={{ 
              left: `${basketX}%`,
              willChange: 'left',
            }}
          >
            🧺
          </div>
        </div>

        {/* Win Overlay Modal */}
        {isWon && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full pt-6 flex flex-col items-center space-y-4"
          >
            <p className="text-xl font-serif-heading font-bold text-[#B94F5C]">
              {GAME3_CONTENT.winMessage}
            </p>
            <GlowButton onClick={onNext} className="w-full sm:w-auto">
              {GAME3_CONTENT.buttonText}
            </GlowButton>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}

