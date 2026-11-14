"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const FULL_MS = 2000;
const REPEAT_MS = 600;
const STORAGE_KEY = "splsh:preloaded";

type Phase = "fill" | "flood" | "done";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("fill");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const isRepeat =
    typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
  const duration = isRepeat ? REPEAT_MS : FULL_MS;

  const skip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    cancelAnimationFrame(rafRef.current);
    setProgress(1);
    setPhase("flood");
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  useEffect(() => {
    if (phase !== "fill") return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setProgress(p);
      if (p >= 1) {
        setPhase("flood");
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, duration]);

  useEffect(() => {
    const img = new Image();
    img.src = "/brand/ui/water-bg.jpg";
    return () => {
      img.onload = null;
      img.src = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "flood") return;
    const wrap = document.querySelector(".preloader-wrap");
    if (!wrap) return;
    tlRef.current = gsap.timeline({ onComplete: () => setPhase("done") });
    tlRef.current.to(wrap, {
      y: "100%",
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setPhase("done"),
    });
    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [phase]);

  if (phase === "done") return <>{children}</>;

  return (
    <div
      className="preloader-wrap fixed inset-0 z-[99999] bg-navy-900 text-white flex flex-col items-center justify-center"
      onClick={skip}
    >
      <div className="relative w-full max-w-[320px] h-2 bg-cyan-500/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-cyan-500 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mt-8 font-bungee text-[clamp(1.25rem,3vw,2rem)] tracking-[0.15em] text-cyan-500">
        {Math.round(progress * 100)}%
      </div>
      <p className="mt-6 text-xs tracking-[0.25em] text-navy-900/40 uppercase opacity-70">
        click or esc to skip
      </p>
    </div>
  );
}
