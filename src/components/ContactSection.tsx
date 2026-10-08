import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowRight,
  Clock,
  Briefcase,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';
import { soundManager } from '../utils/audio';

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  company: string;
  budget: string;
  timeline: string;
  message: string;
  referenceLink: string;
}

export const ContactSection: React.FC<{ prefillService?: string }> = ({ prefillService }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: prefillService || '3D Web Experience',
    company: '',
    budget: '$15k – $30k',
    timeline: '1–2 Months',
    message: '',
    referenceLink: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmailKey, setCopiedEmailKey] = useState<string | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterDone, setNewsletterDone] = useState<boolean>(false);

  const copyEmailToClipboard = (text: string, key: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedEmailKey(key);
    setTimeout(() => setCopiedEmailKey(null), 2500);
  };

  const validate = (): boolean => {
    const err: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) err.name = 'Please provide your name';
    if (!formData.email.trim()) {
      err.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Please enter a valid email';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      err.message = 'Please provide a brief message (minimum 10 characters)';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      soundManager.playClick();
      return;
    }

    setIsSubmitting(true);
    soundManager.playBubblePop();

    // Emulate server delivery state with verified client UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundManager.playIntroChime();
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    soundManager.playBubblePop();
    setNewsletterDone(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#021818] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#00F0FF]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF69B4]/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
            <span>DIRECT INQUIRIES & COMMISSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            LET&apos;S CREATE SOMETHING AMAZING.
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl">
            Currently reserving select partnerships for Q2/Q3 2026. Reach out with your vision or reach us directly.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Studio Direct Contact Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="p-8 rounded-3xl bg-[#042525]/70 border border-white/10 space-y-6">
              {/* Availability Indicator */}
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#021818] border border-[#00F0FF]/30 max-w-fit text-xs font-mono text-[#00F0FF]">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>{STUDIO_CONFIG.creator.availabilityStatus}</span>
              </div>

              {/* Direct Channels */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                {/* Primary Gmail */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#00F0FF] block mb-1">
                    GMAIL (PRIMARY)
                  </span>
                  <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#021818] border border-white/5">
                    <span className="text-sm font-semibold text-white truncate font-mono">
                      {STUDIO_CONFIG.creator.email}
                    </span>
                    <button
                      onClick={() => copyEmailToClipboard(STUDIO_CONFIG.creator.email, 'primary')}
                      className="px-3 py-1.5 rounded-lg bg-[#069494]/30 hover:bg-[#00F0FF]/20 text-[#00F0FF] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy primary gmail"
                    >
                      {copiedEmailKey === 'primary' ? <Check size={13} className="text-[#FF69B4]" /> : <Copy size={13} />}
                      <span>{copiedEmailKey === 'primary' ? 'COPIED ✓' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Secondary Domain Mail */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#FF69B4] block mb-1">
                    OFFICIAL DOMAIN MAIL
                  </span>
                  <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#021818] border border-white/5">
                    <span className="text-sm font-semibold text-white truncate font-mono">
                      {STUDIO_CONFIG.creator.secondaryEmail}
                    </span>
                    <button
                      onClick={() => copyEmailToClipboard(STUDIO_CONFIG.creator.secondaryEmail, 'secondary')}
                      className="px-3 py-1.5 rounded-lg bg-[#FF69B4]/20 hover:bg-[#FF69B4]/30 text-[#FF69B4] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy domain email"
                    >
                      {copiedEmailKey === 'secondary' ? <Check size={13} className="text-[#00F0FF]" /> : <Copy size={13} />}
                      <span>{copiedEmailKey === 'secondary' ? 'COPIED ✓' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Message note */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-1">
                    FAST CHAT
                  </span>
                  <div className="p-3 rounded-xl bg-[#021818] border border-white/5 text-xs text-white/80 font-mono flex items-center justify-between">
                    <span>Discord: nexel</span>
                    <span className="text-[#00F0FF]">WhatsApp: @ne_x_el_</span>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/50">
                <Clock size={13} className="text-[#FF69B4]" />
                <span>Typical response within 24 business hours</span>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="p-8 rounded-3xl bg-[#032020] border border-[#00F0FF]/20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF69B4] font-bold block mb-2">
                STUDIO DISPATCHES
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                GET CREATIVE UPDATES
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                No spam. Only selected updates, experiments and new work delivered quarterly.
              </p>

              {newsletterDone ? (
                <div className="p-3 rounded-xl bg-[#069494]/30 border border-[#00F0FF]/40 text-xs text-[#00F0FF] font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>SUBSCRIBED — WELCOME TO THE CIRCLE</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-[#021818] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-90"
                  >
                    JOIN
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Commission & Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#032323] border border-[#00F0FF]/30 p-8 sm:p-10 shadow-[0_20px_50px_rgba(2,24,24,0.9)]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] mb-6 shadow-[0_0_30px_#00F0FF]">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    THANK YOU.
                  </h3>
                  <p className="text-[#FF69B4] font-semibold text-sm tracking-widest uppercase mb-4">
                    YOUR MESSAGE IS ON ITS WAY.
                  </p>
                  <p className="text-sm text-white/70 max-w-md leading-relaxed mb-8">
                    NEXEL from NEXEL LAB has received your dispatch. I review every message and will follow up shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: '3D Web Experience',
                        company: '',
                        budget: '$15k – $30k',
                        timeline: '1–2 Months',
                        message: '',
                        referenceLink: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-white/70 mb-2 flex items-center justify-between">
                        <span>YOUR NAME *</span>
                        {errors.name && <span className="text-[#FF69B4] normal-case">{errors.name}</span>}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Lin"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#021818] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                          errors.name ? 'border-[#FF69B4]' : 'border-white/10 focus:border-[#00F0FF]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-white/70 mb-2 flex items-center justify-between">
                        <span>YOUR EMAIL *</span>
                        {errors.email && <span className="text-[#FF69B4] normal-case">{errors.email}</span>}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maya@studio.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#021818] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                          errors.email ? 'border-[#FF69B4]' : 'border-white/10 focus:border-[#00F0FF]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Project Type & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-white/70 mb-2 block">
                        PROJECT TYPE
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#021818] border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="3D Web Experience">3D Web Experience / WebGL</option>
                        <option value="Interactive Website">Full-Stack Web Application</option>
                        <option value="Brand Identity">Brand Identity & Visual System</option>
                        <option value="Motion Design">Motion Design & Kinetic Assets</option>
                        <option value="Audio / Sensory Lab">Audio / Sensory Interactive</option>
                        <option value="Consulting & Audit">Design & Performance Sprint</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-white/70 mb-2 block">
                        COMPANY / BRAND (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Kinesis"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#021818] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono uppercase text-white/70 mb-2 block">
                        ESTIMATED BUDGET RANGE
                      </label>
                      <select
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#021818] border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="Under $15k">&lt; $15k (Mini Sprint)</option>
                        <option value="$15k – $30k">$15k – $30k (Standard Build)</option>
                        <option value="$30k – $60k">$30k – $60k (Flagship 3D)</option>
                        <option value="$60k+">$60k+ (Enterprise Ecosystem)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-white/70 mb-2 block">
                        TARGET TIMELINE
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#021818] border border-white/10 text-sm text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="Urgent (< 1 Month)">Urgent (&lt; 1 Month)</option>
                        <option value="1–2 Months">1–2 Months</option>
                        <option value="2–3 Months">2–3 Months</option>
                        <option value="Flexible / Q3+">Flexible / Long-term</option>
                      </select>
                    </div>
                  </div>

                  {/* Project / Inspiration Link */}
                  <div>
                    <label className="text-xs font-mono uppercase text-white/70 mb-2 block">
                      PROJECT LINK OR REFERENCE (OPTIONAL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourlink.com"
                      value={formData.referenceLink}
                      onChange={e => setFormData({ ...formData, referenceLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#021818] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono uppercase text-white/70 mb-2 flex items-center justify-between">
                      <span>PROJECT GOALS & BRIEF *</span>
                      {errors.message && <span className="text-[#FF69B4] normal-case">{errors.message}</span>}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the project ambition, audience, and what would make this a wild success..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#021818] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                        errors.message ? 'border-[#FF69B4]' : 'border-white/10 focus:border-[#00F0FF]'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF69B4] via-[#069494] to-[#00F0FF] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,105,180,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        TRANSMITTING BRIEF...
                      </span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>SEND PROJECT INQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
