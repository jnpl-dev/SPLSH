"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/easing";

type ActivityBlobProps = {
  activity: { name: string; img: string; alt: string; w: number; h: number };
  tierText: string;
  big?: boolean;
};

export default function ActivityBlob({
  activity,
  tierText,
  big = false,
}: ActivityBlobProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const el = imgRef.current;
      if (!el) return undefined;
      gsap.from(el, {
        y: 40,
        scale: 0.92,
        duration: 0.9,
        ease: ease.drift,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
      const onEnter = () => {
        gsap.to(el, {
          scale: 1.05,
          y: -8,
          duration: 0.5,
          ease: ease.drift,
          overwrite: true,
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: ease.drift,
          overwrite: true,
        });
      };
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
        gsap.to(el, { scale: 1, y: 0, overwrite: true });
      };
    },
    { scope: imgRef }
  );

  return (
    <li className="flex-none flex flex-col items-center gap-2 text-center">
      <Image
        ref={imgRef}
        src={activity.img}
        alt={activity.alt}
        width={activity.w}
        height={activity.h}
        sizes="(max-width: 640px) 44vw, (max-width: 1023px) 30vw, 22vw"
        className={`h-36 w-auto max-w-full object-contain ${big ? 'sm:h-56 md:h-72 lg:h-96' : ''}`}
      />
      <span className={`font-knewave text-lg md:text-xl ${tierText}`}>
        {activity.name}
      </span>
    </li>
  );
}
