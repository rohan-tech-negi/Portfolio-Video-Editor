'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import SplitText from '@/components/SplitText';
import { TypewriterOnScroll } from '@/components/common/TypeWritter';

/* ─── tiny hook: fires once when element enters viewport ─── */
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ─── ScaleReveal: scale 50→100 + fade ─── */
function ScaleReveal({ children, inView, delay = 0 }) {
  return (
    <div
      style={{
        transform: inView ? 'scale(1)' : 'scale(0.5)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     opacity 0.65s ease ${delay}ms`,
        WebkitTransform: 'translateZ(0)',
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function ProjectsSection() {
  const [isPlaying, setIsPlaying]           = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);
  const videoRefs = [video1Ref, video2Ref, video3Ref, video4Ref];

  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, 0.1);

  /* ── auto-play on mount (unchanged from original) ── */
  useEffect(() => {
    videoRefs.forEach(r => r.current?.play().catch(() => {}));
    setIsPlaying(true);
  }, []);

  useEffect(() => {
  console.log('refs:', videoRefs.map(r => r.current));
  videoRefs.forEach(r => r.current?.play().catch(console.error));
  setIsPlaying(true);
}, []);

  /* ── play/pause toggle (unchanged from original) ── */
  const handleVideoToggle = () => {
    if (isPlaying) {
      videoRefs.forEach(r => r.current?.pause());
      setIsPlaying(false);
    } else {
      videoRefs.forEach(r => r.current?.play().catch(() => {}));
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = (id, ref) => {
    setHoveredProject(id);
    if (ref.current) ref.current.muted = false;
  };
  const handleMouseLeave = (ref) => {
    setHoveredProject(null);
    if (ref.current) ref.current.muted = true;
  };

  /* ── overlay (unchanged from original) ── */
  const overlay = (id) => (
    <div
      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
        isPlaying && hoveredProject !== id ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleVideoToggle}
    >
      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {!isPlaying
          ? <Play  className="w-8 h-8 text-white ml-1" fill="white" />
          : <Pause className="w-8 h-8 text-white"      fill="white" />}
      </div>
    </div>
  );

 const projectData = useMemo(() => [
  { id: 1, name: 'Craft',     type: 'Motion Graphics', src: '/craft.mp4',        ref: video1Ref, delay: 200 },
  { id: 2, name: 'Star Wars', type: 'Cinematic',       src: '/StarWars.mp4',     ref: video2Ref, delay: 320 },
  { id: 3, name: 'Project 1', type: 'Color Grade',     src: '/toh-kya-badla.mp4',ref: video3Ref, delay: 440 },
  { id: 4, name: 'Project 2', type: 'VFX',             src: '/v1.mp4',           ref: video4Ref, delay: 560 },
], []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f5f5f5] py-24 sm:py-32 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Radial feather overlay - edges fade, center stays visible */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(245, 245, 245, 0.5) 85%, rgba(245, 245, 245, 0.9) 100%)`
        }}
      />

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* ── Header ── */}
        <header className="mb-16">
          <div
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <TypewriterOnScroll
              text="[02] — My Work"
              className="text-xl font-medium text-black"
            />
          </div>

          <h2 className="text-[clamp(4rem,8vw,6.5rem)] font-extrabold leading-tight text-[#111]">
            <SplitText
              text="Projects"
              splitType="chars"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              duration={1.25}
              stagger={0.05}
              ease="power3.out"
            />
          </h2>
        </header>

        {/* ── Single-column cards (original layout) ── */}
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-12 lg:gap-20">
          {projectData.map((project) => (
            <ScaleReveal key={project.id} inView={inView} delay={project.delay}>
              <article className="flex flex-col gap-4 group">

                {/* Video card */}
                <div
                  className="relative overflow-hidden rounded-3xl shadow-lg bg-[#111] cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(project.id, project.ref)}
                  onMouseLeave={() => handleMouseLeave(project.ref)}
                >
                  <video
                    ref={project.ref}
                    src={project.src}
                    className="w-full aspect-video object-cover block transition-transform duration-500 group-hover:scale-[1.04]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onClick={handleVideoToggle}
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                  />
                  {overlay(project.id)}
                </div>

                {/* Name + type label */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-[#111] text-base font-semibold tracking-tight">
                    {project.name}
                  </span>
                  <span className="text-[#777] text-xs font-medium tracking-widest uppercase">
                    {project.type}
                  </span>
                </div>

              </article>
            </ScaleReveal>
          ))}
        </div>

      </div>
    </section>
  );
} 