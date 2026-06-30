"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ToolBox.css";
import { TypewriterOnScroll } from "../common/TypeWritter";

gsap.registerPlugin(ScrollTrigger);

export default function ToolBox() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });

      // On mobile: fade + slide up instead of left/right (fits single column better)
      tl.from(textRef.current, {
        x: isMobile ? 0 : -80,
        y: isMobile ? 30 : 0,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        cardsRef.current,
        {
          x: isMobile ? 0 : 80,
          y: isMobile ? 40 : 0,
          opacity: 0,
          duration: 0.8,
          stagger: isMobile ? 0.12 : 0.2,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="toolbox-wrapper relative"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Radial fade overlay - edges fade to dark */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10, 10, 10, 0.4) 85%, rgba(10, 10, 10, 0.8) 100%)`
        }}
      />
      
      {/* LEFT TEXT */}
      <div ref={textRef} className="toolbox-text relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-lime-400" />
          <TypewriterOnScroll
            text="[03] — Tools & Skills"
            className="text-xl font-medium text-white"
          />
        </div>
        <h1 className=" font-bold toolbox-title text-white">My Creative Toolbox</h1>
      </div>

      {/* RIGHT CARDS */}
      <div className="container relative z-10">
        <ul id="cards">
          <li ref={(el) => (cardsRef.current[0] = el)} className="card" id="card1">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/pr.svg" alt="Premiere Pro" />
              </div>
              <div className="skill-content">
                <h3>Adobe Premiere Pro</h3>
                <p>
                  Premiere Pro is my go-to for professional video editing—combining precision,
                  speed, and seamless integration. It lets me craft cinematic stories with
                  powerful tools for editing, color grading, and audio—all in one fluid workflow.
                </p>
              </div>
            </div>
          </li>

          <li ref={(el) => (cardsRef.current[1] = el)} className="card" id="card2">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/after.png" alt="After Effects" height={200} width={1000}/>
              </div>
              <div className="skill-content">
                <h3>Adobe After Effects</h3>
                <p>
                  After Effects is where motion comes alive—my essential tool for dynamic
                  animations, visual effects, and compositing. Its deep integration with Adobe
                  apps streamlines everything from kinetic typography to complex VFX.
                </p>
              </div>
            </div>
          </li>

          <li ref={(el) => (cardsRef.current[2] = el)} className="card" id="card3">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/illus.png" alt="Illustrator" />
              </div>
              <div className="skill-content">
                <h3>Adobe Illustrator</h3>
                <p>
                  Illustrator powers my vector creativity—perfect for designing logos, icons,
                  and graphics with crisp precision. Its clean, scalable output ensures every
                  visual element shines across any medium.
                </p>
              </div>
            </div>
          </li>

          <li ref={(el) => (cardsRef.current[3] = el)} className="card" id="card4">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/davin.png" alt="DaVinci Resolve" />
              </div>
              <div className="skill-content">
                <h3>DaVinci Resolve</h3>
                <p>
                  DaVinci Resolve is my color grading powerhouse—offering Hollywood-grade
                  correction, editing, and finishing in one suite. Its node-based workflow gives
                  me unmatched control over mood, tone, and cinematic look.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}