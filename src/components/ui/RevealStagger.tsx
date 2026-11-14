"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, duration } from "@/lib/easing";

/** Staggered fade-up of direct element children on container enter. */
export default function RevealStagger({
  children,
  className,
  stagger = 0.12,
  once = true,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = Array.from(el.children).filter(
        (c): c is HTMLElement => c instanceof HTMLElement,
      );
      if (!items.length) return;
      gsap.from(items, {
        y,
        autoAlpha: 0,
        duration: duration.reveal,
        ease: ease.liquid,
        stagger,
        scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 60%", once },
      });
    },
    { scope: ref },
  );
  return <div ref={ref} className={className}>{children}</div>;
}
