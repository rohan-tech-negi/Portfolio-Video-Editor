'use client';
import { useEffect, useRef, useState } from 'react';

const projects = [
  { id: 1, name: 'Craft', type: 'Motion Graphics', src: '/craft.mp4' },
  { id: 2, name: 'Star Wars', type: 'Cinematic', src: '/StarWars.mp4' },
  { id: 3, name: 'Project 1', type: 'Color Grade', src: '/v1.mp4' },
  { id: 4, name: 'Project 2', type: 'VFX', src: '/v2.mp4' },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function ProjectCard({ name, type, src, index }) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(wrapperRef);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Load video only when in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      if (!video.src || video.src === window.location.href) {
        video.src = src;
        video.load();
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, src]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  };

  return (
    <article
      ref={wrapperRef}
      className="flex flex-col gap-4 group"
      style={{
        opacity: 0,
        animation: `fadeSlideUp 0.7s ease forwards`,
        animationDelay: `${index * 0.15}s`,
      }}
    >
      <div
        className="relative overflow-hidden rounded-3xl shadow-lg bg-[#111]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Skeleton shimmer shown while loading */}
        {!loaded && !error && (
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#111]">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#444">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
            </svg>
            <span className="text-[#555] text-xs tracking-widest uppercase">Video unavailable</span>
          </div>
        )}

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setLoaded(true)}
          onError={() => setError(true)}
          className="w-full aspect-video object-cover block transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease, transform 0.5s ease' }}
        />

        {/* Hover overlay with play indicator */}
        {!hovered && loaded && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-[#111] text-base font-semibold tracking-tight">{name}</span>
        <span className="text-[#777] text-xs font-medium tracking-widest uppercase">{type}</span>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-24 sm:py-32">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

        <header className="mb-16">
          <p className="text-xl font-medium text-black mb-2">[02] — My Work</p>
          <h2 className="text-[clamp(4rem,8vw,6.5rem)] font-extrabold leading-tight text-[#111]">
            Projects
          </h2>
        </header>

        <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-12 lg:gap-20">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              index={i}
              name={project.name}
              type={project.type}
              src={project.src}
            />
          ))}
        </div>

      </div>
    </section>
  );
}