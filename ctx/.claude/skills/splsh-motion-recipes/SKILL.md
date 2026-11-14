---
name: splsh-motion-recipes
description: Copy-paste GSAP/ScrollTrigger/Lenis/Motion recipes for the SPLSH site — reveals, parallax, pinned horizontal scroll, scrubbed clip-path reveal, marquee, tilt, typewriter, wave divider, and reduced-motion handling. Use when adding any animation.
---

# SPLSH Motion Recipes
Always import from `@/lib/gsap`; wrap in `useGSAP(() => {...}, { scope })`; use `gsap.matchMedia()` for responsive/reduced-motion. Animate transform/opacity/clip-path only.

## Responsive + reduced-motion wrapper
```ts
const mm = gsap.matchMedia();
mm.add({
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile:  "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  reduce:  "(prefers-reduced-motion: reduce)",
}, (ctx) => {
  const { desktop, mobile, reduce } = ctx.conditions!;
  if (reduce) return;           // content stays static & visible
  /* build timelines */
});
```
## 1. Split heading reveal
```ts
const split = SplitText.create(el, { type: "lines,chars", mask: "lines" });
gsap.from(split.chars, { yPercent: 110, duration: .9, ease: "power3.out", stagger: .025,
  scrollTrigger: { trigger: el, start: "top 85%", once: true } });
```
## 2. Fade-up (use a single shared batch)
```ts
ScrollTrigger.batch(".reveal", { start: "top 88%", once: true,
  onEnter: els => gsap.fromTo(els, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, ease: "power3.out", stagger: .08 }) });
```
## 3. Parallax (scrubbed, per layer via data-speed)
```ts
gsap.utils.toArray<HTMLElement>("[data-speed]").forEach(el => {
  gsap.to(el, { yPercent: (parseFloat(el.dataset.speed!) - 1) * 100, ease: "none",
    scrollTrigger: { trigger: el.closest("section"), start: "top bottom", end: "bottom top", scrub: true } });
});
```
## 4. Word-by-word scrub reveal (story)
```ts
const s = SplitText.create(p, { type: "words" });
gsap.fromTo(s.words, { opacity: .15 }, { opacity: 1, stagger: .05, ease: "none",
  scrollTrigger: { trigger: p, start: "top 75%", end: "bottom 40%", scrub: true } });
```
## 5. Pinned horizontal scroll (Offer)
```ts
const track = trackRef.current!;
gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: "none",
  scrollTrigger: { trigger: wrapRef.current, pin: true, scrub: 1, anticipatePin: 1,
    end: () => "+=" + (track.scrollWidth - window.innerWidth), invalidateOnRefresh: true } });
```
(Desktop only inside `matchMedia`; mobile = vertical stack.)
## 6. Sketch → ink reveal (Logo hero moment)
Stack `<img sketch>` and `<img logo>` in same box; logo has `clip-path: circle(0% at 50% 60%)`.
```ts
gsap.timeline({ scrollTrigger: { trigger: box, pin: true, scrub: .8, start: "top top", end: "+=120%" } })
  .to(logoImg, { clipPath: "circle(75% at 50% 60%)", ease: "none" }, 0)
  .from(".callout-1", { scale: 0, autoAlpha: 0, ease: "back.out(1.7)" }, .3)
  .from(".callout-2", { scale: 0, autoAlpha: 0, ease: "back.out(1.7)" }, .6);
```
Do NOT alter the logo pixels; only the clip-path.
## 7. Stroke-draw (hand-drawn arrows, wave underline)
```ts
const len = path.getTotalLength(); gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", scrollTrigger: { trigger: path, start: "top 85%" } });
```
## 8. Velocity marquee
```ts
const loop = gsap.to(inner, { xPercent: -50, repeat: -1, ease: "none", duration: 25 });
ScrollTrigger.create({ onUpdate: s => {
  const v = s.getVelocity();
  gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(v)/300, 4) * Math.sign(s.direction), duration: .3, overwrite: true });
  gsap.to(inner, { skewX: gsap.utils.clamp(-6, 6, v/-300), duration: .4, overwrite: "auto" });
}});
```
## 9. 3D tilt card (Motion)
```tsx
const x = useMotionValue(0), y = useMotionValue(0);
const rx = useSpring(useTransform(y, [-.5,.5], [10,-10]), { stiffness: 150, damping: 15 });
const ry = useSpring(useTransform(x, [-.5,.5], [-10,10]), { stiffness: 150, damping: 15 });
<motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
  onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left)/r.width-.5); y.set((e.clientY-r.top)/r.height-.5); }}
  onPointerLeave={() => { x.set(0); y.set(0); }} />
```
Disable on touch (`useIsTouch`).
## 10. Typewriter (caption)
Animate a counter with GSAP `to(obj, {n: text.length, duration: 3, ease: "none", onUpdate})` and render `text.slice(0, Math.floor(obj.n))`; keep full text in `aria-label` for screen readers.
## 11. Wave divider (SVG)
Two `<path>` layers with `d` of a sine; translate `x` −50% on infinite loop at different speeds (cheap), crest amplitude scaled by scroll velocity via `scaleY`. No path morphing per frame.
## 12. Anchor navigation
`window.__lenis.scrollTo("#logo", { offset: -80, duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) })` — never `scrollIntoView` while Lenis is active.
## 13. Hero water shader (R3F, lazy)
- `dynamic(() => import("@/components/webgl/WaterHero"), { ssr: false })`, render only if `!reduced && !isTouch && webglSupported`.
- Uniforms: `uTime`, `uTex` (water-bg), `uMouse`, `uRipples[8] (vec3: x,y,startTime)`, `uRes`.
- Fragment: sample texture at `uv + normalize(dir)*amp*sin(dist*freq - age*speed)*exp(-age*2)` summed over ripples; add low-frequency noise caustic; slight RGB split on ripple crest.
- Pause via IntersectionObserver; `frameloop="demand"` while hidden; `dpr={[1,1.5]}`; dispose on unmount.
