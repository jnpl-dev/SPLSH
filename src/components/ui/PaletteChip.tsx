"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  hex: string;
  tone?: "light" | "dark";
  className?: string;
};

function hexToRgb(hex: string): string {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.replace(/./g, (c) => c + c) : m;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return "";
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Swatch + name + hex/RGB, click swatch to copy (docs/04 Components). */
export default function PaletteChip({ name, hex, tone = "light", className }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = () => {
    void navigator.clipboard?.writeText(hex).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1400);
    });
  };

  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-3 rounded-2xl border p-3 w-full",
        dark ? "border-white/15 bg-white/10" : "border-navy-900/10 bg-white",
        className,
      )}
    >
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${name} color ${hex}`}
        className={cn(
          "h-12 w-12 shrink-0 cursor-pointer rounded-xl border transition-transform duration-200 hover:scale-105",
          dark ? "border-white/25" : "border-navy-900/15",
        )}
        style={{ backgroundColor: hex }}
      />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            "font-bungee text-[11px] tracking-[0.04em] uppercase",
            dark ? "text-white" : "text-navy-900",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "text-xs tracking-wide tabular-nums",
            dark ? "text-white/70" : "text-navy-600",
          )}
        >
          {hex.toUpperCase()} · rgb({hexToRgb(hex)})
        </span>
      </span>
      {copied && (
        <span
          role="status"
          className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 font-bungee text-[10px] tracking-[0.04em] whitespace-nowrap text-white uppercase"
        >
          Copied {hex.toUpperCase()}
        </span>
      )}
    </div>
  );
}
