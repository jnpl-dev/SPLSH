import Image from "next/image";
import { PLACEHOLDER, concept, owners } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

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
  return (
    <section
      id="concept"
      data-section="concept"
      aria-labelledby="concept-title"
      className="relative bg-gradient-to-b from-water-bg to-aqua-50 py-[var(--section-y)]"
    >
      <SectionHeader
        id="concept"
        tag={concept.tag}
        title={concept.title}
        lede={concept.lede}
      />

      <div className="mt-14 flex flex-col gap-20 md:mt-16 md:gap-28">
        {/* 1 — What is SPLSH? */}
        <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="max-w-[36ch] font-poppins text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] font-medium text-navy-900">
            {concept.lede}
          </p>
          <Image
            src={concept.story.snorkel.src}
            alt={concept.story.snorkel.alt}
            width={concept.story.snorkel.w}
            height={concept.story.snorkel.h}
            sizes="(max-width: 1023px) 80vw, 40vw"
            className="mx-auto h-auto w-[min(360px,80vw)] lg:w-full lg:max-w-[400px]"
          />
        </div>

        {/* 2 — Our story (History) */}
        <div className="container flex flex-col gap-8">
          <SubHeader n="01" title="Our story" />
          <p className="font-knewave text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-navy-700">
            “{concept.story.quote}”
          </p>
          <div className="flex max-w-[62ch] flex-col gap-4">
            {concept.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[1.0625rem] leading-relaxed text-navy-900/80">
                {p}
              </p>
            ))}
          </div>
          <Image
            src={concept.story.image.src}
            alt={concept.story.image.alt}
            width={concept.story.image.w}
            height={concept.story.image.h}
            sizes="(max-width: 1279px) 92vw, 1280px"
            className="h-auto w-full rounded-card"
          />
        </div>

        {/* 3 — Mission & Vision + Values */}
        <div className="container flex flex-col gap-8">
          <SubHeader n="02" title="Mission & vision" />
          <div className="grid gap-6 md:grid-cols-2">
            <article
              className={cn(
                "flex flex-col gap-4 rounded-card bg-white p-8 shadow-[var(--shadow-blue)]",
                PLACEHOLDER && "border-2 border-dashed border-orange-500/60",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bungee text-label tracking-[0.04em] text-cyan-500 uppercase">
                  Mission
                </p>
                <ConfirmChip />
              </div>
              <p className="text-[1.0625rem] leading-relaxed text-navy-900">{concept.mission}</p>
            </article>
            <article className="flex flex-col gap-4 rounded-card bg-white p-8 shadow-[var(--shadow-blue)]">
              <p className="font-bungee text-label tracking-[0.04em] text-orange-500 uppercase">
                Vision
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-navy-900">{concept.vision}</p>
            </article>
          </div>

          <p className="mt-2 font-bungee text-label tracking-[0.04em] text-navy-600 uppercase">
            Our values
          </p>
          <ul className="flex flex-wrap gap-3">
            {concept.values.map((value) => (
              <li
                key={value}
                className="rounded-full border-2 border-navy-900 bg-white px-4 py-2 font-bungee text-label tracking-[0.04em] text-navy-900 uppercase"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>

        {/* 4 — Who we serve */}
        <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-7">
            <SubHeader n="03" title="Who we serve" />
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-navy-900/80">
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
          </div>
          <Image
            src={concept.whoWeServe.image.src}
            alt={concept.whoWeServe.image.alt}
            width={concept.whoWeServe.image.w}
            height={concept.whoWeServe.image.h}
            sizes="(max-width: 1023px) 92vw, 50vw"
            className="h-auto w-full rounded-card"
          />
        </div>

        {/* 5 — Why choose SPLSH? */}
        <div className="container flex flex-col gap-8">
          <SubHeader n="04" title="Why choose SPLSH?" />
          <div className="grid gap-8 md:grid-cols-2">
            {concept.whyChoose.map((reason) => (
              <article key={reason.n} className="flex flex-col gap-4">
                <Image
                  src={reason.image.src}
                  alt={reason.image.alt}
                  width={reason.image.w}
                  height={reason.image.h}
                  sizes="(max-width: 767px) 92vw, 44vw"
                  className="h-auto w-full rounded-card object-cover"
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
          </div>
        </div>

        {/* 6 — Meet the owners [GAP] */}
        <div className="container flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <SubHeader n="05" title={concept.ownersTitle} />
            <ConfirmChip />
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:max-w-[820px]">
            {owners.map((owner) => (
              <li key={owner.photo} className="flex flex-col gap-3 rounded-card bg-white p-4 shadow-[var(--shadow-blue)]">
                {PLACEHOLDER ? (
                  <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border-2 border-dashed border-orange-500/60 bg-aqua-50 p-6 text-center">
                    <span className="font-bungee text-xs tracking-[0.04em] text-navy-600 uppercase">
                      Owner photo coming
                    </span>
                  </div>
                ) : (
                  <Image
                    src={owner.photo}
                    alt={`${owner.name}, ${owner.role}`}
                    width={1000}
                    height={1250}
                    sizes="(max-width: 640px) 92vw, 400px"
                    className="aspect-[4/5] w-full rounded-2xl object-cover"
                  />
                )}
                <div className="flex items-center justify-between gap-2 px-1 pb-1">
                  <div>
                    <p className="font-poppins font-semibold text-navy-900">{owner.name}</p>
                    <p className="text-sm text-navy-600">{owner.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
