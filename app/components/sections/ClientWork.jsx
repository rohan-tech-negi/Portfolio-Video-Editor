'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from '../SplitText';
import { TypewriterOnScroll } from '../common/TypeWritter';
import { clientProjects } from '@/lib/clientWork';

// Custom intersection hook for scroll revealing
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function VideoCard({ project, onExpand }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !cursorRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smoothly set cursor position inside the card boundary
    cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Video Container Card */}
      <div
        ref={cardRef}
        className="group relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] bg-zinc-900 rounded-2xl overflow-hidden cursor-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(191,255,0,0.15)] border border-black/5 hover:border-[#BFFF00]/30"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => onExpand(project)}
      >
        {/* Custom Custom Cursor (VIEW Badge) */}
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 left-0 top-0 will-change-transform"
        >
          <div className="px-5 py-2.5 bg-[#BFFF00] text-black font-semibold text-xs tracking-wider rounded-full shadow-lg shadow-[#BFFF00]/30 whitespace-nowrap">
            VIEW PROJECT
          </div>
        </div>

        {/* Video Player */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-[1.1]"
          loop
          muted
          playsInline
          preload="metadata"
          poster={project.poster}
          src={project.loopVideo}
        />

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

        {/* Badge in top-left */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BFFF00] animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-white/90">
            Client Project
          </span>
        </div>

        {/* Dynamic Border Accent Effect */}
        <div className="absolute inset-0 border border-[#BFFF00]/0 group-hover:border-[#BFFF00]/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Info Details Below Card */}
      <div className="w-full max-w-[380px] sm:max-w-[420px] text-left mt-5 px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#0d0d0d] font-sans">
            {project.client}
          </h3>
          <span className="text-[10px] tracking-widest font-mono uppercase text-gray-400">
            [01.0{project.id}]
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium font-sans text-gray-500 mt-1.5 leading-relaxed">
          {project.role}
        </p>
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    
    // Try auto-play with sound
    video.play().catch(() => {
      // Fallback if browser blocks sound autoplay
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    });

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{ backdropFilter: 'blur(16px)', background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative max-w-[360px] sm:max-w-[400px] w-full aspect-[9/16] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={project.modalVideo}
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Gradient overlays inside modal */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Modal Top Details */}
        <div className="absolute top-5 left-5 right-5 z-10 flex justify-between items-start">
          <div className="text-white">
            <span className="text-[10px] font-mono tracking-widest text-[#BFFF00] uppercase">Selected Project</span>
            <h4 className="text-lg font-bold tracking-tight">{project.client}</h4>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Controls */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-center">
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-[#BFFF00] hover:text-black hover:border-[#BFFF00] hover:scale-105 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-[#BFFF00] hover:text-black hover:border-[#BFFF00] hover:scale-105 transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ClientWork() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.05);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full min-h-screen relative py-24 px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col justify-center"
        style={{
          backgroundColor: '#f5f5f5',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Radial Overlay to feather edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(245, 245, 245, 0.5) 85%, rgba(245, 245, 245, 0.9) 100%)`,
          }}
        />

        <div className="max-w-[1600px] w-full mx-auto relative z-10">
          {/* Header Area */}
          <div className="mb-20 text-left">
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#BFFF00] shadow-[0_0_10px_rgba(191,255,0,0.8)]" />
              <TypewriterOnScroll
                text="[01] — Client Work"
                className="text-lg font-semibold tracking-wider text-black font-mono"
              />
            </div>

            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
              }}
            >
              <h2 className="font-['Inter',sans-serif] text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tighter text-[#0d0d0d] pb-4">
                Selected Client Projects
              </h2>
              <p className="text-base md:text-lg lg:text-xl font-medium font-sans text-gray-500 max-w-2xl mt-4 leading-relaxed">
                Helping brands grow through cinematic storytelling and precise editing.
              </p>
            </div>
          </div>

          {/* Grid Layout (3 Stacked Rows, centered) */}
          <div
            className="flex flex-col gap-24 sm:gap-32 items-center w-full"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            {clientProjects.map((project) => (
              <VideoCard
                key={project.id}
                project={project}
                onExpand={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal with blur filter transition */}
      <AnimatePresence>
        {selectedProject && (
          <VideoModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
