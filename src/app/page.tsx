import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import SectionIndex from "@/components/layout/SectionIndex";
import Footer from "@/components/layout/Footer";

function Section({
  id,
  tag,
  title,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      data-section={id}
      aria-labelledby={`${id}-title`}
      className="relative py-[var(--section-y)]"
    >
      <header className="container flex flex-col gap-3">
        <p className="font-bungee text-label uppercase tracking-[0.04em] text-navy-600">
          {tag}
        </p>
        <h2
          id={`${id}-title`}
          className="font-luckiest text-h2 uppercase leading-[0.95] text-navy-900"
        >
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

const jumpChips = [
  { label: "Concept", href: "#concept" },
  { label: "Logo", href: "#logo" },
  { label: "Post", href: "#post" },
  { label: "Poster", href: "#poster" },
] as const;

export default function Home() {
  return (
    <>
      <Nav />
      <SectionIndex />

      <main>
        {/* 01 HERO — brand hook + grader jump links (storyboard §01) */}
        <section
          id="hero"
          data-section="hero"
          aria-labelledby="hero-title"
          className="relative flex min-h-svh flex-col items-center justify-center gap-6 px-[var(--gutter)] pt-[var(--nav-h)] text-center"
        >
          <p className="font-bungee text-label uppercase tracking-[0.3em] text-navy-600">
            Boracay · Philippines
          </p>
          <h1
            id="hero-title"
            className="font-luckiest text-display-l uppercase text-navy-900"
          >
            How wet? How fun?
          </h1>
          <p className="font-knewave text-2xl text-navy-700 md:text-3xl">
            For those who like it wet.
          </p>

          <nav aria-label="Jump to a required section" className="mt-4 flex flex-wrap justify-center gap-3">
            {jumpChips.map((chip) => (
              <a
                key={chip.href}
                href={chip.href}
                className="rounded-full border-2 border-navy-700 px-5 py-2 font-bungee text-label uppercase tracking-[0.04em] text-navy-900 transition-colors hover:bg-cyan-500 hover:text-navy-900"
              >
                {chip.label}
              </a>
            ))}
          </nav>

          <p className="absolute bottom-8 font-bungee text-label uppercase tracking-[0.2em] text-navy-600">
            Dive in ↓
          </p>
        </section>

        {/* 02 MARQUEE — velocity band (P1) */}
        <section
          id="marquee"
          data-section="marquee"
          aria-label="Tagline marquee"
          className="flex min-h-32 items-center overflow-hidden border-y border-navy-700/10 bg-aqua-50 py-6"
        >
          <p className="container font-luckiest text-h3 uppercase text-navy-700">
            For those who like it wet ✺ How wet? How fun? ✺ Boracay ✺ SPLSH
          </p>
        </section>

        {/* 03 CONCEPT [PT#1] */}
        <Section id="concept" tag="01 — Business Concept · PT#1" title="What is SPLSH?" />

        {/* 04 WHAT WE OFFER [PT#1] */}
        <Section id="offer" tag="02 — Products & Services · PT#1" title="What do we offer?" />

        {/* 05 LOGO DESIGN [CT#1] */}
        <Section id="logo" tag="03 — Logo Design · CT#1" title="Logo design" />

        {/* 06 FIRST BRAND POST [CT#2] */}
        <Section id="post" tag="04 — First-Ever Brand Post · CT#2" title="Our first hello" />

        {/* 07 PROMO POSTER [CT#3] — no explanation text (rule 4) */}
        <Section id="poster" tag="05 — Promotional Event Poster · CT#3" title="Wet & Wild" />

        {/* 08 CLOSING / CONTACT */}
        <Section id="contact" tag="06 — Let's Get Wet" title="Try SPLSH" />
      </main>

      <Footer />
    </>
  );
}
