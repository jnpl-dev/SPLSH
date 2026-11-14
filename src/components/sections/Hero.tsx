import Image from "next/image";
import { hero } from "@content/site";

export default function Hero() {
  return (
    <section
      id="hero"
      data-section="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col items-center justify-center gap-5 overflow-hidden px-[var(--gutter)] pt-[var(--nav-h)] text-center"
    >
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-water-bg/40" />

      {/* Floating blob cut-outs — decorative, parallax added in P2 */}
      <Image
        src="/brand/story/jetski-couple.png"
        alt=""
        width={1600}
        height={989}
        aria-hidden="true"
        sizes="(max-width: 1023px) 0px, 26vw"
        className="pointer-events-none absolute top-[16%] left-[4%] hidden w-[24vw] max-w-[340px] lg:block"
      />
      <Image
        src="/brand/products/kitesurfing.png"
        alt=""
        width={639}
        height={638}
        aria-hidden="true"
        sizes="(max-width: 1023px) 0px, 20vw"
        className="pointer-events-none absolute right-[5%] bottom-[18%] hidden w-[18vw] max-w-[260px] lg:block"
      />

      {/* Center stack sits above the floating cut-outs */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <p className="font-bungee text-label uppercase tracking-[0.3em] text-navy-600">
          {hero.eyebrow}
        </p>

        <Image
          src={hero.logo.src}
          alt={hero.logo.alt}
          width={hero.logo.w}
          height={hero.logo.h}
          priority
          sizes="(max-width: 768px) 78vw, 560px"
          className="h-auto w-[min(560px,78vw)]"
        />

        <p className="font-knewave text-2xl text-navy-700 md:text-3xl">{hero.sub}</p>

        <h1
          id="hero-title"
          className="font-luckiest text-display-l uppercase text-navy-900"
        >
          {hero.headline}
        </h1>

        <nav
          aria-label="Jump to a required section"
          className="flex flex-wrap justify-center gap-3"
        >
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
      </div>

      <p className="absolute bottom-8 font-bungee text-label tracking-[0.2em] text-navy-600 uppercase">
        {hero.scrollCue} ↓
      </p>
    </section>
  );
}
