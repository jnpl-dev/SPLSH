# 08 · Build Plan (phased — tick boxes as you go)

Each phase ends with: `pnpm lint && pnpm typecheck && pnpm build` green → visual check at 1440/1024/390 → commit → deploy preview to Vercel.
Time guide assumes a focused vibe-coding session per phase (≈ 1–2 h each). Order is deliberate: **content-complete & clean first, magic second, polish last.**

## Phase 0 · Setup & foundations  *(goal: empty page deploys on Vercel)*
- [ ] Scaffold per `docs/03` · copy `public/brand`, `content`, `docs`, `.claude`, `CLAUDE.md`
- [ ] `lib/gsap.ts`, `SmoothScroll`, fonts via `next/font`, tokens in `globals.css` (`@theme`), base reset, grain overlay
- [ ] Layout shell: `Nav`, `SectionIndex` (static), `Footer` stub, 8 empty `<section id>` anchors in order
- [ ] Push to GitHub, import in Vercel, confirm preview URL
**Accept:** fonts render, Lenis scrolls, anchors work, no console errors.

## Phase 1 · Static content build (NO animation yet)  *(goal: rubric-complete & clean)*
- [ ] `content/site.ts` typed from `content/content.md`
- [ ] Build all sections per storyboard with real assets, correct order, responsive grid
- [ ] PaletteChip + FontSpecimen components with real data (logo palette, post palette, poster palette)
- [ ] Concept: story, mission, vision, values, who we serve, why choose, owners (placeholder-safe)
- [ ] Offer: 3 tiers, 10 activities (static grid fallback — this stays as the mobile layout)
- [ ] Logo: sketch, primary, secondary, palette, typography
- [ ] Post: image, caption, palette, typography
- [ ] Poster: image, palette, typography — **no explanation**
- [ ] Closing contact
**Accept:** Printing the page as a static document would already satisfy every required item. Layout is clean at 390 px.

## Phase 2 · Motion foundation  *(goal: the page feels alive, calm, consistent)*
- [ ] `SplitHeading`, `Reveal`, `Blob`, `MagneticButton`, `TiltCard`, `WaveDivider`, `Marquee`
- [ ] Section header animation (tag, title chars, wave underline draw)
- [ ] Parallax layers on Concept/Offer imagery
- [ ] SectionIndex active state + progress line; Nav hide/show
- [ ] `gsap.matchMedia` variants + reduced-motion path
**Accept:** every section has an entrance; nothing janky at 6× CPU throttle; reduced-motion shows static content.

## Phase 3 · Signature moments  *(goal: Awwwards-level wow; do in this priority order)*
- [ ] 3.1 Hero WebGL water + logo reveal + headline (lazy, with static fallback)
- [ ] 3.2 Preloader water-fill → flood transition
- [ ] 3.3 Logo section sketch→ink scrub reveal (pinned)
- [ ] 3.4 Offer pinned horizontal scroll + hover video previews
- [ ] 3.5 Post phone tilt + typed caption + heart burst
- [ ] 3.6 Poster cinematic reveal + dusk gradient shift
- [ ] 3.7 Custom cursor (desktop), link roll hover, closing "TRY SPLSH" scale + mascot
**Accept:** each moment has a mobile/reduced-motion fallback; max 3 pins total; total JS budget respected.

## Phase 4 · Media  *(goal: real video + imagery, optimized)*
- [ ] Source V1–V10 per `docs/07` (or produce a shot list if blocked) · log in `docs/ASSET_LOG.md`
- [ ] Run `pnpm assets` · wire `VideoLoop` with poster/lazy/in-view playback
- [ ] Replace/upgrade any low-res supplied asset if the team provides originals
**Accept:** initial weight ≤ 1.5 MB; no layout shift as media loads; every video has a poster.

## Phase 5 · Polish, a11y, SEO  *(goal: 90+ Lighthouse perf on desktop, 100 a11y)*
- [ ] Metadata, OG image (1200×630 from logo + post), favicon from secondary logo, `robots`, `sitemap`
- [ ] Keyboard nav & focus rings, skip link, aria labels, alt text, color contrast audit
- [ ] Spacing/typography pass against the design system; remove clutter (Layout = 25 pts)
- [ ] Easter eggs (optional): click the logo surfer → splash particles; konami "wave"
**Accept:** `docs/09` QA gates all pass.

## Phase 6 · Ship
- [ ] Production deploy on Vercel, custom domain/alias if desired (e.g. splsh.vercel.app), test on real phone + school-laptop-class device
- [ ] Final link verified in an incognito window → submit **only the URL**
- [ ] Tag release `v1.0`; write 5-line case-study blurb for the writeup (stack, motion, performance numbers)

## Stretch (only if time remains; never at the expense of the above)
Sound toggle (ocean ambience, default OFF) · light/"night dive" theme switch · scroll-triggered Lottie sparkles · View Transitions API for nav anchors · a tiny "Pick your wet-level" interactive quiz that recommends an activity tier (reuses Offer data).
