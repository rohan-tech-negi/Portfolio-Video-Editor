"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { TypewriterOnScroll } from "@/app/components/common/TypeWritter";
import Lenis from "lenis";
import ScrollProgressBar from "@/app/components/transition/ScollBar";

const projects = [
  { id: 1, title: "Craft", category: "Motion Graphics", videoSrc: "/craft.mp4", poster: "" },
  { id: 2, title: "Star Wars", category: "Cinematic", videoSrc: "/StarWars.mp4", poster: "" },
  { id: 3, title: "Toh Kya Badla", category: "Color Grade", videoSrc: "/toh kya badla.mp4", poster: "" },
  { id: 4, title: "Money Talks", category: "VFX", videoSrc: "/moneytalks.mp4", poster: "" },
];

function ProjectCard({ title, category, videoSrc, poster, index, onExpand }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef(null);

  // Sync playing state with actual video state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Intersection observer for card reveal + lazy video play
  useEffect(() => {
    const el = cardRef.current;
    const video = videoRef.current;
    if (!el) return;

    if (index === 0) {
      const t = setTimeout(() => {
        el.classList.add("card-revealed");
        // Attempt autoplay for first card immediately
        video?.play().catch(() => {});
      }, 100);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("card-revealed");
          // Only play when card enters viewport
          video?.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const togglePlay = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col gap-4 card-hidden"
      onMouseEnter={() => { if (videoRef.current) videoRef.current.muted = false; }}
      onMouseLeave={() => { if (videoRef.current) videoRef.current.muted = true; }}
    >
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.06] transition-transform duration-500 ease-out group-hover:scale-[1.012] shadow-[0_8px_40px_rgba(0,0,0,0.45)] group-hover:shadow-[0_16px_60px_rgba(0,0,0,0.65)]">
        <div className="relative w-full aspect-video">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            // Tells browser this is low-priority until visible
            preload={index === 0 ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors duration-200"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                  <rect x="2" y="1" width="4" height="12" rx="1" />
                  <rect x="8" y="1" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                  <polygon points="2,1 13,7 2,13" />
                </svg>
              )}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onExpand(videoSrc); }}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="9,1 13,1 13,5" />
                <polyline points="1,9 1,13 5,13" />
                <line x1="13" y1="1" x2="8" y2="6" />
                <line x1="1" y1="13" x2="6" y2="8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1 mt-2">
        <span className="text-xl md:text-2xl font-medium font-['DM_Sans',sans-serif] tracking-tight text-[#222] leading-none mb-0">
          {title}
        </span>
        <div className="flex items-center gap-6">
          <span className="font-['DM_Mono',monospace] text-xs tracking-widest uppercase text-gray-500 leading-none">
            {category}
          </span>
          <span className="font-['DM_Mono',monospace] text-[10px] tracking-widest text-gray-400 leading-none">
            2024
          </span>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ src, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="relative w-[96vw] max-w-6xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/9" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        <button
          onClick={togglePlay}
          className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors duration-200"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
              <polygon points="2,1 13,7 2,13" />
            </svg>
          )}
        </button>

        <button
          onClick={onClose}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const headingRef = useRef(null);
  const [expandedSrc, setExpandedSrc] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf); // ✅ store ID for cleanup
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // ✅ properly cancel on unmount
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("heading-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
        .heading-wrap { overflow: hidden; }
        .projects-heading {
          display: block;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease;
        }
        .heading-revealed .projects-heading { transform: translateY(0); opacity: 1; }
        .card-hidden {
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-revealed { opacity: 1 !important; transform: scale(1) !important; }
      `}</style>

      <div style={{ filter: expandedSrc ? "blur(5px)" : "none", transition: "filter 0.3s ease" }}>
        <section
          className="min-h-screen w-full py-24 px-5 sm:px-8 relative overflow-hidden"
          style={{
            backgroundColor: '#f9f9f8',
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(249,249,248,0.5) 85%, rgba(249,249,248,0.9) 100%)` }} />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="mb-16">
              <TypewriterOnScroll text="[02] — Work" className="text-xl font-medium text-black" />
              <div ref={headingRef} className="heading-wrap pb-4 mt-4">
                <h2 className="projects-heading font-['Inter',sans-serif] text-[clamp(3rem,9vw,6rem)] font-black leading-[0.9] tracking-tighter text-[#0d0d0d]">
                  Projects.
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-14 sm:gap-20">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} {...project} index={i} onExpand={setExpandedSrc} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {expandedSrc && <VideoModal src={expandedSrc} onClose={() => setExpandedSrc(null)} />}
    </>
  );
}