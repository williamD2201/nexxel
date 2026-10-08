import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Briefcase, Sparkles } from 'lucide-react';
import { STUDIO_CONFIG, Milestone } from '../data/studioConfig';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#032020] border-t border-[#00F0FF]/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#069494]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
            <span>TRAJECTORY & VENTURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            EXPERIENCE & JOURNEY
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl">
            Over eight years navigating design leadership, WebGL engineering, and international studio collaborations.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-[#00F0FF]/30 ml-4 sm:ml-8 space-y-12">
          {STUDIO_CONFIG.milestones.map((m: Milestone, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Glowing Node on Line */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#021818] border-2 border-[#FF69B4] group-hover:border-[#00F0FF] group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-[0_0_12px_#FF69B4]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#042828]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#FF69B4] tracking-wider">
                    {m.year}
                  </span>
                  <span className="text-xs text-white/50 font-mono tracking-wider">
                    {m.role}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                  {m.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                  {m.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-white/50 font-mono">
                  <span className="text-[#00F0FF]">KEY PROJECTS:</span>
                  <span>{m.keyProjects}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
