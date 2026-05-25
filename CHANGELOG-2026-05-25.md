# BrightPath Web Studio — Site Updates

**Date:** May 25, 2026
**Covers:** Work landed May 22–25, 2026

---

## Summary

A full case study build for **Bamvsthewrld** end-to-end (data file, slug route, portfolio card, homepage scroll-card), a refresh of the homepage portfolio section to fit four projects side-by-side, full-bleed Cloudinary backgrounds on the homepage Services + Client Testimonials sections (with separate mobile-portrait variants), and a handful of shared web-case-study-page polish fixes (mobile showcase grid, gallery orphan centering, CTA button sizing + arrow direction).

---

## Part 1: Bamvsthewrld Case Study

The site now has a second full-stack web case study alongside AweStruck.

### Data + routing

- **New** `src/data/caseStudies/bamvsthewrld.ts` — full `WebProjectCaseStudy` covering Gavin Di Fresco's MERN music-artist platform: cosmic 3D UI (ThreeJS planetary model), Firebase Google auth, embedded SoundCloud playlist, React-Player YouTube integration, and the interactive audio-enabled image map (clickable planets trigger song playback). Includes overview, goals, deliverables, 5-step process, results, tech stack, project snapshot, challenge + approach narratives, feature showcase, mobile showcase, gallery, and Gavin's testimonial.
- **Updated** `src/data/caseStudies/index.ts` — exports `bamvsthewrldCaseStudy`, registers it in `allCaseStudies` and `webProjectCaseStudies`. Reachable at `/portfolio/bamvsthewrld` via the existing slug router.

### Cloudinary assets

15 Bam assets added to `src/data/cloudinaryAssets.ts` under `brightpath/portfolio/case-studies/bamvsthewrld/`:

- `bamBanner` (1600w) — case study page hero banner
- `bamHeroDesktop`, `bamBioDesktop`, `bamMusicDesktop`, `bamNewDesktop`, `bamThoughtsDesktop` (1200w each) — gallery + feature showcase
- `bamHeroPhone`, `bamBioPhone`, `bamMusicPhone`, `bamNewPhone`, `bamThoughtsPhone` (600w each) — mobile-frame showcase
- `bamStyleTile` (1200w) — brand identity gallery image
- `bamvsthewrldScrollFull` — full-page scroll capture for the homepage portfolio scroll-on-hover card

### Portfolio card

- **New** `src/components/portfolio/BamvsthewrldCard.tsx` — matches the `AweStruckCard` shape with hero → music-player hover swap, FULL-STACK MERN BUILD badge, 3D Cosmic UI / Audio Map / Firebase Auth feature row, and React / Node / Express / MongoDB / Three.js / Firebase pills. Exported from `src/components/portfolio/index.ts`.
- **Updated** `src/pages/PortfolioDemoPage.tsx` — adds `'bamvsthewrld'` to the `ViewState` union and a view branch that mounts `WebProjectCaseStudyPage` with `bamvsthewrldCaseStudy`. The card is added to the grid with `lg:col-start-2` so when it wraps to row 2 it centers under the Dale Tiffany column.

---

## Part 2: Homepage Portfolio Section — 3 → 4 Cards Side by Side

`src/components/PortfolioSection.tsx`:

- Added a 4th `portfolioItems` entry for Bamvsthewrld linking to `/portfolio/bamvsthewrld`.
- Grid changed from `md:grid-cols-3` to `sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8` so all four cards fit in one row on desktop.
- Card image viewport tightened from `h-[400px]` to `h-[240px]` — the scroll captures are tall images and these cards are previews, not full reveals. Hover animation simplified from a per-card formula to a flat `y: '-70%'` shift.
- Card content tightened: `p-6` → `p-4`, title to `text-base`, description to `text-xs leading-snug`. Result: cards no longer feel like billboards, four fit on a 13" laptop without horizontal pressure.
- `gradientWords` list extended with `"Bamvsthewrld"` so the title gradient applies to the new card too.

---

## Part 3: Homepage Backgrounds — Services + Testimonials

Both sections now use full-bleed Cloudinary art-directed backgrounds with separate mobile-portrait variants, so neither composition crops badly on phones.

### `src/pages/HomePage.tsx`

`ServicesSection` and the `#reviews` Testimonials section share the same pattern:

- A `relative` section with two absolutely-positioned background `<div>`s:
  - Mobile bg layer (`md:hidden`) with portrait-oriented image
  - Desktop bg layer (`hidden md:block`) with the wide composition
- Theme picks the right URL pair from `cloudinaryAssets`
- Content sits in a `relative` wrapper above both layers
- Section padding bumped to `py-32 md:py-40` to give the artwork breathing room

