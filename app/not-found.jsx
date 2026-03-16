"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function NotFound() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const numberRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // We use matchMedia for simple cleanup or just context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial perspective
      gsap.set(numberRef.current, { perspective: 400 });

      // Number animation
      tl.fromTo(
        ".glitch-number",
        { y: 150, opacity: 0, rotationX: -90, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
        }
      );

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

      // Floating animation for the numbers
      gsap.to(".glitch-number", {
        y: "-=20",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "center",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Parallax effect on mouse move
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;

    gsap.to(".glitch-number", {
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
        className="relative z-10 flex text-[12rem] md:text-[20rem] lg:text-[24rem] font-bold leading-none text-white tracking-tighter cursor-default" 
        ref={numberRef}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="glitch-number inline-block drop-shadow-[0_0_25px_rgba(163,230,53,0.1)] hover:text-lime-400 transition-colors duration-500 hover:drop-shadow-[0_0_35px_rgba(163,230,53,0.4)] mix-blend-screen">4</span>
        <span className="glitch-number inline-block drop-shadow-[0_0_25px_rgba(163,230,53,0.1)] hover:text-lime-400 transition-colors duration-500 hover:drop-shadow-[0_0_35px_rgba(163,230,53,0.4)] mix-blend-screen text-transparent [-webkit-text-stroke:2px_white] hover:[-webkit-text-stroke:2px_transparent]">0</span>
        <span className="glitch-number inline-block drop-shadow-[0_0_25px_rgba(163,230,53,0.1)] hover:text-lime-400 transition-colors duration-500 hover:drop-shadow-[0_0_35px_rgba(163,230,53,0.4)] mix-blend-screen">4</span>
      </div>

      <div ref={textRef} className="mt-4 md:mt-8 flex flex-col items-center gap-4 text-center px-4 z-10">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-base md:text-xl max-w-md md:max-w-lg mt-2">
          Looks like this profile hasn't been set up yet, or the page you're looking for doesn't exist.
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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-lime-400/30"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 8 + 7}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDelay: `${Math.random() * 5}s`
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
