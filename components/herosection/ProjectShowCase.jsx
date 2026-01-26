'use client';

import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

export default function ProjectsSection() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Initialize refs without TypeScript types
  const mainVideoRef = useRef(null);
  const timelineVideoRef = useRef(null);

  const handleVideoToggle = () => {
    if (mainVideoRef.current && timelineVideoRef.current) {
      if (isPlaying) {
        mainVideoRef.current.pause();
        timelineVideoRef.current.pause();
      } else {
        mainVideoRef.current.play().catch(error => {
          console.log('Autoplay prevented:', error);
        });
        timelineVideoRef.current.play().catch(error => {
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
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    }
  };

  // Sync timeline video with main video
  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    const timelineVideo = timelineVideoRef.current;

    if (mainVideo && timelineVideo) {
      const syncTimeline = () => {
        timelineVideo.currentTime = mainVideo.currentTime;
      };

      mainVideo.addEventListener('timeupdate', syncTimeline);

      return () => {
        mainVideo.removeEventListener('timeupdate', syncTimeline);
      };
    }
  }, []);

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <span className="text-sm font-medium text-gray-600">[03] — My Work</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-gray-900 leading-tight">
            Projects
          </h1>
        </div>

        {/* Video Box Container */}
        <div 
          className="relative max-w-5xl mx-auto cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleVideoToggle}
        >
          {/* Custom Play Cursor */}
          {isHovering && (
            <div className="custom-cursor fixed pointer-events-none z-[100]">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 border-2 border-lime-400 flex items-center justify-center backdrop-blur-sm">
                {!isPlaying ? (
                  <Play className="w-6 h-6 text-lime-500 ml-1" />
                ) : (
                  <div className="w-2 h-6 bg-lime-500 rounded-full mx-2" />
                )}
              </div>
            </div>
          )}

          {/* Video Container Box */}
          <div className="bg-gray-50 border-2 border-black/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {/* Main Video Section */}
            <div className="relative aspect-video bg-black">
              <video
                ref={mainVideoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              >
                <source src="/" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Video Section */}
            <div className="relative h-40 bg-gray-900 border-t border-black/10">
              <video
                ref={timelineVideoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              >
                <source src="/videos/timeline.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Timeline Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 text-sm font-medium">
                  After Effects Timeline
                </span>
              </div>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10">
              <span className="text-sm font-medium text-gray-900">
                Click to {isPlaying ? 'pause' : 'play'}
              </span>
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
          </div>
        </div>

        {/* Additional Projects Grid (Optional) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((project) => (
            <div 
              key={project} 
              className="bg-gray-50 border-2 border-black/10 rounded-3xl p-8 hover:border-lime-400/30 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-6"></div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Project {project}
              </h3>
              <p className="text-gray-600 mb-4">
                Brief description of the project and the tools used.
              </p>
              <span className="inline-block px-4 py-2 bg-lime-400/20 text-lime-700 rounded-full text-sm font-medium">
                View Case Study
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}