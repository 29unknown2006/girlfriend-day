import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VolumeX, Music } from 'lucide-react';
import musicFile from '../assets/audio/placeholder-music.mp3';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Web Audio synth fallback for ambient romantic music
  const startRomanticSynth = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Soft romantic pentatonic melody notes (Hz)
      const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25]; // C4, E4, G4, A4, C5, E5
      let step = 0;

      synthIntervalRef.current = setInterval(() => {
        if (!synthCtxRef.current || synthCtxRef.current.state !== 'running') return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        const note = notes[step % notes.length];
        step++;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);
        
        // Gentle envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);
      }, 1600);
    } catch (e) {
      console.warn("Web Audio fallback init error", e);
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === 'running') {
      synthCtxRef.current.suspend();
    }
  };

  const toggleMusic = async () => {
    if (!isPlaying) {
      // Try playing MP3 first
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          return;
        } catch (err) {
          console.log("Audio file play failed, using Web Audio synth fallback", err);
        }
      }
      // If audio file fails, use synth fallback
      startRomanticSynth();
      setIsPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopRomanticSynth();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopRomanticSynth();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Hidden HTML Audio element targeting placeholder music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={musicFile}
        onError={() => console.log("Audio file fallback active")}
      />

      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border transition-all duration-300
          ${isPlaying 
            ? 'bg-[#E8737A] text-white border-white shadow-[#E8737A]/40' 
            : 'bg-white/80 text-[#B94F5C] border-[#F4A6B7]'
          }
        `}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        title={isPlaying ? "Mute Music" : "Play Music ❤️"}
      >
        {isPlaying ? (
          <motion.div 
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Music className="w-5 h-5 animate-pulse" />
          </motion.div>
        ) : (
          <VolumeX className="w-5 h-5 opacity-70" />
        )}
      </motion.button>
    </div>
  );
}
