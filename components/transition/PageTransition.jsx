"use client";

import Logo from "./Logo";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

const PageTransition = ({ children }) => {
  const router = useRouter();

  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const logoRef = useRef(null);
  const blocksRef = useRef([]);
  const isTransitioning = useRef(false);

  const createBlocks = () => {
    const overlay = overlayRef.current;
    overlay.innerHTML = "";
    blocksRef.current = [];

    for (let i = 0; i < 20; i++) {
      const block = document.createElement("div");
      block.className = "block";
      overlay.appendChild(block);
      blocksRef.current.push(block);
    }
  };

  const revealPage = () => {
    // Logo overlay fades out first, then blocks slide away
    gsap.to(logoOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set(blocksRef.current, {
          scaleX: 1,
          transformOrigin: "right",
        });

        gsap.to(blocksRef.current, {
          scaleX: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          transformOrigin: "right",
          onComplete: () => {
            isTransitioning.current = false;
          },
        });
      },
    });
  };

  const coverPage = (url) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    createBlocks();

    // Reset blocks to hidden before animating
    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    // Make sure logo overlay is hidden at start
    gsap.set(logoOverlayRef.current, { opacity: 0 });

    const path = logoRef.current?.querySelector("path");
    const pathLength = path ? path.getTotalLength() : 0;

    if (path) {
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        fill: "transparent",
      });
    }

    const tl = gsap.timeline();

    // STEP 1: Blocks slide in from left — covers the current page
    tl.to(blocksRef.current, {
      scaleX: 1,
      duration: 0.5,
      stagger: 0.03,
      ease: "power2.inOut",
      transformOrigin: "left",
    })

    // STEP 2: Logo overlay appears
    .set(logoOverlayRef.current, { opacity: 1 })

    // STEP 3: Logo draws itself
    .to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
    })

    // STEP 4: Logo fills in
    .to(path, {
      fill: "#e3e4d8",
      duration: 0.8,
    }, "-=0.5")

    // STEP 5: NOW navigate — screen is fully covered, user sees nothing
    .call(() => {
      router.push(url);
    })

    // STEP 6: Wait for Next.js to render the new page underneath, then reveal
    .to({}, { duration: 0.5 })

    .call(() => {
      revealPage();
    });
  };

  const handleClick = (e) => {
    const target = e.target.closest("a");
    if (!target) return;

    const href = target.getAttribute("href");
    if (!href || !href.startsWith("/")) return;

    e.preventDefault();
    coverPage(href);
  };

  return (
    <>
      <div onClick={handleClick}>
        {children}
      </div>

      <div ref={overlayRef} className="transition-overlay" />

      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
    </>
  );
};

export default PageTransition;