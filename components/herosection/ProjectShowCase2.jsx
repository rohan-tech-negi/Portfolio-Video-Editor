// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { Play, Pause, ArrowUpRight } from 'lucide-react';

// export default function ProjectsSection() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hoveredProject, setHoveredProject] = useState(null);
  
//   // Video refs
//   const video1Ref = useRef(null);
//   const video2Ref = useRef(null);
//   const video3Ref = useRef(null);
//   const video4Ref = useRef(null);

//   const handleVideoToggle = () => {
//     const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
//     if (isPlaying) {
//       allVideos.forEach(ref => {
//         if (ref.current) ref.current.pause();
//       });
//       setIsPlaying(false);
//     } else {
//       allVideos.forEach(ref => {
//         if (ref.current) {
//           ref.current.play().catch(error => {
//             console.log('Autoplay prevented:', error);
//           });
//         }
//       });
//       setIsPlaying(true);
//     }
//   };

//   const handleMouseEnter = (projectId, videoRef) => {
//     setHoveredProject(projectId);
//     // Unmute only the hovered video
//     if (videoRef.current) {
//       videoRef.current.muted = false;
//     }
//   };

//   const handleMouseLeave = (videoRef) => {
//     setHoveredProject(null);
//     // Mute the video when mouse leaves
//     if (videoRef.current) {
//       videoRef.current.muted = true;
//     }
//   };

//   // Auto-play videos when component mounts
//   useEffect(() => {
//     const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
//     // Start playing all videos on mount
//     allVideos.forEach(ref => {
//       if (ref.current) {
//         ref.current.play().catch(error => {
//           console.log('Autoplay prevented:', error);
//         });
//       }
//     });
//     setIsPlaying(true);
//   }, []);

//   return (
//     <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12">
//       <div className="max-w-[1600px] mx-auto">
//         {/* Header */}
//         <div className="mb-16">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-2 h-2 rounded-full bg-lime-400" />
//             <span className="text-sm font-medium text-gray-400 tracking-wide">
//               [02] — MY WORK
//             </span>
//           </div>
//           <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight">
//             Projects
//           </h1>
//         </div>

//         {/* Top Row - 2 Projects */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Project 1 - Motion Graphics */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(1, video1Ref)}
//             onMouseLeave={() => handleMouseLeave(video1Ref)}
//           >
//             {/* Description Section */}
//             <div className="p-8 pb-0">
//               <h3 className="text-2xl font-semibold text-white mb-3">Motion Graphics</h3>
//               <p className="text-gray-400 text-sm leading-relaxed mb-4">
//                 Dynamic motion design that brings brands to life through fluid animations, kinetic typography, and seamless transitions. Specializing in creating engaging visual narratives that captivate audiences and communicate complex ideas with clarity and style.
//               </p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
//                   After Effects
//                 </span>
//               </div>
//             </div>

//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video1Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/v1.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 1 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project 2 - 3D Animation */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(2, video2Ref)}
//             onMouseLeave={() => handleMouseLeave(video2Ref)}
//           >
//             {/* Description Section */}
//             <div className="p-8 pb-0">
//               <h3 className="text-2xl font-semibold text-white mb-3">3D Animation</h3>
//               <p className="text-gray-400 text-sm leading-relaxed mb-4">
//                 Immersive 3D experiences that push the boundaries of visual storytelling. From photorealistic renders to stylized animations, creating stunning three-dimensional worlds that blend technical precision with artistic vision to deliver unforgettable visual experiences.
//               </p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
//                   Unreal Engine
//                 </span>
//                 <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
//                   After Effects
//                 </span>
//               </div>
//             </div>

//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video2Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/StarWars.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 2 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Row - 2 Projects + CTA */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Project 3 - Motion Graphics (Mograph) */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] flex flex-col"
//             onMouseEnter={() => handleMouseEnter(3, video3Ref)}
//             onMouseLeave={() => handleMouseLeave(video3Ref)}
//           >
//             {/* Description Section */}
//             <div className="p-6 pb-4">
//               <h3 className="text-xl font-semibold text-white mb-2">Mograph Design</h3>
//               <p className="text-gray-400 text-sm leading-relaxed mb-3">
//                 Abstract motion graphics where design meets movement.
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
//                   After Effects
//                 </span>
//               </div>
//             </div>

