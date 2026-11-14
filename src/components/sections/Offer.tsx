"use client";

import Image from "next/image";
import { offer } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealStagger from "@/components/ui/RevealStagger";
import ActivityBlob from "./ActivityBlob";

/* Panel backgrounds escalate cyan → deep blue → navy with difficulty (docs/05 §E).
   Text tone flips to keep contrast ≥ 4.5:1 (never white on cyan). */
const tierTone = [
  { panel: "bg-cyan-200", text: "text-navy-900", sub: "text-navy-600", tag: "bg-navy-700 text-white" },
  { panel: "bg-navy-600", text: "text-white", sub: "text-cyan-200", tag: "bg-orange-500 text-white" },
  { panel: "bg-navy-900", text: "text-white", sub: "text-cyan-200", tag: "bg-sun-400 text-navy-900" },
] as const;

export default function Offer() {
  return (
    <section
      id="offer"
      data-section="offer"
      aria-labelledby="offer-title"
      className="relative bg-navy-900 py-[var(--section-y)]"
    >
      {/* Silhouette-friends background, navy scrim keeps header contrast */}
      <Image
        src={offer.introBg.src}
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-900/70" />
      {/* White cloud band above the scrim (brand decoration) */}
      <Image
        src="/brand/ui/cloud.png"
        alt=""
        width={1704}
        height={542}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute top-0 left-1/2 w-[90vw] max-w-[1200px] -translate-x-1/2 opacity-45"
      />

      <div className="relative">
        <SectionHeader
          id="offer"
          tag={offer.tag}
          title={offer.title}
          lede={offer.lede}
          tone="dark"
        />

        <RevealStagger className="mt-12 flex flex-col gap-0 md:mt-12">
          {offer.tiers.map((tier, i) => {
            const tone = tierTone[i];
            return (
              <div key={tier.n} className={`${tone.panel} flex flex-col`}>
                <div className="container flex flex-col gap-7 py-12 md:py-16">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <span
                      className={`rounded-full px-3 py-1 font-bungee text-[10px] tracking-[0.04em] uppercase ${tone.tag}`}
                    >
                      Tier {tier.n}
                    </span>
                    <h3
                      className={`font-luckiest text-[clamp(1.75rem,4vw,3rem)] leading-none uppercase ${tone.text}`}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-12 w-full">
                    {tier.activities.map((activity) => (
                      <ActivityBlob
                        key={activity.name}
                        activity={activity}
                        tierText={tone.text}
                        big={i === 2}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
