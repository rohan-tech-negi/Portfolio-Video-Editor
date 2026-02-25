'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Apply a spring physics smoothing to the scroll progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      style={{
        position: 'fixed',
        right: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0px',
        height: '140px',
      }}
    >
      {/* ── Blade track (unfilled) ── */}
      <div
        style={{
          position: 'relative',
          width: '3px',
          height: '110px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 0 6px rgba(0,0,0,0.4)',
        }}
      >
        {/* ── Filled blade (Smooth framer-motion spring) ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#1aff1a', // Solid Green
            borderRadius: '2px',
            transformOrigin: 'top', // Scale from the top down visually
            scaleY: scaleY,
            boxShadow: '0 0 6px 1px rgba(26,255,26,0.5)', // Subtle green glow
          }}
        />
      </div>
    </div>
  );
}