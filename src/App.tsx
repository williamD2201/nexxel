/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { IntroSequence } from './components/IntroSequence';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CreativePhilosophy } from './components/CreativePhilosophy';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { FeaturedWork } from './components/FeaturedWork';
import { CreativeLab } from './components/CreativeLab';
import { TechStackSection } from './components/TechStackSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SocialHub } from './components/SocialHub';
import { FAQSection } from './components/FAQSection';
import { ProjectCTA } from './components/ProjectCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { NotFoundModal } from './components/NotFoundModal';
import { BackToTop } from './components/BackToTop';
import { EasterEgg } from './components/EasterEgg';
import { soundManager } from './utils/audio';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [show404, setShow404] = useState<boolean>(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState<boolean>(false);
  const [prefilledService, setPrefilledService] = useState<string>('');

  // Observe active sections for navigation highlight
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'work', 'process', 'lab', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = (service?: string) => {
    if (service) setPrefilledService(service);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#021818] text-white selection:bg-[#FF69B4] selection:text-white">
      {/* 01. Studio Intro Sequence */}
      <AnimatePresence>
        {!introCompleted && (
          <IntroSequence onComplete={() => setIntroCompleted(true)} />
        )}
      </AnimatePresence>

      {/* 02. Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 03. Navigation Header */}
      <Header
        activeSection={activeSection}
        onOpenContact={() => scrollToContact()}
        onTriggerEasterEgg={() => setEasterEggTriggered(true)}
      />

      {/* Main Page Flow */}
      <main>
        {/* 04. Hero Section with 3D Bubble Orb */}
        <Hero
          onOpenContact={() => scrollToContact()}
          onExploreWork={scrollToWork}
          onAboutClick={scrollToAbout}
          onOpenResume={() => setLegalModal('terms')}
        />

        {/* 05. Creator Profile & 3D Tilt Card */}
        <AboutSection />

        {/* 07. Creative Philosophy */}
        <CreativePhilosophy />

        {/* 08. Services & Capabilities */}
        <ServicesSection onSelectService={(title) => scrollToContact(title)} />

        {/* 09. Creative Process Timeline */}
        <ProcessSection />

        {/* 10. Featured Work & Case Studies */}
        <FeaturedWork />

        {/* 11. Creative Lab Workbench */}
        <CreativeLab />

        {/* 12. Skills & Technology Stack */}
        <TechStackSection />

        {/* 13. Experience & Journey Timeline */}
        <ExperienceTimeline />

        {/* 14. Social Proof & Testimonials */}
        <TestimonialsSection />

        {/* 15. Social Hub */}
        <SocialHub />

        {/* 16. Frequently Asked Questions */}
        <FAQSection />

        {/* 17. Final Project CTA */}
        <ProjectCTA
          onStartProject={() => scrollToContact()}
          onSayHello={() => scrollToContact('General Collaboration')}
        />

        {/* 18. Comprehensive Contact Experience */}
        <ContactSection prefillService={prefilledService} />
      </main>

      {/* 19. Multi-Column Professional Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
        onOpenCookies={() => setLegalModal('cookies')}
        onOpen404={() => setShow404(true)}
      />

      {/* Modals & Micro-Features */}
      <LegalModals
        activeModal={legalModal}
        onClose={() => setLegalModal(null)}
      />

      <NotFoundModal
        isOpen={show404}
        onClose={() => setShow404(false)}
        onGoHome={scrollToHero}
        onViewWork={scrollToWork}
      />

      <BackToTop />

      <EasterEgg
        triggered={easterEggTriggered}
        onClose={() => setEasterEggTriggered(false)}
      />
    </div>
  );
}
