import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Hls from 'hls.js';

// ==========================================
// 🎥 HERO INNER VIDEO SETTINGS
// ==========================================

export const HERO_VIDEO_1 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';
export const HERO_VIDEO_2 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';

// 👉 Change this variable to swap the inner Hero video
const ACTIVE_HERO_VIDEO = HERO_VIDEO_1;

const ROLES = ['Creative', 'Fullstack', 'Developer', 'Scholar'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Video initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ACTIVE_HERO_VIDEO) return;

    if (ACTIVE_HERO_VIDEO.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(ACTIVE_HERO_VIDEO);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = ACTIVE_HERO_VIDEO;
      }
    } else {
      video.src = ACTIVE_HERO_VIDEO;
      video.load();
    }
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.4, delay: 0.1 }
      );
      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(12px)', y: 24 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12 },
        '-=0.9'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
    >
      {/* INNER BACKGROUND VIDEO */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Dark overlay for readability over the inner video */}
      <div className="hero-overlay" style={{ zIndex: 1 }} />

      {/* Bottom fade into dark panel-body */}
      <div className="hero-bottom-fade" style={{ zIndex: 2 }} />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow */}
        <p
          className="blur-in"
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--muted)',
            marginBottom: '32px',
            fontFamily: 'var(--font-body)',
          }}
        >
          COLLECTION '26
        </p>

        {/* Name */}
        <h1
          className="name-reveal"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: '28px',
          }}
        >
          Hemen Bhasin
        </h1>

        {/* Role line */}
        <p
          className="blur-in"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--muted)',
            marginBottom: '16px',
          }}
        >
          A{' '}
          <span
            key={roleIndex}
            className="animate-role-fade-in"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--text)',
              display: 'inline-block',
            }}
          >
            {ROLES[roleIndex]}
          </span>{' '}
          based in India.
        </p>

        {/* Description */}
        <p
          className="blur-in"
          style={{
            fontSize: 'clamp(0.8125rem, 1.5vw, 1rem)',
            color: 'var(--muted)',
            maxWidth: '440px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          Building seamless digital experiences through AI, full-stack engineering, and creative problem-solving.
        </p>

        {/* CTA Buttons */}
        <div
          className="blur-in"
          style={{ display: 'inline-flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a id="hero-see-works" href="#work" className="btn-primary solid">
            See Works
          </a>
          <a id="hero-reach-out" href="mailto:hemenbhasin@gmail.com" className="btn-primary outline">
            Reach out...
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--muted)',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'var(--stroke)',
          }}
        >
          <div
            className="accent-gradient animate-scroll-down"
            style={{
              width: '100%',
              height: '12px',
              position: 'absolute',
            }}
          />
        </div>
      </div>
    </section>
  );
}
