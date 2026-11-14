# SPLSH Website — AI Context Package

Everything an AI coding assistant needs to build the SPLSH one-page brand portfolio (Awwwards-style, Vercel).

## How to use
1. Install Node 20+ and pnpm. Create the Next.js app as in `docs/03-tech-stack.md`.
2. Copy this package's contents into the project root (`CLAUDE.md`, `AGENTS.md`, `docs/`, `content/`, `prompts/`, `.claude/`, `public/brand/`).
3. Open the project in Claude Code (or Cursor — it reads `AGENTS.md`). First message: *"Read CLAUDE.md and the docs it lists, confirm the non-negotiables, then wait."*
4. Paste prompts from `prompts/phase-prompts.md` one phase at a time (P0 → P6).

## What the team still has to supply  ← do this early
- [ ] **Owner photos + names/roles** (required by the task: "Add pictures of the owners") → `public/brand/owners/`
- [ ] **Mission statement** (deck only has vision & values; a draft is in `content/content.md`)
- [ ] **First-post caption** (not in deck; draft provided)
- [ ] Confirm **first-post palette & typography** (measured from the image; deck doesn't state them) and **logo typography** wording
- [ ] Original **high-res exports** (post 878², poster 864×1080 are the deck's embedded sizes) — drop in with the same filenames
- [ ] Team names / section for footer credit; final domain choice
- [ ] Open the two instructor sample links and note anything that should be matched

## Contents
```
CLAUDE.md / AGENTS.md      master instructions (rules, read order)
docs/01..09                brief+rubric · brand bible · tech stack · design system · motion spec · storyboard · assets · build plan · QA+deploy
content/content.md         all on-page copy, tagged DECK / CONFIRM / GAP
prompts/phase-prompts.md   copy-paste prompts per phase
.claude/skills/            section-builder · motion-recipes · awwwards-qa · asset-pipeline
public/brand/              assets extracted from the PPTX, renamed (logos, sketch, post, poster, products, story, ui)
```
