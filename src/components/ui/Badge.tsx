import { cn } from "@/lib/cn";

/** Navy circle with Bungee numeral — annotation badge, reused everywhere (docs/04). */
export default function Badge({
  n,
  tone = "light",
  className,
}: {
  n: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bungee text-sm tracking-[0.04em] tabular-nums",
        tone === "light" ? "bg-navy-700 text-white" : "bg-cyan-500 text-navy-900",
        className,
      )}
    >
      {n}
    </span>
  );
}
