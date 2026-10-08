import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { STUDIO_CONFIG, ProcessStep } from '../data/studioConfig';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#032020] border-t border-[#00F0FF]/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#069494]/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#FF69B4] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span>METHODOLOGY & EXECUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            HOW THE WORK HAPPENS
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl">
            A battle-tested 4-stage sprint taking projects from early conceptual sparks to award-worthy interactive launches.
          </p>
        </div>

        {/* 4 Process Steps Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STUDIO_CONFIG.process.map((step: ProcessStep, idx: number) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              className="relative p-7 rounded-2xl bg-[#042828]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step Number with glowing ring */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-[#FF69B4]">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="text-xl font-extrabold text-white mb-1.5 tracking-wide group-hover:text-[#00F0FF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-[#00F0FF] mb-4">
                  {step.subtitle}
                </p>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>

                {/* Milestone Checklist */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block mb-2">
                    CORE DELIVERABLES:
                  </span>
                  {step.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2 text-xs text-white/80">
                      <CheckCircle2 size={13} className="text-[#00F0FF] mt-0.5 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF69B4] transition-all duration-500 group-hover:w-full"
                  style={{ width: `${(idx + 1) * 25}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
