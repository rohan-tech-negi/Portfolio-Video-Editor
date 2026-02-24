'use client';

const projects = [
  { id: 1, name: 'Star Wars', type: 'Motion Graphics', src: '/videos/StarWars.mp4' },
  { id: 2, name: 'Star Wars', type: 'Cinematic',        src: '/videos/StarWars.mp4' },
  { id: 3, name: 'Star Wars', type: 'Color Grade',      src: '/videos/StarWars.mp4' },
  { id: 4, name: 'Star Wars', type: 'VFX',              src: '/videos/StarWars.mp4' },
];

function ProjectCard({ name, type, src }) {
  return (
    <article className="flex flex-col gap-3 group">
      <div className="relative overflow-hidden rounded-2xl shadow-md bg-[#111]">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onMouseEnter={(e) => (e.currentTarget.controls = true)}
          onMouseLeave={(e) => (e.currentTarget.controls = false)}
          className="w-full aspect-video object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-[#111] text-sm font-semibold tracking-tight">{name}</span>
        <span className="text-[#888] text-xs font-medium tracking-widest uppercase">{type}</span>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="mb-12 sm:mb-16 text-center">
          <p className="text-xs font-bold tracking-widest text-[#999] uppercase mb-3">[02] — Work</p>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-tight text-[#111] font-display">
            Projects
          </h2>
        </header>

        {/* Horizontal video grid — 2 columns, 2 rows on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
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