import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { ThreeBubbleOrb } from './ThreeBubbleOrb';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

interface HeroProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
  onAboutClick: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onExploreWork,
  onAboutClick,
  onOpenResume,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#021818]"
    >
      {/* Background Lighting Gradients & Subdued Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-[#069494]/25 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#FF69B4]/18 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#00F0FF]/15 blur-[120px] rounded-full" />

        {/* Precision Studio Subtle Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06949415_1px,transparent_1px),linear-gradient(to_bottom,#06949415_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Hero Typography & Actions (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Status Kicker */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#042525]/80 border border-[#00F0FF]/25 text-[#00F0FF] text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF69B4] animate-ping" />
            <span>{STUDIO_CONFIG.creator.tagline}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight leading-[1.05] text-white max-w-2xl text-balance">
            CREATING <span className="text-gradient-bubblegum">DIGITAL</span>{' '}
            EXPERIENCES THAT PEOPLE{' '}
            <span className="relative inline-block">
              REMEMBER.
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF69B4] to-[#00F0FF] rounded-full" />
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg text-white/75 font-normal leading-relaxed max-w-xl">
            {STUDIO_CONFIG.creator.heroSubtext}
          </p>

          {/* Primary Calls to Action */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                onExploreWork();
              }}
              data-cursor="EXPLORE"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(255,105,180,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              EXPLORE WORK
            </button>

            <button
              onClick={() => {
                soundManager.playBubblePop();
                onOpenContact();
              }}
              data-cursor="TALK"
              className="px-7 py-3.5 rounded-full bg-[#042525]/80 hover:bg-[#069494]/30 border border-[#00F0FF]/40 text-white hover:text-[#00F0FF] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Secondary Links Strip */}
          <div className="mt-8 flex items-center gap-6 text-xs font-semibold tracking-wider text-white/60">
            <button
              onClick={onOpenResume}
              className="hover:text-[#00F0FF] transition-colors cursor-pointer flex items-center gap-1.5 underline decoration-white/20 underline-offset-4 hover:decoration-[#00F0FF]"
            >
              <span>VIEW RESUME</span>
            </button>
            <span className="text-white/20">/</span>
            <button
              onClick={onAboutClick}
              className="hover:text-[#FF69B4] transition-colors cursor-pointer flex items-center gap-1.5 underline decoration-white/20 underline-offset-4 hover:decoration-[#FF69B4]"
            >
              <span>ABOUT NEXEL LAB</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Bubblegum Pop Orb Scene (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]"
          data-cursor="DRAG"
        >
          {/* Main Three.js Interactive Scene */}
          <div className="w-full h-full max-w-[460px] aspect-square relative z-10">
            <ThreeBubbleOrb size="hero" interactive={true} />
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full pt-6 flex items-center justify-between text-xs tracking-widest uppercase text-white/40 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-[#00F0FF]/40" />
          <span>NEXEL © 2026</span>
        </div>

        <button
          onClick={onExploreWork}
          className="flex items-center gap-2 text-white/60 hover:text-[#00F0FF] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="animate-bounce text-[#FF69B4]" />
        </button>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-white/50">
          <span>LAT 35.6762° N</span>
          <span>·</span>
          <span>TYO</span>
        </div>
      </div>
    </section>
  );
};