### `src/data/cloudinaryAssets.ts`

New asset keys:

- `homepageServicesBgDark` / `homepageServicesBgLight` (1920w)
- `homepageServicesBgDarkMobile` / `homepageServicesBgLightMobile` (1200w)
- `homepageTestimonialsBgDark` / `homepageTestimonialsBgLight` (1920w)
- `homepageTestimonialsBgDarkMobile` / `homepageTestimonialsBgLightMobile` (1200w)

Public IDs live under `brightpath/background-images/` on the `djqw1de3s` cloud.

### ACM screenshot swap

`angelCityHomepage` repointed from `ACM_HOME_1_a2t424` to a fresher capture at `main_pages1_sxuvkv` in the same `brightpath/portfolio/case-studies/acm/` folder.

---

## Part 4: WebProjectCaseStudyPage Polish

Shared by both web case studies (AweStruck + Bam), in `src/components/portfolio/WebProjectCaseStudyPage.tsx`:

### Mobile showcase grid auto-sizes

The phone-frame grid was hardcoded to `md:grid-cols-4`. Bam has 5 phone shots, which dropped the 5th into a lonely row 2. Now the grid switches to `md:grid-cols-5` when there are exactly 5 images and stays on `md:grid-cols-4` otherwise. AweStruck (4 phones) is unaffected.

### Gallery orphan centering

When the `screenshots` count is odd, the last `<figure>` previously sat alone in the left column of a half-empty row. It now spans both columns with a half-width cap and `mx-auto` so it visually centers under the row above. Bam's 5-image gallery (with the style tile last) now centers cleanly; AweStruck's even gallery is unaffected.

### CTA button consistency

The bottom CTA had two visual bugs:

- The ghost "See more work" button rendered noticeably taller than the gradient "Start a project" button. Root cause: the gradient button inherits Shadcn `Button`'s default `h-10`, while the bare ghost button used `py-3` and rendered ~48px tall. Both buttons now share `h-12 px-6 inline-flex items-center` — equal height, no surprises.
- The ghost button's `ArrowLeft` sat on the left of the text and pointed left, so the two buttons' arrows were aimed at each other. Swapped to `ArrowRight` on the right of the text — both arrows now sit on the right and point right.

### Bam-specific feature trim

`bamvsthewrld.ts` originally listed 5 `featureShowcase` items. The "Firebase Login Integration" card had no image and rendered as a sad text-only block in the otherwise image-rich 2-column grid. Removed — leaves 4 cards (Vivid Galactic Experience, Embedded SoundCloud Playlist, Integrated Video Player, Interactive Audio-Enabled Image Map), which also fills the grid evenly.

---

## Part 5: ReviewWidget Padding

`src/components/ReviewWidget.tsx` — added `py-4 sm:py-6 lg:py-10 pt-10` to the widget container so it has breathing room above and below the review cards inside the testimonials section.

---

## Files Changed (Summary)

| File | Change |
|------|--------|
| `src/data/caseStudies/bamvsthewrld.ts` | **New** — full case study data file |
| `src/data/caseStudies/index.ts` | Register Bam in exports + collections |
| `src/components/portfolio/BamvsthewrldCard.tsx` | **New** — portfolio card with hover swap |
| `src/components/portfolio/index.ts` | Export `BamvsthewrldCard` |
| `src/pages/PortfolioDemoPage.tsx` | Add Bam view + grid card with `lg:col-start-2` |
| `src/components/PortfolioSection.tsx` | 3 → 4 cards, `lg:grid-cols-4`, shorter card body |
| `src/data/cloudinaryAssets.ts` | 15 Bam assets + 8 homepage bg variants + ACM swap |
| `src/pages/HomePage.tsx` | Services + Testimonials full-bleed bgs with mobile variants |
| `src/components/portfolio/WebProjectCaseStudyPage.tsx` | Mobile-grid auto-size, gallery orphan centering, CTA equal-height + arrow direction fix |
| `src/components/ReviewWidget.tsx` | Padding around the review grid |
| `CHANGELOG-2026-05-25.md` | This file |

---

## Known Follow-ups

- **AweStruck case study uses local images** for its mobile showcase + gallery (`/images/case-studies/awestruck/*`). Bam's case study runs entirely on Cloudinary. Worth migrating AweStruck for consistency on a slow day.
- **PORTFOLIO-SETUP.md** is still Dale-Tiffany-specific from the original drop. Now that the portfolio system supports four case studies (two web, two social), this doc could be rewritten as a general "how to add a new case study" guide or just deleted.
