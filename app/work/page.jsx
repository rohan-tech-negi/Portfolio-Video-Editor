'use client';
import { TypewriterOnScroll } from "@/components/common/TypeWritter";
const projects = [
  { id: 1, name: 'Craft', type: 'Motion Graphics', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 2, name: 'Star Wars', type: 'Cinematic', src: '/StarWars.mp4' },
  { id: 3, name: 'Project 1', type: 'Color Grade', src: '/v1.mp4' },
  { id: 4, name: 'Project 2', type: 'VFX', src: '/v2.mp4' },
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
          className="w-full aspect-video object-cover block transition-transform duration-500 group-hover:scale-[1.04]"
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
                      text="[02] — My Work"
            className="text-xl font-medium text-black"
                      >
          
                      </TypewriterOnScroll>
          <h2 className="text-[clamp(4rem,8vw,6.5rem)] font-extrabold leading-tight text-[#111]">
            Projects
          </h2>
        </header>

        {/* 
          To adjust the size of the videos manually, change the max-width value below. 
          For example: decrease to max-w-[800px] for smaller videos, or increase to max-w-[1200px] for larger ones. 
        */}
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-12 lg:gap-20">
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