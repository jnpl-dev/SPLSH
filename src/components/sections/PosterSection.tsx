import Image from "next/image";
import { poster } from "@content/site";
import SectionHeader from "@/components/ui/SectionHeader";
import PaletteChip from "@/components/ui/PaletteChip";
import FontSpecimen from "@/components/ui/FontSpecimen";

/** CT#3 — poster + palette + typography ONLY. No explanation text (rule 4). */
export default function PosterSection() {
  return (
    <section
      id="poster"
      data-section="poster"
      aria-labelledby="poster-title"
      className="relative overflow-hidden bg-navy-900 py-[var(--section-y)]"
    >
      {/* Golden-hour glow behind the poster (docs/04 theming) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,179,8,0.35),transparent_65%)]"
      />

      <div className="relative">
        <SectionHeader id="poster" tag={poster.tag} title={poster.title} tone="dark" />

        <div className="container mt-12 flex flex-col items-center gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-16">
          {/* The poster */}
          <div className="w-[min(540px,86vw)] shrink-0 -rotate-1 overflow-hidden rounded-card shadow-[var(--shadow-blue)]">
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
          <div className="flex w-full max-w-[520px] flex-col gap-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {poster.palette.map((entry) => (
                <PaletteChip key={entry.hex} name={entry.name} hex={entry.hex} tone="dark" />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {poster.typography.map((font) => (
                <FontSpecimen key={font.name} name={font.name} role={font.role} tone="dark" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
