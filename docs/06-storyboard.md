# 06 · Storyboard — section by section (the build target)

Page order mirrors the task order so graders can tick boxes in sequence. Each section has a Bungee tag with its requirement code.

```
00 Preloader
01 HERO ............................ brand hook + jump links
   ~ wave divider ~
02 MARQUEE ......................... tagline band
03 CONCEPT  [PT#1] ................. story · mission · vision/values · who we serve · owners
04 WHAT WE OFFER [PT#1] ............ sample products/services (pinned horizontal)
   ~ wave divider (light → navy) ~
05 LOGO DESIGN [CT#1] .............. sketch → primary → secondary → palette → typography
   ~ wave divider ~
06 FIRST BRAND POST [CT#2] ......... post · caption · palette · typography
07 PROMO POSTER [CT#3] ............. poster · palette · typography (no explanation)
08 CLOSING / FOOTER ................ TRY SPLSH · contact
```
Fixed UI: Nav (top), SectionIndex (right, 01–06: Concept, Offer, Logo, Post, Poster, Contact), progress wave line, cursor.

---
## 01 HERO
- Layout: full viewport. Water shader bg. Center: primary logo (large). Above logo, tiny Bungee line `BORACAY · PHILIPPINES`.
  Under: Knewave tagline "For those who like it wet." Then giant Luckiest Guy `HOW WET? HOW FUN?` (may sit behind logo as outlined text for depth).
- Bottom: scroll cue (animated wave-arrow) + 4 quick-jump chips: `Concept` `Logo` `Post` `Poster` (this is the grader's map).
- Right/left floating blob photos (jet ski, kite) with parallax; optional 6 s muted video loop in a blob mask.
- Reference: deck slide 1 (logo over water-ripple bg).

## 02 MARQUEE
Two rows, see motion spec C.

## 03 CONCEPT — `01 · BUSINESS CONCEPT · PT#1`
Sub-blocks in this order (each with its own mini-header, consistent):
1. **What is SPLSH?** one sentence + `snorkel-blob.png` (deck slide 2).
2. **Our story (History)** — "How wet? How fun?" Knewave pull-quote + 2 short paragraphs; pinned word-reveal; `banana-boat-beach` wide image at bottom (slide 3).
3. **Mission & Vision** — two cards side by side (Mission left [CONFIRM], Vision right). Below: 6 **Values** stickers.
4. **Who we serve** — Primary / Secondary lists with `who-we-serve.png` (slide 4).
5. **Why choose SPLSH?** — two numbered callouts with `jetski-couple.png` and `parasail.png` (slide 9).
6. **Meet the owners** — 2–N portrait cards with names/roles. If photos missing: show placeholder frames with text "Owner photo coming" — flagged in `docs/DECISIONS.md`.
Keep copy tight: ≤ 40 words per block.

## 04 WHAT WE OFFER — `02 · PRODUCTS & SERVICES · PT#1`
Title card ("What do we offer?") → pinned horizontal track with 3 tier panels (01 Recreational / 02 Adrenaline / 03 Advanced), each with its activity blobs + Knewave labels + arrows as in deck slides 6–8. Hover → video preview. End card: Jet Ski promo teaser "2 for ₱600 — see poster ↓" linking to Poster section (integration!).
Mobile: vertical list of tier sections, 2-column blob grid.

## 05 LOGO DESIGN — `03 · LOGO DESIGN · CT#1`  (navy)
Chapters (sticky left chapter list, content right on desktop; stacked on mobile):
1. **The Sketch** — `logo-sketch.jpg` in a torn-paper style frame; scroll-scrub reveals inked logo (hero moment). Callouts: Wave-inspired typography · Surfer integration.
2. **Primary logo** — `logo-primary.png` huge on navy; callout: navy = depth & strength; cyan = refreshing waters, energy, movement.
3. **Secondary logo** — `logo-secondary.png`; callout: SPL over SH — compact & recognizable.
4. **Color palette** — 3 PaletteChips: Deep Navy #103098 · Cyan/Aqua #00C8E0 · White #FFFFFF (name, hex, RGB, click-to-copy).
5. **Typography** — FontSpecimen ×3–4 (Luckiest Guy, Knewave, Bungee, Poppins) with role labels, + note that the wordmark is custom hand-lettered.
Optional "logo in use" strip: tiny logo on nav, post, poster (cross-link chips jumping to those sections).

## 06 FIRST BRAND POST — `04 · FIRST-EVER BRAND POST · CT#2`
Two-column: left = title "Our first hello" + caption (typed out) + palette chips + font chips; right = phone/IG-frame with `first-brand-post.jpg`, tilt, shards, dashed orbit, heart + camera bubbles. Five numbered annotation badges around the frame (Brand intro / Energetic visuals / Playful personality / Local identity / Social presence) — short (≤ 8 words each).
Caption: **[GAP]**, see `content/content.md` for draft marked CONFIRM.

## 07 PROMO POSTER — `05 · PROMOTIONAL EVENT POSTER · CT#3`
Full-bleed dusk gradient. Title only: `WET & WILD` (as a small tag, not an explanation). Center: poster, 4:5, tilt/float. Beside/below: PaletteChips (#043A84 Navy Blue, #F0B308 Golden Yellow, #F27209 Orange) and type chips (Luckiest Guy — headline, Knewave — supporting). **No descriptive paragraph, no callouts.**

## 08 CLOSING — `06 · LET'S GET WET`
Sunset beach (`story/sunset-beach.jpg`) parallax bg, "FOR THOSE WHO LIKE IT WET, TRY" + logo lockup (deck slide 23), mascot, contact row: www.SPLSH.com · SPLSH@gmail.com · @SPLSH · Boracay Island, Malay, Aklan. Big orange pill "Book a ride" (mailto). Footer microcopy: "© 2026 SPLSH. Brand portfolio project." + team credit line [CONFIRM names/section].

## Transitions between sections
Wave dividers (SVG) whose crest follows scroll velocity; background color eases per the section theming table; the logo mark in nav squishes (scaleY .9→1) at each section change.
