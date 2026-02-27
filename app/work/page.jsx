"use client";
import { useEffect, useRef } from "react";
import { TypewriterOnScroll } from "@/components/common/TypeWritter";

const projects = [
  { id: 1, title: "Craft", category: "Motion Graphics", videoSrc: "/craft.mp4", poster: "" },
  { id: 2, title: "Star Wars", category: "Cinematic", videoSrc: "/StarWars.mp4", poster: "" },
  { id: 3, title: "Toh Kya Badla", category: "Color Grade", videoSrc: "/toh kya badla.mp4", poster: "" },
  { id: 4, title: "Sequence", category: "VFX", videoSrc: "/v1.mp4", poster: "" },
];

function ProjectCard({ title, category, videoSrc, poster, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (index === 0) {
      const t = setTimeout(() => el.classList.add("card-revealed"), 100);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("card-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="group flex flex-col gap-4 card-hidden">
      {/* Card */}
      <div
        className="
          relative w-full rounded-2xl overflow-hidden
          bg-[#0d0d0d] border border-white/[0.06]
          transition-transform duration-500 ease-out
          group-hover:scale-[1.012]
          shadow-[0_8px_40px_rgba(0,0,0,0.45)]
          group-hover:shadow-[0_16px_60px_rgba(0,0,0,0.65)]
        "
      >
        {/* 16:9 aspect ratio wrapper */}
        <div className="relative w-full aspect-video">
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Below-card meta row */}
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

export default function ProjectsSection() {
  const headingRef = useRef(null);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter  :wght@400;700;900&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

        /* Heading reveal */
        .heading-wrap {
          overflow: hidden;
        }
        .projects-heading {
          display: block;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.9s ease;
        }
        .heading-revealed .projects-heading {
          transform: translateY(0);
          opacity: 1;
        }

        /* Card reveal */
        .card-hidden {
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-revealed {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>

      <section 
        className="min-h-screen w-full py-24 px-5 sm:px-8 relative overflow-hidden"
        style={{
          backgroundColor: '#f9f9f8',
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
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(249, 249, 248, 0.5) 85%, rgba(249, 249, 248, 0.9) 100%)`
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Section Header ── */}
          <div className="mb-16">
            <TypewriterOnScroll text="[02] — Work" className="text-xl font-medium text-black" />
            <div ref={headingRef} className="heading-wrap pb-4 mt-4">
              <h2
                className="
                  projects-heading
                  font-['Inter',sans-serif]
                  text-[clamp(3rem,9vw,6rem)]
                  font-black leading-[0.9] tracking-tighter
                  text-[#0d0d0d]
                "
              >
                Projects.
              </h2>
            </div>
          </div>

          {/* ── Project Cards ── */}
          <div className="flex flex-col gap-14 sm:gap-20">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} {...project} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}