import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlowButton from '../components/GlowButton';

// Direct Vite imports of photo assets
import coupleImg from '../assets/photos/placeholder-couple.jpg';
import photo1 from '../assets/photos/placeholder-photo-1.jpg';
import photo2 from '../assets/photos/placeholder-photo-2.jpg';
import photo3 from '../assets/photos/placeholder-photo-3.jpg';
import photo4 from '../assets/photos/placeholder-photo-4.jpg';
import photo5 from '../assets/photos/placeholder-photo-5.jpg';
import photo6 from '../assets/photos/placeholder-photo-6.jpg';
import photo7 from '../assets/photos/placeholder-photo-7.jpg';
import photo8 from '../assets/photos/placeholder-photo-8.jpg';

const COUPLE_PHOTO = {
  id: 'couple',
  src: coupleImg,
  alt: 'You & Litchii Together ❤️',
  title: 'Us Together ❤️',
};

const HER_PHOTOS = [
  { id: 1, src: photo1, alt: 'Litchii Photo 1', title: 'Sweet Smile 😊' },
  { id: 2, src: photo2, alt: 'Litchii Photo 2', title: 'Pretty Moments 🌹' },
  { id: 3, src: photo3, alt: 'Litchii Photo 3', title: 'Laughter & Joy ✨' },
  { id: 4, src: photo4, alt: 'Litchii Photo 4', title: 'Beautiful Sparkle 💖' },
  { id: 5, src: photo5, alt: 'Litchii Photo 5', title: 'Cozy Memories ☕' },
  { id: 6, src: photo6, alt: 'Litchii Photo 6', title: 'Angel Face 😇' },
  { id: 7, src: photo7, alt: 'Litchii Photo 7', title: 'Forever Beautiful 👑' },
  { id: 8, src: photo8, alt: 'Litchii Photo 8', title: 'My Favorite Girl 💕' },
];

export default function Collage({ onNext }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mediaQuery.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 md:p-10 relative z-10 my-6"
    >
      <div className="w-full max-w-4xl glass-card rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl text-center flex flex-col items-center border border-white/80">
        
        {/* Header */}
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-[#B94F5C] mb-2">
          Our Heart of Memories ❤️
        </h2>
        <p className="text-xs sm:text-base text-[#3A2E33]/80 mb-6 sm:mb-8 font-medium">
          Surrounding you with all my love—us together right in the center.
        </p>

        {isDesktop ? (
          /* DESKTOP (≥768px): Full Heart Silhouette Collage */
          <div className="relative w-full max-w-2xl h-[520px] mx-auto my-2 flex items-center justify-center select-none">
            
            {/* Center Couple Photo (1.6x larger anchor) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}
              className="absolute z-30 w-44 h-44 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#E8737A] bg-white transform -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-300 ring-4 ring-[#F4A6B7]/50 cursor-pointer"
              style={{ left: '50%', top: '44%' }}
            >
              <img
                src={COUPLE_PHOTO.src}
                alt={COUPLE_PHOTO.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1.5 inset-x-2 bg-[#B94F5C]/90 backdrop-blur-xs text-white text-xs font-semibold py-1 rounded-full shadow-xs text-center">
                Us Together ❤️
              </div>
            </motion.div>

            {/* Surrounding Photos forming two lobes and point of heart silhouette */}
            <HeartPhotoNode photo={HER_PHOTOS[0]} style={{ left: '14%', top: '10%' }} delay={0.2} />
            <HeartPhotoNode photo={HER_PHOTOS[1]} style={{ left: '33%', top: '4%' }} delay={0.3} />
            <HeartPhotoNode photo={HER_PHOTOS[2]} style={{ right: '33%', top: '4%' }} delay={0.4} />
            <HeartPhotoNode photo={HER_PHOTOS[3]} style={{ right: '14%', top: '10%' }} delay={0.5} />
            <HeartPhotoNode photo={HER_PHOTOS[4]} style={{ left: '5%', top: '40%' }} delay={0.6} />
            <HeartPhotoNode photo={HER_PHOTOS[5]} style={{ right: '5%', top: '40%' }} delay={0.7} />
            <HeartPhotoNode photo={HER_PHOTOS[6]} style={{ left: '22%', top: '72%' }} delay={0.8} />
            <HeartPhotoNode photo={HER_PHOTOS[7]} style={{ right: '22%', top: '72%' }} delay={0.9} />

          </div>
        ) : (
          /* MOBILE (<768px): 2-Column CSS Grid Layout */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full grid grid-cols-2 gap-3 my-2"
          >
            {/* Top row: Couple Photo spanning 2 columns, taller anchor (~1.4x) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-2 relative h-56 rounded-2xl overflow-hidden shadow-xl border-3 border-[#E8737A] bg-white ring-2 ring-[#F4A6B7]/40"
            >
              <img
                src={COUPLE_PHOTO.src}
                alt={COUPLE_PHOTO.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 inset-x-4 bg-[#B94F5C]/90 text-white text-xs font-semibold py-1 rounded-full text-center shadow-md">
                Us Together ❤️
              </div>
            </motion.div>

            {/* Remaining photos in 2-column grid */}
            {HER_PHOTOS.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                className="h-36 rounded-2xl overflow-hidden shadow-md border-2 border-[#F4A6B7] bg-white"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Continue Button */}
        <div className="pt-6 sm:pt-8 w-full sm:w-auto">
          <GlowButton onClick={onNext} className="w-full sm:w-auto">
            One Final Message ❤️
          </GlowButton>
        </div>

      </div>
    </motion.div>
  );
}

function HeartPhotoNode({ photo, style, delay }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      style={style}
      className="absolute z-10 w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-[#F4A6B7] bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}
