import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EasterEggProps {
  triggered: boolean;
  onClose: () => void;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ triggered, onClose }) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (triggered) {
      triggerBurst();
    }
  }, [triggered]);

  useEffect(() => {
    // Keyboard shortcut 'B' or 'b'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'b' || e.key === 'B') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        triggerBurst();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerBurst = () => {
    setActive(true);
    soundManager.enabled = true;
    soundManager.playBubblePop();
    setTimeout(() => soundManager.playIntroChime(), 150);

    // Bubblegum Pop Confetti Fireworks
    const colors = ['#FF69B4', '#00F0FF', '#069494', '#FFFFFF'];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 250);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setActive(false);
      onClose();
    }, 4500);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#032525]/95 border-2 border-[#FF69B4] text-white backdrop-blur-xl shadow-[0_0_40px_rgba(255,105,180,0.6)]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#FF69B4] flex items-center justify-center animate-spin">
            <Sparkles size={16} className="text-white" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold text-[#00F0FF]">
              EASTER EGG UNLOCKED!
            </span>
            <span className="text-xs text-white/90 font-medium">
              Bubblegum Pop Sensory Resonance Activated
            </span>
          </div>

          <button
            onClick={() => {
              setActive(false);
              onClose();
            }}
            className="ml-2 p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
