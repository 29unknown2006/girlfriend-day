import React from 'react';
import { motion } from 'framer-motion';

export default function GlowButton({
  children,
  onClick,
  disabled = false,
  className = '',
  pulse = true,
  variant = 'primary',
  type = 'button'
}) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.04, y: -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      animate={pulse && !disabled ? {
        boxShadow: [
          '0 8px 25px -4px rgba(232, 115, 122, 0.4)',
          '0 12px 35px 2px rgba(232, 115, 122, 0.7)',
          '0 8px 25px -4px rgba(232, 115, 122, 0.4)',
        ],
      } : {}}
      transition={{
        boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.15 },
      }}
      className={`
        relative inline-flex items-center justify-center min-h-[48px] px-8 py-3.5
        rounded-full font-semibold text-base sm:text-lg tracking-wide transition-all
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none
        ${isPrimary 
          ? 'bg-gradient-to-r from-[#E8737A] via-[#B94F5C] to-[#E8737A] text-white bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md text-[#B94F5C] border border-[#F4A6B7] hover:bg-white shadow-md'
        }
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
