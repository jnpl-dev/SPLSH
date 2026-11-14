import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

/** Identical section header pattern everywhere (docs/04 Layout). */
export default function SectionHeader({
  id,
  tag,
  title,
  lede,
  tone = "light",
}: {
  id: string;
  tag: string;
  title: string;
  lede?: string;
  tone?: Tone;
}) {
  return (
    <header className="container flex flex-col items-start gap-4">
      <p
        className={cn(
          "font-bungee text-label uppercase tracking-[0.04em]",
          tone === "light" ? "text-navy-600" : "text-cyan-200",
        )}
      >
        {tag}
      </p>
      <h2
        id={`${id}-title`}
        className={cn(
          "font-luckiest text-h2 uppercase leading-[0.95]",
          tone === "light" ? "text-navy-900" : "text-white",
        )}
      >
        {title}
      </h2>
      <svg
        data-wave-underline
        aria-hidden="true"
        width="132"
        height="12"
        viewBox="0 0 132 12"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M2 7 C 12 1, 22 13, 32 7 S 52 1, 62 7 S 82 13, 92 7 S 112 1, 122 7"
          stroke={tone === "light" ? "#00C8E0" : "#00C8E0"}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      {lede && (
        <p
          className={cn(
            "max-w-[48ch] text-body",
            tone === "light" ? "text-navy-900/75" : "text-white/80",
          )}
        >
          {lede}
        </p>
      )}
    </header>
  );
}
