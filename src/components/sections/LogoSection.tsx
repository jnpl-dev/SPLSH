"use client";

import Image from "next/image";
import { useRef } from "react";
import { logo } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import PaletteChip from "@/components/ui/PaletteChip";
import FontSpecimen from "@/components/ui/FontSpecimen";
import { useScrollParallax } from "@/components/ui/useScrollParallax";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";

function Chapter({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 font-bungee text-sm text-navy-900 tabular-nums"
        >
          {n}
        </span>
        <h3 className="font-poppins text-[1.35rem] font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

const inUse = [
  { label: "In the nav", href: "#hero" },
  { label: "In the post", href: "#post" },
  { label: "In the poster", href: "#poster" },
  { label: "In the closing", href: "#contact" },
] as const;

export default function LogoSection() {
  const sketchRef = useRef<HTMLImageElement>(null);
  const primaryRef = useRef<HTMLImageElement>(null);

  useScrollParallax(sketchRef, 1.2);

  return (
    <section
      id="logo"
      data-section="logo"
      aria-labelledby="logo-title"
      className="bg-navy-900 py-[var(--section-y)]"
    >
      <SectionHeader id="logo" tag={logo.tag} title={logo.title} lede={logo.lede} tone="dark" />

      <div className="container mt-14 grid gap-12 lg:grid-cols-[210px_1fr]">
        {/* Chapter strip — sticky list on desktop */}
        <nav aria-label="Logo design chapters" className="hidden lg:block">
          <ol className="sticky top-[calc(var(--nav-h)+32px)] flex flex-col gap-3">
            {logo.chapters.map((chapter, i) => (
              <li
                key={chapter}
                className="flex items-baseline gap-2 font-bungee text-[11px] tracking-[0.04em] text-white/70 uppercase"
              >
                <span className="text-cyan-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {chapter}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-16 md:gap-20">
          {/* 01 — The Sketch */}
          <Reveal>
            <Chapter n="01" title="The Sketch">
                <div className="max-w-[640px] -rotate-1 rounded-[4px] bg-white p-3 pb-8 md:pb-16 shadow-[var(--shadow-blue)]">
                <Image
                  ref={sketchRef}
                  src={logo.sketch.src}
                  alt={logo.sketch.alt}
                  width={logo.sketch.w}
                  height={logo.sketch.h}
                  sizes="(max-width: 1023px) 92vw, 600px"
                  className="h-auto w-full"
                />
              </div>
              <ul className="grid max-w-[720px] gap-4 sm:grid-cols-2">
                {logo.sketch.callouts.map((callout) => (
                  <li
                    key={callout.title}
                    className="flex flex-col gap-2 rounded-card border border-cyan-500/50 bg-white/5 p-5"
                  >
                    <p className="font-bungee text-label tracking-[0.04em] text-cyan-500 uppercase">
                      {callout.title}
                    </p>
                    <p className="text-[0.975rem] leading-relaxed text-white/80">
                      {callout.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Chapter>
          </Reveal>

          {/* 02 — Primary */}
          <Reveal>
            <Chapter n="02" title="Primary Logo">
              <TiltCard className="flex max-w-[640px] items-center justify-center rounded-card bg-white p-8 md:p-12">
                <Image
                  ref={primaryRef}
                  src={logo.primary.src}
                  alt={logo.primary.alt}
                  width={logo.primary.w}
                  height={logo.primary.h}
                  sizes="(max-width: 1023px) 84vw, 560px"
                  className="h-auto w-full"
                />
              </TiltCard>
              <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/80">
                {logo.primary.callout}
              </p>
            </Chapter>
          </Reveal>

          {/* 03 — Secondary */}
          <Reveal>
            <Chapter n="03" title="Secondary Logo">
              <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,320px)_1fr]">
                <div className="flex items-center justify-center rounded-card bg-white p-6">
                  <Image
                    src={logo.secondary.src}
                    alt={logo.secondary.alt}
                    width={logo.secondary.w}
                    height={logo.secondary.h}
                    sizes="(max-width: 639px) 70vw, 300px"
                    className="h-auto w-full"
                  />
                </div>
                <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-white/80">
                  {logo.secondary.callout}
                </p>
              </div>
            </Chapter>
          </Reveal>

          {/* 04 — Color palette */}
          <Reveal>
            <Chapter n="04" title="Color Palette">
              <div className="grid max-w-[760px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {logo.palette.map((entry) => (
                  <PaletteChip key={entry.hex} name={entry.name} hex={entry.hex} tone="dark" />
                ))}
              </div>
            </Chapter>
          </Reveal>

          {/* 05 — Typography */}
          <Reveal>
            <Chapter n="05" title="Typography">
              <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/80">
                {logo.typographyNote}
              </p>
              <div className="grid max-w-[860px] gap-4 sm:grid-cols-2">
                {logo.fonts.map((font) => (
                  <FontSpecimen key={font.name} name={font.name} role={font.role} tone="dark" />
                ))}
              </div>
            </Chapter>
          </Reveal>

          {/* Logo in use — cross-links (Integration, docs/01) */}
          <Reveal className={cn("flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3")}>
            <span className="font-bungee text-label tracking-[0.04em] text-cyan-200 uppercase text-center sm:text-left">
              Logo in use →
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {inUse.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/30 px-4 py-2 font-bungee text-[11px] tracking-[0.04em] text-white uppercase transition-colors duration-200 hover:border-cyan-500 hover:text-cyan-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
