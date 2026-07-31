import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_CONTENT } from '../content';
import GlowButton from '../components/GlowButton';

export default function Landing({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative z-10"
    >
      <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-white/90 text-center flex flex-col items-center my-8">
        
        {/* Decorative Badge */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDE8EC] text-[#B94F5C] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-xs border border-[#F4A6B7]/40"
        >
          <span>✨</span>
          <span>A Romantic Journey</span>
          <span>✨</span>
        </motion.div>

        {/* Large Fluid Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-clamp-title font-bold font-serif-heading text-[#B94F5C] leading-tight mb-8 drop-shadow-xs"
        >
          {LANDING_CONTENT.title}
        </motion.h1>

        {/* Body Paragraphs with Fluid Typography */}
        <div className="space-y-4 text-left sm:text-center text-[#3A2E33] text-clamp-body font-normal leading-relaxed mb-10 opacity-95">
          {LANDING_CONTENT.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
              className={index === LANDING_CONTENT.paragraphs.length - 1 ? "font-semibold text-[#B94F5C] pt-2 text-lg sm:text-xl" : ""}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Pulsing CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="w-full sm:w-auto"
        >
          <GlowButton onClick={onNext} className="w-full sm:w-auto text-xl py-4 px-10">
            {LANDING_CONTENT.buttonText}
          </GlowButton>
        </motion.div>

      </div>
    </motion.div>
  );
}
