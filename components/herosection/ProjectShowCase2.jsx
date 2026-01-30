'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';

export default function ProjectsSection1() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);
  
  // Video refs
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  // Project data
  const projects = [
    {
      id: 1,
      title: 'Motion Graphics',
      description: 'Creating fluid animations and visual storytelling through After Effects',
      video: '/v1.mp4',
      category: 'Motion Design'
    },
    {
      id: 2,
      title: '3D Animation',
      description: 'Bringing digital worlds to life with Cinema 4D and Blender',
      video: '/StarWars.mp4',
      category: '3D Design'
    },
    {
      id: 3,
      title: 'Motion Typography',
      description: 'Dynamic text animations that create visual impact and emotion',
      video: '/v1.mp4',
      category: 'Typography'
    },
    {
      id: 4,
      title: 'Cinematic Videos',
      description: 'Professional video editing with dramatic storytelling techniques',
      video: '/StarWars.mp4',
      category: 'Video Editing'
    }
  ];

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

  const toggleMute = () => {
    const videos = [
      video1Ref.current,
      video2Ref.current,
      video3Ref.current,
      video4Ref.current
    ].filter(v => v);

    videos.forEach(video => {
      if (video) {
        video.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
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

  // Sync videos (optional)
  useEffect(() => {
    const videos = [
      video1Ref.current,
      video2Ref.current,
      video3Ref.current,
      video4Ref.current
    ].filter(v => v);

    const syncVideos = () => {
      const mainTime = video1Ref.current?.currentTime || 0;
      videos.forEach(video => {
        if (video && video !== video1Ref.current) {
          video.currentTime = mainTime;
        }
      });
    };

    if (video1Ref.current) {
      video1Ref.current.addEventListener('timeupdate', syncVideos);
    }

    return () => {
      if (video1Ref.current) {
        video1Ref.current.removeEventListener('timeupdate', syncVideos);
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

        {/* Video Grid Container - Matches reference layout */}
        <div 
          className="relative max-w-7xl mx-auto"
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

          {/* 2x2 Grid with View All Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 - Motion Graphics */}
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`bg-black border-2 border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group ${
                  index === 3 ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="aspect-video bg-gray-900">
                  <video
                    ref={index === 0 ? video1Ref : index === 1 ? video2Ref : index === 2 ? video3Ref : video4Ref}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={() => handleVideoToggle(
                      index === 0 ? video1Ref : 
                      index === 1 ? video2Ref : 
                      index === 2 ? video3Ref : video4Ref
                    )}
                  >
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Card content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-lime-400 px-2 py-1 rounded-full bg-lime-400/10">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {project.description}
                  </p>
                </div>
                
                {/* Card label */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                  Project {project.id}
                </div>
              </div>
            ))}
            
            {/* View All Projects Block - Green CTA */}
            <div 
              className="bg-lime-400 rounded-2xl overflow-hidden shadow-2xl relative group flex flex-col justify-center items-center cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => window.open('/projects', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/50 to-lime-400/50" />
              <div className="relative z-10 text-center p-12">
                <h3 className="text-2xl font-bold text-white mb-4">View all projects</h3>
                <p className="text-lime-50 text-lg mb-6">Explore my complete portfolio</p>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Audio Control Button */}
          <button
            onClick={toggleMute}
            className="fixed bottom-8 right-8 bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-full p-3 shadow-xl hover:bg-white transition-all duration-300 group z-10"
            aria-label={isMuted ? "Unmute videos" : "Mute videos"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-700 group-hover:text-lime-500 transition-colors" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-700 group-hover:text-lime-500 transition-colors" />
            )}
          </button>
        </div>

        {/* Project Description */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-medium text-gray-900 mb-2">
            Creative Showcase
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Each project represents my commitment to creating visually compelling experiences through motion, 
            typography, and innovative design solutions.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
            <span className="px-4 py-2 bg-gray-100 rounded-full">After Effects</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Cinema 4D</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Blender</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Premiere Pro</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">Lottie</span>
          </div>
        </div>
      </div>
    </section>
  );
}