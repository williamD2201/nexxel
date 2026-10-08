import React from 'react';
import { motion } from 'motion/react';
import { STUDIO_CONFIG } from '../data/studioConfig';

export const CreativePhilosophy: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#032222] border-t border-[#00F0FF]/15 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#FF69B4]/15 via-[#00F0FF]/10 to-[#069494]/20 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Large Statement Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF69B4] mb-4 block font-semibold">
            CORE PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            DESIGN IS NOT JUST HOW IT LOOKS.{' '}
            <span className="text-gradient-cyan block mt-2">
              IT&apos;S HOW IT FEELS.
            </span>
          </h2>
        </motion.div>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STUDIO_CONFIG.principles.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="relative p-8 rounded-2xl bg-[#042828]/70 border border-white/10 hover:border-[#FF69B4]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Number identifier */}
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#00F0FF]/60 group-hover:text-[#00F0FF] transition-colors mb-4">
                  {p.num} —
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide mb-2">
                  {p.title}
                </h3>
                <p className="text-sm font-semibold text-[#FF69B4] mb-4">
                  {p.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>PILLAR 0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
