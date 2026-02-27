"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import HomePage from "./components/homepage/page";

export default function Home() {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return <HomePage />;
}
