import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Code2, Layers, Cpu, Compass } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

type Category = 'All' | '3D & Motion' | 'Development' | 'Design' | 'Creative Tech';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories: Category[] = ['All', '3D & Motion', 'Development', 'Design', 'Creative Tech'];

  const filteredSkills = selectedCategory === 'All'
    ? STUDIO_CONFIG.skills
    : STUDIO_CONFIG.skills.filter(s => s.category === selectedCategory);

  const handleCategorySelect = (cat: Category) => {
    soundManager.playClick();
    setSelectedCategory(cat);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FF69B4]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#FF69B4] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
              <span>ARSENAL & SPECIALIZATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              TECHNOLOGY & SKILLS
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/70 max-w-md font-normal">
            No mundane percentage bars. A responsive constellation of modern frameworks, mathematical shaders, and creative authoring suites.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 p-1.5 bg-[#032525]/80 border border-white/10 rounded-full max-w-fit mb-10 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#069494] text-[#021818] font-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Floating Node Cluster */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, idx) => {
            const isHovered = hoveredSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                onMouseEnter={() => {
                  soundManager.playClick();
                  setHoveredSkill(skill.name);
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-default ${
                  isHovered
                    ? 'bg-[#042d2d] border-[#FF69B4] shadow-[0_0_25px_rgba(255,105,180,0.35)] -translate-y-1'
                    : 'bg-[#042525]/70 border-white/10 hover:border-[#00F0FF]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isHovered ? 'bg-[#FF69B4] text-white' : 'bg-white/5 text-[#00F0FF]'
                  }`}>
                    {skill.level}
                  </span>
                </div>

                <div className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#00F0FF] transition-colors">
                  {skill.name}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] group-hover:bg-[#FF69B4] transition-colors" />
                  <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                    VERIFIED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
