"use client";

import { useRef } from "react";
import Image from "next/image";
import { hero } from "@content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/easing";
import { useScrollParallax } from "@/components/ui/useScrollParallax";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import RevealStagger from "@/components/ui/RevealStagger";

export default function Hero() {
  const parasailRef = useRef<HTMLImageElement>(null);
  const windsurfRef = useRef<HTMLImageElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useScrollParallax(parasailRef, 0.85);
  useScrollParallax(windsurfRef, 1.3);
  useScrollParallax(cloudRef, 1.15);
  useScrollParallax(glowRef, 0.8);

  // Logo clip-path reveal.
  useGSAP(
    () => {
      const logo = logoRef.current;
      if (!logo) return;
      gsap.set(logo, { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" });
      gsap
        .timeline({ scrollTrigger: { trigger: logo, start: "top 85%", once: true } })
        .to(logo, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: ease.liquid,
        });
    },
    { scope: logoRef }
  );

  // Floating bubbles (inline SVG, no external asset).
  useGSAP(
    () => {
      const bubbles = document.querySelectorAll<SVGCircleElement>(".hero-bubble");
      gsap.to(bubbles, {
        y: (i) => -40 - i * 15,
        opacity: (i) => 0.15 + i * 0.05,
        duration: (i) => 5 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: ease.drift,
        stagger: 0.4,
      });
    },
    { scope: undefined }
  );

  return (
    <section
      id="hero"
      data-section="hero"
      aria-label="SPLSH hero"
      className="relative flex min-h-svh flex-col items-center justify-start gap-5 overflow-hidden px-[var(--gutter)] pt-[calc(var(--nav-h)+60px)] pb-20 text-center"
    >
      {/* Decorative bubbles (huge-space element) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <svg className="hero-bubble" width="60" height="60">
          <circle cx="30" cy="30" r="20" fill="#00c8e0" opacity="0.15" />
        </svg>
        <svg className="hero-bubble" width="90" height="90">
          <circle cx="45" cy="45" r="30" fill="#00c8e0" opacity="0.1" />
        </svg>
        <svg className="hero-bubble" width="40" height="40">
          <circle cx="20" cy="20" r="15" fill="#ffffff" opacity="0.2" />
        </svg>
      </div>

      {/* Water-ripple texture background (docs/07 A) */}
      <Image
        src="/brand/ui/water-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-water-bg/55" />
      {/* Animated ripple texture overlay */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/80"
            style={{
              width: 340 + i * 200,
              height: 340 + i * 200,
              animation: `ripple ${6 + i * 2}s linear infinite`,
              animationDelay: `${-i * 2}s`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      {/* Floating cut-outs */}
      <TiltCard
        className="absolute top-[16%] left-[4%] hidden w-[24vw] max-w-[340px] lg:block"
        intensity={6}
        disabled={reducedMotion}
      >
        <Image
          ref={parasailRef}
          src="/brand/story/parasail.png"
          alt=""
          width={720}
          height={480}
          aria-hidden="true"
          sizes="(max-width: 1023px) 0px, 26vw"
          className="h-auto w-full block pointer-events-none"
        />
      </TiltCard>
      <TiltCard
        className="absolute right-[5%] bottom-[18%] hidden w-[18vw] max-w-[260px] lg:block"
        intensity={6}
        disabled={reducedMotion}
      >
        <Image
          ref={windsurfRef}
          src="/brand/products/windsurfing.png"
          alt="Windsurfer on Boracay water"
          width={639}
          height={638}
          aria-hidden="true"
          sizes="(max-width: 1023px) 0px, 20vw"
          className="h-auto w-full block pointer-events-none"
        />
      </TiltCard>
      <Image
        ref={cloudRef}
        src="/brand/ui/cloud.png"
        alt=""
        width={1704}
        height={542}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute top-[8%] left-[-6%] w-[32vw] max-w-[420px] opacity-50 -rotate-3 lg:block"
      />
      <Image
        ref={glowRef}
        src="/brand/ui/glow-blob.png"
        alt=""
        width={800}
        height={800}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute bottom-[25%] right-[-8%] w-[28vw] max-w-[340px] opacity-40 lg:block -rotate-6"
      />

      {/* Center stack */}
      <RevealStagger className="relative z-10 flex flex-col items-center gap-5">
        <p className="font-bungee text-label uppercase tracking-[0.3em] text-navy-600">
          {hero.eyebrow}
        </p>
        <Image
          ref={logoRef}
          src={hero.logo.src}
          alt={hero.logo.alt}
          width={hero.logo.w}
          height={hero.logo.h}
          priority
          sizes="(max-width: 768px) 78vw, 560px"
          className="h-auto w-[min(560px,78vw)] block"
        />
        <p className="font-better-faster text-2xl uppercase tracking-[0.1em] text-navy-700 md:text-3xl">
          {hero.sub}
        </p>
        <nav aria-label="Jump to a required section" className="flex flex-wrap justify-center gap-3">
          {hero.chips.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="rounded-full border-2 border-navy-700 bg-white/70 px-5 py-2 font-bungee text-label tracking-[0.04em] text-navy-900 uppercase transition-colors hover:bg-cyan-500"
            >
              {chip.label}
            </a>
          ))}
        </nav>
      </RevealStagger>

      <Reveal className="absolute bottom-16">
        <p className="font-bungee text-label tracking-[0.2em] text-navy-600 uppercase">
          {hero.scrollCue} ↓
        </p>
      </Reveal>
    </section>
  );
}
