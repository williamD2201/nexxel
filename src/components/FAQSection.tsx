import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { STUDIO_CONFIG, FAQItem } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    soundManager.playClick();
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
            <span>CLARITY & ENGAGEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-lg">
            Straight answers regarding project scopes, technology choices, timelines, and post-launch commitments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {STUDIO_CONFIG.faqs.map((faq: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#042828] border-[#00F0FF]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                    : 'bg-[#032222]/80 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#00F0FF]/20 text-[#00F0FF]' : 'bg-white/5 text-white/50'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-white/75 leading-relaxed font-normal border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
