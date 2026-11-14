import Image from "next/image";
import { offer } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";

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
      className="bg-navy-900 py-[var(--section-y)]"
    >
      <SectionHeader
        id="offer"
        tag={offer.tag}
        title={offer.title}
        lede={offer.lede}
        tone="dark"
      />

      <div className="mt-12 flex flex-col gap-6 md:mt-16">
        {offer.tiers.map((tier, i) => {
          const tone = tierTone[i];
          return (
            <div key={tier.n} className={tone.panel}>
              <div className="container flex flex-col gap-7 py-10 md:py-12">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span
                    className={`font-luckiest text-[clamp(3rem,7vw,5.5rem)] leading-none ${tone.text} opacity-90`}
                    aria-hidden="true"
                  >
                    {tier.n}
                  </span>
                  <div className="flex flex-col items-start gap-1">
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
                </div>

                <ul className="grid grid-cols-2 items-end gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {tier.activities.map((activity) => (
                    <li key={activity.name} className="flex flex-col items-center gap-2 text-center">
                      <Image
                        src={activity.img}
                        alt={activity.alt}
                        width={activity.w}
                        height={activity.h}
                        sizes="(max-width: 640px) 44vw, (max-width: 1023px) 30vw, 22vw"
                        className="h-28 w-auto max-w-full object-contain sm:h-32 md:h-40"
                      />
                      <span className={`font-knewave text-lg md:text-xl ${tone.text}`}>
                        {activity.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* End card — cross-link to Poster (Integration points, docs/01) */}
        <div className="container">
          <a
            href={offer.promo.href}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-card border-2 border-cyan-500 bg-white/10 p-6 transition-colors duration-200 hover:bg-white/15 md:p-8"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bungee text-label tracking-[0.04em] text-cyan-200 uppercase">
                Right now
              </span>
              <span className="font-luckiest text-[clamp(1.25rem,3vw,2rem)] leading-tight text-white uppercase">
                {offer.promo.text}
              </span>
            </div>
            <span className="rounded-full bg-orange-500 px-6 py-3 font-bungee text-label tracking-[0.04em] text-white uppercase transition-transform duration-200 group-hover:scale-105">
              {offer.promo.cta} ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
