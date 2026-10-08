import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(true);

  useEffect(() => {
    // Disable on touch devices or reduced-motion
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check target element for custom data-cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveElement = target.closest('[data-cursor]') as HTMLElement | null;
        if (interactiveElement) {
          const action = interactiveElement.getAttribute('data-cursor');
          setCursorText(action || '');
          setIsHovered(true);
        } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Primary Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? (cursorText ? 2.4 : 1.6) : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.2,
        }}
      >
        <div
          className={`relative rounded-full flex items-center justify-center transition-all duration-200 ${
            cursorText
              ? 'w-16 h-16 bg-[#FF69B4]/85 text-white backdrop-blur-md border border-[#00F0FF]/60 shadow-[0_0_20px_rgba(255,105,180,0.6)]'
              : isHovered
              ? 'w-10 h-10 bg-[#00F0FF]/25 border border-[#00F0FF] backdrop-blur-sm'
              : 'w-8 h-8 border border-[#00F0FF]/40 bg-transparent'
          }`}
        >
          {cursorText && (
            <span className="text-[9px] font-bold tracking-widest uppercase font-mono text-white select-none">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Tiny Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101] w-2 h-2 rounded-full bg-[#00F0FF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#00F0FF]"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isHovered && cursorText ? 0 : 1,
        }}
        transition={{ duration: 0.02 }}
      />
    </>
  );
};
