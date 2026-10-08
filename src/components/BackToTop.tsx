import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));
      setVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundManager.playBubblePop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#042828]/90 border border-[#00F0FF]/40 text-white backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:border-[#FF69B4] hover:shadow-[0_0_25px_rgba(255,105,180,0.5)] transition-all duration-300 hover:scale-110 cursor-pointer group"
          aria-label="Back to top of page"
        >
          {/* Circular progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]">
            <circle
              cx="22"
              cy="22"
              r="20"
              className="text-white/10 stroke-current"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="20"
              className="text-[#FF69B4] stroke-current"
              strokeWidth="2.5"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <ArrowUp
            size={18}
            className="text-[#00F0FF] group-hover:text-white group-hover:-translate-y-0.5 transition-all"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
