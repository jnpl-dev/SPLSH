"use client";

import { useRef } from "react";
import Image from "next/image";
import { closing, hero } from "@content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/easing";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";

export default function Closing() {
  const contactRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Staggered scale-up of contact links (non-repetitive: scale + fade, no y-move).
  useGSAP(
    () => {
      const el = contactRef.current;
      if (!el) return undefined;
      const links = Array.from(el.querySelectorAll("a"));
      gsap.from(links, {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.6,
        ease: ease.splash,
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      return () => gsap.killTweensOf(links);
    },
    { scope: contactRef }
  );

  // Button: scale pulse on enter (non-repetitive: pulsing scale, no fade).
  useGSAP(
    () => {
      const el = btnRef.current;
      if (!el) return undefined;
      gsap.from(el, {
        scale: 0.85,
        autoAlpha: 0,
        duration: 0.8,
        ease: ease.splash,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      gsap.to(el, {
        scale: 1.04,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: ease.drift,
      });
      return () => gsap.killTweensOf(el);
    },
    { scope: btnRef }
  );

  return (
    <section
      id="contact"
      data-section="contact"
      aria-labelledby="contact-title"
      className="relative flex flex-col py-[var(--section-y)] bg-white"
    >
      {/* Water texture background */}
      <Image
        src="/brand/ui/water-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/70" />

      {/* Single centered column: title left-aligned, everything else centered */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-[var(--gutter)] text-center w-full">
        {/* Title — left aligned, full width */}
        <SectionHeader id="contact" tag={closing.tag} title="Try SPLSH" tone="light" />

        {/* Primary logo + tagline lockup (same as hero) */}
        <div className="flex flex-col items-center gap-6 max-w-[900px]">
          <TiltCard className="flex items-center justify-center">
            <Image
              src={hero.logo.src}
              alt={hero.logo.alt}
              width={hero.logo.w}
              height={hero.logo.h}
              sizes="(max-width: 768px) 78vw, 560px"
              className="h-auto w-[min(560px,78vw)] opacity-95"
            />
          </TiltCard>
          <p className="font-better-faster text-2xl uppercase tracking-[0.1em] text-navy-700 md:text-3xl">
            {hero.sub}
          </p>
        </div>

        {/* Animated cat mascot in scuba suit */}
        <div className="relative inline-block">
          <Image
            src="/brand/mascot/cat_scuba_suit_animated.gif"
            alt="SPLSH mascot — cat in scuba suit"
            width={520}
            height={523}
            className="relative z-10 h-48 w-48 md:h-64 md:w-64 object-contain filter drop-shadow-[0_20px_40px_rgba(0,200,224,0.2)]"
          />
        </div>

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <ul ref={contactRef} className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {closing.contact.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-bungee text-label tracking-[0.04em] text-navy-900 uppercase underline-offset-4 transition-colors duration-200 hover:text-cyan-500 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="font-bungee text-label tracking-[0.04em] text-navy-600 uppercase">
              {closing.location}
            </li>
          </ul>
        </div>

        <button
          ref={btnRef}
          onClick={() => window.__lenis?.scrollTo("#hero", { offset: -88, duration: 1.6 })}
          className="rounded-full bg-orange-500 px-10 py-4 font-bungee text-label tracking-[0.05em] text-white uppercase shadow-[var(--shadow-blue)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(242,114,9,0.6)]"
        >
          Back to top
        </button>
      </div>
    </section>
  );
}
