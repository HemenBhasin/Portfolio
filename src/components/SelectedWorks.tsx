import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const PROJECTS = [
  {
    id: 1,
    title: 'Myth & Legend Explorer',
    tech: ['NLP', 'Next.js', 'Flask'],
    description: 'Folklore analysis platform using Sentence-BERT with 90% accuracy, ATU motif detection, and Gemini API retellings.',
    image: '/mythandlegends_thumbnail.png',
    link: 'https://github.com/HemenBhasin',
  },
  {
    id: 2,
    title: 'Sentiment Analyzer',
    tech: ['NLP', 'DistilBERT', 'spaCy'],
    description: 'Context-aware sentiment analysis with 92% accuracy, 10-tier scoring, and aspect-based Plotly dashboards.',
    image: '/semantic_analyzer_thumbnail.png',
    link: 'https://github.com/HemenBhasin',
  },
  {
    id: 3,
    title: 'VivaQ Quiz Platform',
    tech: ['React', 'MongoDB', 'Firebase'],
    description: 'AI-powered quiz platform with auto-grading, role-based dashboards, and real-time submission tracking.',
    image: '/vivaq_thumbnail.png',
    link: 'https://github.com/HemenBhasin',
  },
];

export default function SelectedWorks() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: '100%', scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.sticky-cards-container',
          start: 'top top',
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.9,
            rotation: -2,
            duration: 1,
            ease: 'none',
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: 1,
            ease: 'none',
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <section
      id="work"
      ref={container}
      className="relative w-full"
      style={{ backgroundColor: 'var(--bg)', padding: '64px 0 80px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: '40px' }}
        >
          <div className="section-eyebrow">
            <span className="line" />
            <span className="label">Selected Work</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                  color: 'var(--text)',
                  marginBottom: '16px',
                  fontWeight: 400,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Featured{' '}
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                  projects
                </span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7 }}>
                A selection of projects I've worked on, from concept to launch.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky Cards Stacking Area */}
      <div className="sticky-cards-container relative flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-4 lg:px-8">
        <div className="relative h-[85%] w-full max-w-sm overflow-hidden rounded-[40px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full rounded-[40px] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-3xl md:p-10 lg:p-12"
              style={{ willChange: 'transform' }}
            >
              <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                {/* Left Info Column */}
                <div 
                  className="flex h-full flex-col justify-start overflow-y-auto overflow-x-hidden pt-4 pb-4 pr-2 md:justify-center md:pt-0"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {/* Huge Number - Unindented */}
                  <span className="mb-2 shrink-0 font-display text-7xl font-semibold italic leading-none text-white/20 md:mb-4 md:text-8xl lg:text-9xl">
                    0{project.id}
                  </span>

                  {/* Indented Content Block */}
                  <div className="flex shrink-0 flex-col gap-4 ml-4 sm:ml-8 md:gap-6 md:ml-12 lg:ml-16">
                    <h3 className="shrink-0 text-3xl font-medium leading-tight text-white md:text-4xl lg:text-5xl" style={{ marginLeft: '10px' }}>
                      {project.title}
                    </h3>

                    <p className="shrink-0 max-w-md text-sm leading-relaxed text-white/70 md:text-base lg:text-lg" style={{ marginLeft: '10px' }}>
                      {project.description}
                    </p>

                    <div className="flex shrink-0 flex-wrap gap-2" style={{ marginLeft: '10px' }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs"
                          style={{ padding: '5px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '5px', paddingBottom: '5px' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2 shrink-0 pb-4" style={{ marginLeft: '10px' }}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] transition-all hover:bg-[#D7E2EA]/10 sm:px-8 sm:py-3.5 sm:text-sm lg:px-10 lg:py-4 lg:text-base"
                      >
                        <span className="relative z-10" style={{ padding: '5px', paddingLeft: '8px', paddingRight: '8px' }}>Live Project</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 md:h-full md:rounded-[40px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] md:rounded-[40px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
