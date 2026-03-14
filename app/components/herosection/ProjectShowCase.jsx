'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { projects } from "@/lib/projects";

export default function ProjectsSectionnew() {
  const [isPlaying, setIsPlaying] = useState(false);
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

  const handleMouseEnter = (projectId, videoRef) => {
    setHoveredProject(projectId);
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = (videoRef) => {
    setHoveredProject(null);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  useEffect(() => {
    const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
    allVideos.forEach(ref => {
      if (ref.current) {
        ref.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    });
    setIsPlaying(true);
  }, []);

  return (
    <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          {/* Left Side - Projects */}
          <div>
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

          {/* Right Side - View More */}
          <div className="hidden lg:block text-right mt-auto">
            <a 
              href="/projects"
              className="group inline-block"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/40 leading-none tracking-tight transition-colors duration-300 group-hover:text-lime-400">
                View More
              </h2>
              <div className="w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full mt-2" />
            </a>
          </div>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Project 1 - Large */}
            <div 
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(1, video1Ref)}
              onMouseLeave={() => handleMouseLeave(video1Ref)}
            >
              <div className="relative aspect-[4/3] bg-zinc-800">
                <video
                  ref={video1Ref}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={handleVideoToggle}
                >
                  <source src={projects[3]?.gridVideo || projects[3]?.modalVideo || "/v1.mp4"} type="video/mp4" />
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

            {/* Project 3 - Medium */}
            <div 
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] lg:mt-16"
              onMouseEnter={() => handleMouseEnter(3, video3Ref)}
              onMouseLeave={() => handleMouseLeave(video3Ref)}
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video
                  ref={video3Ref}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={handleVideoToggle}
                >
                  <source src={projects[2]?.gridVideo || projects[2]?.modalVideo || "/toh kya badla.mp4"} type="video/mp4" />
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
          </div>

          {/* Right Column */}
          <div className="space-y-8 lg:mt-32">
            {/* Project 2 - Medium */}
            <div 
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(2, video2Ref)}
              onMouseLeave={() => handleMouseLeave(video2Ref)}
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video
                  ref={video2Ref}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={handleVideoToggle}
                >
                  <source src={projects[0]?.gridVideo || projects[0]?.modalVideo || "/craft.mp4"} type="video/mp4" />
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

            {/* Project 4 - Large */}
            <div 
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(4, video4Ref)}
              onMouseLeave={() => handleMouseLeave(video4Ref)}
            >
              <div className="relative aspect-[4/3] bg-zinc-800">
                <video
                  ref={video4Ref}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={handleVideoToggle}
                >
                  <source src={projects[1]?.gridVideo || projects[1]?.modalVideo || "/StarWars.mp4"} type="video/mp4" />
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
          </div>
        </div>

        {/* Mobile View More Link */}
        <div className="lg:hidden text-center mt-12">
          <a 
            href="/projects"
            className="group inline-block"
          >
            <h2 className="text-4xl font-light text-white/40 leading-none tracking-tight transition-colors duration-300 group-hover:text-lime-400">
              View More
            </h2>
            <div className="w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full mt-2 mx-auto" />
          </a>
        </div>
      </div>
    </section>
  );
}