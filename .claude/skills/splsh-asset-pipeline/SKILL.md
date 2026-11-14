---
name: splsh-asset-pipeline
description: Source, license-log, and optimize web images/videos for the SPLSH site (ffmpeg + sharp), and wire them into VideoLoop/next-image with posters and lazy loading. Use when adding or replacing any photo, video, or texture.
---

# SPLSH Asset Pipeline

## Never touch
`/public/brand/**` is team-supplied. Don't re-encode, resize, or recolor in place. Create optimized siblings in `/public/optimized/brand/` instead (webp/avif) and reference those.

## Sourcing (new media)
1. Check `docs/07-assets-and-media.md` shot list (V1–V10). Search only Pexels / Mixkit / Coverr / Pixabay / Unsplash.
2. Verify license on the asset page: commercial use OK, no attribution required (if attribution is required, add it to the footer credits). Record in `docs/ASSET_LOG.md`: `file | url | author | license | date`.
3. If network is blocked, output the shot list with exact queries and STOP for the human to drop files in `/public/media/raw/`.
4. Skip clips with legible third-party logos or identifiable minors. Prefer bright, saturated, seamless 4–8 s loops.

## Optimize (script `scripts/optimize-assets.mjs`, run `pnpm assets`)
- Videos in `/public/media/raw/*.mp4` →
  `ffmpeg -i in.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 26 -movflags +faststart out.mp4`
  `ffmpeg -i in.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 out.webm`
  poster: `ffmpeg -i out.mp4 -vframes 1 -q:v 3 out-poster.jpg`. Trim to loop point; target ≤ 2.5 MB.
- Images via `sharp`: webp q80 + avif q55, max 2000 px wide; keep alpha.
- Print a table of before/after sizes; fail if any video > 3 MB or total > 12 MB.

## Wiring
```tsx
<video autoPlay={false} muted loop playsInline preload="none" poster="/media/jet-poster.jpg" ref={ref}>
  <source src="/media/jet.webm" type="video/webm" /><source src="/media/jet.mp4" type="video/mp4" />
</video>
```
`useInViewVideo(ref)` plays on enter/pauses on exit. Reduced-motion → show poster only. Always provide still fallback.
