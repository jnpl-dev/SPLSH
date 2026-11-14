# 05 · Motion Spec

Philosophy: **water physics** — things ease like liquid: fast start, long soft settle, slight overshoot on playful elements, and
everything reacts to scroll *velocity*. Choreography must reinforce the narrative, not decorate. One hero moment per section.

## Global setup (copy exactly)
```ts
// src/components/providers/SmoothScroll.tsx  ("use client")
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as any).__lenis = lenis; // allow anchor nav: lenis.scrollTo('#offer', {offset:-80, duration:1.6})
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```
```ts
// src/lib/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
export { gsap, ScrollTrigger, SplitText, useGSAP };
```
(If `(window as any)` violates lint, type a global `Window` augmentation instead.)

## Easing tokens (`src/lib/easing.ts`)
| Token | Value | Use |
|-------|-------|-----|
| `ease.liquid` | `power3.out` / CSS `cubic-bezier(.22,1,.36,1)` | reveals, entrances |
| `ease.swell` | `power2.inOut` | pins, horizontal moves |
| `ease.splash` | `back.out(1.7)` | badges, buttons, stickers |
| `ease.drift` | `sine.inOut` | idle floating loops (±12px, 6–9 s, yoyo) |
Durations: micro 0.25 · reveal 0.9 · section 1.2–1.6 · idle 6–9.

## Motion catalogue (what to build, where)
### A. Preloader (≤ 2.5 s, skippable)
Navy screen; the SPLSH wordmark fills bottom→top like a rising water level (mask + animated wave top edge) with a % counter in Bungee;
at 100 % the water "floods" up and out (clip-path: circle → full → wipe up), revealing hero. Runs once per session (`sessionStorage`); on repeat visits shortened to 0.6 s.
Don't block on heavy assets: wait only for fonts + hero poster image; shader/video load after.

### B. Hero
- **WebGL water**: fullscreen plane showing `ui/water-bg.jpg` (+ optional looping sea video texture) with a ripple/displacement shader:
  cursor creates expanding ring ripples (ping-pong or simple array of 8 ripple origins with time decay), chromatic offset at ripple edges, subtle caustic noise.
  Touch/low-power/reduced-motion → static image + CSS gradient shimmer.
- **Logo reveal:** `logo-primary.png` letters appear via clip-path wipe left→right (wave-shaped edge) while the surfer tilts in (rotate −8°→0, y 20→0, `ease.splash`) and then idles (`ease.drift`).
- **Headline** (SplitText chars): `HOW WET?` `HOW FUN?` slam in with stagger 0.03, Luckiest Guy; Knewave tagline types in under it.
- **Scroll-out**: hero scrubs — logo scales 1→0.6 and rises, ripples intensify, a big wave SVG sweeps up from bottom as transition into Concept.
- Floating parallax cut-outs (cloud, wave-line, mascot hint) at 3 depths (`yPercent` ±15/30/50 scrubbed).
- Magnetic CTA: "Explore the brand ↓" + "Book a ride" (orange).

### C. Marquee band
`FOR THOSE WHO LIKE IT WET ✺ HOW WET? HOW FUN? ✺ BORACAY` — Luckiest Guy outlined/solid alternating. Speed reacts to `lenis.velocity`; skewX −6…6° by velocity. Two rows opposite directions.

### D. Concept (PT#1)
- Pinned statement (one of max 3 pins): the brand-story paragraph reveals **word-by-word opacity .15→1** scrubbed, with blob photos (`snorkel-blob`, `friends-banana`) drifting at different parallax speeds around it.
- Mission / Vision: two big cards; on enter, vision text splits-lines reveal; values appear as 6 pill "stickers" that pop with `ease.splash` staggered and then float (`ease.drift`, random phase). Hover = tilt + color flood (cyan→navy).
- Who-we-serve: two columns (Primary / Secondary), list items slide in; banana-boat photo clip-path `inset(100% 0 0 0)→inset(0)`.
- Owners: portrait cards with blob mask; on hover mask morphs and name tag springs up; subtle parallax on image inside frame (scale 1.15→1).
- Count-up on any numerals (10 activities · 3 levels · 1 island).

