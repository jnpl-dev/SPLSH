import Image from "next/image";
import { cn } from "@/lib/cn";

const fontClass: Record<string, string> = {
  "Luckiest Guy": "font-luckiest",
  Knewave: "font-knewave",
  Bungee: "font-bungee",
  Poppins: "font-poppins",
  "Better Faster": "font-better-faster",
};

/** Specimen card: name rendered in itself + Aa + alphabet (docs/04). */
export default function FontSpecimen({
  name,
  role,
  tone = "light",
  className,
}: {
  name: string;
  role?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const cls = fontClass[name];
  const isWordmark = !cls;

  return (
    <figure
      className={cn(
        "flex flex-col gap-3 w-full rounded-card border p-5",
        tone === "dark" ? "border-white/15 bg-white/10" : "border-navy-900/10 bg-white",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "flex h-16 items-center text-5xl leading-none",
          cls ?? "items-center",
        )}
        style={!cls ? { color: "inherit" } : undefined}
      >
        {isWordmark ? (
          <Image
            src="/brand/logo/logo-primary.png"
            alt=""
            width={789}
            height={299}
            className="h-10 w-auto"
          />
        ) : (
          <span className={cn(cls, tone === "dark" ? "text-white" : "text-navy-900")}>
            Aa
          </span>
        )}
      </div>
      <figcaption className="flex flex-col gap-1">
        <span
          className={cn(
            "text-lg",
            cls ?? "font-bungee text-base tracking-[0.04em] uppercase",
            tone === "dark" ? "text-white" : "text-navy-900",
          )}
        >
          {name}
        </span>
        {role && (
          <span
            className={cn(
              "font-bungee text-[10px] tracking-[0.04em] uppercase",
              tone === "dark" ? "text-cyan-200" : "text-navy-600",
            )}
          >
            {role}
          </span>
        )}
      </figcaption>
      <p
        aria-hidden="true"
        className={cn(
          "text-sm break-words",
          cls ?? "font-bungee text-xs tracking-[0.04em] uppercase",
          tone === "dark" ? "text-white/85" : "text-navy-900/60",
        )}
      >
        {isWordmark ? "Wave-inspired lettering" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789"}
      </p>
    </figure>
  );
}
