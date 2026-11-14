"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type OwnerCardProps = {
  owner: { name: string; role: string; photo: string; quote: string };
  placeholder: boolean;
};

export default function OwnerCard({ owner, placeholder }: OwnerCardProps) {
  const cardRef = useRef<HTMLLIElement | null>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el || placeholder) return undefined;
      const onEnter = () => {
        gsap.to(el, { y: -6, scale: 1.02, duration: 0.4, ease: "power2.out", overwrite: true });
      };
      const onLeave = () => {
        gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power2.out", overwrite: true });
      };
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
        gsap.to(el, { y: 0, scale: 1, overwrite: true });
      };
    },
    { scope: cardRef }
  );

  return (
    <li
      ref={cardRef}
      className="flex-none flex flex-col gap-3 rounded-card bg-white p-4 shadow-[var(--shadow-blue)] w-[260px] sm:w-[300px] will-change-transform"
    >
      {placeholder ? (
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
  );
}
