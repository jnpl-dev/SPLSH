# Phase 3 · Signature Moments (Awwwards-level wow)

**Source of truth:** `docs/08-build-plan.md` Phase 3, `docs/05-motion-spec.md`

## Decisions locked
- **Pins: 2 total** — Logo sketch→ink reveal (pin 1), Offer horizontal scroll (pin 2). Logo morph overlay is NOT pinned (degrades to static image).
- **WebGL hero water**: Enabled by default on desktop non-touch; static fallback (CSS gradient shimmer + image) for touch / reduced-motion / low-power. Lazy-loaded via `dynamic()` with `ssr: false`.
- **Preloader**: ≤ 2.5s, skippable, runs once per session via `sessionStorage`; shortened to 0.6s on repeat visits. Waits only for fonts + hero poster image.
- **Max 3 pins total** — strictly enforced; only 2 used.
- **JS budget**: total initial JS < 250 KB gz; WebGL lazy-loaded after initial render.
- **Animation properties**: only `transform`, `opacity`, `clip-path`; wave dividers use SVG path `d` morph sparingly (≤ 2 on screen).

## Task list (in priority order per docs/08)

### 3.1 Hero WebGL water + logo reveal + headline
- Create `src/components/webgl/WaterHero.tsx` (R3F plane + ripple/displacement shader with cursor ripples, chromatic offset, caustic noise)
- Gate behind `gsap.matchMedia("(min-width: 1024px)")` + `!reducedMotion` + `!isTouch` + WebGL support check
- Cap DPR at `Math.min(devicePixelRatio, 1.5)`; pause render loop when hero off-screen (IntersectionObserver) and `document.hidden`; `frameloop="demand"` while hidden; dispose on unmount
- Logo reveal: clip-path wipe left→right (wave-shaped edge) on `logo-primary.png`; surfer tilts in (rotate −8°→0, y 20→0, `ease.splash`) then idles (`ease.drift`)
- Headline (SplitText chars): `HOW WET?` `HOW FUN?` slam in with stagger 0.03, Luckiest Guy; Knewave tagline types under it
- Static fallback: `ui/water-bg.jpg` + CSS gradient shimmer (same as Phase 2 hero background)
- **Accept**: lazy load, static fallback renders identically under reduced motion/touch

### 3.2 Preloader water-fill → flood transition
- Navy screen; SPLSH wordmark fills bottom→top (mask + animated wave top edge) with % counter in Bungee
- At 100%: water "floods" up and out (clip-path: circle → full → wipe up), revealing hero
- Runs once per session (`sessionStorage`); repeat visits shortened to 0.6s
- Don't block on heavy assets: wait only for fonts + hero poster image; shader/video load after
- Skippable (click/ESC to skip)
- **Accept**: ≤ 2.5s, skippable, no console errors, content accessible after skip

### 3.3 Logo section sketch→ink scrub reveal (pin #1)
- Stack `<img sketch>` and `<img logo>` in same box; logo has `clip-path: circle(0% at 50% 60%)`
- Scrub scroll reveals finished vector logo over sketch via circular/wave-edged clip-path
- Callout badges (Wave-inspired typography, Surfer integration) pop at 30% / 60% (`ease.splash`)
- **Do NOT alter logo pixels** — only clip-path
- **Desktop only** (`matchMedia`); mobile = static side-by-side
- **Accept**: pin #1 of 2; sketch pixels untouched; scrub smooth at 6× CPU throttle

### 3.4 Offer pinned horizontal scroll (pin #2)
- Pin wrapper with 3 tier panels (Recreational → Adrenaline → Advanced) as horizontal track
- Progress bar = wave line filling
- Each activity blob image floats with Knewave label + hand-drawn arrow drawn on enter (stroke-draw)
- Hover activity (desktop) → blob morph + preview video loop fades inside blob (muted)
- Tap on mobile → same via tap; section degrades to vertical stack < 768px
- Panel backgrounds transition cyan → deeper blue → navy as tiers escalate
- **Accept**: pin #2 of 2; vertical stack mobile fallback; hover video previews muted/loop/playsInline

### 3.5 Post phone tilt + typed caption + heart burst
- Phone/Instagram frame (CSS-built) with post as feed item; 3D tilt following pointer (`motion/react` `useMotionValue`+`useSpring`); disable on touch
- Cyan shards behind, dashed orbit ring slowly rotating
- Caption types out (typewriter) with hashtags highlighted; full text in `aria-label` for screen readers
- Orange heart bubble pops (`ease.splash`) + "like" burst particles on click
- Palette chips + font chips beside frame; callout numbers 01–05 draw in with curly arrows (stroke-draw)
- **Accept**: mobile = static frame with full caption visible; tilt off on touch

### 3.6 Poster cinematic reveal + dusk gradient shift
- Full-height poster scales from 0.85→1 with splash-mask wipe (brush/water clip-path) as section enters
- Slow idle float + pointer tilt
- Background shifts navy → golden dusk with sun-400 radial glow behind poster
- ONLY: poster + palette chips + typography chips — no explanation copy
- Optional kinetic marquee "WET & WILD" behind poster (`aria-hidden`)
- **Accept**: no explanation text; poster + chips only; mobile/static fallback

### 3.7 Custom cursor (desktop), link roll hover, closing "TRY SPLSH" scale + mascot
- Custom cursor (desktop only): dot + ripple ring; scales on interactive; shows "VIEW" over images; hides on touch
- Link hover: text roll (duplicate line slides up)
- Image hover: scale 1.04 + blob morph
- Closing: giant "TRY SPLSH" scales up on scroll; mascot peeks/bobs; "Back to top" = wave rising
- **Accept**: cursor hidden on touch; all hover states keyboard-accessible (focus visible)

## Performance & safety rules (from docs/05)
1. Only animate `transform`/`opacity`/`clip-path`
2. `ScrollTrigger.refresh()` after `document.fonts.ready`; `invalidateOnRefresh` for pinned triggers
3. Cap WebGL DPR at `Math.min(devicePixelRatio, 1.5)`; pause render loop when off-screen / `document.hidden`
4. Videos: `preload="none"`, start on viewport entry, pause on exit
5. `gsap.matchMedia()` variants: desktop `(min-width: 1024px)`, mobile `(max-width: 1023px)`, reduced-motion → fades only (≤ 200ms) or none
6. Kill/revert everything on unmount via `useGSAP`; no global listeners left behind
7. Test at 6× CPU throttle — remove effects, not features, if janky
8. Never `preventDefault` wheel; keyboard/Page Down/anchor links/touch must work

## Validation
- `pnpm lint && pnpm typecheck && pnpm build` green
- Visual QA at 1440 / 1024 / 390 px
- 6× CPU throttle test — no jank
- Reduced-motion mode — all content static & readable
- Mobile (< 768px) — Offer degrades to vertical stack; Logo section static; Post tilt off; cursor hidden