### E. Offer / Products (PT#1 sample services)
**Pinned horizontal scroll** (pin #2): 3 panels = 3 tiers (Recreational → Adrenaline → Advanced). Inside, each activity blob image floats with its Knewave label + hand-drawn arrow that draws on enter.
Progress bar = wave line filling. Hovering an activity (desktop) → blob morph + preview **video loop** fades in inside the blob (muted). Tap on mobile → same via tap, and the section degrades to a vertical stack (no pin) < 768 px.
Panel backgrounds transition cyan → deeper blue → navy as tiers escalate (communicates difficulty).

### F. Logo design (CT#1) — navy "deep" section
Chapter strip: `01 Sketch → 02 Primary → 03 Secondary → 04 Palette → 05 Typography`.
- **Sketch → logo morph (hero moment, pin #3):** the pencil sketch photo is shown; scrubbing scroll reveals the finished vector logo over it via a circular/wave-edged clip-path (so the logo "inks in" on top of the sketch). Callout badges (Wave-inspired typography, Surfer integration) pop at 30 % / 60 %.
- Primary logo: floats, slight 3D tilt on pointer; palette swatches slide out from behind it.
- Secondary logo: rotates in from the primary (crossfade + rotate/scale) with "SPL over SH" annotation.
- Palette: 3 large tiles with water-fill animation on hover; click copies hex (toast "Copied #103098").
- Typography: specimen cards for Luckiest Guy / Knewave / Bungee / Poppins; type-on-path wave animation, hover swaps the sample text live.

### G. First Brand Post (CT#2)
Phone/Instagram frame (CSS-built, no third-party logos) with the post as a feed item; 3D tilt following pointer (Motion `useMotionValue`+`useSpring`), cyan shards behind, dashed orbit ring slowly rotating, orange heart bubble pops with `ease.splash` and "like" burst particles on click; camera bubble.
Caption **types out** (typewriter) with hashtags highlighted. Palette chips + font chips orbit/sit beside. Callout numbers 01–05 draw in with curly arrows (stroke-draw).

### H. Promotional Poster (CT#3)
Cinematic reveal: full-height poster scales from 0.85→1 with a splash-mask wipe (brush/water clip-path) as section enters; slow idle float + pointer tilt; background shifts navy → golden dusk with sun-400 radial glow behind the poster. 
ONLY: poster + palette chips (#043A84, #F0B308, #F27209) + typography chips (Luckiest Guy, Knewave). **No explanation copy.** Optional kinetic marquee "WET & WILD" behind poster (decorative, `aria-hidden`).

### I. Closing / Footer
Sunset beach background with parallax; giant "TRY SPLSH" scales up on scroll; mascot peeks/bobs; contact links with magnetic hover; "Back to top" = a wave rising. Marquee of tagline.

### J. Persistent UI motion
- Nav hides on scroll down / shows on up; active anchor underlined by a traveling wave.
- SectionIndex dot fills as sections become active (ScrollTrigger `onToggle`).
- Custom cursor (desktop): dot + ripple ring; scales on interactive; shows "VIEW" over images; hides on touch.
- Link hover: text roll (duplicate line slides up).
- Image hover: scale 1.04 + blob morph.
- Page-wide: grain overlay (very subtle, 4 % opacity, static PNG/SVG noise — **not** animated).

## Performance & safety rules
1. Only animate `transform`, `opacity`, `clip-path`; wave dividers use SVG path `d` morph sparingly (≤ 2 on screen).
2. `ScrollTrigger.refresh()` after fonts + images load (`document.fonts.ready`); use `invalidateOnRefresh` for pinned/measured triggers.
3. Cap WebGL DPR at `Math.min(devicePixelRatio, 1.5)`; pause the render loop when the hero is off-screen (IntersectionObserver) and when `document.hidden`.
4. Videos: `preload="none"`, start on viewport entry, pause on exit (`useInViewVideo`).
5. `gsap.matchMedia()` — `(min-width: 1024px)` full choreography; `(max-width: 1023px)` simplified (no pin, no cursor, lighter parallax); `(prefers-reduced-motion: reduce)` → no scrub, no loops, fades only (≤ 200 ms) or none.
6. Kill/revert everything on unmount via `useGSAP`; no global listeners left behind.
7. Test on a throttled CPU (6× slowdown) — scrolling must stay smooth; if not, remove effects, not features.
8. Never hijack native scroll semantic: keyboard, Page Down, anchor links, and touch must still work. Don't `preventDefault` wheel.
