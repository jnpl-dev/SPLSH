"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { nav } from "@content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SECTION_IDS = ["concept", "offer", "logo", "post", "poster"];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const waveRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const panel = menuRef.current;
    if (!panel) return;
    if (isOpen) {
      gsap.fromTo(
        panel,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  useGSAP(
    () => {
      const nav = navRef.current;
      const wave = waveRef.current;
      if (!nav || !wave) return;
      const links = Array.from(nav.querySelectorAll<HTMLElement>("a[href^='#']"));

      const placeWave = (target: HTMLElement | null) => {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const nRect = nav.getBoundingClientRect();
        gsap.to(wave, {
          x: rect.left - nRect.left,
          width: rect.width,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      };

      placeWave(links[0] || null);

      // Hide on scroll down, show on scroll up.
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          gsap.to(nav, {
            y: self.direction === 1 ? "-100%" : 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      // Traveling wave underline under the active section's link.
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        const link = links[i];
        if (!el || !link) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 30%",
          end: "bottom 30%",
          onEnter: () => placeWave(link),
          onEnterBack: () => placeWave(link),
          onLeave: () => {
            const next = links[i + 1];
            if (next) placeWave(next);
          },
          onLeaveBack: () => {
            const prev = links[i - 1];
            if (prev) placeWave(prev);
          },
        });
      });
    },
    { scope: navRef },
  );

  const closeMenu = () => setIsOpen(false);

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50 bg-water-bg/80 backdrop-blur-md">
      <div className="container flex h-full items-center justify-between gap-4 py-3 md:py-4">
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

        <nav aria-label="Primary" className="relative hidden items-center gap-7 md:flex lg:gap-9">
          {nav.links.map((link: { label: string; href: string }) => (
            <a
              key={link.href}
              href={link.href}
              className="font-bungee text-label uppercase tracking-[0.04em] text-navy-900 transition-colors hover:text-orange-500"
            >
              {link.label}
            </a>
          ))}
          <span ref={waveRef} aria-hidden="true" className="absolute -bottom-1 h-[2px] bg-cyan-500 origin-left scale-x-0 rounded-full" />
        </nav>

        {/* Burger menu — mobile only, far right */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md text-navy-900 hover:bg-navy-900/10 focus:outline-none"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop CTA stays here */}
      </div>

      {/* Mobile menu panel — slides down */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-x-0 top-[var(--nav-h)] z-40 bg-water-bg/95 backdrop-blur-md border-b border-navy-700/20"
          onClick={closeMenu}
        >
          <nav
            aria-label="Mobile navigation"
            className="container flex flex-col gap-1 py-6 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-3 text-center font-bungee text-label uppercase tracking-[0.04em] text-navy-900 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
