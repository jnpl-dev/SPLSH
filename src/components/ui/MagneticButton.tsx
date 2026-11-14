"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

/** Pulls the button toward the cursor on hover; springs back on leave. */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  disabled,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || disabled) return undefined;
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        gsap.to(el, {
          x: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 40 * strength,
          y: ((e.clientY - rect.top - rect.height / 2) / rect.height) * 40 * strength,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power2.out", overwrite: true });
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
        gsap.to(el, { x: 0, y: 0, overwrite: true });
      };
    },
    { scope: ref },
  );
  return (
    <button ref={ref} type={type} disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
