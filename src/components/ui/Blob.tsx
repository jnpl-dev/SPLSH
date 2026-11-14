"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease, duration } from "@/lib/easing";

type BlobProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
};

/** Idle-drifting organic blob: 8-value border-radius morph + float. */
const RADII = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "30% 70% 70% 30% / 50% 60% 40% 50%",
  "50% 50% 30% 70% / 40% 60% 70% 40%",
  "70% 30% 40% 60% / 30% 70% 50% 50%",
];

export default function Blob({
  className,
  width,
  height,
  color = "currentColor",
}: BlobProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        borderRadius: RADII[1],
        y: "-=14",
        duration: duration.idle,
        repeat: -1,
        yoyo: true,
        ease: ease.drift,
        overwrite: true,
      });
    },
    { scope: ref },
  );
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      role="presentation"
      style={{ borderRadius: RADII[0], color }}
    >
      <circle cx="50" cy="50" r="42" fill="currentColor" />
    </svg>
  );
}
