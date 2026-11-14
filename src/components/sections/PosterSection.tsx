"use client";

import { useRef } from "react";
import Image from "next/image";
import { poster } from "@content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/easing";
import SectionHeader from "@/components/ui/SectionHeader";
import PaletteChip from "@/components/ui/PaletteChip";
import FontSpecimen from "@/components/ui/FontSpecimen";
import RevealStagger from "@/components/ui/RevealStagger";

/** CT#3 — poster + palette + typography ONLY. No explanation text (rule 4). */
export default function PosterSection() {
  const posterWrapRef = useRef<HTMLDivElement>(null);

  // Poster: scale-in entrance + slow idle float (non-repetitive, no repeated fade loops).
  useGSAP(
    () => {
      const el = posterWrapRef.current;
      if (!el) return undefined;
      gsap.from(el, {
        scale: 0.88,
        y: 20,
        duration: 1.2,
        ease: ease.liquid,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
      gsap.to(el, {
        y: -10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: ease.drift,
      });
      return () => gsap.killTweensOf(el);
    },
    { scope: posterWrapRef }
  );

  return (
    <section
      id="poster"
      data-section="poster"
      aria-labelledby="poster-title"
      className="relative bg-navy-900 py-[var(--section-y)]"
    >
      {/* Golden-hour glow behind the poster (docs/04 theming) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,179,8,0.35),transparent_65%)]"
      />

      <div className="relative">
        <SectionHeader id="poster" tag={poster.tag} title={poster.title} tone="dark" />

        <RevealStagger className="container mt-12 flex flex-col items-center gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-16">
          {/* The poster */}
          <div
            ref={posterWrapRef}
            className="w-[min(540px,86vw)] shrink-0 -rotate-1 overflow-hidden rounded-card shadow-[var(--shadow-blue)]"
          >
            <Image
              src={poster.image.src}
              alt={poster.image.alt}
              width={poster.image.w}
              height={poster.image.h}
              sizes="(max-width: 1023px) 86vw, 540px"
              className="h-auto w-full"
              priority
            />
          </div>

          {/* Palette + typography chips — nothing else */}
          <div className="flex flex-col gap-8 shrink-0 self-stretch">
            <div className="flex flex-col gap-3 w-full sm:grid sm:grid-cols-2 sm:gap-3">
              {poster.palette.map((entry) => (
                <PaletteChip key={entry.hex} name={entry.name} hex={entry.hex} tone="dark" />
              ))}
            </div>
            <div className="flex flex-col gap-4 w-full sm:grid sm:grid-cols-2 sm:gap-4">
              {poster.typography.map((font) => (
                <FontSpecimen key={font.name} name={font.name} role={font.role} tone="dark" />
              ))}
            </div>
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}
