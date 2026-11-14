# 04 · Design System

Concept name: **"The Dive"** — the page is a scroll-driven journey from sun-lit surface to the deep: light, airy water-white at the top
→ cyan shallows (offer) → navy deep (logo/brand craft) → golden-hour finale (poster + CTA). Section backgrounds shift accordingly,
which gives the "Design Flow" criterion a visible, logical gradient.

## Color tokens (only these)
```css
@theme {
  /* Brand (from deck) */
  --color-navy-900: #0A1D63;   /* deepest text/bg, from deck UI */
  --color-navy-700: #103098;   /* LOGO Deep Navy — primary brand */
  --color-navy-600: #11379D;
  --color-poster-navy: #043A84;/* poster navy — use ONLY inside poster palette chips & poster-section accents */
  --color-cyan-500: #00C8E0;   /* LOGO Cyan/Aqua */
  --color-cyan-200: #BFE9F4;
  --color-aqua-50:  #E6F9FD;   /* pale aqua surface */
  --color-white:    #FFFFFF;
  --color-sun-400:  #F0B308;   /* Golden Yellow (poster) */
  --color-orange-500:#F27209;  /* Orange (poster) — CTA & hearts */
  --color-mist-300: #B7C7D8;
  --color-water-bg: #F7FBFC;   /* page base (matches water texture) */
}
```
Usage ratio ≈ **60** white/aqua · **25** navy · **10** cyan · **5** orange/yellow (CTAs, sparks, hover states).
Contrast: navy-700/900 on white/aqua ≥ 7:1 ✔ · white on navy ✔ · **never** white on cyan for body text (use navy). Orange for large text/UI only.

### Section theming
| Section | Background | Text | Accent |
|---------|-----------|------|--------|
| Hero | water texture + shader | navy-900 | cyan, orange CTA |
| Concept | water-bg → aqua-50 | navy-900 | cyan |
| Offer | cyan-gradient → navy | white | orange/yellow tags |
| Logo | navy-900 | white | cyan |
| Post | aqua-50 → white | navy-900 | cyan, orange heart |
| Poster | gradient navy → golden dusk | white | sun-400, orange-500 |
| Closing | sunset photo + navy overlay | white | orange |

## Typography (all Google Fonts via `next/font`)
| Role | Font | Use | Notes |
|------|------|-----|-------|
| Display / impact | **Luckiest Guy** | Hero statement words, section giant numerals, poster chip | uppercase, tight leading 0.9, tracking 0 |
| Brush accent | **Knewave** | Handwritten callouts, taglines, "How wet? How fun?", annotations, arrows labels | never for paragraphs; rotate −3°…+3° |
| Label / block | **Bungee** | Section tags (`CT#1 · LOGO DESIGN`), nav, buttons, numerals | uppercase, tracking 0.04em, 12–14 px |
| UI / body | **Poppins** (300/400/500/600) | Paragraphs, captions | 16–18 px / 1.6 |
Fluid scale (clamp): `display-xl 12vw/0.85` · `display-l clamp(3rem,8vw,7rem)` · `h2 clamp(2rem,5vw,4rem)` · `h3 1.5rem` · `body 1.0625rem` · `label 0.75rem`.
Max 3 font families visible in one viewport.

## Shape language
- **Blobs:** organic, asymmetric rounded masks (supplied images are pre-masked). For new imagery use SVG `clipPath` blobs from `styles/blobs.css` (4 variants) — morph between variants on hover (GSAP MorphSVG is free now, or CSS `border-radius` 8-value morph).
- **Waves:** every section boundary is an animated SVG wave divider (2 layers, cyan + navy, parallaxed sine). Echoes the logo's "S" wave.
- **Shards:** cyan right-angled shards behind tilted post/poster frames (as in the deck).
- **Badges:** navy circle with Bungee numeral (01/02/03) + small label. Reuse everywhere for annotation.
- **Hand-drawn arrows/loops:** SVG paths in navy, drawn on scroll (stroke-dashoffset).
- **Radii:** 24 px cards, 999 px pills. **Shadows:** soft blue-tinted `0 30px 80px -20px rgba(16,48,152,.35)`.

## Layout
- 12-col grid, 1440 design width, container `min(1280px, 100% - 2*clamp(16px,4vw,64px))`.
- Section vertical padding `clamp(96px, 14vh, 200px)`.
- Section header pattern (identical everywhere → clarity): `[Bungee tag: 01 — CONCEPT · PT#1]` + display title + 1-line lede + wave underline draw.
- Breakpoints: 390 / 768 / 1024 / 1440 / 1920. Test all.

## Components (build once, reuse)
`Nav` (logo mark left, 5 anchors, "Book a ride" pill right; hides on scroll-down, shows on scroll-up) ·
`SectionIndex` (fixed right: dots 01–06 w/ labels on hover, active highlighted, + thin scroll-progress wave line) ·
`Preloader` · `Cursor` (desktop only; navy dot → cyan "ripple" ring that expands on hover, label "VIEW"/"DRAG") ·
`MagneticButton` · `SplitHeading` (SplitText lines/chars reveal) · `Reveal` (fade-up wrapper) · `Blob` · `TiltCard` ·
`VideoLoop` · `PaletteChip` (swatch + name + hex + click-to-copy toast) · `FontSpecimen` (font name rendered in itself, "Aa", alphabet, weights) ·
`WaveDivider` · `Marquee` (velocity-reactive, skews with scroll speed).

## Imagery & video art direction
Bright, saturated, sun-drenched Boracay: turquoise water, white sand, orange life vests, yellow inflatables. Joyful faces, spray, motion blur. No dull stock offices. Video = short (4–8 s), seamless loops, muted: jet ski spray, banana boat slap on waves, kitesurf, underwater snorkel shimmer, drone sunset beach.
