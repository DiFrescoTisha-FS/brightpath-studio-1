# BrightPath Web Studio — Site Updates

**Date:** August 15, 2026

---

## Summary

Background artwork on the Homepage and Services page was made clearly visible in both
themes, and the gold system was consolidated to **one gold per theme**. Primary CTAs now
use their theme's gold as the fill. Several pre-existing contrast failures were corrected
along the way. No layout, copy, typography or component structure changed.

---

## Part 1: Background artwork visibility

The decorative artwork behind the Homepage and Services sections had been graded and veiled
so heavily that it read as a barely-perceptible texture. It is now a visible part of the
design while still sitting behind the content.

### What changed

- **Dark-mode grading eased.** The previous `brightness(0.68) saturate(0.58)` treatment
  removed a third of the luminance and over 40% of the colour before any overlay landed.
- **Light mode is now graded deliberately** rather than left at `filter: none`.
- **Edge feathers shortened** from 26–30% of section height to 15–17%, roughly doubling the
  clear middle band while keeping section joins seamless.
- **Section-wide navy washes reduced** in favour of localized scrims sized to the heading
  and lede, so readability no longer costs the whole background.

### Section fixes

- **Tech Stack** had three independent reductions stacked in the same place — a mask
  confining the artwork to the bottom edge, an opacity multiplier, and the veil painting
  solid ground colour at exactly that edge. Corrected so the artwork peaks mid-section.
- **Our Process** artwork was anchored so the compass rose is no longer sliced against the
  section boundary.
- **Homepage Services on mobile** was reframed so the artwork carries through the section
  instead of disappearing below the top third.

Verified in headless Chrome at 1440px and 390px in both themes, including a row-to-row
luminance scan confirming no hard image edges at section joins.

---

## Part 2: One gold per theme

The site had accumulated several near-identical golds — brand gold, a separate Tailwind
`--primary` yellow, and a role-based light-mode pair for display versus small text. Each
theme now has exactly one gold, set on the `--primary` token so every gold role resolves
from a single value.

| Theme | Gold | Label on a gold fill |
|---|---|---|
| Dark | `#F2C94C` | `#1A2238` midnight |
| Light | `#846300` | `#FAF6EF` cream |

The deeper light-mode gold is intentional: the luminous brand gold measures 1.47:1 on the
warm cream ground and cannot carry text at any size. The deeper value is an approved part
of the light-theme identity.

Dark mode also lost a second yellow — `--primary` had been `#F4BC1F` alongside `#F2C94C`.

---

## Part 3: Primary CTA colour

Primary CTAs now use their own theme's gold as the fill, so buttons and emphasis text read
as one system. Light-mode CTAs previously appeared as bright-yellow blocks beside deeper
gold typography. Size, padding, shape, typography and behaviour are unchanged — colour only.

---

## Part 4: Accessibility corrections

- Homepage services lede was measuring 4.03:1 on cream, below the 4.5:1 bar for normal
  text; it now uses the established accessible body treatment.
- Every `text-primary` label on light grounds (portfolio, case studies, social media,
  "Illuminating Success") was measuring 1.54–1.74:1 and now passes.
- Flip-card light back face: midnight type on the theme gold measured 2.83:1 and is now
  cream.

All contrast was measured against the actual rendered backdrop rather than the stylesheet,
which is how the artwork- and scrim-affected cases were caught.

### Final measurements

- Light gold text: **4.73–5.58:1**
- Light gold CTA fill with cream label: **5.18:1** (hover 4.76:1)
- Dark gold emphasis text: **11.10–12.39:1**
- Dark gold fill with midnight label: **10.13:1**

---

## Explored but not adopted

- **Metallic gold gradient.** A six-stop "signature gold" gradient was built and tested on
  real BrightPath typography. It reads well on navy but fails badly on cream — the luminous
  highlight becomes the lowest-contrast region (1.27:1) — and its appearance changes with
  element width, so short words and multi-line headings render as different materials. Not
  adopted; the test harness lives outside the repo.
- **Parallax.** Discussed and scoped but not implemented.

---

## Files changed

- `src/styles/globals.css` — gold tokens, background grading/feathers/scrims, CTA colour
- `src/components/ui/FlipCard/FlipCard.css` — light back face and border accents
- `src/pages/HomePage.tsx` — services lede colour class (accessibility correction)
