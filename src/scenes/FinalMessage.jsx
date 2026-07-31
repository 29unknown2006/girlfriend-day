import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FINAL_MESSAGE_CONTENT } from '../content';

export default function FinalMessage({ onReplay }) {
  const [showEndingText, setShowEndingText] = useState(false);

  useEffect(() => {
    // Gently fade in final emotional message after 1.5s pause
    const timer = setTimeout(() => {
      setShowEndingText(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 my-8"
    >
      <div className="w-full max-w-xl glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/80 flex flex-col items-center space-y-8">
        
        {/* Pulsing Large Heart Emblem */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            filter: [
              'drop-shadow(0 0 10px rgba(232, 115, 122, 0.4))',
              'drop-shadow(0 0 25px rgba(232, 115, 122, 0.8))',
              'drop-shadow(0 0 10px rgba(232, 115, 122, 0.4))',
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl sm:text-8xl select-none"
        >
          ❤️
        </motion.div>

        {/* Final Emotional Text Lines */}
        <div className="space-y-4 min-h-[140px] flex flex-col items-center justify-center">
          {showEndingText && FINAL_MESSAGE_CONTENT.lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 1.2, duration: 1 }}
              className={`font-serif-heading leading-relaxed ${
                index === FINAL_MESSAGE_CONTENT.lines.length - 1
                  ? "text-2xl sm:text-4xl font-bold text-[#B94F5C]"
                  : "text-xl sm:text-3xl font-semibold text-[#3A2E33]"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Signoff */}
        {showEndingText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.8, duration: 1 }}
            className="pt-6 border-t border-[#F4A6B7]/40 w-full flex flex-col items-center space-y-1"
          >
            <p className="text-xl sm:text-3xl font-serif-heading italic font-bold text-[#B94F5C]">
              {FINAL_MESSAGE_CONTENT.signoff}
            </p>
          </motion.div>
        )}

        {/* Quiet Replay Link */}
        {showEndingText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 5.2, duration: 1 }}
            className="pt-4"
          >
            <button
              onClick={onReplay}
              className="text-xs sm:text-sm text-[#B94F5C] underline underline-offset-4 hover:opacity-100 transition-opacity cursor-pointer font-medium"
            >
              ↺ Replay Our Journey
            </button>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
