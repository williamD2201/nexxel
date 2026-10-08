import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, ExternalLink, Github, CheckCircle, Sparkles } from 'lucide-react';
import { Project } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (proj: Project) => void;
  allProjects: Project[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handleNavigate = (target: Project) => {
    soundManager.playClick();
    onSelectProject(target);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#021818]/90 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl my-auto bg-[#032525] border border-[#00F0FF]/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(2,24,24,0.95)] max-h-[92vh] overflow-y-auto"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 sticky top-0 bg-[#032525]/90 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#FF69B4]/20 border border-[#FF69B4]/40 text-[#FF69B4] text-[10px] font-mono font-bold tracking-wider uppercase">
                {project.category}
              </span>
              <span className="text-xs text-white/50 font-mono">
                RELEASE YEAR: {project.year}
              </span>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-[#FF69B4] transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>
          </div>

          {/* Project Title & Subtitle */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-[#00F0FF] font-medium mb-6">
            {project.subtitle}
          </p>

          {/* Project Hero Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10 bg-[#021818]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#032525] via-transparent to-transparent opacity-60" />
          </div>

          {/* Key Metrics / Highlights if present */}
          {project.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {project.stats.map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#042828] border border-white/5">
                  <div className="text-[11px] font-mono text-white/50 uppercase">{s.label}</div>
                  <div className="text-xl font-bold text-white mt-0.5 font-mono text-[#00F0FF]">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Deep Dive Breakdown */}
          <div className="space-y-8 text-sm sm:text-base text-white/80 leading-relaxed">
            {/* Overview */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF69B4] mb-2 font-bold">
                01. PROJECT OVERVIEW
              </h3>
              <p>{project.caseStudy.overview}</p>
            </div>

            {/* Challenge & Objective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#021d1d] border border-white/5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-2 font-bold">
                  THE CHALLENGE
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#021d1d] border border-white/5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#FF69B4] mb-2 font-bold">
                  THE OBJECTIVE
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.caseStudy.objective}
                </p>
              </div>
            </div>

            {/* Process & Design */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00F0FF] mb-2 font-bold">
                02. CREATIVE PROCESS & DESIGN EXECUTION
              </h3>
              <p className="mb-3">{project.caseStudy.process}</p>
              <p className="text-white/70">{project.caseStudy.design}</p>
            </div>

            {/* Development & Technology */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF69B4] mb-2 font-bold">
                03. TECHNICAL ARCHITECTURE & STACK
              </h3>
              <p className="mb-4">{project.caseStudy.development}</p>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy.technology.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#042828] border border-[#00F0FF]/30 text-xs font-mono text-[#00F0FF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Result & Lessons */}
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#069494]/30 to-[#042828] border border-[#00F0FF]/25">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00F0FF] mb-2 font-bold">
                04. MEASURABLE RESULT & CLIENT IMPACT
              </h3>
              <p className="text-white font-medium mb-3">{project.caseStudy.result}</p>
              <p className="text-xs text-white/70 italic">&ldquo;{project.caseStudy.lessons}&rdquo;</p>
            </div>

            {/* Action Buttons: View Live & Source */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {project.caseStudy.liveUrl && (
                <a
                  href={project.caseStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF69B4] to-[#00F0FF] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                >
                  <span>VIEW LIVE SITE</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.caseStudy.repoUrl && (
                <a
                  href={project.caseStudy.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Github size={14} />
                  <span>VIEW SOURCE</span>
                </a>
              )}
            </div>
          </div>

          {/* Bottom Prev / Next Project Navigation Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => handleNavigate(prevProject)}
              className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-[#00F0FF] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <div className="text-left">
                <span className="text-[10px] block font-mono text-white/40">PREV PROJECT</span>
                <span>{prevProject.title.split('—')[0]}</span>
              </div>
            </button>

            <button
              onClick={() => handleNavigate(nextProject)}
              className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-[#FF69B4] transition-colors cursor-pointer text-right"
            >
              <div className="text-right">
                <span className="text-[10px] block font-mono text-white/40">NEXT PROJECT</span>
                <span>{nextProject.title.split('—')[0]}</span>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
