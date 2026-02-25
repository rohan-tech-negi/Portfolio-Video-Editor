const projects = [
  {
    id: 1,
    title: "Craft",
    category: "Motion Graphics",
    videoSrc: "/craft.mp4",
    poster: "",
  },
  {
    id: 2,
    title: "Star Wars",
    category: "Cinematic",
    videoSrc: "/StarWars.mp4",
    poster: "",
  },
  {
    id: 3,
    title: "Toh Kya Badla",
    category: "Color Grade",
    videoSrc: "/toh kya badla.mp4",
    poster: "",
  },
  {
    id: 4,
    title: "Sequence",
    category: "VFX",
    videoSrc: "/v1.mp4",
    poster: "",
  },
];

function ProjectCard({ title, category, videoSrc, poster }) {
  return (
    <div className="group flex flex-col gap-4">
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
      <div className="flex items-baseline justify-between px-1">
        <span
          className="
             text-4xl md:text-5xl lg:text-6xl font-black font-['Inter',sans-serif] tracking-tighter
            text-[#0d0d0d] leading-none
          "
        >
          {title}
        </span>
        <span
          className="
            font-['DM_Mono',monospace] text-[11px] tracking-[0.2em]
            uppercase text-white/40 leading-none
          "
        >
          {category}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

        /* Grid background */
        .grid-bg {
          background-color: #f9f9f8;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <section className="grid-bg min-h-screen w-full py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">

          {/* ── Section Header ── */}
          <div className="mb-16">
            <p
              className="
                font-['DM_Mono',monospace] text-xs tracking-[0.25em]
                uppercase text-black/35 mb-4
              "
            >
              [02] — My Work
            </p>
            <h2
              className="
                font-['Inter',sans-serif]
                text-[clamp(4rem,12vw,8rem)]
                font-black leading-[0.9] tracking-tighter
                text-[#0d0d0d]
              "
            >
              Projects.
            </h2>
          </div>

          {/* ── Project Cards ── */}
          <div className="flex flex-col gap-14 sm:gap-20">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}