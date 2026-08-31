---
name: gold-system-approved
description: One gold per theme (dark #F2C94C / light #846300) via the --primary token; per-role gold tiers were built and explicitly rejected.
metadata:
  type: project
---

**Status:** Approved decision (Aug 15, 2026), committed and pushed as part of `fb8b2be`
on `feature/services-page-redesign`.

Spot-checked against `src/styles/globals.css` on 2026-08-31 and confirmed accurate:

- Line 67: `--primary: 45 100% 25.9%;` — `#846300`, the single light-mode gold.
- Line 68: `--primary-foreground: 38 52% 96%;` — `#FAF6EF` cream label.
- Line 102: `--primary: 45.2 86.5% 62.4%;` — `#F2C94C`, the single dark-mode gold.
- Line 103: `--primary-foreground: 226 41% 16%;` — `#1A2238` midnight label.

Every gold role (display emphasis, hero eyebrow, active nav, focus rings, primary CTA
fills, hairlines, badges, icons) resolves from this one `--primary` value per theme.
`.text-brand-gold` resolves to the same values.

**Why:** `#F2C94C` measures 1.47:1 on cream — fails even the 3:1 large-text bar — so it
cannot carry light-mode text at any size. `#846300` is the deepest brand-gold family
member and the only value that satisfies every role simultaneously. Reached after three
rejected intermediate systems: a hue-corrected mustard pair, navy-only light-mode
emphasis, and mixed mustard-text/yellow-button. Dark mode also had a duplicate yellow
(`#F4BC1F`) removed from `--primary`.

**Do not reintroduce:** per-role gold shades, mustard-text-beside-bright-yellow-button,
or navy-filled primary CTAs in light mode (that combination was trialled and rejected —
made the theme read as two systems). Primary CTA hover is `filter: brightness(0.88)` on
the same gold, not a second value.

**One documented exception, not a second gold:** light-mode button *labels* are cream,
not navy, because gold-text-on-cream and navy-label-on-gold have mutually exclusive
luminance requirements (see CLAUDE.md "Gold System" for the math). This is a label-color
carve-out, not a new gold value.

See also [[background-system-approved]], [[claude-md-drift-services-branch]].
