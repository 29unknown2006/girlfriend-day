import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressDots({ currentStep, totalSteps = 10 }) {
  // Hide on step 0 (Loading screen)
  if (currentStep === 0) return null;

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm pointer-events-none"
      aria-label={`Journey step ${currentStep} of ${totalSteps - 1}`}
    >
      {Array.from({ length: totalSteps - 1 }).map((_, index) => {
        const stepNum = index + 1; // Step 1 to 9
        const isActive = currentStep === stepNum;
        const isPassed = currentStep > stepNum;

        return (
          <motion.div
            key={stepNum}
            initial={false}
            animate={{
              width: isActive ? 20 : 6,
              backgroundColor: isActive 
                ? '#B94F5C' 
                : isPassed 
                  ? '#E8737A' 
                  : 'rgba(232, 115, 122, 0.25)',
              opacity: isActive ? 1 : isPassed ? 0.7 : 0.4
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
          />
        );
      })}
    </div>
  );
}
