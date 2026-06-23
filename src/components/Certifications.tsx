import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bot, TrendingUp, Laptop, Network } from 'lucide-react';

const CERTIFICATIONS = [
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    icon: <Laptop className="h-6 w-6 text-white/80" />,
  },
  {
    title: 'Solutions Architecture Job Simulation',
    issuer: 'Forage',
    icon: <Network className="h-6 w-6 text-white/80" />,
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
    icon: <Bot className="h-6 w-6 text-white/80" />,
  },
  {
    title: 'Marketing Analytics',
    issuer: 'NPTEL',
    icon: <TrendingUp className="h-6 w-6 text-white/80" />,
  },
];

interface CertProps {
  cert: typeof CERTIFICATIONS[0];
  index: number;
}

function TiltCard({ cert, index }: CertProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  // Fake 3D parallax effect that doesn't break masks or padding
  const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ['-15px', '15px']);
  const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ['-15px', '15px']);
  const contentXSmall = useTransform(mouseXSpring, [-0.5, 0.5], ['-8px', '8px']);
  const contentYSmall = useTransform(mouseYSpring, [-0.5, 0.5], ['-8px', '8px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
        className="group relative h-full w-full cursor-pointer rounded-[2rem] liquid-glass-strong"
      >
        <div className="flex h-full w-full flex-col justify-between p-6 md:p-8">
          <motion.div style={{ x: contentX, y: contentY }} className="flex flex-col gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner border border-white/10">
            {cert.icon}
          </span>
          <h3 className="text-lg font-semibold leading-tight text-white/95 sm:text-xl" style={{ marginLeft: '5px' }}>
            {cert.title}
          </h3>
        </motion.div>

        <motion.div style={{ x: contentXSmall, y: contentYSmall }} className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase" style={{ marginLeft: '15px' }}>
            {cert.issuer}
          </span>
          <motion.div
            whileHover={{ x: 4 }}
            className="flex h-8 w-8 items-center justify-center rounded-[0.4rem] bg-white/5 text-white/40 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white/80"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </motion.div>
        </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" style={{ padding: '80px 0 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: '64px' }}
        >
          <div className="section-eyebrow">
            <span className="line" />
            <span className="label">Certifications</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              color: 'var(--text)',
              marginBottom: '16px',
              fontWeight: 400,
            }}
          >
            Continuous{' '}
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              learning
            </span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            A track record of expanding my technical expertise and business acumen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {CERTIFICATIONS.map((cert, i) => (
            <TiltCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
