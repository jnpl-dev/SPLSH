# Phase 2 · Motion Foundation — SPLSH

## Goal
Per `docs/08-build-plan.md` Phase 2: the page feels alive, calm, and consistent.
**Acceptance:** every section has an entrance; nothing janky at 6× CPU throttle; `prefers-reduced-motion` shows static, readable content. Max 3 pinned sections site-wide — **Phase 2 introduces no pins** (pins reserved for Phase 3: Offer pinned horizontal scroll #2, Logo sketch→ink #3).

## Source of truth
- `docs/05-motion-spec.md` — motion catalogue, easing tokens, performance/safety rules
- `docs/04-design-system.md` — shape language, section theming, layout
- `docs/08-build-plan.md` — Phase 2 acceptance criteria
- `src/lib/easing.ts`, `src/lib/gsap.ts`, `src/components/providers/SmoothScroll.tsx`

## Already in place (do not rebuild)
- GSAP plugins registered once in `src/lib/gsap.ts` (gsap, ScrollTrigger, SplitText, useGSAP)
- `SmoothScroll` provider — Lenis synced to GSAP ticker, reduced-motion guard, anchor scroll-to via `lenis.scrollTo`
- `easing.ts` tokens (liquid, swell, splash, drift) + durations
- All 8 sections static + styled (Hero → Closing); `content/site.ts` single source of truth
- Fonts loaded: Luckiest Guy / Knewave / Bungee / Poppins via `next/font`; Better Faster self-hosted `@font-face` in `public/fonts/`

## Decisions
1. **No pinned sections in Phase 2.** All pinning deferred to Phase 3 to respect the max-3-pins budget and keep Phase 2 to entrances + parallax + header reveals.
2. Phase 2 owns: `SplitHeading`, `Reveal`, `Blob`, `MagneticButton`, `TiltCard`, `WaveDivider`, `Marquee` + section-header animations + Concept/Offer parallax + SectionIndex/Nav behavior + `gsap.matchMedia` variants + reduced-motion path.
3. Only animate `transform`/`opacity`/`clip-path`; wave dividers use SVG path morph ≤ 2 on screen; `ScrollTrigger.refresh()` after fonts + images load (`document.fonts.ready`).
4. Reduced-motion: disable Lenis (native scroll), no scrub/loops/cursor, fades only ≤ 200 ms or none.
5. Custom cursor (desktop-only dot + ripple ring) deferred to Phase 3 to keep Phase 2 focused on scroll choreography.

## Ordered tasks
1. **UI primitives** — create/co-locate under `src/components/ui/`:
   - `SplitHeading`: SplitText char/line reveal (Luckiest Guy/Bungee/Knewave)
   - `Reveal`: fade-up wrapper on section enter
   - `Blob`: SVG `border-radius` 8-value morph (idle drift)
   - `MagneticButton`: hover magnetic pull
   - `TiltCard`: Motion hover tilt (desktop only)
   - `WaveDivider`: 2-layer SVG cyan/navy, parallaxed sine at section boundaries
   - `Marquee`: velocity-reactive Luckiest Guy, `skewX` −6…6° by `lenis.velocity`, two rows opposite directions (spec C)
2. **Section header animation** — Bungee tag chars + Luckiest Guy title chars via `SplitText` stagger + SVG wave-underline draw on section enter (`useGSAP`, scoped ref).
3. **Parallax layers** — Concept/Offer imagery `yPercent` scrubbed ±15/30/50 at 3 depths, desktop-only via `matchMedia`.
4. **Section entrances** — apply `Reveal`/`SplitHeading` staggered entrance to each of the 8 sections (Hero, Marquee, Concept, Offer, Logo, Post, Poster, Closing).
5. **SectionIndex** — active dot fill via `ScrollTrigger.onToggle` + thin scroll-progress wave line.
6. **Nav** — hide on scroll-down / show on scroll-up; active anchor underlined by traveling wave.
7. **`gsap.matchMedia` variants**:
   - `(min-width: 1024px)` full choreography
   - `(max-width: 1023px)` simplified (no pin, no cursor, lighter parallax)
   - `(prefers-reduced-motion: reduce)` fades only / none
8. **Lifecycle** — kill/revert everything on unmount via `useGSAP`; no global listeners left behind.
9. **Verify** — `pnpm lint && pnpm typecheck && pnpm build` green; visual QA at 1440 / 1024 / 390 px; 6× CPU throttle scroll test; `prefers-reduced-motion` static check.
10. **Tick** Phase 2 checkboxes in `docs/08-build-plan.md`.

## Risks / failure modes
- Lenis + ScrollTrigger desync on anchor clicks → route all internal anchors through `lenis.scrollTo` (already in `SmoothScroll.tsx`).
- SplitText double-invocation in React Strict Mode → `useGSAP` context reverts on unmount (existing pattern).
- Jank at 6× throttle → remove effects, not features; cap DPR; pause off-screen loops.
- OTF font rendering → Better Faster already `@font-face`; acceptable fallback chain.

## Open questions / out of scope for Phase 2
- Concept pinned statement (would be pin #1) → deferred to Phase 3 to keep Phase 2 pin-free.
- Custom cursor, preloader, WebGL hero water shader → Phase 3.
