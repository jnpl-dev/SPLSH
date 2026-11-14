---
name: splsh-awwwards-qa
description: Review the SPLSH site against the school rubric (Integration 30, Layout 25, Visual 25, Flow 20) and Awwwards-style criteria (design, usability, creativity, content), then output a prioritized fix list. Use after each phase and before submission.
---

# SPLSH Awwwards + Rubric QA

## Procedure
1. `pnpm build && pnpm start`; open with Playwright (or the browser tool) at 1440×900, 1024×768, 390×844. Take viewport screenshots while scrolling every ~800 px.
2. Score each criterion 0–10 using the questions below, cite evidence (screenshot/section), list **top 5 fixes ranked by points gained per effort**.
3. Run Lighthouse (desktop+mobile) and record numbers. Check console errors and Network 404s.
4. Re-read `CLAUDE.md` non-negotiables; flag any violation (esp. modified brand assets, missing required items, explanation text in poster section).

## Rubric questions
**Integration (30):** Are mission, vision, owners (photos), history, products all present? Logo process + palette + typography? Post + palette + type + caption? Poster + palette + type, with no explanation? Do they read as ONE brand (shared tokens, cross-links, wave motif)?
**Layout (25):** One idea per viewport? Consistent section header? Spacing scale respected? Any clutter, text walls, overlaps, orphan lines, misaligned grid? Mobile ok?
**Visual appeal (25):** Strong first viewport? Color ratio 60/25/10/5? Fonts used by role only? Imagery vivid and sharp (no blurry upscales)? Motion supports story and is not excessive?
**Design flow (20):** Does the order match the task order? Is there always a "you are here" cue (index + progress)? Are transitions between sections logical (light→deep→golden hour)? Can a viewer jump to any required part in one click?

## Awwwards lens (secondary)
Design (40 %) · Usability (30 %) · Creativity (20 %) · Content (10 %). Ask: What's the single memorable moment? (Answer: water-ripple hero + sketch→ink logo.) Is there a delightful micro-interaction every 2 screens? Is nothing broken or slow?

## Output format
Table: Criterion | Score/10 | Evidence | Fix. Then "Top 5 fixes", "Blockers", "Lighthouse numbers". Be blunt; do not inflate scores.
