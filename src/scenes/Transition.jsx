import React from 'react';
import { motion } from 'framer-motion';
import { TRANSITION_CONTENT } from '../content';
import GlowButton from '../components/GlowButton';

export default function Transition({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10"
    >
      <div className="max-w-md glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/80 flex flex-col items-center space-y-8">
        
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl drop-shadow-sm"
        >
          💌
        </motion.div>

        <div className="space-y-4">
          {TRANSITION_CONTENT.text.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl font-serif-heading font-semibold text-[#B94F5C] italic"
            >
              "{line}"
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="pt-4 w-full sm:w-auto"
        >
          <GlowButton onClick={onNext} className="w-full sm:w-auto">
            {TRANSITION_CONTENT.buttonText}
          </GlowButton>
        </motion.div>

      </div>
    </motion.div>
  );
}
