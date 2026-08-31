---
name: homepage-visual-system-approved
description: Homepage hero/nav/footer/typography direction approved Aug 11-12, committed 7927270; mid-blue header and legacy gradient title rejected/retired on homepage.
metadata:
  type: project
---

**Status:** Approved decision, committed as `7927270` (per CLAUDE.md; not independently
re-verified in this session beyond confirming `7927270` appears in the ancestry implied
by `c04bb8d`/`6834ccc` commit chain in `git log`).

Key locked-in points, treat as baseline before proposing homepage visual changes:

- Left-aligned studio hero layout (copy left, workspace photo right), using
  `public/images/brightpath-hero-image.webp`. Below 1024px the photo becomes a band
  beneath the copy rather than shrinking (portrait-tablet `object-fit: cover` would
  magnify the laptop past a natural crop).
- Dark ground `#0A0F18`, light ground `#FAF6EF` — light is not an inversion of dark;
  image grade, scrim direction, and gold values all differ between themes.
- Header background matches hero (`#0A0F18`). Active nav route = 1px gold hairline the
  width of the label + gold text shift via `NavLink` (also sets `aria-current="page"`).
- **A mid-blue header was trialled against four candidates and explicitly rejected** —
  it broke the midnight/gold/cream palette. Do not re-propose it.
- Section rhythm is artwork-section -> gradient-section (`home-services`/`home-reviews`
  keep artwork; `home-work`/`home-story` are shallow gradients), not the old
  alternating-horizontal-band effect.
- Footer (`site-footer`) is part of the same gradient/hairline system, global across
  every route.
- `BrightPathGradientTitle` gained an `emphasis` prop (`'gradient'` default / `'solid'`
  / `'none'`) — the legacy yellow-to-orange clipped gradient is retired **on the
  homepage only**. Section headings use `'solid'`; card/project titles use `'none'`.

**Known unmigrated debt (per CLAUDE.md, not this branch's problem to fix):** ~60
occurrences of the legacy gradient text remain outside the homepage (ServicesPage,
ContactPage, AboutPage, ReviewsPage, PortfolioDemoPage, SocialMediaPortfolioPage, case
study components), and there is a near-duplicate
`src/components/portfolio/BrightPathGradientTitle.tsx` without the `emphasis` prop. Any
site-wide gradient-retirement rollout has to reconcile both files — flag this if someone
proposes a partial rollout.

See also [[gold-system-approved]], [[background-system-approved]],
[[hero-injection-mirror-fact]].
