"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/easing";
import { marqueeText } from "@content/site";

const repeated = Array.from({ length: 10 }, () => marqueeText).join("  ");

/** Seamless infinite dual-row marquee: upper row right, lower row left. */
export default function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Non-repetitive entrance: scale up from 0.92 + fade.
  useGSAP(
    () => {
      const el = wrapRef.current;
      if (!el) return;
      gsap.from(el, {
        scale: 0.92,
        autoAlpha: 0,
        duration: 1,
        ease: ease.liquid,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: wrapRef }
  );

  return (
    <section
      id="marquee"
      data-section="marquee"
      aria-label="Tagline band"
      className="overflow-hidden border-y border-navy-700/10 bg-aqua-50 py-7"
    >
      <div ref={wrapRef} className="container">
        <div
          className="whitespace-nowrap"
          style={{ animation: "marquee-right 40s linear infinite" }}
        >
          <div className="font-luckiest text-h3 text-navy-700 uppercase inline-block">
            {repeated}
          </div>
        </div>
        <div
          className="whitespace-nowrap"
          style={{ animation: "marquee-left 40s linear infinite" }}
        >
          <div className="font-luckiest text-h3 text-navy-700 uppercase inline-block">
            {repeated}
          </div>
        </div>
      </div>
    </section>
  );
}
