'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowUpRight } from 'lucide-react';
import SplitText from '../SplitText';
import { TypewriterOnScroll } from '../common/TypeWritter';
import { projects } from '@/lib/projects.js';

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
function ScaleReveal({ children, inView, delay = 0, className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        transform: inView ? 'scale(1)' : 'scale(0.5)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     opacity 0.65s ease ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function ProjectsSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isViewMoreHovered, setIsViewMoreHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // 4 refs for 4 featured videos
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.1);

  // Only show first 4 projects in this section
  const featuredProjects = projects.slice(0, 4);

  /* ── video control ── */
  const handleVideoToggle = () => {
    if (isPlaying) {
      videoRefs.forEach(r => r.current?.pause());
      setIsPlaying(false);
    } else {
      videoRefs.forEach(r => r.current?.play().catch(() => {}));
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = (idx) => {
    setHoveredProject(idx);
    if (videoRefs[idx].current) videoRefs[idx].current.muted = false;
  };

  const handleMouseLeave = (idx) => {
    setHoveredProject(null);
    if (videoRefs[idx].current) videoRefs[idx].current.muted = true;
  };

  const handleViewMoreMouseMove = (e) => {
    requestAnimationFrame(() => setCursorPosition({ x: e.clientX, y: e.clientY }));
  };

  useEffect(() => {
  videoRefs.forEach(r => {
    if (!r.current) return;
    r.current.muted = true;
    r.current.loop = true;

    // ✅ Load first, then play — fixes Cloudinary lazy-load issue
    r.current.load();
    r.current.play().catch(() => {});
  });
}, []);

  /* ── shared overlay logic ── */
  const overlay = (idx) => (
    <div
      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
        isPlaying && hoveredProject !== idx ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleVideoToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleVideoToggle()}
      aria-label={isPlaying ? 'Pause videos' : 'Play videos'}
    >
      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {!isPlaying
          ? <Play className="w-8 h-8 text-white ml-1" fill="white" aria-hidden="true" />
          : <Pause className="w-8 h-8 text-white" fill="white" aria-hidden="true" />}
      </div>
    </div>
  );

  /* ── reusable video card ── */
  const VideoCard = ({ project, idx, delay }) => (
    <ScaleReveal inView={inView} delay={delay}>
      <div
        className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseLeave={() => handleMouseLeave(idx)}
        role="article"
        aria-label={project.title || `Project ${idx + 1}`}
      >
        <div className="relative aspect-[16/10] bg-zinc-800">
          <video
            ref={videoRefs[idx]}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={project.poster}
            onClick={handleVideoToggle}
            aria-label={`${project.title || 'Project'} video preview`}
          >
            <source src={project.gridVideo} type="video/mp4" />
          </video>
          {overlay(idx)}
        </div>
      </div>
    </ScaleReveal>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1600px] mx-auto">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-16">

          {/* Left — tag + heading */}
          <div>
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-lime-400" aria-hidden="true" />
              <TypewriterOnScroll
                text="[01] — My Projects"
                className="text-xl font-medium text-white"
              />
            </div>

            <h2
              id="projects-heading"
              className="font-semibold text-white text-center w-fit mx-auto font-display"
              style={{
                fontSize: 'clamp(4rem, 6vw, 15rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em'
              }}
            >
              <SplitText
                className='pb-4'
                text="My work"
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                duration={1.25}
                stagger={0.05}
                ease="power3.out"
              />
            </h2>
          </div>

          {/* Right — View More */}
          <div className="hidden lg:block text-right mt-auto">
            <div
              className="relative inline-block"
              style={{ cursor: isViewMoreHovered ? 'none' : 'pointer' }}
              onMouseEnter={() => setIsViewMoreHovered(true)}
              onMouseLeave={() => setIsViewMoreHovered(false)}
              onMouseMove={handleViewMoreMouseMove}
              onClick={() => (window.location.href = '/work')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/work')}
              aria-label="View more projects"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/60 leading-none tracking-tight transition-colors duration-300 hover:text-white">
                <SplitText text="View More" inView={inView} baseDelay={300} stagger={90} />
              </h2>
            </div>
          </div>
        </div>

        {/* ── Top Row — projects 0 & 1 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <VideoCard key={featuredProjects[0]?.id || 0} project={featuredProjects[0]} idx={0} delay={200} />
          <VideoCard key={featuredProjects[1]?.id || 1} project={featuredProjects[1]} idx={1} delay={320} />
        </div>

        {/* ── Bottom Row — projects 2 & 3 + CTA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <VideoCard key={featuredProjects[2]?.id || 2} project={featuredProjects[2]} idx={2} delay={440} />
          <VideoCard key={featuredProjects[3]?.id || 3} project={featuredProjects[3]} idx={3} delay={560} />

          {/* CTA — View All */}
          <ScaleReveal inView={inView} delay={680}>
            <div
              className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center aspect-[16/10]"
              style={{ cursor: isCtaHovered ? 'none' : 'pointer' }}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              onMouseMove={handleViewMoreMouseMove}
              onClick={() => (window.location.href = '/work')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/work')}
              aria-label="View all projects"
            >
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]"
                  style={{ animation: 'pulse 3s ease-in-out infinite' }}
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 text-center p-8">
                <div className="mb-5">
                  <div className="w-14 h-14 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  View all projects
                </h3>
                <p className="text-lime-50 text-sm font-medium">
                  Explore the complete portfolio
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            </div>
          </ScaleReveal>
        </div>

        {/* Mobile View More - FIXED: Added proper <a> tag opening */}
        <div className="lg:hidden text-center mt-12">
          <a
            href="/work"
            className="inline-block text-3xl font-light text-white/60 hover:text-white transition-colors duration-300"
            aria-label="View more projects"
          >
            View More →
          </a>
        </div>
      </div>

      {/* Custom Oval Cursor */}
      {(isViewMoreHovered || isCtaHovered) && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
          }}
          aria-hidden="true"
        >
          <div className="px-6 py-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50">
            <span className="text-black font-semibold text-sm tracking-wide whitespace-nowrap">
              VIEW
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}