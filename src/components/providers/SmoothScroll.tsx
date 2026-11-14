"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;

      // Anchor nav must go through Lenis (recipe 12) — native jumps desync it.
      const onClick = (e: MouseEvent) => {
        if (!(e.target instanceof Element)) return;
        const anchor = e.target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis?.scrollTo(target as HTMLElement, {
          offset: -88,
          duration: 1.6,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis?.destroy();
        window.__lenis = undefined;
      };
    }

    // Reduced motion: no Lenis — native anchors + scroll-margin handle it.
    return undefined;
  }, []);

  return <>{children}</>;
}
