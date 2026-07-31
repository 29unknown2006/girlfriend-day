import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME2_CONTENT } from '../content';
import { fireConfetti } from '../components/ConfettiBurst';
import GlowButton from '../components/GlowButton';

import { useDayProgress } from '../context/DayProgressContext';

export default function Game2({ onNext }) {
  const [value, setValue] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null); // 'low' | 'medium' | 'high' | 'max'

  const { setGame2LoveValue } = useDayProgress();

  const handleSliderChange = (val) => {
    setValue(val);
    setGame2LoveValue(val);
  };

  const heartScale = 0.8 + (value / 100) * 1.5; // Scales from 0.8 to 2.3

  const handleSubmit = () => {
    let type = 'medium';
    if (value <= 30) type = 'low';
    else if (value <= 70) type = 'medium';
    else if (value <= 98) type = 'high';
    else type = 'max';

    setResult(type);
    setSubmitted(true);

    if (type === 'high' || type === 'max') {
      fireConfetti({ particleCount: 80, spread: 90 });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setResult(null);
    setValue(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 my-6"
    >
      <div 
        className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-10 shadow-2xl text-center flex flex-col items-center transition-all duration-700"
        style={{
          backgroundColor: `rgba(255, 248, 243, ${0.85 - (value / 100) * 0.2})`,
          borderColor: `rgba(244, 166, 183, ${0.5 + (value / 100) * 0.5})`,
        }}
      >
        <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#B94F5C] mb-2">
          {GAME2_CONTENT.title}
        </h2>
        <p className="text-sm sm:text-base text-[#3A2E33]/80 mb-8 font-medium">
          {GAME2_CONTENT.subtitle}
        </p>

        {/* Dynamic Heart Icon */}
        <div className="h-36 sm:h-44 flex items-center justify-center mb-6 w-full overflow-hidden">
          <motion.div
            style={{ scale: heartScale }}
            animate={{
              rotate: [0, value > 80 ? 8 : 4, value > 80 ? -8 : -4, 0],
            }}
            transition={{
              duration: Math.max(0.5, 2 - (value / 100) * 1.5),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl sm:text-7xl drop-shadow-md select-none"
          >
            ❤️
          </motion.div>
        </div>

        {!submitted ? (
          <div className="w-full space-y-6">
            {/* Value Display */}
            <div className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#B94F5C]">
              {value === 100 ? "Infinity ❤️ ♾️" : `${value}%`}
            </div>

            {/* Styled Slider */}
            <div className="px-2 sm:px-4">
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-3 bg-[#FDE8EC] rounded-lg appearance-none cursor-pointer accent-[#B94F5C] shadow-inner focus:outline-none"
                aria-label="Love meter slider"
              />
              <div className="flex justify-between text-xs text-[#3A2E33]/60 mt-2 font-semibold">
                <span>0 (A little)</span>
                <span>50 (Lots)</span>
                <span>100 (Infinity ♾️)</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <GlowButton onClick={handleSubmit} className="w-full sm:w-auto">
                {GAME2_CONTENT.buttonText}
              </GlowButton>
            </div>
          </div>
        ) : (
          /* Result Message Screen */
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center space-y-6 pt-2"
            >
              <p className="text-lg sm:text-xl md:text-2xl font-serif-heading font-semibold text-[#B94F5C] leading-relaxed max-w-md">
                {GAME2_CONTENT.responses[result].text}
              </p>

              {GAME2_CONTENT.responses[result].showTryAgain ? (
                <GlowButton onClick={handleReset} variant="secondary" pulse={false} className="w-full sm:w-auto">
                  Try Again 😤❤️
                </GlowButton>
              ) : (
                <GlowButton onClick={onNext} className="w-full sm:w-auto">
                  {GAME2_CONTENT.continueText}
                </GlowButton>
              )}
            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </motion.div>
  );
}