//             <div className="relative flex-1 bg-zinc-800">
//               <video
//                 ref={video3Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/v1.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 3 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project 4 - Cinematic Videos */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] flex flex-col"
//             onMouseEnter={() => handleMouseEnter(4, video4Ref)}
//             onMouseLeave={() => handleMouseLeave(video4Ref)}
//           >
//             {/* Description Section */}
//             <div className="p-6 pb-4">
//               <h3 className="text-xl font-semibold text-white mb-2">Cinematic Videos</h3>
//               <p className="text-gray-400 text-sm leading-relaxed mb-3">
//                 Cinematic storytelling crafted through color, editing, and emotion-driven visual narratives.
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
//                   Premiere Pro
//                 </span>
//                 <span className="px-3 py-1 bg-lime-400/10 text-lime-400 text-xs font-medium rounded-full border border-lime-400/20">
//                   DaVinci Resolve
//                 </span>
//               </div>
//             </div>

//             <div className="relative flex-1 bg-zinc-800">
//               <video
//                 ref={video4Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/StarWars.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 4 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* View All Projects CTA */}
//           <div 
//             className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center"
//             onClick={() => window.location.href = '/projects'}
//           >
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" 
//                    style={{ animation: 'pulse 3s ease-in-out infinite' }} />
//             </div>

//             <div className="relative z-10 text-center p-8">
//               <div className="mb-5">
//                 <div className="w-14 h-14 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
//                   <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
//                 </div>
//               </div>
              
//               <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
//                 View all projects
//               </h3>
              
//               <p className="text-lime-50 text-sm font-medium">
//                 Explore the complete portfolio
//               </p>
//             </div>

//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </div>
//         </div>

//         {/* Description Section */}
        
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.4; }
//         }
//       `}</style>
//     </section>
//   );
// }






// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { Play, Pause, ArrowUpRight } from 'lucide-react';

// export default function ProjectsSection() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hoveredProject, setHoveredProject] = useState(null);
  
//   // Video refs
//   const video1Ref = useRef(null);
//   const video2Ref = useRef(null);
//   const video3Ref = useRef(null);
//   const video4Ref = useRef(null);

//   const handleVideoToggle = () => {
//     const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
//     if (isPlaying) {
//       allVideos.forEach(ref => {
//         if (ref.current) ref.current.pause();
//       });
//       setIsPlaying(false);
//     } else {
//       allVideos.forEach(ref => {
//         if (ref.current) {
//           ref.current.play().catch(error => {
//             console.log('Autoplay prevented:', error);
//           });
//         }
//       });
//       setIsPlaying(true);
//     }
//   };

//   const handleMouseEnter = (projectId, videoRef) => {
//     setHoveredProject(projectId);
//     if (videoRef.current) {
//       videoRef.current.muted = false;
//     }
//   };

//   const handleMouseLeave = (videoRef) => {
//     setHoveredProject(null);
//     if (videoRef.current) {
//       videoRef.current.muted = true;
//     }
//   };

//   useEffect(() => {
//     const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
//     allVideos.forEach(ref => {
//       if (ref.current) {
//         ref.current.play().catch(error => {
//           console.log('Autoplay prevented:', error);
//         });
//       }
//     });
//     setIsPlaying(true);
//   }, []);

//   return (
//     <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12">
//       <div className="max-w-[1600px] mx-auto">
//         {/* Header */}
//         <div className="mb-16">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-2 h-2 rounded-full bg-lime-400" />
//             <span className="text-sm font-medium text-gray-400 tracking-wide">
//               [02] — MY WORK
//             </span>
//           </div>
//           <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight">
//             Projects
//           </h1>
//         </div>

//         {/* Top Row - 2 Projects */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Project 1 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(1, video1Ref)}
//             onMouseLeave={() => handleMouseLeave(video1Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video1Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/v1.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 1 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project 2 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(2, video2Ref)}
//             onMouseLeave={() => handleMouseLeave(video2Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video2Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/craft.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 2 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Row - 2 Projects + CTA */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Project 3 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(3, video3Ref)}
//             onMouseLeave={() => handleMouseLeave(video3Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video3Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/toh kya badla.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 3 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project 4 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(4, video4Ref)}
//             onMouseLeave={() => handleMouseLeave(video4Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video4Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/StarWars.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 4 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* View All Projects CTA */}
//           <div 
//             className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center aspect-[16/10]"
//             onClick={() => window.location.href = '/projects'}
//           >
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" 
//                    style={{ animation: 'pulse 3s ease-in-out infinite' }} />
//             </div>

