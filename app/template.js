"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function Template({ children }) {
  const pathname = usePathname();
  const transitionRef = useRef(null);
  const wipe1Ref = useRef(null);
  const wipe2Ref = useRef(null);
  const textRef = useRef(null);

  const [isInitialLoad] = useState(() => {
    // Only access sessionStorage on the client
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('siteLoaded');
    }
    return true; // Default to true during SSR
  });

  const loadingProgressRef = useRef({ val: 0 });

  // Text options for different pages
  const getPageText = (path) => {
    switch (path) {
      case '/': return 'Home';
      case '/work': return 'Work';
      case '/contact': return 'Contact';
      case '/about': return 'About';
      default: return 'Loading';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (isInitialLoad) {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('siteLoaded', 'true');
            }
            // Dispatch a custom event so other components (like Hero) know when to start animating
            window.dispatchEvent(new Event('initialLoadComplete'));
          }
        }
      });

      // Ensure the transition wrapper is visible
      gsap.set(transitionRef.current, { visibility: "visible" });

      if (isInitialLoad) {
        // --- INITIAL LOAD ANIMATION ---
        // Animate counter from 0 to 100
        tl.to(loadingProgressRef.current, {
          val: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (textRef.current) {
              textRef.current.innerText = Math.round(loadingProgressRef.current.val) + "%";
            }
          }
        })
        // Short pause at 100%
        .to({}, { duration: 0.3 })
        .to(textRef.current, {
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
        .set(transitionRef.current, { visibility: "hidden" });
      } else {
        // --- NORMAL PAGE TRANSITION ANIMATION ---
        
        // Ensure text starts correctly
        gsap.set(textRef.current, { opacity: 1, y: 0, innerText: getPageText(pathname) });

        tl.to({}, { duration: 0.2 }) // small delay so user sees text
        .to(textRef.current, {
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
        .set(transitionRef.current, { visibility: "hidden" });
      }

    }, transitionRef);

    return () => ctx.revert();
  }, [pathname, isInitialLoad]);

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
          <div className="overflow-hidden">
            <h2 ref={textRef} id="wipe-text" className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-lime-400 uppercase opacity-100">
              {/* Text managed by GSAP */}
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
