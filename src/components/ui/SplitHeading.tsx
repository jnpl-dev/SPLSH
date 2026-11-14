"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ease, duration } from "@/lib/easing";

type SplitHeadingProps = {
  children: React.ReactNode;
  type?: "chars" | "lines" | "words";
  className?: string;
  stagger?: number;
  once?: boolean;
  id?: string;
};

/** SplitText char/line reveal on section enter. Scoped ref, Strict Mode safe. */
export default function SplitHeading({
  children,
  type = "chars",
  className,
  stagger = 0.025,
  once = true,
  id,
}: SplitHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const split = SplitText.create(el, {
        type: type === "chars" ? "chars" : "lines",
        mask: "lines",
      });
      const targets = type === "chars" ? split.chars : split.lines;
      gsap.from(targets, {
        yPercent: type === "chars" ? 110 : 100,
        autoAlpha: 0,
        duration: duration.reveal,
        ease: ease.liquid,
        stagger,
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 60%", once },
      });
    },
    { scope: ref },
  );
  return <div ref={ref} id={id} className={className}>
    {children}
  </div>;
}
