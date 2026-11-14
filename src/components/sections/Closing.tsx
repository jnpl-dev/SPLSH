import Image from "next/image";
import { PLACEHOLDER, closing } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Closing() {
  return (
    <section
      id="contact"
      data-section="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-[85svh] items-center overflow-hidden py-[var(--section-y)]"
    >
      <Image
        src={closing.sunset.src}
        alt={closing.sunset.alt}
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-900/75" />

      <div className="relative flex w-full flex-col items-center gap-10 text-center">
        <SectionHeader id="contact" tag={closing.tag} title="Try SPLSH" tone="dark" />

        {/* Deck closing line + logo lockup */}
        <div className="flex max-w-[900px] flex-col items-center gap-6 px-[var(--gutter)]">
          <p className="font-luckiest text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] text-white uppercase">
            {closing.line}
          </p>
          <Image
            src={closing.logo.src}
            alt={closing.logo.alt}
            width={closing.logo.w}
            height={closing.logo.h}
            sizes="(max-width: 640px) 46vw, 220px"
            className="h-auto w-[min(220px,46vw)]"
          />
        </div>

        {/* Contact row */}
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 px-[var(--gutter)]">
          {closing.contact.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-bungee text-label tracking-[0.04em] text-white uppercase underline-offset-4 transition-colors duration-200 hover:text-cyan-500 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="font-bungee text-label tracking-[0.04em] text-cyan-200 uppercase">
            {closing.location}
          </li>
        </ul>

        <a
          href={closing.cta.href}
          className="rounded-full bg-orange-500 px-8 py-4 font-bungee text-label tracking-[0.04em] text-white uppercase transition-transform duration-200 hover:scale-105"
        >
          {closing.cta.label}
        </a>

        {/* Mascot — sparing, footer only (docs/02) */}
        <Image
          src={closing.mascot.src}
          alt={closing.mascot.alt}
          width={closing.mascot.w}
          height={closing.mascot.h}
          sizes="112px"
          className="h-auto w-24 opacity-90 md:w-28"
        />

        {PLACEHOLDER && (
          <span className="rounded-full border border-dashed border-cyan-500/80 px-4 py-1.5 font-bungee text-[10px] tracking-[0.04em] text-cyan-200 uppercase">
            Credit line: {closing.credit}
          </span>
        )}
      </div>
    </section>
  );
}
