import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ProjectCTAProps {
  onStartProject: () => void;
  onSayHello: () => void;
}

export const ProjectCTA: React.FC<ProjectCTAProps> = ({ onStartProject, onSayHello }) => {
  return (
    <section className="relative py-28 bg-[#032323] border-t border-[#00F0FF]/15 overflow-hidden">
      {/* Background glow sweep */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#FF69B4]/20 via-[#00F0FF]/15 to-[#069494]/30 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#042828] border border-[#FF69B4]/30 text-[#FF69B4] text-xs font-mono uppercase tracking-[0.2em] mb-6">
          <Sparkles size={14} className="text-[#00F0FF]" />
          <span>INITIALIZE COMMISSIONS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.05] text-balance mb-6">
          HAVE AN IDEA?{' '}
          <span className="text-gradient-bubblegum block mt-1">
            LET&apos;S BUILD IT.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-white/75 max-w-xl mb-10 leading-relaxed font-normal">
          From early concept to international launch, let&apos;s engineer something tactile, visionary, and unforgettable.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundManager.playBubblePop();
              onStartProject();
            }}
            data-cursor="START"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(255,105,180,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onSayHello();
            }}
            className="px-8 py-4 rounded-full bg-[#042828]/80 hover:bg-[#069494]/30 border border-white/20 hover:border-[#00F0FF] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <MessageCircle size={16} className="text-[#00F0FF]" />
            <span>JUST SAY HELLO</span>
          </button>
        </div>
      </div>
    </section>
  );
};
