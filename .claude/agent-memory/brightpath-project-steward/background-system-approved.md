---
name: background-system-approved
description: Homepage/Services artwork is meant to be visible (graded, not veiled); .services-rule:not(.services-atmos) exclusion is load-bearing.
metadata:
  type: project
---

**Status:** Approved decision (Aug 15, 2026), committed and pushed as part of `fb8b2be`
on `feature/services-page-redesign`.

Core principle: decorative background artwork on Homepage and Services is part of the
design language and must be clearly perceptible, not faded to a barely-visible texture.
Current production grades, feather percentages (15-17% of section height), and the shift
from section-wide navy washes to localized copy scrims (`--services-copy-scrim`) are all
documented in CLAUDE.md's "Background System" section — treat that as current and
accurate; don't re-derive from scratch, but do re-verify specific numeric values in
`src/styles/globals.css` before quoting them if precision matters, since values could
still shift on this branch.

**Load-bearing CSS structural fact, verified in `src/styles/globals.css` on 2026-08-31:**
line 1585, `.services-rule:not(.services-atmos)::before { ... }`. The `:not()` exclusion
must not be removed. Sections carrying `.services-rule` draw their hairline via
`::before`, but `.services-atmos` sections already use `::before` for the artwork layer
itself. Without the exclusion, the hairline's `height: 1px` beats the artwork's
`inset: 0` and the artwork collapses into a one-pixel strip — this is literally how the
Services backgrounds went invisible once before. Atmosphere sections instead get their
hairline via the `--services-hairline` background layer.

**Architecture distinction to preserve:** Homepage backgrounds are real DOM layers
(`.home-services__art`, `.home-reviews__art` + sibling `__veil` div, swapped at `md` for
portrait/landscape crops). Services backgrounds are pseudo-element based
(`.services-atmos::before` = artwork, `::after` = veil), except the closing CTA which
uses a real DOM layer `.services-cta__art`. Don't collapse these into one pattern without
a specific reason — they were built differently for different needs.

**Do not fade the artwork back** without a specific design reason — this was explicitly
un-done once already (old dark grade `brightness(0.68) saturate(0.58)` removed a third of
luminance and was judged imperceptible).

See also [[gold-system-approved]], [[homepage-visual-system-approved]].