//             <div className="relative z-10 text-center p-8">
//               <div className="mb-5">
//                 <div className="w-14 h-14 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
//                   <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
//                 </div>
//               </div>
              
//               <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
//                 View all projects
//               </h3>
              
//               <p className="text-lime-50 text-sm font-medium">
//                 Explore the complete portfolio
//               </p>
//             </div>

//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.4; }
//         }
//       `}</style>
//     </section>
//   );
// }














// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { Play, Pause, ArrowUpRight } from 'lucide-react';

// export default function ProjectsSection() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hoveredProject, setHoveredProject] = useState(null);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [isViewMoreHovered, setIsViewMoreHovered] = useState(false);
//   const [isCtaHovered, setIsCtaHovered] = useState(false);
  
//   // Video refs
//   const video1Ref = useRef(null);
//   const video2Ref = useRef(null);
//   const video3Ref = useRef(null);
//   const video4Ref = useRef(null);

//   const handleVideoToggle = () => {
//     const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
//     if (isPlaying) {
//       allVideos.forEach(ref => {
//         if (ref.current) ref.current.pause();
//       });
//       setIsPlaying(false);
//     } else {
//       allVideos.forEach(ref => {
//         if (ref.current) {
//           ref.current.play().catch(error => {
//             console.log('Autoplay prevented:', error);
//           });
//         }
//       });
//       setIsPlaying(true);
//     }
//   };

//   const handleMouseEnter = (projectId, videoRef) => {
//     setHoveredProject(projectId);
//     if (videoRef.current) {
//       videoRef.current.muted = false;
//     }
//   };

//   const handleMouseLeave = (videoRef) => {
//     setHoveredProject(null);
//     if (videoRef.current) {
//       videoRef.current.muted = true;
//     }
//   };

//   const handleViewMoreMouseMove = (e) => {
//     requestAnimationFrame(() => {
//       setCursorPosition({
//         x: e.clientX,
//         y: e.clientY
//       });
//     });
//   };

//   useEffect(() => {
//     const allVideos = [video1Ref, video2Ref, video3Ref, video4Ref];
    
//     allVideos.forEach(ref => {
//       if (ref.current) {
//         ref.current.play().catch(error => {
//           console.log('Autoplay prevented:', error);
//         });
//       }
//     });
//     setIsPlaying(true);
//   }, []);

//   return (
//     <section className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12">
//       <div className="max-w-[1600px] mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-16">
//           {/* Left Side - Projects */}
//           <div>
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-2 h-2 rounded-full bg-lime-400" />
//               <span className="text-sm font-medium text-gray-400 tracking-wide">
//                 [02] — MY WORK
//               </span>
//             </div>
//             <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight">
//               Projects
//             </h1>
//           </div>

//           {/* Right Side - View More */}
//           <div className="hidden lg:block text-right mt-auto">
//             <div 
//               className="relative inline-block"
//               style={{ cursor: isViewMoreHovered ? 'none' : 'pointer' }}
//               onMouseEnter={() => setIsViewMoreHovered(true)}
//               onMouseLeave={() => setIsViewMoreHovered(false)}
//               onMouseMove={handleViewMoreMouseMove}
//               onClick={() => window.location.href = '/projects'}
//             >
//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/60 leading-none tracking-tight transition-colors duration-300 hover:text-white">
//                 View More
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Top Row - 2 Projects */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Project 1 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(1, video1Ref)}
//             onMouseLeave={() => handleMouseLeave(video1Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video1Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/v1.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 1 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project 2 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(2, video2Ref)}
//             onMouseLeave={() => handleMouseLeave(video2Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video2Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/craft.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 2 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Row - 2 Projects + CTA */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Project 3 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(3, video3Ref)}
//             onMouseLeave={() => handleMouseLeave(video3Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video3Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/toh kya badla.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 3 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Project 4 */}
//           <div 
//             className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
//             onMouseEnter={() => handleMouseEnter(4, video4Ref)}
//             onMouseLeave={() => handleMouseLeave(video4Ref)}
//           >
//             <div className="relative aspect-[16/10] bg-zinc-800">
//               <video
//                 ref={video4Ref}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 playsInline
//                 onClick={handleVideoToggle}
//               >
//                 <source src="/StarWars.mp4" type="video/mp4" />
//               </video>
              
