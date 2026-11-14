"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const items = [
  { n: "01", label: "Concept", href: "#concept" },
  { n: "02", label: "Offer", href: "#offer" },
  { n: "03", label: "Logo", href: "#logo" },
  { n: "04", label: "Post", href: "#post" },
  { n: "05", label: "Poster", href: "#poster" },
  { n: "06", label: "Contact", href: "#contact" },
] as const;

export default function SectionIndex() {
  const navRef = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"));

      items.forEach((item, i) => {
        const el = document.getElementById(item.href.slice(1));
        const link = links[i];
        const dot = link?.querySelector("span:last-child");
        if (!el || !link || !dot) return;

        const activate = () => {
          dot.classList.add("bg-cyan-500", "scale-125");
          dot.classList.remove("bg-transparent");
          link.querySelector("span:first-child")?.classList.add("opacity-100");
        };
        const deactivate = () => {
          dot.classList.remove("bg-cyan-500", "scale-125");
          dot.classList.add("bg-transparent");
          link.querySelector("span:first-child")?.classList.remove("opacity-100");
        };

        ScrollTrigger.create({
          trigger: el,
          start: "top 28%",
          end: "bottom 28%",
          onEnter: activate,
          onEnterBack: activate,
          onLeave: deactivate,
          onLeaveBack: deactivate,
        });
      });

      // Thin scroll-progress wave line, scrubbed.
      const line = nav.querySelector(".progress-line");
      if (line) {
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    },
    { scope: navRef },
  );

  return (
    <nav aria-label="Section index" className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block">
      <ul ref={navRef} className="flex flex-col items-end gap-3 relative pr-2">
        <span
          aria-hidden="true"
          className="progress-line absolute right-0 top-0 bottom-0 w-[2px] scale-y-0 origin-top bg-gradient-to-t from-cyan-500 via-navy-700 to-transparent"
        />
        {items.map((item) => (
          <li key={item.href} className="group relative">
            <a
              href={item.href}
              className="flex items-center gap-2 text-navy-900"
              aria-label={`${item.n} ${item.label}`}
            >
              <span
                className="font-bungee text-[10px] tracking-[0.04em] text-navy-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {item.label}
              </span>
              <span className="font-bungee text-[10px] tracking-[0.04em] text-navy-600">
                {item.n}
              </span>
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full border border-navy-700 bg-transparent transition-all duration-200 group-hover:scale-125 group-hover:bg-cyan-500"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
