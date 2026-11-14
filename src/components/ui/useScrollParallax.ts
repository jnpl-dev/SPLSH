"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/** Scrubbed yPercent parallax for one layer, desktop only. */
export function useScrollParallax(ref: React.RefObject<HTMLElement | null>, speed: number) {
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const anim = gsap.to(target, {
          yPercent: (speed - 1) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: target.closest("section") || document.body,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        return () => anim.kill();
      },
    );
    return () => mm.revert();
  }, [ref, speed]);
}
