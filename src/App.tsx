import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import Certifications from './components/Certifications';
import Stats from './components/Stats';
import Education from './components/Education';
import Contact from './components/Contact';
import BackgroundVideo from './components/BackgroundVideo.tsx';
import { SmoothCursor } from './components/ui/smooth-cursor';

const SECTIONS = ['hero', 'work', 'certifications', 'stats', 'education', 'contact'];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Intersection observer for active section tracking
  useEffect(() => {
    if (isLoading) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isLoading]);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <SmoothCursor />
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Permanent fixed background video — always visible */}
          <BackgroundVideo />

          {/* Content panel floating over the video */}
          <div className="content-wrapper">
            <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
            <main className="content-panel">
              <Hero />
              <div className="panel-body">
                <SelectedWorks />
                <Certifications />
                <Stats />
                <Education />
                <Contact />
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}
