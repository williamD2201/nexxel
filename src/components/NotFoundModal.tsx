import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onViewWork: () => void;
}

export const NotFoundModal: React.FC<NotFoundModalProps> = ({
  isOpen,
  onClose,
  onGoHome,
  onViewWork,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#021818]/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-[#032323] border border-[#00F0FF]/30 text-center flex flex-col items-center shadow-[0_0_80px_rgba(2,24,24,0.95)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close 404 view"
          >
            <X size={18} />
          </button>

          {/* Floating 3D Bubblegum Pop Orb */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 15, -15, 0],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#069494] via-[#00F0FF] to-[#FF69B4] p-[2px] shadow-[0_0_40px_rgba(255,105,180,0.5)] mb-6 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-[#021818] flex items-center justify-center">
              <span className="text-3xl font-extrabold font-mono text-[#FF69B4]">
                404
              </span>
            </div>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Looks like this page floated away.
          </h3>
          <p className="text-sm text-white/70 max-w-xs mb-8">
            The spatial coordinates you requested do not exist in the current NEXEL LAB directory.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              onClick={() => {
                soundManager.playClick();
                onGoHome();
                onClose();
              }}
              className="flex-1 min-w-[130px] py-3 rounded-full bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Home size={14} />
              <span>GO HOME</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onViewWork();
                onClose();
              }}
              className="flex-1 min-w-[130px] py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>VIEW WORK</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
