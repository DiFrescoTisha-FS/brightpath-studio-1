# BrightPath Web Studio — Site Updates

**Date:** May 18, 2026

---

## Summary

Added the **AweStruck Intelligence case study** to the portfolio, refactored the case study system to be fully data-driven (so future case studies are a single new data file + register), and fixed a longstanding silent bug where `bg-bp-*` background classes were referenced but never defined in Tailwind.

---

## Part 1: Case Study Architecture — Slug-Driven Router

**Goal:** Turn `/portfolio/:slug` into a real dispatcher so every future case study is one data file + one registry line, with no per-case-study components to write.

### Files Modified

| File | Change |
|------|--------|
| `src/types/caseStudy.ts` | Extended `WebProjectCaseStudy` with optional rich fields (`subtitle`, `heroImage`, `challenge`, `approach`, `engineeringHighlights`, `featureShowcase`, `mobileShowcase`, `performanceMetrics`, `performanceSummary`, `projectSnapshot`, `techStackPills`, `badge`); added `LighthouseMetric`, `SnapshotMetadataItem`, `HighlightItem` shared types; added optional `image?` and `quoteTitle?` to testimonial |
| `src/data/caseStudies/index.ts` | Registered AweStruck; added `webProjectCaseStudies` collection helper |
| `src/pages/CaseStudyPage.tsx` | Wired the `web` case-study type to dispatch to the new `WebProjectCaseStudyPage` (was previously a placeholder) |
| `src/components/portfolio/index.ts` | Exported `WebProjectCaseStudyPage` and `AweStruckCard` |

### Files Created

| File | Purpose |
|------|---------|
| `src/data/caseStudies/awestruckIntelligence.ts` | All AweStruck case study copy + asset paths |
| `src/components/portfolio/WebProjectCaseStudyPage.tsx` | Reusable data-driven page for any `web` case study |
| `src/components/portfolio/AweStruckCard.tsx` | Portfolio grid card with hover image swap |

---

## Part 2: AweStruck Case Study Sections

The case study page now renders, in order:

1. **Hero Header** — title, subtitle, tech tags, live URL button — over a navy gradient overlay
2. **Hero Image** — large cover screenshot of the live site
3. **Project Snapshot** — 4-col metadata grid + 6-item achievements list (reuses `ProjectSnapshot` component with prop-driven data)
4. **The Challenge** — multi-paragraph narrative pulled from `caseStudy.challenge`
5. **My Approach** — multi-paragraph narrative pulled from `caseStudy.approach`
6. **Project Timeline** — 5 numbered phase circles connected by a gradient line, pulled from `caseStudy.process`
7. **Performance Improvements** — Lighthouse before/after (26 → 100), score card side-by-side with screenshot for single-metric case studies
8. **Engineering Highlights** — 4 cards covering the meaty technical work (custom Vite plugin, viewport lazy-loading, deferred analytics, bundle splitting). Shares background with Performance Improvements since they tell the same story.
9. **Features** — 4 cards: AMP Wheel (autoplay video), Josiah's Journey decision cards, Netlify Forms contact modal, custom 404
10. **Built Mobile-First** — 4 phone-frame mocks (Hero, Josiah's Journey, Satellite Overview, CTA) locked to a uniform aspect ratio so different screenshot crops align visually
11. **Gallery** — 4 desktop section screenshots
12. **Tech Stack** — chip row
13. **Testimonial** — Robin's full multi-paragraph endorsement with headshot, supports `quoteTitle` for a card-level heading
14. **Quick-Facts Footer** — client, services, stack, results
15. **CTA** — "Let's build something together" with Start a Project button

### Reusable Component Updates

- `ProjectSnapshot` and `PerformanceResults` (previously hardcoded for Angel City) now accept data via props with Angel City defaults preserved. Both work for Angel City and AweStruck without per-case-study forks.
- `PerformanceResults` detects a single-metric case study (AweStruck has just Mobile) and renders the score card and Lighthouse screenshot side-by-side via `display: contents` on the per-metric wrapper. Multiple metrics still get the original vertical stack.

---

## Part 3: Section Background Alternation (Bug Fix + Visual Polish)

**Discovery:** Both the Angel City case study and the early AweStruck scaffold used class names like `bg-bp-light-bg-light dark:bg-bp-light-bg-dark` and `bg-bp-dark-bg-light dark:bg-bp-dark-bg-dark`. **None of these tokens are defined** in `tailwind.config.js`, `src/styles/globals.css`, or anywhere else in the project. Tailwind silently dropped them, so the entire intended layering system was a no-op — sections rendered transparent and the page looked like one flat color.

### Fix

Replaced all phantom `bg-bp-*` usages in `WebProjectCaseStudyPage.tsx` with real Tailwind utilities and added alternating section backgrounds:

| Sections | Light theme | Dark theme |
|---|---|---|
| Page background | `bg-white` | `bg-[#1A2238]` |
| Hero header gradient overlay | `from-[#1A2238] to-transparent` | `from-[#0F1628] to-transparent` |
| Tinted sections (Snapshot, Approach, Performance, Engineering Highlights, Features, Gallery) | `bg-gray-100` | `bg-[#273442]` |
| Image placeholder containers | `bg-gray-200` | `bg-[#0F1628]` |

The Angel City case study still has phantom `bg-bp-*` classes throughout — visible only as a flat page. Worth refactoring on a future pass.

---

## Part 4: Asset Pipeline

- Created `public/images/case-studies/awestruck/` for case-study-specific assets (hero screenshots, feature screenshots, phone screenshots, Robin's headshot, Lighthouse score image).
- Moved `interactive-wheel.mp4` from `public/images/case-studies/awestruck/` to `public/videos/awestruck-interactive-wheel.mp4` (correct location for media).
- The phone screenshots are stored at full Retina resolution; phone-frame mock display constrains them to a fixed aspect ratio.

---

## Part 5: Component Hygiene

- Extracted `getFeaturedLabel` and `splitFeaturedReviews` from `FeaturedTestimonials.tsx` into a new `featuredTestimonials.utils.ts` to fix the `react-refresh/only-export-components` ESLint warning. Fast Refresh now works cleanly on edits to the testimonial component.

---

## Notes

- No new external dependencies were added.
- All changes pass `npx tsc --noEmit` and ESLint clean.
- The case study system is now ready to scale: adding the next case study (e.g. a follow-up project) is a new data file + one line in `caseStudies/index.ts`.

---

## Known Follow-ups

- AweStruck site itself should link to the case study from its DemoReelSection or About page when Tisha is ready to publish.
- The AMP Wheel feature card video is currently muted (browser autoplay requirement). Optional follow-up: add a "Tap for sound" overlay toggle (~15 lines) if Tisha wants visitors to hear the voiceover.
- Angel City case study refactor — replace its phantom `bg-bp-*` classes with real Tailwind utilities so its section layering actually works.
- Robin testimonial has Robin's name + headshot; could add LinkedIn URL link if she's open to it.
