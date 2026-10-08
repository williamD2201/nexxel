import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';
import { STUDIO_CONFIG, Testimonial } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prev = () => {
    soundManager.playClick();
    setCurrentIndex(prev => (prev === 0 ? STUDIO_CONFIG.testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    soundManager.playClick();
    setCurrentIndex(prev => (prev === STUDIO_CONFIG.testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = STUDIO_CONFIG.testimonials[currentIndex];

  return (
    <section className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF69B4]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
              <span>ENDORSEMENTS & IMPACT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              WHAT PEOPLE SAY
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-[#042525] border border-white/10 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-[#042525] border border-white/10 text-white hover:text-[#FF69B4] hover:border-[#FF69B4] transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Active Testimonial Carousel Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl bg-[#032323] border border-[#00F0FF]/30 shadow-[0_20px_50px_rgba(2,24,24,0.9)] relative"
            >
              <Quote size={48} className="text-[#00F0FF]/25 absolute top-8 right-8 pointer-events-none" />

              <p className="text-lg sm:text-2xl font-medium text-white/90 leading-relaxed italic mb-8">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-lg font-extrabold text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[#FF69B4] font-medium mt-0.5">
                    {current.role} · {current.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#069494]/30 border border-[#00F0FF]/30 text-[#00F0FF]">
                  <CheckCircle2 size={14} className="text-[#FF69B4]" />
                  <span>{current.verifiedResult}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {STUDIO_CONFIG.testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#00F0FF]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
