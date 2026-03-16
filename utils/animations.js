"use client";

import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

export const transitionOut = (href, router, pathname) => {
  // If we are already on the page, do nothing
  if (pathname === href) return;

  // We look for our transition overlay elements
  const wipe1 = document.getElementById("wipe-1");
  const wipe2 = document.getElementById("wipe-2");
  const transitionOverlay = document.getElementById("transition-overlay");
  const wipeText = document.getElementById("wipe-text");
  
  // Set the text for the next page
  if (wipeText) {
     switch (href) {
      case '/': wipeText.innerText = 'Home'; break;
      case '/work': wipeText.innerText = 'Work'; break;
      case '/contact': wipeText.innerText = 'Contact'; break;
      case '/about': wipeText.innerText = 'About'; break;
      default: wipeText.innerText = 'Redirecting'; break;
    }
  }

  // Make the overlay visible for the animation
  if (transitionOverlay) {
     gsap.set(transitionOverlay, { visibility: "visible" });
  }

  const tl = gsap.timeline({
    onComplete: () => {
      // Once the screen is black (covered by wipe1), push the route.
      // The Template component on the new route handles the entrance animation "revealing" the new page.
      router.push(href);
    }
  });

  if (wipe1 && wipe2 && wipeText) {
    // Bring wipes up from the bottom (height 100%)
    tl.to(wipe2, {
      height: "100%",
      duration: 0.8,
      ease: "expo.inOut",
    })
    .to(wipe1, {
      height: "100%",
      duration: 0.8,
      ease: "expo.inOut",
      delay: -0.6
    })
    // Also fade the text in
    .fromTo(wipeText, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.4"
    );
  } else {
    // Fallback if elements aren't found for some reason
    router.push(href);
  }
};
