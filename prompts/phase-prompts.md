# Phase prompts — paste one at a time into your AI coding tool (Claude Code / Cursor)

Tip: start every new chat with: "Read CLAUDE.md and the docs it lists. Confirm you understand the non-negotiables, then wait."

## P0 · Setup
Read CLAUDE.md and docs/03, docs/04. Execute Phase 0 of docs/08-build-plan.md: scaffold the Next.js project exactly per docs/03 (pin whatever versions `pnpm view` reports), set up fonts, Tailwind v4 tokens from docs/04, lib/gsap.ts, SmoothScroll, Nav, SectionIndex (static), 8 empty section anchors in storyboard order. Keep /public/brand untouched. Finish with lint/typecheck/build green and tick Phase 0 boxes.

## P1 · Static content
Execute Phase 1. Build every section per docs/06-storyboard.md using copy from content/content.md and assets from docs/07. No animation yet except hover states. Mark [CONFIRM]/[GAP] items with the PLACEHOLDER flag. Poster section must have no explanatory text. Check 390/768/1440 px screenshots and fix overlaps before finishing.

## P2 · Motion foundation
Execute Phase 2 using .claude/skills/splsh-motion-recipes. Build SplitHeading, Reveal, Blob, MagneticButton, TiltCard, WaveDivider, Marquee; add section entrances, parallax, SectionIndex active state, Nav hide/show; add gsap.matchMedia desktop/mobile/reduced-motion variants.

## P3.1 · Hero WebGL
Implement the hero per docs/05 §B and recipe 13: lazy R3F water-ripple shader using ui/water-bg.jpg, logo wipe reveal, split headline, quick-jump chips. Add static fallback for touch / reduced-motion / no WebGL. Pause when off-screen. Report bundle size impact.

## P3.2 · Preloader
Water-fill wordmark preloader → flood reveal. ≤ 2.5 s, skippable, once per session. Don't wait for heavy assets.

## P3.3 · Logo sketch→ink
Implement recipe 6 for the Logo section chapters 1–3, then palette tiles (copy hex toast) and typography specimens. Brand image pixels must stay unmodified.

## P3.4 · Offer horizontal scroll
Implement recipe 5 for the Offer section (desktop), vertical stack on mobile, tier background shift, activity hover video preview (use stills until videos arrive).

## P3.5–3.7 · Post, Poster, Closing, Cursor
Implement per docs/05 G, H, I, J. Poster = image + palettes + type chips only. Add custom cursor desktop-only.

## P4 · Media
Follow .claude/skills/splsh-asset-pipeline. If web access is blocked, produce the shot list and stop. Otherwise source, log, optimize, and wire the videos.

## P5 · QA
Run .claude/skills/splsh-awwwards-qa. Apply the top 5 fixes. Then work through docs/09 gates.

## P6 · Ship
Walk me through Vercel import and verification steps in docs/09, then list anything still marked [CONFIRM]/[GAP].

---
## Handy one-off prompts
- "Make this section feel more *liquid* without adding clutter — adjust easing and stagger only, no new elements."
- "This feels cluttered. Remove 30 % of decoration, increase whitespace to the next spacing token, keep all required content."
- "Audit for any place I animate the same property with both GSAP and Motion and fix it."
- "Throttle CPU 6× and find the heaviest scroll frame; propose the cheapest fix."
