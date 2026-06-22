import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Map, MapMarker, MarkerContent } from './ui/map';

const MARQUEE_TEXT = 'BUILDING THE FUTURE • ';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/HemenBhasin' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hemen-bhasin' },
  { label: 'Email', href: 'mailto:hemenbhasin@gmail.com' },
];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Marquee animation
  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '48px',
        overflow: 'hidden',
        // Background color inherited from panel-body
      }}
    >
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Marquee */}
        <div style={{ overflow: 'hidden', marginBottom: '96px' }}>
          <div
            ref={marqueeRef}
            style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: 'rgba(245, 245, 245, 0.06)',
                  marginLeft: '16px',
                  marginRight: '16px',
                }}
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Details & Map */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', marginBottom: '96px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Contact Info */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">Let's connect</p>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', color: 'var(--text)', fontWeight: 400 }}>
                  Get in <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>touch</span>
                </h2>
              </div>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:hemenbhasin@gmail.com" className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">📧</span>
                  hemenbhasin@gmail.com
                </a>
                <div className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg cursor-pointer">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">📱</span>
                  +91 7710597386
                </div>
                <a href="https://github.com/HemenBhasin" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">💻</span>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/hemen-bhasin" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">💼</span>
                  LinkedIn
                </a>
                <div className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors text-lg mt-2 cursor-pointer">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">📍</span>
                  Patiala, Punjab, India
                </div>
              </div>
            </div>

            {/* Right: GTA V Style Map Block */}
            <div className="relative w-full h-[400px] lg:h-[500px] liquid-glass-strong rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl p-2 group">
              <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden m-2 border-2 border-white/5 group-hover:border-green-500/20 transition-colors duration-500">
                {/* GTA V HUD overlay effects */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />
                <div className="absolute inset-0 z-10 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }} />
                
                <Map
                  theme="dark"
                  viewport={{
                    center: [76.352222, 30.344444],
                    zoom: 14,
                    pitch: 65,     // GTA V style 3D tilt
                    bearing: -15,  // slight rotation
                  }}
                  className="w-full h-full"
                  interactive={true}
                >
                  <MapMarker longitude={76.352222} latitude={30.344444}>
                    <MarkerContent>
                      {/* GTA V Style Player Blip */}
                      <div className="relative h-6 w-6 transform -rotate-15">
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                        <div className="relative h-full w-full rounded-full border-2 border-white bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-black" />
                      </div>
                    </MarkerContent>
                  </MapMarker>
                </Map>

                {/* GTA V Style UI Overlay Elements */}
                <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-mono text-green-400 border border-green-500/30 uppercase tracking-widest flex items-center gap-2 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                    Signal Active
                  </div>
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-mono text-white/70 border border-white/10 uppercase tracking-wider">
                    30°20′40″ N 76°21′8″ E
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bar */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div
            style={{
              borderTop: '1px solid var(--stroke)',
              paddingTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  id={`social-${social.label.toLowerCase()}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Available indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ position: 'relative', width: '8px', height: '8px' }}>
                <span
                  className="animate-pulse-dot"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    backgroundColor: '#4ade80',
                    opacity: 0.6,
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                  }}
                />
              </span>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                Available for projects
              </span>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p style={{ fontSize: '11px', color: 'rgba(135, 135, 135, 0.5)' }}>
              © {new Date().getFullYear()} Hemen Bhasin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
