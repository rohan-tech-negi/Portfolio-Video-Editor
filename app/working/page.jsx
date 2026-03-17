"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Working() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 8 + 7,
      opacity: Math.random() * 0.5 + 0.1,
      animationDelay: Math.random() * 5,
    }));
    setTimeout(() => {
      setParticles(newParticles);
    }, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Icon animation
      tl.fromTo(
        iconRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
      );

      // Continuous rotation for icon
      gsap.to(iconRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      // Text animation
      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Button animation
      tl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Parallax effect on mouse move
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;

    gsap.to(iconRef.current, {
      x,
      y,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden selection:bg-lime-400 selection:text-black z-50"
    >
      {/* Background radial gradient for subtle lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl h-[80vw] max-h-3xl bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Decorative dots grid behind the text */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div 
        ref={iconRef}
        className="relative z-10 flex text-lime-400 mb-8 drop-shadow-[0_0_25px_rgba(163,230,53,0.2)]" 
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </div>

      <div ref={textRef} className="mt-4 md:mt-8 flex flex-col items-center gap-4 text-center px-4 z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Work In Progress
        </h2>
        <p className="text-gray-400 text-base md:text-xl max-w-md md:max-w-lg mt-2">
          This section is currently under development. I&apos;m working hard behind the scenes right now!
        </p>
      </div>

      <div ref={buttonRef} className="mt-10 md:mt-12 z-10">
        <Link 
          href="/"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-black bg-lime-400 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12" />
          <span className="relative flex items-center gap-3">
            <svg 
              className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Return to Home
          </span>
        </Link>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-lime-400/30"
            style={{
              width: p.width + 'px',
              height: p.height + 'px',
              top: p.top + '%',
              left: p.left + '%',
              animation: `float ${p.animationDuration}s linear infinite`,
              opacity: p.opacity,
              animationDelay: `${p.animationDelay}s`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          50% { transform: translateY(-100px) translateX(20px) rotate(180deg); }
          90% { opacity: 0.5; }
          100% { transform: translateY(-200px) translateX(-20px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
