# 01 · Brief & Rubric

## What the school task requires (from task.md)
A **brand portfolio website**, one-page UI design, published online, submitted as **link only**.
Tool is free choice (Canva/Figma suggested) → we are hand-coding with Next.js and publishing on Vercel.
Sample outputs given by instructor: https://tinyurl.com/5ffwux6m · https://tinyurl.com/2zvsdfb4
(Open both before designing; note layout length, section labeling, how much text they use.)

### Required content
| # | Component | Must show | Notes |
|---|-----------|-----------|-------|
| PT#1 | Business Concept Development | Mission · Vision · **Owners (pictures)** · History · Sample products/services | Summarize if wordy |
| CT#1 | Logo Design | Design **process** · Color palette · Typography | Sketch → vector → primary → secondary |
| CT#2 | First-Ever Brand Post | The post · its palette · its typography · **the caption** | Caption is not in the PPTX → team must supply |
| CT#3 | Promotional Event Poster | The poster · its palette · its typography | **NO explanation text** |

## Rubric → how this build earns the points
| Criterion | Pts | What graders look for | Our design response |
|-----------|-----|------------------------|---------------------|
| Integration of PTs & CTs | 30 | All four components work together as ONE brand | One continuous "dive" narrative; shared tokens; the logo's wave shape is the section-divider motif; the same blob masks, cyan/navy/orange accents everywhere; each section carries a small tag `PT#1 / CT#1 / CT#2 / CT#3` mapped to a plain-language label; poster & post reuse logo + tagline from the Logo section (cross-links like "Meet the logo →") |
| Layout | 25 | Clean, organized, no clutter | 12-col grid, generous whitespace, max 1 idea per viewport, consistent section header pattern (index · title · 1-line lede), strict type scale |
| Visual appeal | 25 | Eye-catching, balanced, effective color/fonts/images | Navy/cyan/white base + orange/yellow sparks; display fonts only for headlines; real Boracay imagery; WebGL water hero; parallax; blob-masked photography |
| Design flow | 20 | Logical order; structure obvious | Sticky section index + scroll progress; order mirrors task order; wave dividers; "scroll" cue; footer CTA closes the loop |

## Grader-experience checklist (design for the person scoring it)
- Opening viewport shows: logo, tagline, and a visible way to jump to the 4 required parts.
- Every required component is findable within one click from the nav.
- Loader short; motion never blocks reading; nothing breaks on a school laptop (integrated GPU) or phone.
- The published URL works without login, on first load, with no console errors.
- Poster section = image + palette + type chips ONLY.
- Owners section has real photos (team supplies). Until then use a clearly labeled placeholder frame.

## Out of scope
Multi-page routing, CMS, auth, real booking/checkout. A "Book a ride" button may deep-link to contact (mailto) only.
