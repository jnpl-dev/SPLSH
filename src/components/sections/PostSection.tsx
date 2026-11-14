"use client";

import Image from "next/image";
import { useRef } from "react";
import { brand, post } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import PaletteChip from "@/components/ui/PaletteChip";
import FontSpecimen from "@/components/ui/FontSpecimen";
import Badge from "@/components/ui/Badge";
import { useScrollParallax } from "@/components/ui/useScrollParallax";
import Reveal from "@/components/ui/Reveal";
import RevealStagger from "@/components/ui/RevealStagger";

export default function PostSection() {
  const frameRef = useRef<HTMLDivElement>(null);
  useScrollParallax(frameRef, 1.15);

  return (
    <section
      id="post"
      data-section="post"
      aria-labelledby="post-title"
      className="overflow-x-clip bg-gradient-to-b from-aqua-50 to-white py-[var(--section-y)]"
    >
      <SectionHeader id="post" tag={post.tag} title={post.title} />

      <div className="container mt-14 grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Left — caption + palette + typography */}
        <RevealStagger className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins text-[1.35rem] font-semibold text-navy-900">
                The caption
              </h3>
              <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-navy-900/85 whitespace-pre-line">
                {post.caption}
              </p>
              <p className="max-w-[52ch] font-poppins text-[0.975rem] leading-relaxed font-medium text-navy-600">
                {post.hashtags}
              </p>
            </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-poppins text-[1.35rem] font-semibold text-navy-900">
                Post palette
              </h3>
            </div>
            <div className="grid max-w-[560px] gap-3 sm:grid-cols-2">
              {post.palette.map((entry) => (
                <PaletteChip key={entry.hex} name={entry.name} hex={entry.hex} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-poppins text-[1.35rem] font-semibold text-navy-900">
                Post typography
              </h3>
            </div>
            <div className="grid max-w-[560px] gap-4 sm:grid-cols-2">
              {post.typography.map((font) => (
                <FontSpecimen key={font.name} name={font.name} role={font.role} />
              ))}
            </div>
          </div>

          <a
            href="#logo"
            className="w-fit rounded-full border-2 border-navy-700 px-5 py-2 font-bungee text-label tracking-[0.04em] text-navy-900 uppercase transition-colors duration-200 hover:bg-cyan-500"
          >
            ← Meet the logo
          </a>
        </RevealStagger>

        {/* Right — phone frame + annotations */}
        <Reveal className="flex flex-col items-center gap-10">
          <div ref={frameRef} className="relative mx-auto w-[min(340px,88vw)]">
            {/* Soft brand glow (optimized sibling of ui/glow-blob) */}
            <Image
              src="/optimized/brand/glow-blob.webp"
              alt=""
              width={800}
              height={800}
              aria-hidden="true"
              sizes="440px"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80"
            />
            {/* Cyan shards + dashed orbit — deck visual language (docs/02) */}
            <div
              aria-hidden="true"
              className="absolute -top-7 -left-7 h-32 w-32 -rotate-12 rounded-[28px] bg-cyan-200"
            />
            <div
              aria-hidden="true"
              className="absolute -right-6 bottom-16 h-24 w-24 rotate-12 rounded-[22px] bg-cyan-500/40"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-9 rounded-full border-2 border-dashed border-cyan-500/50"
            />

            <div className="relative overflow-hidden rounded-[2rem] border-[10px] border-navy-900 bg-white shadow-[var(--shadow-blue)]">
              {/* Feed header — no third-party logos */}
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white border border-navy-900/10">
                  <Image
                    src="/brand/logo/logo-secondary.png"
                    alt=""
                    width={800}
                    height={800}
                    className="h-full w-full scale-125 object-contain"
                  />
                </span>
                <span className="font-bungee text-[11px] tracking-[0.04em] text-navy-900 uppercase">
                  {brand.handle}
                </span>
                <span aria-hidden="true" className="ml-auto text-navy-900/60">
                  •••
                </span>
              </div>

              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.w}
                height={post.image.h}
                sizes="(max-width: 1023px) 88vw, 340px"
                className="aspect-square w-full object-cover"
              />

              {/* Actions */}
              <div className="flex items-center gap-3 px-3 py-2.5">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-orange-500">
                  <path d="M12 21s-6.7-4.35-9.33-8.1C.7 10.2 1.2 6.6 4.05 5.3c2.1-.95 4.4-.2 5.65 1.5L12 9l2.3-2.2c1.25-1.7 3.55-2.45 5.65-1.5 2.85 1.3 3.35 4.9 1.38 7.6C18.7 16.65 12 21 12 21z" />
                </svg>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 stroke-navy-900"
                  fill="none"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="ml-auto rounded-full bg-cyan-500 px-2.5 py-1 font-bungee text-[10px] tracking-[0.04em] text-navy-900 uppercase">
                  {brand.handle}
                </span>
              </div>
            </div>
          </div>
          {/* Five numbered annotations (deck callouts) — below the post frame */}
          <div className="mt-12 w-full flex flex-col items-center">
            <ul className="grid max-w-[520px] gap-3 sm:grid-cols-2 lg:grid-cols-2 justify-center">
              {post.annotations.map((annotation) => (
                <li key={annotation.n} className="flex items-center gap-3">
                  <Badge n={annotation.n} />
                  <span className="font-poppins text-sm font-medium text-navy-900">
                    {annotation.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
