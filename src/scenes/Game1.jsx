import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME1_CONTENT } from '../content';
import { fireConfetti } from '../components/ConfettiBurst';
import GlowButton from '../components/GlowButton';

export default function Game1({ onNext }) {
  // Random heart location index (0-24)
  const targetIndex = useMemo(() => Math.floor(Math.random() * 25), []);
  
  const [revealed, setRevealed] = useState(Array(25).fill(false));
  const [reactionMsg, setReactionMsg] = useState('');
  const [lastMsgIndex, setLastMsgIndex] = useState(-1);
  const [isWon, setIsWon] = useState(false);

  const handleCardClick = (index) => {
    if (revealed[index] || isWon) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (index === targetIndex) {
      // Correct Pick!
      setIsWon(true);
      setReactionMsg(GAME1_CONTENT.successMessage);
      fireConfetti({ particleCount: 75, spread: 90 });
    } else {
      // Cycle through wrong pick reactions without immediate repetition
      const reactions = GAME1_CONTENT.wrongReactions;
      let nextMsgIdx = Math.floor(Math.random() * reactions.length);
      if (nextMsgIdx === lastMsgIndex) {
        nextMsgIdx = (nextMsgIdx + 1) % reactions.length;
      }
      setLastMsgIndex(nextMsgIdx);
      setReactionMsg(reactions[nextMsgIdx]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 my-6"
    >
      <div className="w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center border border-white/90">
        
        <h2 className="text-clamp-heading font-bold font-serif-heading text-[#B94F5C] mb-2">
          {GAME1_CONTENT.title}
        </h2>
        <p className="text-sm sm:text-base text-[#3A2E33]/80 mb-6 font-medium">
          {GAME1_CONTENT.subtitle}
        </p>

        {/* Reaction Message Toast */}
        <div className="h-10 mb-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {reactionMsg && (
              <motion.p
                key={reactionMsg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-base sm:text-lg font-semibold ${isWon ? 'text-[#B94F5C]' : 'text-[#E8737A]'}`}
              >
                {reactionMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 5x5 Card Grid */}
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 w-full max-w-xs sm:max-w-sm mb-6 aspect-square">
          {Array.from({ length: 25 }).map((_, index) => {
            const isTarget = index === targetIndex;
            const isCardRevealed = revealed[index];

            return (
              <motion.button
                key={index}
                onClick={() => handleCardClick(index)}
                disabled={isWon || isCardRevealed}
                whileHover={{ scale: isCardRevealed ? 1 : 1.08 }}
                whileTap={{ scale: isCardRevealed ? 1 : 0.92 }}
                className={`
                  aspect-square rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-sm transition-all duration-300
                  ${isCardRevealed 
                    ? isTarget 
                      ? 'bg-[#E8737A] text-white shadow-lg ring-4 ring-[#F4A6B7]' 
                      : 'bg-white/40 text-gray-400 border border-white/40 opacity-60'
                    : 'bg-gradient-to-br from-white to-[#FDE8EC] text-[#B94F5C] border border-[#F4A6B7]/50 hover:shadow-md cursor-pointer hover:border-[#E8737A]'
                  }
                `}
                aria-label={`Card ${index + 1}`}
              >
                {isCardRevealed ? (isTarget ? '❤️' : '✨') : '?'}
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button on Win */}
        {isWon && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full sm:w-auto"
          >
            <GlowButton onClick={onNext} className="w-full sm:w-auto">
              {GAME1_CONTENT.buttonText}
            </GlowButton>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
