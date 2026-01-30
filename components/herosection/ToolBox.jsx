import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ToolBox.css";

gsap.registerPlugin(ScrollTrigger);

export default function ToolBox() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation - fade in from left
      gsap.from(textRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Cards animation - stagger from right
      gsap.from(cardsRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="toolbox-wrapper bg-white">
      {/* LEFT TEXT */}
      <div ref={textRef} className="toolbox-text">
        <span className="toolbox-label text-black">{`{02} – Tools & Skills`}</span>
        <h1 className="toolbox-title text-black">My Creative Toolbox</h1>
      </div>

      {/* RIGHT CARDS */}
      <div className="container">
        <ul id="cards">
          <li ref={(el) => (cardsRef.current[0] = el)} className="card" id="card1">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/pr.svg" alt="Premiere Pro" />
              </div>
              <div className="skill-content">
                <h3>Adobe Premiere Pro</h3>
                <p>
                  Premiere Pro is my go-to for professional video editing—combining precision, speed, and seamless integration. It lets me craft cinematic stories with powerful tools for editing, color grading, and audio—all in one fluid workflow.
                </p>
              </div>
            </div>
          </li>

          <li ref={(el) => (cardsRef.current[1] = el)} className="card" id="card2">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/ae.svg" alt="After Effects" />
              </div>
              <div className="skill-content">
                <h3>Adobe After Effects</h3>
                <p>
                  After Effects is where motion comes alive—my essential tool for dynamic animations, visual effects, and compositing. Its deep integration with Adobe apps streamlines everything from kinetic typography to complex VFX.
                </p>
              </div>
            </div>
          </li>

          <li ref={(el) => (cardsRef.current[2] = el)} className="card" id="card3">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/ai.svg" alt="Illustrator" />
              </div>
              <div className="skill-content">
                <h3>Adobe Illustrator</h3>
                <p>
                  Illustrator powers my vector creativity—perfect for designing logos, icons, and graphics with crisp precision. Its clean, scalable output ensures every visual element shines across any medium.
                </p>
              </div>
            </div>
          </li>

          <li ref={(el) => (cardsRef.current[3] = el)} className="card" id="card4">
            <div className="card-body skill-card">
              <div className="logo-wrapper">
                <img src="/dr.svg" alt="DaVinci Resolve" />
              </div>
              <div className="skill-content">
                <h3>DaVinci Resolve</h3>
                <p>
                  DaVinci Resolve is my color grading powerhouse—offering Hollywood-grade correction, editing, and finishing in one suite. Its node-based workflow gives me unmatched control over mood, tone, and cinematic look.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}