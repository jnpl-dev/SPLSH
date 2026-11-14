# 07 · Assets & Media

## A. Supplied assets (extracted from the PPTX) — `/public/brand/**` — USE AS-IS
| File | What | Source slide | Used in |
|------|------|--------------|---------|
| logo/logo-primary.png (789×299) | Primary wordmark, surfer on top | 13–14 | Hero, Nav, Logo §2 |
| logo/logo-primary-alt.png (640×640 canvas) | Primary variant | 9 | Small uses / favicon source |
| logo/logo-primary-hires.png (1129×1129) | Largest primary logo | 1–2 | Hero (hi-res), OG image |
| logo/logo-secondary.png (800×800) | Stacked SPL / SH | 15–16 | Logo §3, favicon, footer |
| sketch/logo-sketch.jpg (799×654) | Pencil sketch | 11–12 | Logo §1 |
| post/first-brand-post.jpg (878×878) | First-ever brand post | 19–20 | Post section |
| poster/wet-and-wild-poster.jpg (864×1080) | Promo poster | 21–23 | Poster section |
| products/*.png (10 files) | Blob-masked activity photos | 6–8 | Offer section |
| story/*.png, *.jpg | Concept/story imagery (snorkel blob, banana boat, who-we-serve, jetski couple, parasail, group, sunset) | 2–4, 9–10, 23 | Concept, Closing |
| mascot/mascot.png | Navy diver mascot (cropped) | 23 | Closing |
| ui/water-bg.jpg | Water-ripple texture | all | Hero shader texture, section bg |
| ui/cloud.png, glow-blob.png, wave-line.png | Decorative bits | misc | Parallax decoration |

⚠ Resolution is moderate (post 878², poster 864×1080). Never upscale past 1.0× DPR display size in layout; cap poster at ≈ 540 px wide on desktop (≈ 2× pixel ratio ceiling) so it stays sharp. Ask the team for original Canva exports (PNG at 2×) and swap files in place with identical names.
⚠ Slide renders crop the poster; the **media file** in `/poster` is the complete, uncropped poster (verified).

## B. Needed from the team **[GAP]** — see root README checklist
Owner portraits + names/roles · mission statement · first-post caption · confirmation of post/logo typography · optional original high-res exports · team/section credit line · final domain/handle.

## C. New media to source from the web (images, video, textures)
Sourcing rules:
1. **Only free-for-commercial-use, no-attribution-required** libraries: **Pexels**, **Mixkit**, **Coverr**, **Pixabay**, **Unsplash**. Re-check the license on each asset page (terms change); log every asset in `docs/ASSET_LOG.md` (file, source URL, author, license, date).
2. **No recognizable private individuals' faces implying endorsement** and no other brands' logos on gear. Prefer wide, action, and silhouette shots.
3. **Never download or embed photos of public figures.**
4. If the AI agent environment cannot reach those sites (network allowlist), it must **stop and output a shot list + exact search queries** for the human to download into `/public/media/raw/` — do not fabricate or hotlink.
5. Do not hotlink remote media in production. Download → optimize → self-host in `/public/media/`.

### Shot list (video loops 4–8 s, 16:9 unless noted, ≤ 2.5 MB each after encode)
| ID | Scene | Search queries | Used in |
|----|-------|----------------|---------|
| V1 | Turquoise sea surface w/ sun glints (hero texture / bg) | "ocean waves sunlight top view", "turquoise water surface" | Hero bg texture |
| V2 | Jet ski spray, action | "jet ski", "jetski ocean" (Mixkit has a jetski collection; Coverr has jetski tag) | Offer: Jet Ski hover |
| V3 | Banana boat / inflatable tube ride | "banana boat", "tube ride sea" | Offer hover |
| V4 | Paddleboard / kayak calm | "stand up paddle board", "kayak clear water" | Offer hover |
| V5 | Kitesurf / windsurf | "kitesurfing", "windsurf" | Offer hover |
| V6 | Parasailing | "parasailing" | Offer hover |
| V7 | Efoil / wingfoil | "hydrofoil", "wing foil", "efoil" (fallback: kitesurf) | Offer hover |
| V8 | Underwater snorkel shimmer, fish | "snorkeling underwater tropical" | Concept / Offer bg |
| V9 | Golden-hour beach drone | "sunset beach drone", "Boracay" | Closing bg / Poster bg |
| V10 | Friends laughing on beach (silhouette/back view OK) | "friends beach laughing" | Concept |
Fallback if a clip is missing: use the supplied still with a slow Ken-Burns (scale 1→1.08, 12 s) — the layout must never depend on a video loading.

### Stills / textures (optional)
- Seamless **water caustics** or **ripple normal map** (512–1024 px) for shader → `/public/textures/`. Generate procedurally in GLSL if no asset available (preferred, zero bytes).
- Subtle **grain** (static PNG 256 px tile, 4 % opacity).
- **Hand-drawn SVG arrows/loops** — draw as inline SVG paths (copy the style visible in deck slides 18–21); don't rasterize.

## D. Optimization pipeline (`pnpm assets`, see skill `splsh-asset-pipeline`)
```bash
# video → mp4 (H.264) + webm (VP9) + poster jpg, 1280w, no audio, ~1.2 Mbps
ffmpeg -i in.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 26 -movflags +faststart out.mp4
ffmpeg -i in.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 out.webm
ffmpeg -i out.mp4 -vframes 1 -q:v 3 out-poster.jpg
# images → webp/avif next to originals (sharp), max width 2000; keep transparent PNG blobs as webp w/ alpha
```
Budget: all videos together ≤ 12 MB; initial page weight (before scroll) ≤ 1.5 MB. Lazy-load everything below the fold.
Vercel/Git note: keep individual files < 50 MB (GitHub warns at 50, blocks at 100). Ours are far below.

## E. Alt text conventions
Logos: "SPLSH logo — wave-lettered wordmark with a surfer on top". Poster: "WET & WILD promotional poster: jet ski, two for 600 pesos." Product blobs: activity name + "in Boracay". Decorative: `alt=""` + `aria-hidden`.
