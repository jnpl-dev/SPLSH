# 03 · Tech Stack (decision + rationale)

## Decision
| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 16 (App Router) + React 19 + TypeScript (strict)** | First-class Vercel deploy, `next/image` + `next/font` optimization, Turbopack dev, the stack AI assistants know best |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens) + a few hand-written CSS files for complex effects | Fast iteration; tokens live in one place |
| Scroll animation | **GSAP 3 + ScrollTrigger + SplitText** (+ `@gsap/react` `useGSAP`) | Industry standard for Awwwards work. **All GSAP plugins incl. SplitText are now free for commercial use** (confirmed in GSAP 3.15 README, Webflow-sponsored) |
| Smooth scroll | **Lenis** (`lenis`, `lenis/react`) synced to GSAP ticker | The de-facto "buttery scroll" |
| UI / micro-interaction / layout transitions | **Motion** (`motion/react`, formerly Framer Motion) | Hover/tap springs, `layoutId` shared-element transitions, `AnimatePresence`, 3D tilt cards. This is the "Framer-style" feel the team asked for |
| WebGL hero | **three + @react-three/fiber (v9, React 19) + custom GLSL**, lazy-loaded with `next/dynamic({ssr:false})` | Water ripple/refraction distortion reacting to cursor — the signature "wow". Lean alternative: `ogl` (~15 KB) if bundle is tight |
| Icons | `lucide-react` (sparingly) + custom SVG | |
| Fonts | `next/font/google`: Luckiest Guy, Knewave, Bungee, Poppins | Self-hosted, no layout shift |
| Media | `next/image` for stills; `<video>` (mp4 H.264 + webm VP9) for loops; `sharp` + `ffmpeg` for optimization | |
| Package manager | **pnpm** | |
| Lint/format | ESLint (next config) + Prettier + `prettier-plugin-tailwindcss` | |
| Hosting | **Vercel** (Git-connected, preview deploys per branch) | |
| Analytics (optional) | `@vercel/analytics` + `@vercel/speed-insights` | proves performance for the writeup |

### Rejected alternatives (so the AI doesn't re-litigate)
- *Framer / Webflow / Figma Sites:* fastest no-code, but caps on custom shader/scroll control and cannot deliver a code-quality Awwwards submission.
- *Astro / SvelteKit:* great, but weaker AI-assistant fluency for GSAP + R3F combos.
- *Locomotive Scroll / ScrollMagic:* superseded by Lenis + ScrollTrigger.
- *Full-page 3D (Spline embeds):* heavy, hurts LCP and mobile. Use one targeted shader instead.
- *Framer Motion alone for scroll choreography:* fine for UI, but scrubbed timelines, pinning, and SplitText are cleaner in GSAP. **Rule: GSAP owns scroll-driven choreography; Motion owns component/interaction state. Never animate the same property with both.**

> Versions: run `pnpm view next version` etc. at scaffold time and pin what you get; do not hard-code versions from memory.
> Next 16 + Tailwind 4 + React 19 are current as of Nov 2026.

## Scaffold
```bash
pnpm create next-app@latest splsh --ts --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*"
cd splsh
pnpm add gsap @gsap/react lenis motion three @react-three/fiber @react-three/drei lucide-react clsx
pnpm add -D @types/three prettier prettier-plugin-tailwindcss sharp
pnpm add @vercel/analytics @vercel/speed-insights
```
Copy the provided `public/brand/**` folder and `content/`, `docs/`, `.claude/`, `CLAUDE.md` into the project root.

## Folder structure
```
splsh/
├─ CLAUDE.md  AGENTS.md  docs/  prompts/  .claude/skills/
├─ content/
│  ├─ content.md            # human-readable copy source
│  ├─ site.ts               # typed copy consumed by components
│  └─ owners.ts             # [GAP] filled by team
├─ public/
│  ├─ brand/                # SUPPLIED ASSETS — never edit
│  ├─ media/                # videos (mp4/webm) + posters, sourced from the web
│  ├─ textures/             # displacement/noise maps for shader
│  └─ og.jpg                # 1200×630 social image
├─ scripts/optimize-assets.mjs
└─ src/
   ├─ app/ layout.tsx  page.tsx  globals.css  icon.svg
   ├─ components/
   │  ├─ providers/  SmoothScroll.tsx  MotionConfigProvider.tsx
   │  ├─ layout/     Nav.tsx  SectionIndex.tsx  Footer.tsx  Preloader.tsx  Cursor.tsx  WaveDivider.tsx
   │  ├─ sections/   Hero  Marquee  Concept  Owners  Offer  Logo  Post  Poster  Closing
   │  ├─ ui/         Blob  SplitHeading  Reveal  MagneticButton  TiltCard  VideoLoop  PaletteChip  FontSpecimen  Badge
   │  └─ webgl/      WaterHero.tsx  water.frag.ts  water.vert.ts
   ├─ hooks/         useReducedMotion  useMediaQuery  useIsTouch  useInViewVideo
   ├─ lib/           gsap.ts (plugin registration, once)  easing.ts  cn.ts
   └─ styles/        tokens.css  blobs.css
```

## Cross-cutting implementation rules
- Register GSAP plugins **once** in `src/lib/gsap.ts`; import `{ gsap, ScrollTrigger, SplitText }` from there.
- All GSAP code inside `useGSAP(() => {...}, { scope: ref })` so contexts revert on unmount (React strict mode safe).
- Client components only where needed; sections are server components that compose small client islands.
- `ScrollTrigger.matchMedia` / `gsap.matchMedia()` for desktop vs mobile vs reduced-motion variants.
- Always `will-change: transform` sparingly (only on actively animating elements) — remove after.
- Animate `transform` and `opacity` only (plus `clip-path`, `filter` when GPU-cheap). Never `top/left/width/height` on scroll.
- Images: `next/image` with explicit `sizes`; supplied PNG blobs are big → run `pnpm assets` to emit WebP/AVIF siblings.
- Environment: no secrets needed. No backend. Everything static → `output` default is fine on Vercel.
