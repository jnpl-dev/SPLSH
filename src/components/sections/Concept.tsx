"use client";

import Image from "next/image";
import { useRef } from "react";
import { PLACEHOLDER, concept, owners } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { useScrollParallax } from "@/components/ui/useScrollParallax";
import Reveal from "@/components/ui/Reveal";
import RevealStagger from "@/components/ui/RevealStagger";
import OwnerCard from "./OwnerCard";

function SubHeader({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <Badge n={n} />
      <h3 className="font-poppins text-[1.35rem] leading-tight font-semibold text-navy-900">
        {title}
      </h3>
    </div>
  );
}

function ConfirmChip() {
  if (!PLACEHOLDER) return null;
  return (
    <span className="rounded-full border border-dashed border-orange-500 px-3 py-1 font-bungee text-[10px] tracking-[0.04em] text-orange-500 uppercase">
      Placeholder · team to confirm
    </span>
  );
}

export default function Concept() {
  const snorkelRef = useRef<HTMLImageElement>(null);
  const bananaRef = useRef<HTMLImageElement>(null);

  useScrollParallax(snorkelRef, 1.3);
  useScrollParallax(bananaRef, 1.5);

  return (
    <section
      id="concept"
      data-section="concept"
      aria-labelledby="concept-title"
      className="relative bg-gradient-to-b from-water-bg to-aqua-50 py-[var(--section-y)]"
    >
      <SectionHeader id="concept" tag={concept.tag} title={concept.title} />

      {/* Decorative bubbles (huge-space element) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="#00c8e0" opacity="0.08" />
        </svg>
        <svg width="150" height="150">
          <circle cx="75" cy="75" r="60" fill="#f27209" opacity="0.06" />
        </svg>
      </div>

      <div className="mt-14 flex flex-col gap-20 md:mt-16 md:gap-28">
        {/* 1 — What is SPLSH? */}
        <RevealStagger className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="max-w-[36ch] font-poppins text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] font-medium text-navy-900">
            {concept.lede}
          </p>
          <Image
            ref={snorkelRef}
            src={concept.story.snorkel.src}
            alt={concept.story.snorkel.alt}
            width={concept.story.snorkel.w}
            height={concept.story.snorkel.h}
            sizes="(max-width: 1023px) 80vw, 40vw"
            className="mx-auto h-auto w-[min(360px,80vw)] lg:w-full lg:max-w-[400px]"
          />
        </RevealStagger>

        {/* 2 — Our story (History) — landscape as full-bleed background */}
        <Reveal className="relative">
          <Image
            src={concept.story.image.src}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/78 to-white/92" />
          <div className="relative container flex flex-col gap-8 py-14 md:py-20">
            <SubHeader n="01" title="Our story" />
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-center">
              <div className="flex-1 text-center min-w-[280px]">
                <Image
                  src="/media/boracay-map.png"
                  alt="Map of Boracay Island showing SPLSH location"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 1023px) 80vw, 40vw"
                  className="mx-auto h-auto w-[min(360px,80vw)] lg:w-full lg:max-w-[400px]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 max-w-[62ch] lg:max-w-none">
                <p className="font-knewave text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-navy-700">
                  “{concept.story.quote}”
                </p>
                {concept.story.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[1.0625rem] leading-relaxed text-navy-900/85">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 — Mission & Vision + Values */}
        <div className="container flex flex-col gap-8">
          <SubHeader n="02" title="Mission & vision" />
          <RevealStagger className="grid gap-6 md:grid-cols-2">
            <article className="flex flex-col gap-4 rounded-card bg-white p-8 shadow-[var(--shadow-blue)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bungee text-label tracking-[0.04em] text-cyan-500 uppercase">
                  Mission
                </p>
              </div>
              <p className="text-[1.0625rem] leading-relaxed text-navy-900">
                {concept.mission}
              </p>
            </article>
            <article className="flex flex-col gap-4 rounded-card bg-white p-8 shadow-[var(--shadow-blue)]">
              <p className="font-bungee text-label tracking-[0.04em] text-orange-500 uppercase">
                Vision
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-navy-900">
                {concept.vision}
              </p>
            </article>
          </RevealStagger>

          <Reveal>
            <h3 className="font-poppins text-[1.35rem] leading-tight font-semibold text-navy-900 mt-2 mb-6">
              Our values
            </h3>
            <ul className="mt-4 flex flex-wrap justify-start sm:justify-center gap-3">
              {concept.values.map((value) => (
                <li key={value} className="rounded-full border-2 border-navy-900 bg-white px-4 py-2 font-bungee text-label tracking-[0.04em] text-navy-900 uppercase">
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* 4 — Who we serve — landscape as full-bleed background */}
        <Reveal className="relative">
          <Image
            src={concept.whoWeServe.image.src}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/96 via-white/84 to-white/96" />
          <div className="relative container grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
            <RevealStagger className="flex flex-col gap-7">
              <SubHeader n="03" title="Who we serve" />
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-navy-900">
                {concept.whoWeServe.lede}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {(
                  [
                    ["Primary", concept.whoWeServe.primary],
                    ["Secondary", concept.whoWeServe.secondary],
                  ] as const
                ).map(([label, items]) => (
                  <div key={label} className="flex flex-col gap-3">
                    <p className="font-bungee text-label tracking-[0.04em] text-cyan-500 uppercase">
                      {label}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[0.975rem] text-navy-900">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealStagger>
            <Image
              ref={bananaRef}
              src="/brand/story/friends-banana.png"
              alt=""
              width={1870}
              height={994}
              aria-hidden="true"
              sizes="(max-width: 1023px) 0px, 46vw"
              className="pointer-events-none mx-auto hidden w-full max-w-[560px] lg:block"
            />
          </div>
        </Reveal>

        {/* 5 — Why choose SPLSH? */}
        <div className="container flex flex-col gap-8">
          <SubHeader n="04" title="Why choose SPLSH?" />
          <RevealStagger className="grid gap-8 md:grid-cols-2">
            {concept.whyChoose.map((reason) => (
              <article key={reason.n} className="flex flex-col items-center text-center gap-4">
                <Image
                  src={reason.image.src}
                  alt={reason.image.alt}
                  width={reason.image.w}
                  height={reason.image.h}
                  sizes="(max-width: 767px) 70vw, 340px"
                  className="h-auto w-[min(340px,70vw)] object-contain"
                />
                <div className="flex items-center gap-3">
                  <Badge n={reason.n} />
                  <h4 className="font-poppins text-lg font-semibold text-navy-900">
                    {reason.title}
                  </h4>
                </div>
                <p className="max-w-[46ch] text-[1rem] leading-relaxed text-navy-900/80">
                  {reason.body}
                </p>
              </article>
            ))}
          </RevealStagger>
        </div>

        {/* 6 — Meet the owners [GAP] */}
        <div className="container flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <SubHeader n="05" title={concept.ownersTitle} />
            <ConfirmChip />
          </div>
          <ul className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center justify-center max-w-none w-full">
            {owners.map((owner) => (
              <OwnerCard key={owner.photo} owner={owner} placeholder={PLACEHOLDER} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
