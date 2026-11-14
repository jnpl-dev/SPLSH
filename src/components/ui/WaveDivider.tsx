"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type WaveDividerProps = {
  className?: string;
  color?: string;
  height?: number;
  speed?: number;
};

/** Two-layer SVG sine wave that loops horizontally at section boundaries. */
export default function WaveDivider({
  className,
  color = "var(--color-cyan-500)",
  height = 64,
  speed = 24,
}: WaveDividerProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const paths = el.querySelectorAll("path");
      gsap.to(paths[0], {
        x: "-50%",
        duration: speed,
        repeat: -1,
        ease: "none",
      });
      gsap.to(paths[1], {
        x: "-50%",
        duration: speed * 1.5,
        repeat: -1,
        ease: "none",
        delay: -speed * 0.75,
      });
    },
    { scope: ref },
  );
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      style={{ color }}
    >
      <path d="M0 60 Q 50 30 100 60 T 200 60 V 100 H 0 Z" fill="currentColor" />
      <path
        d="M0 55 Q 50 25 100 55 T 200 55 V 100 H 0 Z"
        fill="currentColor"
        style={{ opacity: 0.55 }}
      />
    </svg>
  );
}
