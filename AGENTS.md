# SPLSH — Brand Portfolio Website (Awwwards-grade, one page)

You are building the one-page brand portfolio website for **SPLSH**, a Boracay water-adventure brand
("For those who like it wet."). Deployed on **Vercel**. This file is your entry point: read it fully,
then read the docs it points to **before writing code**.

## Mission of the build
A graded school project (100 pts) that must ALSO feel like an Awwwards Site-of-the-Day candidate.
Rubric: Integration of PT1+CT1+CT2+CT3 = 30 · Layout = 25 · Visual appeal = 25 · Design flow = 20.
**Wow factor never beats clarity**: a grader must understand the page structure in seconds.
Full rubric mapping: `docs/01-brief-and-rubric.md`.

## Read order (do not skip)
1. `docs/01-brief-and-rubric.md` — what is required, what is graded
2. `docs/02-brand-bible.md` — facts, palettes, fonts extracted from the team's PowerPoint (SOURCE OF TRUTH)
3. `docs/03-tech-stack.md` — stack, versions, install commands, folder structure
4. `docs/04-design-system.md` — tokens, type scale, components
5. `docs/05-motion-spec.md` — every animation, easing, timing, performance rules
6. `docs/06-storyboard.md` — section-by-section scroll narrative (the build target)
7. `docs/07-assets-and-media.md` — asset manifest, video sourcing, optimization
8. `docs/08-build-plan.md` — phased checklist; work phase by phase, tick boxes as you go
9. `docs/09-qa-deploy.md` — QA gates and Vercel deployment
10. `content/content.md` — all on-page copy, with `[CONFIRM]` markers for team-supplied facts

Project skills live in `.claude/skills/` (section builder, motion recipes, awwwards QA, asset pipeline).
Kickoff prompts per phase: `prompts/phase-prompts.md`.

## Non-negotiable rules
1. **Brand-supplied assets are used AS-IS.** Never redraw, recolor, re-typeset, crop-distort, or "improve":
   logos, sketch, first brand post, promotional poster (`/public/brand/**`). Display them; animate their
   *containers*, not their pixels. (Subtle tilt / parallax / reveal clip-paths are fine.)
2. **Palette & fonts come only from `docs/04-design-system.md`.** No new brand colors. Neutrals are derived from navy.
3. **One page.** Single route `/`. Sections are anchors. No router transitions needed.
4. **Required sections must exist, be labeled, and appear in this order** (see storyboard):
   Concept (mission, vision, owners, history, products/services) → Logo (process, palette, typography) →
   First Brand Post (post, palette, typography, caption) → Promo Poster (poster, palette, typography — **no explanation text**).
5. **Never invent facts about the team.** Owners' names/photos, mission wording, post caption and post
   typography that are marked `[CONFIRM]` stay as visible-but-clearly-placeholder until the team supplies them.
   Do not use stock photos of fake "owners".
6. **Accessibility & resilience:** honor `prefers-reduced-motion`; all motion degrades to static, readable layout;
   no content is reachable only via hover; alt text on every image; semantic landmarks; keyboard focus visible.
7. **Performance budget:** LCP < 2.5 s on throttled 4G, CLS < 0.05, total initial JS < 250 KB gz (WebGL lazy-loaded),
   videos muted/loop/playsInline/lazy, ≤ 2.5 MB each, poster frame required. Details in `docs/05` and `docs/09`.
8. **Preloader ≤ 2.5 s** and skippable. A grader should never wait on a loader.
9. **Scroll feel:** Lenis smooth scroll synced with GSAP ScrollTrigger. Pin sparingly (max 3 pinned sections).
   Never trap scroll. Always show a section index/progress indicator (supports "Design Flow" points).
10. Mobile is first-class (≥ 360 px). Desktop is the hero experience. Touch devices get simplified motion (no cursor effects).
11. TypeScript strict. No `any`. Components small, typed, co-located with their styles. No unused deps.
12. Keep copy concise ("If the content is too wordy, summarize it" — task requirement).

## Working agreements
- Before each phase: restate the phase goal and acceptance criteria from `docs/08-build-plan.md`.
- After each phase: run `pnpm lint && pnpm build`, view the page at 1440 / 1024 / 390 px, fix, then tick the checklist.
- Prefer composition of existing primitives in `src/components/ui` over bespoke one-offs.
- When a requirement is ambiguous, choose the option that most helps a grader scanning for the 4 required components, and note it in `docs/DECISIONS.md`.
- Commit small, conventional commits (`feat:`, `fix:`, `perf:`, `chore:`).

## Commands
```bash
pnpm dev        # local dev (Turbopack)
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
pnpm build      # production build — must pass before every commit to main
pnpm assets     # optimize images/videos (see .claude/skills/splsh-asset-pipeline)
```
