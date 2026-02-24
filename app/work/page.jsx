'use client';
import { TypewriterOnScroll } from "@/components/common/TypeWritter";
const projects = [
  { id: 1, name: 'Star Wars', type: 'Motion Graphics', src: '/StarWars.mp4' },
  { id: 2, name: 'Star Wars', type: 'Cinematic', src: '/videos/StarWars.mp4' },
  { id: 3, name: 'Star Wars', type: 'Color Grade', src: '/videos/StarWars.mp4' },
  { id: 4, name: 'Star Wars', type: 'VFX', src: '/videos/StarWars.mp4' },
];

function ProjectCard({ name, type, src }) {
  return (
    <article className="flex flex-col gap-4 group">
      <div className="relative overflow-hidden rounded-3xl shadow-lg bg-[#111]">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onMouseEnter={(e) => (e.currentTarget.controls = true)}
          onMouseLeave={(e) => (e.currentTarget.controls = false)}
          className="w-full aspect-[16/9] object-cover block transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-[#111] text-base font-semibold tracking-tight">
          {name}
        </span>
        <span className="text-[#777] text-xs font-medium tracking-widest uppercase">
          {type}
        </span>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-24 sm:py-32">
      {/* Increased container width */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Left aligned header */}
        <header className="mb-16">
          <TypewriterOnScroll
                      text="[02] — My Projects"
            className="text-xl font-medium text-black"
                      >
          
                      </TypewriterOnScroll>
          <h2 className="text-[clamp(4rem,8vw,6rem)] font-extrabold leading-tight text-[#111]">
            Projects
          </h2>
        </header>

        {/* Larger grid spacing + bigger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
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