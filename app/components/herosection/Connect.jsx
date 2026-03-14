'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaInstagram, FaBehance } from 'react-icons/fa6';
import { SiPinterest } from 'react-icons/si';
import { MdOutlineEmail } from 'react-icons/md';
import { TypewriterOnScroll } from '../common/TypeWritter';
import SplitText from '../SplitText';

function getDirectionStyle(index, hasRevealed) {
  const col = index % 3;
  const isBottomRow = index >= 3;

  let hiddenTransform;
  if (isBottomRow || col === 1) {
    hiddenTransform = 'translateY(60px)';
  } else if (col === 0) {
    hiddenTransform = 'translateX(-60px)';
  } else {
    hiddenTransform = 'translateX(60px)';
  }

  const delay = `${index * 0.12}s`;
  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return {
    transform: hasRevealed ? 'translate(0px, 0px)' : hiddenTransform,
    opacity: hasRevealed ? 1 : 0,
    transition: hasRevealed
      ? `transform 0.9s ${easing} ${delay}, opacity 0.8s ease ${delay}`
      : 'none',
  };
}

const socialLinks = [
  {
    id: 1,
    platform: 'Instagram',
    icon: FaInstagram,
    link: 'https://www.instagram.com/risky.wipe/',
    cursorLabel: 'VISIT',
  },
  {
    id: 2,
    platform: 'Behance',
    icon: FaBehance,
    link: 'https://behance.net',
    cursorLabel: 'VISIT',
  },
  {
    id: 3,
    platform: 'Pinterest',
    icon: SiPinterest,
    link: 'https://pinterest.com',
    cursorLabel: 'VISIT',
  },
  {
    id: 4,
    platform: 'Gmail',
    icon: MdOutlineEmail,
    link: 'https://mail.google.com/mail/u/0/#inbox?compose=new',
    isGmail: true,
    cursorLabel: 'EMAIL',
  },
  {
    id: 5,
    platform: 'Get in touch',
    icon: ArrowRight,
    link: '/contact',
    isCta: true,
    cursorLabel: 'CONTACT',
  },
];

export default function ContactSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null); // stores full card object
  const [hasRevealed, setHasRevealed] = useState(false);
  const gridRef = useRef(null);

  // ✅ Fix: removed hasRevealed from deps — observer only needs to run once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect(); // ✅ disconnect immediately after trigger
        }
      },
      { threshold: 0.15 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []); // ✅ empty deps — runs once on mount

  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    });
  };

  return (
    <section className="relative z-10 w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <TypewriterOnScroll
              text="[03] — Connect me"
              className="text-xl font-medium text-white"
            />
          </div>
          <SplitText
            text="My Social Profiles"
            className="text-7xl font-semibold text-center text-white pb-4"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            const animStyle = getDirectionStyle(index, hasRevealed);
            const sharedMouseProps = {
              onMouseEnter: () => setHoveredCard(social),   // ✅ store full object
              onMouseLeave: () => setHoveredCard(null),
              onMouseMove: handleMouseMove,
              style: {
                cursor: hoveredCard?.id === social.id ? 'none' : 'pointer',
                ...animStyle,
              },
            };

            // ── CTA Card ──
            if (social.isCta) {
              return (
                <a
                  key={social.id}
                  href={social.link}
                  className="group bg-lime-400 rounded-3xl p-8 hover:bg-lime-500 hover:shadow-md transition-colors duration-300"
                  {...sharedMouseProps}
                >
                  <div className="flex flex-col justify-between h-48">
                    <h3 className="text-xl font-medium text-gray-900">{social.platform}</h3>
                    <div className="flex justify-end">
                      <IconComponent className="w-7 h-7 text-gray-900 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </a>
              );
            }

            // ── Gmail Card ──
            if (social.isGmail) {
              return (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-3xl p-8 hover:shadow-md transition-all duration-300"
                  {...sharedMouseProps}
                >
                  <div className="flex flex-col justify-between h-48">
                    <h3 className="text-xl font-medium text-gray-900">{social.platform}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-mono tracking-wide">
                        Click to compose
                      </span>
                      <div className="bg-lime-400 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            }

            // ── Standard Social Card ──
            return (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl p-8 hover:shadow-md transition-all duration-300"
                {...sharedMouseProps}
              >
                <div className="flex flex-col justify-between h-48">
                  <h3 className="text-xl font-medium text-gray-900">{social.platform}</h3>
                  <div className="flex justify-end">
                    <div className="bg-lime-400 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ✅ Fix: cursor label now reads from the card object, no hardcoded ID checks */}
      {hoveredCard && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
          }}
        >
          <div className="px-6 py-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50">
            <span className="text-black font-semibold text-sm tracking-wide whitespace-nowrap">
              {hoveredCard.cursorLabel}  {/* ✅ reads directly from card data */}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}