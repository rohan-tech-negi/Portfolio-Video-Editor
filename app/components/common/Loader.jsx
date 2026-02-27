'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Camera, 
  Palette, 
  Film, 
  Scissors, 
  Aperture, 
  Music,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Loader({ onLoadComplete }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef([]);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const icons = [
    { Icon: Camera, color: 'text-blue-500' },
    { Icon: Palette, color: 'text-purple-500' },
    { Icon: Film, color: 'text-pink-500' },
    { Icon: Scissors, color: 'text-orange-500' },
    { Icon: Aperture, color: 'text-green-500' },
    { Icon: Music, color: 'text-yellow-500' },
    { Icon: Sparkles, color: 'text-indigo-500' },
    { Icon: Zap, color: 'text-red-500' },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out entire loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (onLoadComplete) onLoadComplete();
          }
        });
      }
    });

    // Animate icons in with stagger
    tl.fromTo(
      iconsRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -180 
      },
      {
        scale: 1,
        opacity: 0.3,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );

    // Animate the loading bar
    tl.to(barRef.current, {
      width: '100%',
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        const iconIndex = Math.floor(progress * icons.length);
        
        if (iconIndex !== currentIconIndex && iconIndex < icons.length) {
          setCurrentIconIndex(iconIndex);
          
          // Morph effect - pulse the active icon
          if (iconsRef.current[iconIndex]) {
            gsap.timeline()
              .to(iconsRef.current[iconIndex], {
                scale: 1.5,
                opacity: 1,
                rotation: 360,
                duration: 0.4,
                ease: 'back.out(1.7)'
              })
              .to(iconsRef.current[iconIndex], {
                scale: 1,
                duration: 0.2
              });
          }

          // Fade out previous icons
          if (iconIndex > 0 && iconsRef.current[iconIndex - 1]) {
            gsap.to(iconsRef.current[iconIndex - 1], {
              opacity: 0.2,
              scale: 0.8,
              duration: 0.3
            });
          }
        }
      }
    }, '-=2.5');

    return () => {
      tl.kill();
    };
  }, [currentIconIndex, icons.length, onLoadComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      {/* Icons Container */}
      <div className="flex items-center gap-6 mb-12">
        {icons.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={index}
              ref={(el) => {
                if (el) iconsRef.current[index] = el;
              }}
              className={`${item.color} opacity-30`}
            >
              <Icon className="w-10 h-10" strokeWidth={2} />
            </div>
          );
        })}
      </div>

      {/* Loading Bar */}
      <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-600 font-medium">Loading creative tools...</p>
    </div>
  );
}