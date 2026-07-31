import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  "Loading...",
  "Collecting our memories...",
  "Finding every reason I love you...",
  "Almost there...",
  "Done ❤️"
];

export default function Loading({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < LOADING_MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      // Final message shown, pause brief moment then trigger onComplete
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FFF8F3] text-[#3A2E33] p-6 z-50">
      <div className="relative w-full max-w-md flex flex-col items-center justify-center text-center">
        {/* Animated Heart Pulsing Header */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-5xl sm:text-6xl mb-8"
        >
          ❤️
        </motion.div>

        {/* Message Container with Fixed Height */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-xl sm:text-2xl font-serif-heading font-semibold text-[#B94F5C] px-4"
            >
              {LOADING_MESSAGES[index]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-48 sm:w-64 h-1.5 bg-[#FDE8EC] rounded-full overflow-hidden mt-8 shadow-inner">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${((index + 1) / LOADING_MESSAGES.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#F4A6B7] to-[#E8737A] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
