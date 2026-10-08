import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Download } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenCookies: () => void;
  onOpen404: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenCookies,
  onOpen404,
}) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    soundManager.playClick();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#021818] via-[#032424] to-[#011414] border-t border-[#00F0FF]/15 text-white pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#069494]/25 via-[#FF69B4]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {/* Mini Bubblegum Pop Orb */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#069494] via-[#00F0FF] to-[#FF69B4] p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-[#021818] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#00F0FF]">N</span>
                  </div>
                </div>
                <span className="text-xl font-extrabold tracking-wider text-white">
                  {STUDIO_CONFIG.creator.studio}
                </span>
              </div>

              <p className="text-sm text-white/70 max-w-sm leading-relaxed mb-6 font-normal">
                Student and creative experimenter exploring artificial intelligence, modern web interfaces, and sensory digital technology.
              </p>
            </div>

            <div className="text-xs text-white/40 font-mono">
              CURATED BY {STUDIO_CONFIG.creator.name.toUpperCase()} · STUDENT & AI EXPLORER
            </div>
          </div>

          {/* Column 2: Explore Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00F0FF] font-bold mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-white/70">
              <li>
                <button
                  onClick={() => handleLinkClick('#hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ABOUT
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SERVICES
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#work')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  WORK
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  PROCESS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#lab')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  CREATIVE LAB
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Dispatch (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF69B4] font-bold mb-4">
              NETWORKS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {STUDIO_CONFIG.socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#00F0FF] transition-colors group"
                  >
                    <span>{s.platform}</span>
                    <ArrowUpRight size={13} className="text-white/30 group-hover:text-[#00F0FF] transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Availability (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00F0FF] font-bold mb-4">
              DISPATCH
            </h4>
            <div className="text-xs text-white/75 space-y-1.5 font-mono">
              <div className="text-white font-semibold">
                <a href="mailto:nexxel.me@gmail.com" className="hover:text-[#00F0FF] transition-colors">
                  nexxel.me@gmail.com
                </a>
              </div>
              <div className="text-white/70">
                <a href="mailto:info@nexxel.me" className="hover:text-[#FF69B4] transition-colors">
                  info@nexxel.me
                </a>
              </div>
              <div className="text-white/40 pt-1 text-[11px] font-sans">
                Location: {STUDIO_CONFIG.creator.location}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                STATUS
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#069494]/30 border border-[#00F0FF]/30 text-[10px] font-mono text-[#00F0FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>{STUDIO_CONFIG.creator.availabilityStatus}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/nexel-portfolio-source.zip"
                download="nexel-portfolio-source.zip"
                onClick={() => soundManager.playPop()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#069494]/30 hover:bg-[#FF69B4]/20 border border-[#00F0FF]/30 hover:border-[#FF69B4]/50 text-xs font-mono text-[#00F0FF] hover:text-[#FF69B4] transition-all duration-300 w-fit group"
                title="Download full project source code as a ZIP archive"
              >
                <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                <span>Download Source ZIP</span>
              </a>

              <button
                onClick={onOpen404}
                className="text-[10px] font-mono text-white/40 hover:text-[#FF69B4] transition-colors cursor-pointer underline text-left"
              >
                Inspect 404 Visual Fallback Page →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Tiny Animated Orb Detail */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-3">
            {/* Tiny animated Bubblegum Pop orb */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#FF69B4] shadow-[0_0_8px_#00F0FF]"
            />
            <span>
              © {currentYear} {STUDIO_CONFIG.creator.studio}. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={onOpenCookies}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>

          <div className="text-[11px] text-white/40 font-mono">
            Designed & Developed by {STUDIO_CONFIG.creator.name}
          </div>
        </div>
      </div>
    </footer>
  );
};
