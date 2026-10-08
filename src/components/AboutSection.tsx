import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Sparkles, ArrowRight, X, Award, CheckCircle2, Terminal } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      rotateX: -(y / rect.height) * 16,
      rotateY: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FF69B4]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
            <span>ABOUT NEXEL LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            THE CREATOR BEHIND THE WORK.
          </h2>
        </div>

        {/* Two-Column Grid: 3D Tilt Profile Card & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Interactive 3D Tilt Card (5 cols) */}
          <div className="lg:col-span-5 perspective-1000 flex justify-center">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: cardTilt.rotateX,
                rotateY: cardTilt.rotateY,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-[380px] rounded-3xl p-5 bg-[#042525]/80 border border-[#00F0FF]/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,24,24,0.9)] group cursor-pointer"
              onClick={() => {
                soundManager.playBubblePop();
                setModalOpen(true);
              }}
              data-cursor="EXPAND"
            >
              {/* Monogram Spatial Crest (No human profile photo) */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-[#021818] border border-[#00F0FF]/30 flex flex-col items-center justify-center p-6 select-none">
                {/* Background ambient radial gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F0FF]/20 via-[#042525]/80 to-[#021818]" />
                
                {/* Concentric orbital rings */}
                <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#00F0FF]/25 animate-[spin_25s_linear_infinite]" />
                <div className="absolute w-32 h-32 rounded-full border border-[#FF69B4]/25 animate-[spin_18s_linear_infinite_reverse]" />

                {/* Central Emblem Badge */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#069494] via-[#00F0FF] to-[#FF69B4] p-[2px] shadow-[0_0_30px_rgba(0,240,255,0.4)] mb-3">
                    <div className="w-full h-full rounded-2xl bg-[#021818] flex items-center justify-center">
                      <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-[#00F0FF] to-[#FF69B4] font-display">
                        NX
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold tracking-widest text-white uppercase font-mono">
                    NEXEL
                  </span>
                  <span className="text-[10px] text-[#00F0FF] font-mono tracking-wider mt-0.5">
                    AI EXPLORER & STUDENT
                  </span>
                </div>

                {/* Status Badge in Corner */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#021818]/90 border border-[#00F0FF]/40 backdrop-blur-md flex items-center gap-2 text-[10px] font-semibold tracking-wider text-white">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span>LEARNING</span>
                </div>

                {/* Bottom telemetry */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[9px] font-mono text-white/40 border-t border-white/5 pt-2">
                  <span>EXP: 2024–PRESENT</span>
                  <span className="text-[#FF69B4]">DISCOVERING AI</span>
                </div>
              </div>

              {/* Card Metadata */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors">
                    {STUDIO_CONFIG.creator.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#00F0FF] font-semibold px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                    STUDENT
                  </span>
                </div>
                <p className="text-xs text-white/70 mt-1 font-medium">
                  {STUDIO_CONFIG.creator.role}
                </p>

                <div className="flex items-center gap-2 text-xs text-white/50 mt-4 pt-4 border-t border-white/10">
                  <MapPin size={13} className="text-[#00F0FF]" />
                  <span>{STUDIO_CONFIG.creator.location}</span>
                </div>
              </div>

              {/* Card Holographic Corner Edge Accents */}
              <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-[#FF69B4] rounded-tl-3xl pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-[#00F0FF] rounded-br-3xl pointer-events-none" />
            </motion.div>
          </div>

          {/* Column 2: Studio Narrative & Philosophy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Signature Creator Philosophy Quote */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#042525]/50 border-l-4 border-[#FF69B4] border-t border-r border-b border-white/10 mb-8 w-full">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">
                CREATIVE CREDO
              </span>
              <p className="text-xl sm:text-2xl font-bold italic text-white mt-2 leading-snug">
                &ldquo;{STUDIO_CONFIG.creator.philosophyQuote}&rdquo;
              </p>
            </div>

            {/* Core Bio */}
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal mb-6">
              {STUDIO_CONFIG.creator.bio}
            </p>

            {/* Extended context points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div className="p-4 rounded-xl bg-[#032020] border border-white/5">
                <div className="text-xs font-mono text-[#00F0FF] uppercase mb-1">Current Focus</div>
                <div className="text-sm font-semibold text-white">Learning & Discovering AI Models</div>
              </div>
              <div className="p-4 rounded-xl bg-[#032020] border border-white/5">
                <div className="text-xs font-mono text-[#FF69B4] uppercase mb-1">Availability</div>
                <div className="text-sm font-semibold text-white">Open to Collaborations & Learning</div>
              </div>
            </div>

            {/* More About Me Button */}
            <button
              onClick={() => {
                soundManager.playBubblePop();
                setModalOpen(true);
              }}
              data-cursor="ABOUT"
              className="px-6 py-3 rounded-full bg-[#069494]/30 hover:bg-[#069494]/60 border border-[#00F0FF]/40 text-white hover:text-[#00F0FF] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_20px_rgba(6,148,148,0.3)]"
            >
              <span>MORE ABOUT MY LEARNING JOURNEY</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Profile Modal / Drawer */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#021818]/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#032525] border border-[#00F0FF]/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(2,24,24,0.95)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close profile modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-[#00F0FF] uppercase mb-2">
                <Sparkles size={14} className="text-[#FF69B4]" />
                <span>STUDENT AI EXPLORATION DOSSIER</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {STUDIO_CONFIG.creator.name}
              </h3>
              <p className="text-sm text-[#FF69B4] font-medium mb-6">
                {STUDIO_CONFIG.creator.role}
              </p>

              <div className="space-y-6 text-sm text-white/80 leading-relaxed">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-white/40 mb-2">
                    MY LEARNING JOURNEY & MOTIVATION
                  </h4>
                  <p>{STUDIO_CONFIG.creator.extendedBio}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-white/40 mb-2">
                    TECHNOLOGIES & TOOLS I AM EXPLORING
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#00F0FF]" />
                      <span>Multi-Modal AI APIs (Gemini, Claude)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#00F0FF]" />
                      <span>Python & Neural Model Experimentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#00F0FF]" />
                      <span>React 19, TypeScript, Next.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#00F0FF]" />
                      <span>Three.js & 3D Web Visualizers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#00F0FF]" />
                      <span>Prompt Engineering & Fine-Tuning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[#00F0FF]" />
                      <span>Interactive Creative Coding</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white/50">
                  <span>Contact: {STUDIO_CONFIG.creator.location}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-[#00F0FF]">{STUDIO_CONFIG.creator.email}</span>
                    <span>·</span>
                    <span className="text-[#FF69B4]">{STUDIO_CONFIG.creator.secondaryEmail}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