//               <div 
//                 className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
//                   isPlaying && hoveredProject !== 4 ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 onClick={handleVideoToggle}
//               >
//                 <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   {!isPlaying ? (
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   ) : (
//                     <Pause className="w-8 h-8 text-white" fill="white" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* View All Projects CTA */}
//           <div 
//             className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center aspect-[16/10]"
//             style={{ cursor: isCtaHovered ? 'none' : 'pointer' }}
//             onMouseEnter={() => setIsCtaHovered(true)}
//             onMouseLeave={() => setIsCtaHovered(false)}
//             onMouseMove={handleViewMoreMouseMove}
//             onClick={() => window.location.href = '/projects'}
//           >
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" 
//                    style={{ animation: 'pulse 3s ease-in-out infinite' }} />
//             </div>

//             <div className="relative z-10 text-center p-8">
//               <div className="mb-5">
//                 <div className="w-14 h-14 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
//                   <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
//                 </div>
//               </div>
              
//               <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
//                 View all projects
//               </h3>
              
//               <p className="text-lime-50 text-sm font-medium">
//                 Explore the complete portfolio
//               </p>
//             </div>

//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </div>
//         </div>

//         {/* Mobile View More Link */}
//         <div className="lg:hidden text-center mt-12">
//           <a 
//             href="/projects"
//             className="inline-block text-3xl font-light text-white/60 hover:text-white transition-colors duration-300"
//           >
//             View More →
//           </a>
//         </div>
//       </div>

//       {/* Custom Oval Cursor */}
//       {(isViewMoreHovered || isCtaHovered) && (
//         <div 
//           className="custom-cursor fixed pointer-events-none z-50"
//           style={{
//             left: `${cursorPosition.x}px`,
//             top: `${cursorPosition.y}px`,
//           }}
//         >
//           <div className="px-6 py-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50">
//             <span className="text-black font-semibold text-sm tracking-wide whitespace-nowrap">
//               VIEW
//             </span>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.4; }
//         }
        
//         .custom-cursor {
//           transform: translate(-50%, -50%);
//           will-change: left, top;
//         }
//       `}</style>
//     </section>
//   );
// }


























'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowUpRight } from 'lucide-react';
// import SplitText from 'gsap/SplitText.js';
import SplitText from '../SplitText';

/* ─── tiny hook: fires once when element enters viewport ─── */
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ─── SplitText: wraps each word in a masked span ─── */


/* ─── ScaleReveal: scale 50→100 + fade ─── */
function ScaleReveal({ children, inView, delay = 0, className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        transform: inView ? 'scale(1)' : 'scale(0.5)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     opacity 0.65s ease ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function ProjectsSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isViewMoreHovered, setIsViewMoreHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  /* ── section root ref for IntersectionObserver ── */
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.1);

  /* ── video control ── */
  const handleVideoToggle = () => {
    const all = [video1Ref, video2Ref, video3Ref, video4Ref];
    if (isPlaying) {
      all.forEach(r => r.current?.pause());
      setIsPlaying(false);
    } else {
      all.forEach(r => r.current?.play().catch(() => {}));
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = (id, ref) => {
    setHoveredProject(id);
    if (ref.current) ref.current.muted = false;
  };
  const handleMouseLeave = (ref) => {
    setHoveredProject(null);
    if (ref.current) ref.current.muted = true;
  };

  const handleViewMoreMouseMove = (e) => {
    requestAnimationFrame(() => setCursorPosition({ x: e.clientX, y: e.clientY }));
  };

  useEffect(() => {
    const all = [video1Ref, video2Ref, video3Ref, video4Ref];
    all.forEach(r => r.current?.play().catch(() => {}));
    setIsPlaying(true);
  }, []);

  /* ── shared overlay logic ── */
  const overlay = (id) => (
    <div
      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
        isPlaying && hoveredProject !== id ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleVideoToggle}
    >
      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {!isPlaying
          ? <Play  className="w-8 h-8 text-white ml-1" fill="white" />
          : <Pause className="w-8 h-8 text-white"      fill="white" />}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-[1600px] mx-auto">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-16">

          {/* Left — tag + heading */}
          <div>
            {/* tag line: fade + slide up */}
            <div
              className="flex items-center gap-3 mb-8"
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="text-sm font-medium text-gray-400 tracking-wide">
                [02] — MY WORK
              </span>
            </div>

            {/* "Projects" — split text */}
            

             <h2 
  className="font-semibold text-white text-center w-fit mx-auto font-display"
  style={{ 
    fontSize: 'clamp(4rem, 6vw, 15rem)', 
    lineHeight: 1,
    letterSpacing: '-0.02em'
  }}
>
  <SplitText
    text="My work"
    splitType="chars"
    from={{ opacity: 0, y: 50 }}
    to={{ opacity: 1, y: 0 }}
    duration={1.25}
    stagger={0.05}
    ease="power3.out"
  />
</h2>

              

          </div>

          {/* Right — "View More" split text */}
          <div className="hidden lg:block text-right mt-auto">
            <div
              className="relative inline-block"
              style={{ cursor: isViewMoreHovered ? 'none' : 'pointer' }}
              onMouseEnter={() => setIsViewMoreHovered(true)}
              onMouseLeave={() => setIsViewMoreHovered(false)}
              onMouseMove={handleViewMoreMouseMove}
              onClick={() => (window.location.href = '/projects')}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/60 leading-none tracking-tight transition-colors duration-300 hover:text-white">
                <SplitText text="View More" inView={inView} baseDelay={300} stagger={90} />
              </h2>
            </div>
          </div>
        </div>

        {/* ── Top Row — 2 projects ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Project 1 */}
          <ScaleReveal inView={inView} delay={200}>
            <div
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(1, video1Ref)}
              onMouseLeave={() => handleMouseLeave(video1Ref)}
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video ref={video1Ref} className="w-full h-full object-cover" loop muted playsInline onClick={handleVideoToggle}>
                  <source src="/v1.mp4" type="video/mp4" />
                </video>
                {overlay(1)}
              </div>
            </div>
          </ScaleReveal>

          {/* Project 2 */}
          <ScaleReveal inView={inView} delay={320}>
            <div
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(2, video2Ref)}
              onMouseLeave={() => handleMouseLeave(video2Ref)}
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video ref={video2Ref} className="w-full h-full object-cover" loop muted playsInline onClick={handleVideoToggle}>
                  <source src="/craft.mp4" type="video/mp4" />
                </video>
                {overlay(2)}
              </div>
            </div>
          </ScaleReveal>
        </div>

        {/* ── Bottom Row — 2 projects + CTA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Project 3 */}
          <ScaleReveal inView={inView} delay={440}>
            <div
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(3, video3Ref)}
              onMouseLeave={() => handleMouseLeave(video3Ref)}
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video ref={video3Ref} className="w-full h-full object-cover" loop muted playsInline onClick={handleVideoToggle}>
                  <source src="/toh kya badla.mp4" type="video/mp4" />
                </video>
                {overlay(3)}
              </div>
            </div>
          </ScaleReveal>

          {/* Project 4 */}
          <ScaleReveal inView={inView} delay={560}>
            <div
              className="group relative bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => handleMouseEnter(4, video4Ref)}
              onMouseLeave={() => handleMouseLeave(video4Ref)}
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <video ref={video4Ref} className="w-full h-full object-cover" loop muted playsInline onClick={handleVideoToggle}>
                  <source src="/StarWars.mp4" type="video/mp4" />
                </video>
                {overlay(4)}
              </div>
            </div>
          </ScaleReveal>

          {/* CTA — View All */}
          <ScaleReveal inView={inView} delay={680}>
            <div
              className="relative bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] flex items-center justify-center aspect-[16/10]"
              style={{ cursor: isCtaHovered ? 'none' : 'pointer' }}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              onMouseMove={handleViewMoreMouseMove}
              onClick={() => (window.location.href = '/projects')}
            >
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]"
                  style={{ animation: 'pulse 3s ease-in-out infinite' }}
                />
              </div>

              <div className="relative z-10 text-center p-8">
                <div className="mb-5">
                  <div className="w-14 h-14 mx-auto rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  View all projects
                </h3>
                <p className="text-lime-50 text-sm font-medium">
                  Explore the complete portfolio
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </ScaleReveal>
        </div>

        {/* Mobile View More */}
        <div className="lg:hidden text-center mt-12">
          <a
            href="/projects"
            className="inline-block text-3xl font-light text-white/60 hover:text-white transition-colors duration-300"
          >
            View More →
          </a>
        </div>
      </div>

      {/* Custom Oval Cursor */}
      {(isViewMoreHovered || isCtaHovered) && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
          }}
        >
          <div className="px-6 py-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50">
            <span className="text-black font-semibold text-sm tracking-wide whitespace-nowrap">
              VIEW
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}