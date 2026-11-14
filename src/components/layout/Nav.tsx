import Image from "next/image";
import { nav } from "@content/site";

export default function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-water-bg/80 backdrop-blur-md"
      style={{ height: "var(--nav-h)" }}
    >
      <div className="container flex h-full items-center justify-between gap-4">
        <a
          href="#hero"
          aria-label="SPLSH — back to top"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/brand/logo/logo-primary.png"
            alt="SPLSH"
            width={789}
            height={299}
            className="h-7 w-auto md:h-8"
            priority
          />
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex lg:gap-9"
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-bungee text-label uppercase tracking-[0.04em] text-navy-900 transition-colors hover:text-orange-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={nav.cta.href}
          className="shrink-0 rounded-full bg-orange-500 px-4 py-2 font-bungee text-label uppercase tracking-[0.04em] text-white transition-transform duration-200 hover:scale-105 md:px-5 md:py-2.5"
        >
          {nav.cta.label}
        </a>
      </div>
    </header>
  );
}
