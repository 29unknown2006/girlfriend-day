import React from 'react';
import { motion } from 'framer-motion';
import { LETTER_CONTENT } from '../content';
import GlowButton from '../components/GlowButton';
import placeholderLetter from '../assets/letter/placeholder-letter.png';

export default function Letter({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10 my-6"
    >
      <div className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-10 shadow-2xl text-center flex flex-col items-center border border-white/80">
        
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-[#B94F5C] mb-6">
          {LETTER_CONTENT.heading}
        </h2>

        {/* Pure Handwritten Letter Image Display */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F4A6B7]/40 bg-white p-2 sm:p-4 mb-8">
          <img
            src={placeholderLetter}
            alt={LETTER_CONTENT.altText}
            className="w-full h-auto object-contain rounded-xl max-h-[75vh]"
            loading="eager"
          />
        </div>

        {/* Continue to Photo Collage Button */}
        <div className="w-full sm:w-auto">
          <GlowButton onClick={onNext} className="w-full sm:w-auto">
            View Our Memories 💖
          </GlowButton>
        </div>

      </div>
    </motion.div>
  );
}
