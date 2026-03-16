"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function Template({ children }) {
  const pathname = usePathname();
  const transitionRef = useRef(null);
  const wipe1Ref = useRef(null);
  const wipe2Ref = useRef(null);
  const textRef = useRef(null);

  // Text options for different pages
  const getPageText = () => {
    switch (pathname) {
      case '/': return 'Home';
      case '/work': return 'Work';
      case '/contact': return 'Contact';
      case '/about': return 'About';
      default: return 'Loading';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure the transition wrapper is visible
      gsap.set(transitionRef.current, { visibility: "visible" });

      // Animate out the wipes and text
      tl.to(textRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(wipe1Ref.current, {
        height: 0,
        duration: 0.8,
        ease: "expo.inOut",
        delay: -0.1
      })
      .to(wipe2Ref.current, {
        height: 0,
        duration: 0.8,
        ease: "expo.inOut",
        delay: -0.7
      })
      .set(transitionRef.current, { visibility: "hidden" }); // Hide it when done
    }, transitionRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      {/* 
        This is the transition overlay. 
        It covers the entire screen, blocking interaction while sliding up/down.
      */}
      <div 
        ref={transitionRef}
        id="transition-overlay" 
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      >
        {/* Secondary background wipe (Lime Green) */}
        <div 
          ref={wipe2Ref}
          id="wipe-2" 
          className="absolute bottom-0 w-full h-full bg-lime-400 z-[101]" 
        />
        
        {/* Primary background wipe (Black) */}
        <div 
          ref={wipe1Ref}
          id="wipe-1" 
          className="absolute bottom-0 w-full h-full bg-neutral-950 z-[102] flex items-center justify-center"
        >
          {/* Dynamic page title during transition */}
          <div ref={textRef} id="wipe-text" className="overflow-hidden">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white uppercase opacity-100">
              {getPageText()}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="transition-page min-h-screen">
        {children}
      </main>
    </>
  );
}
