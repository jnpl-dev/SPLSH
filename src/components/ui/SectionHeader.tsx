"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/easing";
import SplitHeading from "./SplitHeading";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

/** Identical section header pattern everywhere (docs/04 Layout), animated on enter. */
export default function SectionHeader({
  id,
  tag,
  title,
  lede,
  tone = "light",
}: {
  id: string;
  tag: string;
  title: string;
  lede?: string;
  tone?: Tone;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const header = headerRef.current;
      const path = pathRef.current;
      if (!header || !path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: ease.swell,
        scrollTrigger: { trigger: header, start: "top 82%", once: true },
      });
    },
    { scope: headerRef },
  );

  const light = tone === "light";
  return (
    <header ref={headerRef} className="container flex flex-col items-start gap-4">
      <SplitHeading
        id={`${id}-tag`}
        className={cn(
          "font-bungee text-label uppercase tracking-[0.04em]",
          light ? "text-navy-600" : "text-cyan-200",
        )}
      >
        {tag}
      </SplitHeading>
      <SplitHeading
        id={`${id}-title`}
        className={cn(
          "font-luckiest text-h2 uppercase leading-[0.95]",
          light ? "text-navy-900" : "text-white",
        )}
      >
        {title}
      </SplitHeading>
      <svg
        data-wave-underline
        aria-hidden="true"
        width="132"
        height="12"
        viewBox="0 0 132 12"
        fill="none"
        className="shrink-0"
        style={{ color: "#00C8E0" }}
      >
        <path
          ref={pathRef}
          d="M2 7 C 12 1, 22 13, 32 7 S 52 1, 62 7 S 82 13, 92 7 S 112 1, 122 7"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      {lede && (
        <p
          className={cn(
            "max-w-[48ch] text-body",
            light ? "text-navy-900/75" : "text-white/80",
          )}
        >
          {lede}
        </p>
      )}
    </header>
  );
}
