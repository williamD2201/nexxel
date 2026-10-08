import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

// Custom high-fidelity brand SVGs for exact requested platforms
const renderPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'discord':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.782-.88-2.059-.98-.276-.1-.477-.15-.678.15-.2.302-.779.98-.955 1.18-.175.201-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.894-.799-1.498-1.786-1.674-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.2.05-.376-.025-.526-.076-.15-.678-1.635-.93-2.239-.245-.588-.494-.508-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.513c0 1.482 1.08 2.914 1.23 3.115.151.2 2.126 3.247 5.15 4.555.719.311 1.281.497 1.719.636.723.23 1.38.197 1.9-.12.58-.352 1.782-1.728 2.033-2.356.251-.628.251-1.168.176-1.27-.076-.1-.277-.15-.578-.301zM12 2a10 10 0 0 0-8.6 15.09L2 22l5.05-1.32A10 10 0 1 0 12 2zm0 18.15c-1.57 0-3.08-.42-4.4-1.22l-.31-.19-3.26.86.87-3.18-.2-.33A8.15 8.15 0 1 1 12 20.15z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'x / twitter':
    case 'x':
    case 'twitter':
    default:
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
};

export const SocialHub: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#032020] border-t border-[#00F0FF]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#FF69B4] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span>CONNECT & FOLLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            LET&apos;S CONNECT
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-2 max-w-lg">
            Follow my journey as a student exploring AI models, sharing code repositories, and experimenting across digital channels.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIO_CONFIG.socials.map((soc, idx) => (
            <motion.a
              key={soc.platform}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              onClick={() => soundManager.playBubblePop()}
              onMouseEnter={() => soundManager.playClick()}
              className="p-6 rounded-2xl bg-[#042828]/70 border border-white/10 hover:border-[#FF69B4]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Interactive Logo that opens link */}
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] group-hover:text-[#FF69B4] group-hover:bg-[#FF69B4]/10 transition-colors shadow-sm">
                    {renderPlatformIcon(soc.platform)}
                  </div>
                  <ArrowUpRight size={18} className="text-white/40 group-hover:text-[#00F0FF] transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-[#00F0FF] transition-colors">
                  {soc.platform}
                </h3>
                <span className="text-xs font-mono text-[#FF69B4] font-semibold block mb-2">
                  {soc.handle}
                </span>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {soc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="group-hover:text-white transition-colors">OPEN {soc.platform.toUpperCase()} →</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

