"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, duration } from "@/lib/easing";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  y?: number;
  start?: string;
};

/** Fade-up wrapper that reveals on section enter. */
export default function Reveal({
  children,
  className,
  once = true,
  y = 40,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.from(el, {
        y,
        autoAlpha: 0,
        duration: duration.reveal,
        ease: ease.liquid,
        scrollTrigger: {
          trigger: el,
          start,
          end: "bottom 60%",
          once,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    },
    { scope: ref },
  );
  return <div ref={ref} className={className}>{children}</div>;
}
