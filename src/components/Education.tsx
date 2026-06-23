import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="relative overflow-hidden" style={{ padding: '80px 0 96px' }}>
      {/* Background Video for Education Section */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: '64px' }}
        >
          <div className="section-eyebrow">
            <span className="line" />
            <span className="label">Background</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              color: 'var(--text)',
              marginBottom: '16px',
              fontWeight: 400,
            }}
          >
            Academic{' '}
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              Education
            </span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            My formal education and university degree.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="group relative h-full w-full cursor-pointer rounded-[2rem] liquid-glass-strong"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            <div className="flex h-full w-full flex-col justify-between p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner border border-white/10" style={{ marginLeft: '3px' }}>
                  🎓
                </span>
                <h3 className="text-lg font-semibold leading-tight text-white/95 sm:text-xl" style={{ marginLeft: '15px', marginTop: '8px', marginBottom: '8px' }}>
                  Bachelor of Computer Science and Engineering
                </h3>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase" style={{ marginLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
                  VIT Bhopal University, Bhopal, India (2023-2027)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
