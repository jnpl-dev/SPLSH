---
name: splsh-section-builder
description: Build or modify a SPLSH site section (Hero, Concept, Offer, Logo, Post, Poster, Closing) following the project's storyboard, design tokens, and rubric. Use whenever creating or editing anything under src/components/sections.
---

# SPLSH Section Builder

## Procedure
1. Read `docs/06-storyboard.md` for the target section and `docs/04-design-system.md` for tokens. Read the matching copy in `content/content.md`.
2. Build **static first**: semantic HTML, tokens, responsive at 390/768/1440, real assets from `/public/brand`. Confirm content completeness against `docs/01` rubric table.
3. Then add motion using the recipes in `.claude/skills/splsh-motion-recipes` (never invent new easing/durations).
4. Verify: no horizontal scroll, headings in order, alt text, reduced-motion fallback, build passes.

## Section skeleton
```tsx
export default function Section({ id, tag, title, lede, children }) {
  return (
    <section id={id} data-section={id} aria-labelledby={`${id}-title`} className="relative py-[var(--section-y)]">
      <header className="container">
        <p className="font-bungee text-xs tracking-[0.04em]">{tag}</p>   {/* e.g. "03 — LOGO DESIGN · CT#1" */}
        <h2 id={`${id}-title`} className="font-luckiest text-[length:var(--text-h2)] leading-[.9]">{title}</h2>
        {lede && <p className="max-w-[48ch]">{lede}</p>}
      </header>
      {children}
    </section>
  );
}
```
## Rules
- Brand images: `next/image`, never CSS filters/recolors; no cropping that cuts logo/poster/post content (use `object-contain`).
- Section header pattern is identical across sections. Don't restyle it per section.
- ≤ 40 words per text block; use badges/pills instead of paragraphs.
- Poster section: image + palette + type chips ONLY.
- Any `[CONFIRM]`/`[GAP]` content must render with a visible subtle "placeholder" treatment (dashed outline) in dev and a clean neutral version in production — keep a `PLACEHOLDER` flag in `content/site.ts` so it's one switch to remove.
- Client islands only where interactivity is required.
