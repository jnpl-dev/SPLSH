"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
};

/** Gentle 3D tilt following the pointer. Desktop only; off on touch. */
export default function TiltCard({
  children,
  className,
  intensity = 12,
  disabled,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 150,
    damping: 18,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch || disabled) return undefined;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, isTouch, disabled, intensity]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformPerspective: 900,
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}
