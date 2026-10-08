import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  onOpenContact: () => void;
  onTriggerEasterEgg: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenContact,
  onTriggerEasterEgg,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [logoClicks, setLogoClicks] = useState<number>(0);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'WORK', href: '#work' },
    { label: 'PROCESS', href: '#process' },
    { label: 'LAB', href: '#lab' },
    { label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    soundManager.playBubblePop();
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    if (nextCount >= 5) {
      onTriggerEasterEgg();
      setLogoClicks(0);
    }
  };

  const handleNavClick = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#021818]/80 backdrop-blur-xl border-b border-[#00F0FF]/15 shadow-[0_10px_30px_-10px_rgba(2,24,24,0.8)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Studio Logo with Easter Egg Counter */}
        <button
          onClick={handleLogoClick}
          className="group flex items-center gap-3 cursor-pointer text-left focus:outline-none"
          title="Click 5 times for a Bubblegum Pop surprise!"
          aria-label="NEXEL LAB Logo"
        >
          {/* Glowing Orb Icon */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#069494] via-[#00F0FF] to-[#FF69B4] p-[1.5px] transition-transform duration-300 group-hover:scale-110">
            <div className="w-full h-full rounded-full bg-[#021818] flex items-center justify-center overflow-hidden">
              <span className="text-[11px] font-bold text-[#00F0FF] group-hover:text-[#FF69B4] transition-colors">
                N
              </span>
            </div>
            {/* Pulsing ring indicator */}
            <span className="absolute -inset-0.5 rounded-full bg-[#FF69B4]/30 blur-sm group-hover:opacity-100 opacity-0 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-wider text-white group-hover:text-[#00F0FF] transition-colors">
              {STUDIO_CONFIG.creator.studio}
            </span>
            <span className="text-[10px] text-white/50 tracking-widest uppercase">
              AI EXPLORER
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#042525]/50 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3.5 py-1 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-[#00F0FF]' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#FF69B4] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Availability Badge & Magnetic CTA */}
        <div className="hidden md:flex items-center gap-5">
          {/* Availability Status Badge */}
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]" />
            </span>
            <span className="uppercase text-[10px] tracking-wider text-white/70">
              {STUDIO_CONFIG.creator.availabilityStatus}
            </span>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              soundManager.playBubblePop();
              onOpenContact();
            }}
            className="group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white overflow-hidden shadow-[0_0_20px_rgba(255,105,180,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="relative z-10">LET&apos;S TALK</span>
            <ArrowUpRight size={14} className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#FF69B4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Fullscreen Animated Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[60px] bg-[#021818]/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-8 border-t border-white/10"
          >
            <div className="flex flex-col gap-5 mt-4">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-2xl font-bold tracking-tight text-white hover:text-[#00F0FF] transition-colors py-1 flex items-center justify-between border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#FF69B4]">0{idx + 1}</span>
                </motion.button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>{STUDIO_CONFIG.creator.availabilityStatus}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF69B4] to-[#00F0FF] text-white font-bold text-center tracking-wider uppercase text-sm shadow-[0_0_20px_rgba(255,105,180,0.4)]"
              >
                LET&apos;S TALK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
