'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function ProjectsSection() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Video refs for all videos
  const mainVideoRef = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  const handleVideoToggle = (videoRef) => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    document.body.style.cursor = 'none';
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e) => {
    if (isHovering) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Sync videos (optional - if you want them to play together)
  useEffect(() => {
    const videos = [
      mainVideoRef.current,
      video2Ref.current,
      video3Ref.current,
      video4Ref.current
    ].filter(v => v);

    const syncVideos = () => {
      const mainTime = mainVideoRef.current?.currentTime || 0;
      videos.forEach(video => {
        if (video && video !== mainVideoRef.current) {
          video.currentTime = mainTime;
        }
      });
    };

    if (mainVideoRef.current) {
      mainVideoRef.current.addEventListener('timeupdate', syncVideos);
    }

    return () => {
      if (mainVideoRef.current) {
        mainVideoRef.current.removeEventListener('timeupdate', syncVideos);
      }
    };
  }, []);

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <span className="text-sm font-medium text-gray-600">[02] — My Work</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-gray-900 leading-tight">
            Projects
          </h1>
        </div>

        {/* Video Box Container */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* Custom Play Cursor */}
          {isHovering && (
            <div 
              className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
            >
              <div className="w-16 h-16 rounded-full bg-lime-400/90 border-2 border-lime-500 flex items-center justify-center backdrop-blur-sm shadow-lg">
                {!isPlaying ? (
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                ) : (
                  <Pause className="w-6 h-6 text-white" fill="white" />
                )}
              </div>
            </div>
          )}

          {/* MAIN OUTER CONTAINER - The big container */}
          <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            
            {/* FIRST INNER BOX - Main Video (Large top box) */}
            <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden mb-6">
              <div className="relative aspect-video bg-black">
                <video
                  ref={mainVideoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={() => handleVideoToggle(mainVideoRef)}
                >
                  <source src="/v1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECOND INNER BOX - Two small videos side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left small video */}
              <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden">
                <div className="relative aspect-video bg-black">
                  <video
                    ref={video2Ref}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    onClick={() => handleVideoToggle(video2Ref)}
                  >
                    <source src="/v2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right small video */}
              <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden">
                <div className="relative aspect-video bg-black">
                  <video
                    ref={video3Ref}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    onClick={() => handleVideoToggle(video3Ref)}
                  >
                    <source src="/v3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* THIRD INNER BOX - Large bottom box */}
            <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden">
              <div className="relative aspect-video bg-black">
                <video
                  ref={video4Ref}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={() => handleVideoToggle(video4Ref)}
                >
                  <source src="/v4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-medium text-gray-900 mb-2">
              Motion Design Project
            </h3>
            <p className="text-gray-600">
              A showcase of visual effects and motion graphics created in After Effects
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1 bg-gray-100 rounded-full">After Effects</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Motion Graphics</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">Video Editing</span>
            </div>
          </div>
        </div>

        {/* Additional Projects Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((project) => (
            <div 
              key={project} 
              className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-lime-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-white/50 text-4xl font-bold">0{project}</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Project {project}
              </h3>
              <p className="text-gray-600 mb-4">
                Brief description of the project and the tools used to bring this creative vision to life.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/20 hover:bg-lime-400/30 text-lime-700 rounded-full text-sm font-medium transition-colors">
                View Case Study
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}