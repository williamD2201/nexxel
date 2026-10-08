import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [soundActive, setSoundActive] = useState<boolean>(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    // Progress counter ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    // Sequence stages
    const t1 = setTimeout(() => setStep(2), 500);   // Particles & orb emerges
    const t2 = setTimeout(() => {
      setStep(3);
      soundManager.playIntroChime();
    }, 1300); // Light sweep & words
    const t3 = setTimeout(() => setStep(4), 2400);  // "CREATIVE. DIGITAL. UNLIMITED."
    const t4 = setTimeout(() => {
      onComplete();
    }, 3800); // Transition out

    return () => {
      clearInterval(timer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const toggleSound = () => {
    const newState = !soundActive;
    setSoundActive(newState);
    soundManager.enabled = newState;
    if (newState) {
      soundManager.playBubblePop();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#021818] overflow-hidden select-none"
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#069494]/30 via-[#FF69B4]/15 to-[#00F0FF]/25 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#069494_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
      </div>

      {/* Top Controls: Sound & Skip */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs tracking-wider z-20">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
        >
          {soundActive ? <Volume2 size={13} className="text-[#00F0FF]" /> : <VolumeX size={13} className="text-white/60" />}
          <span>SOUND {soundActive ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#069494]/20 hover:bg-[#00F0FF]/20 text-[#00F0FF] hover:text-white transition-all cursor-pointer font-medium"
        >
          <span>SKIP INTRO</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Center 3D Bubble Ident Presentation */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 max-w-lg z-10">
        {/* Floating Bubble Glow Core */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-44 h-44 mb-8 flex items-center justify-center"
        >
          {/* Animated concentric rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-[#00F0FF]/30 border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-[#FF69B4]/30"
          />
          
          {/* Glass Bubble Sphere */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#069494] via-[#042525] to-[#FF69B4]/40 border border-[#00F0FF]/50 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.35)] flex items-center justify-center overflow-hidden">
            {/* Gloss reflection highlight */}
            <div className="absolute -top-4 -left-4 w-20 h-14 bg-white/40 blur-md rounded-full transform -rotate-45" />
            <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#FF69B4]/50 blur-lg rounded-full" />
            
            {/* Center Studio Emblem */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center"
            >
              <Sparkles size={22} className="text-[#00F0FF]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Studio Name Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#00F0FF] font-semibold">
            NEXEL LAB · STUDENT & AI EXPLORER
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 text-white">
            CREATIVE DIGITAL UNLIMITED
          </h1>
        </motion.div>

        {/* Dynamic Scene Slogan */}
        <AnimatePresence mode="wait">
          {step >= 3 && (
            <motion.div
              key="slogan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium tracking-widest text-[#FF69B4] flex items-center justify-center gap-3 uppercase my-2"
            >
              <span>CREATIVE</span>
              <span className="text-white/30">/</span>
              <span>DIGITAL</span>
              <span className="text-white/30">/</span>
              <span>UNLIMITED</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar & Loading Percentage */}
        <div className="w-64 mt-6">
          <div className="flex justify-between items-center text-[11px] font-mono text-white/50 mb-1.5 tabular-nums">
            <span>SYNTHESIZING SYSTEM</span>
            <span className="text-[#00F0FF] font-semibold">{progress}%</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#069494] via-[#00F0FF] to-[#FF69B4]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* Subtle Bottom Ambient Tag */}
      <div className="absolute bottom-6 text-[10px] uppercase tracking-[0.25em] text-white/40">
        BUBBLEGUM POP 3D ENGINE • NEXEL
      </div>
    </motion.div>
  );
};
