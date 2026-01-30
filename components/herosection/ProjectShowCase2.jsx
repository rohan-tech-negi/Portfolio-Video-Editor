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
          {/* Project 1 */}
          <div 
            className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(1)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="relative aspect-[16/10] bg-zinc-800">
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

              <div className="absolute top-6 left-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  [ Mobile app ]
                </span>
              </div>

              <div className="absolute top-6 right-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  6/20/24
                </span>
              </div>
            </div>

            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-lime-400 transition-colors">
                EchoStream Entertainment
              </h3>
              <p className="text-gray-400 text-sm">UI/UX design</p>
            </div>
          </div>

          {/* Project 2 */}
          <div 
            className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(2)}
            onMouseLeave={() => setHoveredProject(null)}
          >
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

              <div className="absolute top-6 left-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  [ Boutique E-commerce Store ]
                </span>
              </div>

              <div className="absolute top-6 right-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  7/13/24
                </span>
              </div>
            </div>

            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-lime-400 transition-colors">
                PulseTech Innovations
              </h3>
              <p className="text-gray-400 text-sm">Web design & Web development</p>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 Projects + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project 3 */}
          <div 
            className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(3)}
            onMouseLeave={() => setHoveredProject(null)}
          >
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

              <div className="absolute top-6 left-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  [ Pottery artist portfolio ]
                </span>
              </div>

              <div className="absolute top-6 right-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  5/31/24
                </span>
              </div>
            </div>

            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-lime-400 transition-colors">
                SilverLynx Technologies
              </h3>
              <p className="text-gray-400 text-sm">Web design & Web development</p>
            </div>
          </div>

          {/* Project 4 */}
          <div 
            className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredProject(4)}
            onMouseLeave={() => setHoveredProject(null)}
          >
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

              <div className="absolute top-6 left-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  [ Artist Portfolio ]
                </span>
              </div>

              <div className="absolute top-6 right-6">
                <span className="inline-block bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium px-4 py-2 rounded-full border border-white/10">
                  8/8/24
                </span>
              </div>
            </div>

            <div className="p-8 bg-zinc-900">
              <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-lime-400 transition-colors">
                Evergreen Solutions
              </h3>
              <p className="text-gray-400 text-sm">Web design & Web development</p>
            </div>
          </div>

          {/* View All Projects CTA */}
          <div 
            className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center min-h-[400px]"
            onClick={() => window.location.href = '/projects'}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" 
                   style={{ animation: 'pulse 3s ease-in-out infinite' }} />
            </div>

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

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          <h3 className="text-3xl font-light text-white mb-4">
            Creative Excellence
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Each project represents a unique blend of creativity, technical expertise, and strategic thinking. 
            From motion graphics to 3D animation, every piece is crafted with meticulous attention to detail.
          </p>
          
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
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}