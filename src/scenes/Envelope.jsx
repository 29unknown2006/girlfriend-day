import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_PAGE_CONTENT } from '../content';
import GlowButton from '../components/GlowButton';
import { fireHeartConfetti } from '../components/ConfettiBurst';

export default function Envelope({ onComplete }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaperOut, setIsPaperOut] = useState(false);

  const handleStartReveal = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (!isStarted) return;

    // Reveal Sequence Timeline:
    // 0.8s: Top envelope flap rotates open (3D)
    const t1 = setTimeout(() => setIsOpen(true), 800);

    // 1.8s: Letter paper slides out & confetti bursts
    const t2 = setTimeout(() => {
      setIsPaperOut(true);
      fireHeartConfetti();
    }, 1800);

    // 4.2s (~2.4 second pause after paper slides out): Auto transition to Letter scene
    const t3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isStarted, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen w-full flex items-center justify-center p-4 relative z-20 transition-all duration-700 ${
        isStarted ? 'bg-black/50 backdrop-blur-md' : ''
      }`}
    >
      <AnimatePresence mode="wait">
        {!isStarted ? (
          /* Final Page Prompt Card */
          <motion.div
            key="final-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-lg glass-card rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center border border-white/90 space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl font-bold font-serif-heading text-[#B94F5C]"
            >
              {FINAL_PAGE_CONTENT.heading}
            </motion.h2>

            <div className="space-y-3">
              {FINAL_PAGE_CONTENT.subheading.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.2 }}
                  className={`font-serif-heading ${
                    idx === FINAL_PAGE_CONTENT.subheading.length - 1
                      ? 'text-xl sm:text-2xl font-semibold text-[#B94F5C]'
                      : 'text-base sm:text-xl text-[#3A2E33]/90 italic'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="pt-4 w-full sm:w-auto"
            >
              <GlowButton onClick={handleStartReveal} className="w-full sm:w-auto text-xl py-4 px-10">
                {FINAL_PAGE_CONTENT.buttonText}
              </GlowButton>
            </motion.div>
          </motion.div>
        ) : (
          /* Animated 3D Envelope Reveal Sequence */
          <motion.div
            key="envelope-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="relative w-80 sm:w-96 h-64 perspective-1000 flex items-center justify-center"
          >
            {/* Envelope Base Body */}
            <div className="relative w-full h-full bg-[#F8D7DE] rounded-2xl border-2 border-[#F4A6B7] shadow-2xl overflow-visible flex items-center justify-center">
              
              {/* Inner Envelope Pocket */}
              <div className="absolute inset-0 bg-[#FDE8EC] rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] sm:border-l-[192px] border-l-transparent border-t-[120px] border-t-[#FFF8F3] border-r-[160px] sm:border-r-[192px] border-r-transparent" />
              </div>

              {/* Sliding Letter Paper */}
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={isPaperOut ? { y: -110, opacity: 1, scale: 1.05 } : { y: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute w-[88%] h-[85%] bg-white rounded-xl shadow-lg border border-[#F4A6B7] p-4 flex flex-col items-center justify-center text-center z-10"
              >
                <div className="text-3xl mb-2">📜</div>
                <p className="font-serif-heading font-bold text-[#B94F5C] text-lg sm:text-xl">
                  For My Love, Litchii ❤️
                </p>
                <p className="text-xs text-[#3A2E33]/70 italic mt-1 font-medium">
                  Unfolding your letter...
                </p>
              </motion.div>

              {/* Envelope Front V-Flaps */}
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] sm:border-l-[192px] border-l-[#FDEDE1] border-t-[100px] border-t-transparent z-20 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] sm:border-r-[192px] border-r-[#FDE8EC] border-t-[100px] border-t-transparent z-20 rounded-br-2xl" />
              <div className="absolute bottom-0 left-0 w-full h-0 border-b-[110px] border-b-[#F8D7DE] border-x-[160px] sm:border-x-[192px] border-x-transparent z-20 rounded-b-2xl" />

              {/* Top Envelope Flap (3D Flip Animation) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-0 h-0 border-l-[160px] sm:border-l-[192px] border-l-transparent border-t-[125px] border-t-[#E8737A] border-r-[160px] sm:border-r-[192px] border-r-transparent origin-top z-30 transform-style-3d drop-shadow-md"
              >
                {/* Heart Seal on Flap */}
                <div className="absolute -top-[135px] left-1/2 -translate-x-1/2 text-2xl select-none">
                  💌
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

