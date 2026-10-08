import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';

export type LegalModalType = 'privacy' | 'terms' | 'cookies' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  const titles: Record<string, { title: string; icon: React.ReactNode }> = {
    privacy: { title: 'Privacy Policy', icon: <ShieldCheck size={20} className="text-[#00F0FF]" /> },
    terms: { title: 'Terms of Service', icon: <FileText size={20} className="text-[#FF69B4]" /> },
    cookies: { title: 'Cookie Policy', icon: <Cookie size={20} className="text-[#00F0FF]" /> },
  };

  const currentMeta = titles[activeModal];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#021818]/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#032525] border border-[#00F0FF]/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(2,24,24,0.95)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              {currentMeta.icon}
              <h3 className="text-xl font-extrabold text-white">
                {currentMeta.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
            {activeModal === 'privacy' && (
              <>
                <p>
                  <strong>Effective Date:</strong> January 1, 2026.
                </p>
                <p>
                  At {STUDIO_CONFIG.creator.studio}, your privacy is paramount. We do not sell, rent, or monetize your personal data. Information provided through our inquiry form (such as your name, email, and project scope) is strictly utilized to communicate regarding requested commissions and studio services.
                </p>
                <p>
                  We adhere to international standards including GDPR and CCPA. You have the right at any time to request the inspection, modification, or complete deletion of your submission data by contacting{' '}
                  <span className="text-[#00F0FF]">{STUDIO_CONFIG.creator.email}</span>.
                </p>
                <p>
                  Third-party integrations (such as fonts or CDN hosting) are chosen with high-level performance and minimal telemetry tracking in mind.
                </p>
              </>
            )}

            {activeModal === 'terms' && (
              <>
                <p>
                  <strong>Last Updated:</strong> 2026.
                </p>
                <p>
                  By accessing the website and digital artifacts of {STUDIO_CONFIG.creator.studio}, you acknowledge that all visual designs, interactive 3D concepts, and proprietary shader codes are the intellectual property of {STUDIO_CONFIG.creator.name} unless otherwise contracted.
                </p>
                <p>
                  Client engagements are governed by bespoke Statements of Work (SOW) executed between {STUDIO_CONFIG.creator.studio} and the partnering organization.
                </p>
                <p>
                  Code snippets displayed in the Creative Lab workbench are provided for educational and interactive review under open permissive evaluation standards.
                </p>
              </>
            )}

            {activeModal === 'cookies' && (
              <>
                <p>
                  {STUDIO_CONFIG.creator.studio} utilizes zero intrusive third-party advertising cookies or cross-site tracking beacons.
                </p>
                <p>
                  Essential client-side local preferences (such as audio mute toggle, intro sequence completion state, and high-performance WebGL settings) are maintained solely within your local session to ensure seamless interactivity.
                </p>
                <p>
                  You can clear your local storage and cookies anytime through standard browser settings without impacting core website accessibility.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
