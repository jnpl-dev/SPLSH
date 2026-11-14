# 09 · QA Gates & Vercel Deployment

## QA gates (all must pass before submitting)
### Rubric gate
- [ ] PT#1: mission ✔ vision ✔ owners (photos) ✔ history ✔ sample products/services ✔
- [ ] CT#1: process (sketch→primary→secondary) ✔ palette ✔ typography ✔
- [ ] CT#2: post ✔ palette ✔ typography ✔ caption ✔
- [ ] CT#3: poster ✔ palette ✔ typography ✔ — **and no explanatory text**
- [ ] Brand assets unmodified (diff file hashes of `/public/brand/**` against originals)
- [ ] Cohesion: same tokens/fonts/shapes across all four components; cross-links present
- [ ] A first-time viewer can say what the page contains after 5 s of scrolling

### Visual / layout gate
- [ ] 1920, 1440, 1024, 768, 390 px: no overlap, no horizontal scroll, no orphaned headings
- [ ] Max one headline style per section; no more than 3 font families in any viewport
- [ ] Whitespace consistent (section padding tokens); no walls of text (≤ 40 words per block)

### Motion gate
- [ ] 60 fps scroll on a mid laptop; at 6× CPU throttle still usable
- [ ] ≤ 3 pinned sections; no scroll-jank when pins release; anchor links land accurately after pins (use `ScrollTrigger.refresh` + Lenis `scrollTo`)
- [ ] `prefers-reduced-motion` → static, fully readable, no WebGL, no marquee motion
- [ ] Mobile (real device): no cursor FX, no hover-dependent content, no 100vh toolbar jump (use `100svh`/`dvh`)
- [ ] Preloader ≤ 2.5 s, skippable, doesn't re-run on anchor nav

### Performance gate (Lighthouse, production build, mobile + desktop)
- [ ] Desktop Performance ≥ 90, Mobile ≥ 75 (heavy WebGL pages: do not trade away content)
- [ ] LCP < 2.5 s · CLS < 0.05 · INP < 200 ms · initial JS < 250 KB gz
- [ ] Videos lazy, posters present, total video ≤ 12 MB, images via `next/image` with `sizes`

### Accessibility / SEO gate
- [ ] Lighthouse a11y ≥ 95; keyboard-only tour works; visible focus; skip link
- [ ] Contrast ≥ 4.5:1 body, ≥ 3:1 large text; alt text everywhere; `lang="en"`; one `<h1>`
- [ ] Title, description, OG/Twitter image, favicon, theme-color (`#103098`)
- [ ] No console errors/warnings; no 404s in Network tab

## Vercel deployment
1. `git init` → push to GitHub (private or public).
2. vercel.com → **Add New → Project → Import** the repo. Framework preset auto-detects Next.js; build `pnpm build`, install `pnpm install`. No env vars required.
3. Every push to a branch gets a **Preview URL**; `main` → **Production**. Review previews on a phone before merging.
4. Optional CLI path: `pnpm dlx vercel` (preview) · `pnpm dlx vercel --prod`.
5. Project Settings → Domains: use the free `*.vercel.app` URL, rename the project to something short like `splsh` → `https://splsh.vercel.app` (if free). Custom domain optional.
6. Enable Vercel **Analytics** + **Speed Insights** (optional, free tier) for numbers to cite.
7. Verify in an incognito window on mobile data. Submit **only** the production URL.
8. Rollback plan: Vercel → Deployments → promote previous deployment.

### Common pitfalls to pre-empt
- Hydration mismatch from random values in render (use `useEffect`/refs for random float phases).
- ScrollTrigger positions wrong after fonts/images load → `document.fonts.ready.then(ScrollTrigger.refresh)` and set explicit image dimensions.
- `window`/`document` in server components → mark islands `"use client"`; WebGL via `dynamic(..., { ssr:false })`.
- Lenis + pinned sections: pin with `pinType: "transform"` only if needed; otherwise default; set `anticipatePin: 1`.
- Large PNGs in `/public/brand` (3 MB water blob etc.) → serve via `next/image` (auto-optimizes on Vercel).
- Safari: test `clip-path` animations, `backdrop-filter`, and WebGL context loss.
