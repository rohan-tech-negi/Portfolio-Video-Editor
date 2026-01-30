"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import HomePage from "../components/homepage/page";
// import Loader from "../components/Loader";
import Loader from "@/components/common/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only initialize Lenis after loading is complete
    if (!loading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: "vertical",
        smoothTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [loading]);

  // if (loading) {
  //   return <Loader onLoadComplete={() => setLoading(false)} />;
  // }

  return (
    <>
      <HomePage />
    </>
  );
}