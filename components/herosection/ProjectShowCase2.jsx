'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Video refs
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  // Project data
  const projects = [
    {
      id: 1,
      title: 'EchoStream Entertainment',
      category: 'Mobile app',
      date: '6/20/24',
      description: 'UI/UX design',
      video: '/v1.mp4',
      ref: video1Ref
    },
    {
      id: 2,
      title: 'PulseTech Innovations',
      category: 'Boutique E-commerce Store',
      date: '7/13/24',
      description: 'Web design & Web development',
      video: '/StarWars.mp4',
      ref: video2Ref
    },
    {
      id: 3,
      title: 'SilverLynx Technologies',
      category: 'Pottery artist portfolio',
      date: '5/31/24',
      description: 'Web design & Web development',
      video: '/v1.mp4',
      ref: video3Ref
    },
    {
      id: 4,
      title: 'Evergreen Solutions',
      category: 'Artist Portfolio',
      date: '8/8/24',
      description: 'Web design & Web development',
      video: '/StarWars.mp4',
      ref: video4Ref
    }
  ];

  const handleVideoToggle = (videoRef) => {
    const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
    if (isPlaying) {
      // Pause all videos
      allVideos.forEach(ref => {
        if (ref.current) {
          ref.current.pause();
        }
      });
      setIsPlaying(false);
    } else {
      // Play all videos
      allVideos.forEach(ref => {
        if (ref.current) {
          ref.current.play().catch(error => {
            console.log('Autoplay prevented:', error);
          });
        }
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const videos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
    videos.forEach(ref => {
      if (ref.current) {
        ref.current.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  return (
    <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <span className="text-sm font-medium text-gray-400 tracking-wide">
              [02] — MY WORK
            </span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight">
            Projects
          </h1>
        </div>

        {/* Projects Grid Layout - 2 videos top, 2 videos + CTA bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Row - First 2 Projects */}
          {projects.slice(0, 2).map((project) => (
            <div 
              key={project.id}
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Video Container */}
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video
                  ref={project.ref}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={() => handleVideoToggle(project.ref)}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                
                {/* Play/Pause Overlay */}
                <div 
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying && hoveredProject !== project.id ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={() => handleVideoToggle(project.ref)}
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {!isPlaying ? (
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    ) : (
                      <Pause className="w-8 h-8 text-white" fill="white" />
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                    [ {project.category} ]
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-6 right-6">
                  <span className="inline-block bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8 bg-zinc-900">
                <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - Last 2 Projects + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects 3 & 4 */}
          {projects.slice(2, 4).map((project) => (
            <div 
              key={project.id}
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Video Container */}
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video
                  ref={project.ref}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={() => handleVideoToggle(project.ref)}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                
                {/* Play/Pause Overlay */}
                <div 
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying && hoveredProject !== project.id ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={() => handleVideoToggle(project.ref)}
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {!isPlaying ? (
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    ) : (
                      <Pause className="w-8 h-8 text-white" fill="white" />
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                    [ {project.category} ]
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-6 right-6">
                  <span className="inline-block bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8 bg-zinc-900">
                <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}

          {/* View All Projects CTA */}
          <div 
            className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center"
            onClick={() => window.location.href = '/projects'}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)] animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center p-12">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                View all projects
              </h3>
              
              <p className="text-lime-50 text-base font-medium">
                Explore the complete portfolio
              </p>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Audio Control Button */}
        <button
          onClick={toggleMute}
          className="fixed bottom-8 right-8 bg-lime-400 hover:bg-lime-500 rounded-full p-4 shadow-2xl transition-all duration-300 group z-50 border-2 border-lime-300"
          aria-label={isMuted ? "Unmute videos" : "Mute videos"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-black" strokeWidth={2.5} />
          ) : (
            <Volume2 className="w-6 h-6 text-black" strokeWidth={2.5} />
          )}
        </button>

        {/* Description Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-light text-white mb-4">
            Creative Excellence
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Each project represents a unique blend of creativity, technical expertise, and strategic thinking. 
            From motion graphics to 3D animation, every piece is crafted with meticulous attention to detail.
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro', 'DaVinci Resolve', 'Lottie'].map((tech) => (
              <span 
                key={tech}
                className="px-5 py-2 bg-zinc-900 text-gray-300 rounded-full text-sm font-medium border border-zinc-800 hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}