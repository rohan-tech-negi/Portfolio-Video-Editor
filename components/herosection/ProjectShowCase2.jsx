'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Video refs
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  const handleVideoToggle = () => {
    const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
    if (isPlaying) {
      allVideos.forEach(ref => {
        if (ref.current) ref.current.pause();
      });
      setIsPlaying(false);
    } else {
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
      if (ref.current) ref.current.muted = !isMuted;
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

        {/* Top Row - 2 Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Project 1 - Motion Graphics */}
          <div 
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(1)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Description Section */}
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-semibold text-white mb-3">Motion Graphics</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Dynamic motion design that brings brands to life through fluid animations, kinetic typography, and seamless transitions. Specializing in creating engaging visual narratives that captivate audiences and communicate complex ideas with clarity and style.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
                  After Effects
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-zinc-800 rounded-b-2xl overflow-hidden">
              <video
                ref={video1Ref}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={handleVideoToggle}
              >
                <source src="/v1.mp4" type="video/mp4" />
              </video>
              
              <div 
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying && hoveredProject !== 1 ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={handleVideoToggle}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {!isPlaying ? (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  ) : (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 - 3D Animation */}
          <div 
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(2)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Description Section */}
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-semibold text-white mb-3">3D Animation</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Immersive 3D experiences that push the boundaries of visual storytelling. From photorealistic renders to stylized animations, creating stunning three-dimensional worlds that blend technical precision with artistic vision to deliver unforgettable visual experiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
                  Unreal Engine
                </span>
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
                  After Effects
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-zinc-800">
              <video
                ref={video2Ref}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={handleVideoToggle}
              >
                <source src="/StarWars.mp4" type="video/mp4" />
              </video>
              
              <div 
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying && hoveredProject !== 2 ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={handleVideoToggle}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {!isPlaying ? (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  ) : (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 Projects + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project 3 - Motion Graphics (Mograph) */}
          <div 
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(3)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Description Section */}
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-semibold text-white mb-3">Mograph Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Abstract motion graphics that merge design principles with dynamic movement. Creating visually striking compositions using geometric shapes, bold colors, and rhythmic animations that transform simple elements into captivating visual experiences.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
                  After Effects
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-zinc-800">
              <video
                ref={video3Ref}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={handleVideoToggle}
              >
                <source src="/v1.mp4" type="video/mp4" />
              </video>
              
              <div 
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying && hoveredProject !== 3 ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={handleVideoToggle}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {!isPlaying ? (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  ) : (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project 4 - Cinematic Videos */}
          <div 
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(4)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Description Section */}
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-semibold text-white mb-3">Cinematic Videos</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Narrative-driven video production that combines cinematic techniques with compelling storytelling. From color grading to seamless editing, crafting polished videos that evoke emotion and leave a lasting impression on viewers.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
                  Premiere Pro
                </span>
                <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
                  DaVinci Resolve
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-zinc-800">
              <video
                ref={video4Ref}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onClick={handleVideoToggle}
              >
                <source src="/StarWars.mp4" type="video/mp4" />
              </video>
              
              <div 
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying && hoveredProject !== 4 ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={handleVideoToggle}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {!isPlaying ? (
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  ) : (
                    <Pause className="w-8 h-8 text-white" fill="white" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* View All Projects CTA */}
          {/* View All Projects CTA */}
{/* View All Projects CTA */}
<div
  className="relative group cursor-pointer rounded-2xl overflow-hidden
             bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600
             flex items-center justify-center min-h-[320px]
             hover:scale-[1.02] transition-all duration-500"
  onClick={() => {
    window.location.href = "/projects";
  }}
>
  <div className="relative z-10 text-center px-8">
    <div className="mb-5">
      <div className="w-14 h-14 mx-auto rounded-full bg-black/20
                      flex items-center justify-center
                      group-hover:rotate-45 transition-all duration-500">
        <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
      </div>
    </div>

    <h3 className="text-2xl font-semibold text-white mb-2">
      View All Projects
    </h3>

    <p className="text-white/90 text-sm">
      Explore the complete portfolio
    </p>
  </div>
</div>


        </div>

        {/* Audio Control Button */}
        <button
          onClick={toggleMute}
          className="fixed bottom-8 right-8 bg-lime-400 hover:bg-lime-500 rounded-full p-4 shadow-2xl transition-all duration-300 z-50 border-2 border-lime-300"
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
          
          
          
        </div>
      </div>

      
    </section>
  );
}