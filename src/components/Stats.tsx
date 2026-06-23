import { motion } from 'framer-motion';
import { OrbitingSkills, type OrbitSkillItem } from "@/components/unlumen-ui/orbiting-skills";
import { Code2, Terminal, Waves, Triangle, Server, Laptop } from 'lucide-react';
import { CLOUDFRONT_1 } from './BackgroundVideo';

// 👉 Change this variable to test different videos behind the skills section!
// Available options: CLOUDFRONT_1, CLOUDFRONT_2, CLOUDFRONT_3, CLOUDFRONT_4, CLOUDFRONT_5, ORIGINAL_HLS
const ACTIVE_SKILLS_VIDEO = CLOUDFRONT_1;

const SKILLS: OrbitSkillItem[] = [
  { label: "React", icon: <Code2 className="h-5 w-5 text-[#61DAFB]" /> },
  { label: "TypeScript", icon: <Terminal className="h-5 w-5 text-[#3178C6]" /> },
  { label: "Tailwind", icon: <Waves className="h-5 w-5 text-[#06B6D4]" /> },
  { label: "Next.js", icon: <Triangle className="h-5 w-5 text-white" /> },
  { label: "Node.js", icon: <Server className="h-5 w-5 text-[#339933]" /> },
  { label: "Python", icon: <Terminal className="h-5 w-5 text-[#FFD43B]" /> },
];

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: ['Python', 'C++', 'JavaScript', 'TypeScript'],
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'],
    className: 'md:col-span-2 lg:col-span-2',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js'],
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    title: 'Cloud & Database',
    skills: ['MongoDB', 'AWS'],
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    title: 'Design',
    skills: ['Figma', 'Canva'],
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Jupyter Notebook'],
    className: 'md:col-span-4 lg:col-span-2',
  },
  {
    title: 'Soft Skills',
    skills: ['Leadership', 'Team Management', 'Problem-Solving', 'Rapid Development'],
    className: 'md:col-span-2 lg:col-span-2',
  },
  {
    title: 'Spoken Languages',
    skills: ['English', 'Punjabi', 'Hindi'],
    className: 'md:col-span-2 lg:col-span-2',
  },
];

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden" style={{ padding: '80px 0 96px' }}>
      {/* Background Video for Skills Section */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          src={ACTIVE_SKILLS_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {/* Technical Skills Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: '64px' }}
        >
          <div className="section-eyebrow">
            <span className="line" />
            <span className="label">Capabilities</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              color: 'var(--text)',
              marginBottom: '16px',
              fontWeight: 400,
            }}
          >
            Technical{' '}
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              Skills
            </span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            A comprehensive toolkit for modern software development and design.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
            {SKILL_CATEGORIES.map((category, index) => (
              <div
                key={index}
                className={`liquid-glass-strong flex flex-col gap-4 rounded-[1rem] p-6 transition-transform hover:scale-105 md:p-8 ${category.className}`}
                style={{ padding: '15px', margin: '15px' }}
              >
                <h4 className="text-lg font-medium text-white/90">
                  {category.title}
                </h4>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="liquid-glass rounded-full px-4 py-2 text-xs font-medium tracking-wide text-white/80 transition-transform hover:scale-105"
                      style={{ padding: '3px', paddingLeft: '8px', paddingRight: '8px' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orbiting Skills Component */}
        <div className="mt-36 mb-12 flex items-center justify-center md:mt-48" style={{ margin: '50px' }}>
          <OrbitingSkills items={SKILLS} radius={110} duration={15} followCursor={true}>
            <div className="liquid-glass flex h-24 w-24 items-center justify-center rounded-full shadow-2xl">
              <Laptop className="h-10 w-10 text-white/80" />
            </div>
          </OrbitingSkills>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #stats [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          #stats [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
