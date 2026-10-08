import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Layout,
  Palette,
  Film,
  Activity,
  Box,
  Sparkles,
  Cpu,
  ChevronDown,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { STUDIO_CONFIG, Service } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={22} />,
  Layout: <Layout size={22} />,
  Palette: <Palette size={22} />,
  Film: <Film size={22} />,
  Activity: <Activity size={22} />,
  Box: <Box size={22} />,
  Sparkles: <Sparkles size={22} />,
  Cpu: <Cpu size={22} />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    soundManager.playClick();
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#069494]/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF69B4]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
              <span>CAPABILITIES & DISCIPLINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              STUDIO SERVICES
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/70 max-w-md font-normal">
            Bespoke creative disciplines spanning next-generation web engineering, spatial visualizers, and sensory digital identity.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDIO_CONFIG.services.map((svc: Service, idx: number) => {
            const isExpanded = expandedId === svc.id;

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#042828] border-2 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.25)]'
                    : 'bg-[#042525]/60 hover:bg-[#042525]/90 border border-white/10 hover:border-[#FF69B4]/40 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#00F0FF]">
                      {svc.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF69B4]">
                      {iconMap[svc.iconName] || <Sparkles size={20} />}
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-lg font-extrabold text-white mb-2 tracking-wide">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                    {svc.shortDesc}
                  </p>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 border-t border-white/10 space-y-4 text-xs"
                      >
                        <p className="text-white/80 leading-relaxed font-normal">
                          {svc.fullDesc}
                        </p>

                        <div>
                          <div className="text-[10px] uppercase font-mono tracking-wider text-[#00F0FF] mb-2 font-semibold">
                            KEY DELIVERABLES
                          </div>
                          <ul className="space-y-1.5">
                            {svc.deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-1.5 text-white/70">
                                <Check size={13} className="text-[#FF69B4] mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-mono tracking-wider text-[#00F0FF] mb-2 font-semibold">
                            TOOLS & SKILLS
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {svc.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded-md bg-[#021818] border border-white/10 text-[11px] text-white/80 font-mono"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectService(svc.title)}
                          className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:opacity-90"
                        >
                          <span>INQUIRE ABOUT THIS</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Toggle Control */}
                <button
                  onClick={() => toggleExpand(svc.id)}
                  className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-xs font-semibold text-white/60 hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'LESS DETAILS' : 'EXPLORE DETAILS'}</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#00F0FF]' : ''}`}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
