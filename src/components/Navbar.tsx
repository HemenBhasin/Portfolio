import { useState, useEffect } from 'react';
import { Home, Briefcase, FileText, Award, GraduationCap, Phone } from 'lucide-react';
import { Dock, type DockItem } from './ui/dock';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items: DockItem[] = [
    {
      label: 'Home',
      onClick: () => onNavigate('hero'),
      icon: (
        <div
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="relative flex items-center justify-center w-full h-full rounded-full"
        >
          {/* Gradient ring */}
          <span
            className={logoHovered ? 'accent-gradient-reverse' : 'accent-gradient'}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              transition: 'all 0.5s ease',
            }}
          />
          {/* Inner circle */}
          <span
            className="absolute flex items-center justify-center bg-black/90 rounded-full text-white"
            style={{
              inset: '2px',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '14px',
            }}
          >
            HB
          </span>
        </div>
      ),
      separator: true,
    },
    {
      label: 'Home',
      onClick: () => onNavigate('hero'),
      icon: <Home className={activeSection === 'hero' ? 'text-white' : ''} />,
    },
    {
      label: 'Work',
      onClick: () => onNavigate('work'),
      icon: <Briefcase className={activeSection === 'work' ? 'text-white' : ''} />,
    },
    {
      label: 'Certifications',
      onClick: () => onNavigate('certifications'),
      icon: <Award className={activeSection === 'certifications' ? 'text-white' : ''} />,
    },
    {
      label: 'Skills',
      onClick: () => onNavigate('stats'),
      icon: <FileText className={activeSection === 'stats' ? 'text-white' : ''} />,
    },
    {
      label: 'Education',
      onClick: () => onNavigate('education'),
      icon: <GraduationCap className={activeSection === 'education' ? 'text-white' : ''} />,
      separator: true,
    },
    {
      label: 'Contact',
      onClick: () => onNavigate('contact'),
      icon: <Phone className={activeSection === 'contact' ? 'text-white' : ''} />,
    },
  ];

  return (
    <nav
      id="main-nav"
      style={{
        position: 'fixed',
        top: '32px', // Moved back to the top as requested, with 8px more margin
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        pointerEvents: 'none', // Allow clicking through the empty areas of the nav container
      }}
    >
      <div 
        style={{
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: scrolled ? 'scale(0.95) translateY(10px)' : 'scale(1) translateY(0)',
          opacity: scrolled ? 0.9 : 1,
          pointerEvents: 'auto',
        }}
      >
        <Dock items={items} />
      </div>
    </nav>
  );
}
