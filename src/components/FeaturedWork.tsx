import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { STUDIO_CONFIG, Project } from '../data/studioConfig';
import { CaseStudyModal } from './CaseStudyModal';
import { soundManager } from '../utils/audio';

type CategoryFilter = 'ALL' | 'WEB' | 'DESIGN' | 'BRANDING' | 'MOTION' | '3D' | 'EXPERIMENTAL';

export const FeaturedWork: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filterOptions: CategoryFilter[] = ['ALL', '3D', 'WEB', 'MOTION', 'BRANDING', 'DESIGN'];

  const filteredProjects = selectedFilter === 'ALL'
    ? STUDIO_CONFIG.projects
    : STUDIO_CONFIG.projects.filter(p => p.category === selectedFilter);

  const handleFilterChange = (filter: CategoryFilter) => {
    soundManager.playClick();
    setSelectedFilter(filter);
  };

  const handleOpenCaseStudy = (project: Project) => {
    soundManager.playBubblePop();
    setActiveModalProject(project);
  };

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-[#00F0FF]/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#FF69B4]/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              SELECTED WORK
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/70 max-w-md font-normal">
            A curated portfolio of boundary-pushing 3D web applications, fluid typography, luxury identities, and generative audio systems.
          </p>
        </div>

        {/* Filter Segmented Control Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#032525]/80 border border-white/10 rounded-full max-w-fit mb-12 overflow-x-auto">
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white shadow-[0_0_15px_rgba(255,105,180,0.35)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Editorial Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => {
              // Create layout rhythm based on index and project size
              const colSpan =
                project.size === 'full'
                  ? 'md:col-span-12'
                  : project.size === 'large'
                  ? 'md:col-span-8'
                  : project.size === 'small'
                  ? 'md:col-span-4'
                  : idx % 3 === 0
                  ? 'md:col-span-8'
                  : 'md:col-span-6 lg:col-span-4';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`${colSpan} group relative rounded-3xl overflow-hidden bg-[#032323] border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
                  onClick={() => handleOpenCaseStudy(project)}
                  data-cursor="VIEW"
                >
                  {/* Media Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#021818]">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Scrim for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#032323] via-transparent to-transparent opacity-85" />

                    {/* Floating Corner Category Label */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#021818]/80 border border-white/20 backdrop-blur-md text-[10px] font-mono text-[#00F0FF] uppercase font-bold tracking-wider">
                      {project.category} · {project.year}
                    </div>

                    {/* Hover Arrow Badge */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FF69B4]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags & Action Link */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex flex-wrap gap-2 text-white/50 font-mono text-[11px]">
                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="hover:text-white transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-[#FF69B4] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
                        CASE STUDY <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectProject={setActiveModalProject}
        allProjects={STUDIO_CONFIG.projects}
      />
    </section>
  );
};
