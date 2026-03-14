'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, ArrowUpRight } from 'lucide-react';
import SplitText from '../SplitText';
import { TypewriterOnScroll } from '../common/TypeWritter';
import { loopProjects } from '@/lib/projects2'; // ← separate data source

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

/* ── Video card extracted OUTSIDE main component to avoid ref reset on re-render ── */
function VideoCard({ project, videoRef, isPlaying, isHovered, onMouseEnter, onMouseLeave, onToggle, inView, delay, idx }) {
  const overlayVisible = !isPlaying || isHovered;

  return (
    <ScaleReveal inView={inView} delay={delay}>
      <div
        className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative aspect-[16/10] bg-zinc-800">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
            poster={project.poster}
            src={project.loopVideo}  // ← src directly, not <source> child
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
              overlayVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onToggle}
          >
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {isPlaying
                ? <Pause className="w-8 h-8 text-white" fill="white" />
                : <Play  className="w-8 h-8 text-white ml-1" fill="white" />}
            </div>
          </div>
        </div>
      </div>
    </ScaleReveal>
  );
}

/* ══════════════════════════════════════════════ */
export default function ProjectsSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isViewMoreHovered, setIsViewMoreHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Stable refs array — defined at top level, never recreated
  const v0 = useRef(null);
  const v1 = useRef(null);
  const v2 = useRef(null);
  const v3 = useRef(null);
  const videoRefs = [v0, v1, v2, v3];

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.1);

  /* ── Init: muted autoplay ── */
  useEffect(() => {
    videoRefs.forEach(r => {
      const v = r.current;
      if (!v) return;
      v.muted = true;
      v.volume = 1;      // ✅ volume ready, just muted
      v.loop = true;
      v.play().catch(() => {});
    });
  }, []);

  /* ── Toggle all play/pause ── */
  const handleVideoToggle = useCallback(() => {
    setIsPlaying(prev => {
      const next = !prev;
      videoRefs.forEach(r => {
        if (!r.current) return;
        if (next) r.current.play().catch(() => {});
        else r.current.pause();
      });
      return next;
    });
  }, []);

  /* ── Hover: unmute with fresh play() to satisfy browser policy ── */
  const handleMouseEnter = useCallback((idx) => {
    setHoveredIdx(idx);
    const v = videoRefs[idx].current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {
      v.muted = true; // fallback if browser blocks
    });
  }, []);

  const handleMouseLeave = useCallback((idx) => {
    setHoveredIdx(null);
    const v = videoRefs[idx].current;
    if (!v) return;
    v.muted = true;
  }, []);

  const handleViewMoreMouseMove = (e) => {
    requestAnimationFrame(() => setCursorPosition({ x: e.clientX, y: e.clientY }));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-[1600px] mx-auto">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-lime-400" />
              <TypewriterOnScroll text="[01] — My Projects" className="text-xl font-medium text-white" />
            </div>

            <h2
              className="font-semibold text-white text-center w-fit mx-auto font-display"
              style={{ fontSize: 'clamp(4rem, 6vw, 15rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              <SplitText
                className="pb-4"
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

          <div className="hidden lg:block text-right mt-auto">
            <div
              className="relative inline-block"
              style={{ cursor: isViewMoreHovered ? 'none' : 'pointer' }}
              onMouseEnter={() => setIsViewMoreHovered(true)}
              onMouseLeave={() => setIsViewMoreHovered(false)}
              onMouseMove={handleViewMoreMouseMove}
              onClick={() => (window.location.href = '/work')}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/60 leading-none tracking-tight transition-colors duration-300 hover:text-white">
                <SplitText text="View More" inView={inView} baseDelay={300} stagger={90} />
              </h2>
            </div>
          </div>
        </div>

        {/* ── Top Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {[0, 1].map(idx => (
            <VideoCard
              key={loopProjects[idx].id}
              project={loopProjects[idx]}
              videoRef={videoRefs[idx]}
              isPlaying={isPlaying}
              isHovered={hoveredIdx === idx}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onToggle={handleVideoToggle}
              inView={inView}
              delay={200 + idx * 120}
              idx={idx}
            />
          ))}
        </div>

        {/* ── Bottom Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[2, 3].map(idx => (
            <VideoCard
              key={loopProjects[idx].id}
              project={loopProjects[idx]}
              videoRef={videoRefs[idx]}
              isPlaying={isPlaying}
              isHovered={hoveredIdx === idx}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onToggle={handleVideoToggle}
              inView={inView}
              delay={440 + (idx - 2) * 120}
              idx={idx}
            />
          ))}

          {/* CTA */}
          <ScaleReveal inView={inView} delay={680}>
            <div
              className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center aspect-[16/10]"
              style={{ cursor: isCtaHovered ? 'none' : 'pointer' }}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              onMouseMove={handleViewMoreMouseMove}
              onClick={() => (window.location.href = '/work')}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]"
                  style={{ animation: 'pulse 3s ease-in-out infinite' }} />
              </div>
              <div className="relative z-10 text-center p-8">
                <div className="mb-5">
                  <div className="w-14 h-14 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">View all projects</h3>
                <p className="text-lime-50 text-sm font-medium">Explore the complete portfolio</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScaleReveal>
        </div>

        {/* Mobile View More */}
        <div className="lg:hidden text-center mt-12">
          <a href="/work" className="inline-block text-3xl font-light text-white/60 hover:text-white transition-colors duration-300">
            View More →
          </a>
        </div>
      </div>

      {/* Custom Oval Cursor */}
      {(isViewMoreHovered || isCtaHovered) && (
        <div
          className="fixed pointer-events-none z-50"
          style={{ left: cursorPosition.x, top: cursorPosition.y, transform: 'translate(-50%, -50%)', willChange: 'left, top' }}
        >
          <div className="px-6 py-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50">
            <span className="text-black font-semibold text-sm tracking-wide whitespace-nowrap">VIEW</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}