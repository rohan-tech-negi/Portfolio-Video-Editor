'use client'

import { useEffect, useRef, useState } from "react";

export function TypewriterOnScroll({ text, className }) {
  const [displayed, setDisplayed] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60); // speed in ms per character

    return () => clearInterval(interval);
  }, [hasAnimated, text]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {displayed.length < text.length && hasAnimated && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}