# BrightPath Web Studio — Site Updates

**Date:** May 21, 2026
**Covers:** Work landed May 19–21, 2026

---

## Summary

A run of performance, content, and UX improvements: static homepage hero for LCP, Cloudinary migration of the heaviest local images, a dramatically expanded Services page, and a full refresh of the Dale Tiffany social-media case study with current metrics and "launched from zero" framing.

Mobile Lighthouse Performance lifted **69 → 95** across these changes.

---

## Part 1: Homepage Performance — Static Hero + Cloudinary

**Goal:** Cut Largest Contentful Paint from 3.5s to under 1s.

### Static homepage hero injection

The `ClarityHero` "Custom WordPress Websites / That Perform" element was the LCP, but it was waiting ~2.4s for React to boot before rendering. Solution mirrored from the AweStruck site:

- New Vite plugin `brightpath-inject-static-hero` in `vite.config.ts` reads the hero markup and substitutes it into `index.html` at build time, replacing a `<!-- HERO_PLACEHOLDER -->` token.
- `src/components/ClarityHero.tsx` was converted from a real component to a Tailwind class manifest — same classes, never rendered. Sole purpose: Tailwind needs to see the classes to emit them.
- `HomePage.tsx` no longer renders `<ClarityHero />` — `<main>` starts at `<ServicesSection>`.
- A `StaticHeroRouteGate` component in `App.tsx` watches `useLocation` and toggles the static hero's `display` based on `pathname === '/'`. Without this, the static hero stays visible on `/portfolio`, `/about`, etc., making every route look like the homepage.
- Critical inline CSS in `<head>` prevents FOUC: `html`/`body` paint dark immediately, the `lighthouse-silhouette` SVG is hidden until its animation fades it in, and CTA `<a>` defaults are stripped so they don't briefly render as blue underlined links.

### Cloudinary migration

Five local images that totaled ~10 MB of homepage payload moved to Cloudinary delivery with `f_auto/q_auto/dpr_auto`:

- `lh-5.jpeg` (4.6 MB) — BrandStorySection lighthouse photo
- `card-hero.png` (3.4 MB) — AweStruck portfolio scroll card (full-size preserved for hover animation + thumbnail variant for grid)
- `ACM_HOME.png` (1.6 MB) — Angel City Massage homepage
- `DT-LONG.jpg` — Dale Tiffany portfolio scroll
- `lighthouse-gift.png` — gift icon used in Footer / InspiredSection / About

New files:
- `src/utils/cloudinary.ts` — URL builder (`buildCloudinaryUrl`, `buildCloudinaryVideoUrl`). Cloud name from `VITE_CLOUDINARY_CLOUD_NAME` env, falls back to `djqw1de3s`.
- `src/data/cloudinaryAssets.ts` — single source of truth for public IDs and pre-built URLs.

### Cloudinary Dynamic Folders gotcha

First migration attempt produced 404s in production. Root cause: the `djqw1de3s` cloud uses **Dynamic Folders mode**, which makes the folder path part of the public ID. The "Display Name" column in the Media Library list view (e.g. `lh-5_laoadg`) is NOT the public ID — the real public ID is `brightpath/home-page/lh-5_laoadg`. Recovered by right-clicking each asset and copying its full URL, then parsing the path after `/v{timestamp}/`.

---

## Part 2: Services Page — 7 Sections Instead of 1

`/services` previously rendered just the FlipCard process grid. Expanded into a real services page:

1. **Hero** — "Services Built to Perform" headline with lighthouse parallax background and dark overlay
2. **What I Build** — 4 service cards: Website Modernization, Performance Optimization, Custom Front-End Development, Social Media Strategy & Content
3. **Our Process** — existing FlipCardContainer kept intact; now has a defensive `Array.isArray` guard and a friendly fallback message if the WordPress endpoint returns garbage (which can happen on `vite dev` without Netlify's redirects)
4. **What's Included With Every Project** — 6 standards: Mobile-First Responsive Design, Performance Optimization, SEO Foundations, Accessibility Standards, Analytics Integration, Documentation & Handoff
5. **Tech Stack** — 13 tools as styled chips
6. **Maintenance Plans** — $100/month flat-rate card with feature list mirroring the AweStruck handoff packet
7. **CTA** — closing call to `/contact`

Sections alternate between lighthouse parallax (hero, process, CTA) and tinted/plain solids (the rest) for visual rhythm.

---

## Part 3: Dale Tiffany Social Case Study — Full Refresh

### Cloudinary migration

16 case-study assets moved to Cloudinary (7 post images + 9 reel-and-thumbnail pairs). Source files (raw `.png` / `.jpg` / `.mov`) get delivered as AVIF/WebP/MP4 with smart quality automatically — no manual pre-optimization needed.

Position 9 reel was left untouched per request. Local files in `public/social-media/dale-tiffany/` for the migrated assets can be removed in a future cleanup pass.

### Metrics + narrative refresh

- Reporting window updated to **Apr 20 – May 19, 2026** (was Oct 17 – Jan 14)
- Quick-impact stats refreshed: 68 posts, 2.98K impressions, 199 likes, 11 new followers, 38 comments
- `platforms` array now includes `linkedin` (Tisha posted 10 times there in May)
- Overview rewritten around the **launched-from-zero** angle — Tisha built Dale Tiffany's social media presence from scratch (no prior Facebook, Instagram, LinkedIn, or TikTok), so the early-stage growth metrics read as a successful program launch instead of routine maintenance
- `results` array expanded with per-platform breakdowns (Facebook 36 / Instagram 22 / LinkedIn 10), Instagram Post Reach +92.29% MoM highlight, and follower-source detail
- `strategySummary`, `campaignPeriod`, and `postFrequency` aligned with the launch framing

### Light-theme hero gradient fix

`SocialMediaCaseStudyPage`'s hero bottom-edge gradient previously faded to `to-background/95` — which is near-pure white in light theme, washing out the hero image. Changed to `to-black/70 dark:to-background/95` so light theme stays dark at the fade-out, while dark theme keeps the original blend.

---

## Files Changed (Summary)

| File | Change |
|------|--------|
| `vite.config.ts` | Added `brightpath-inject-static-hero` plugin |
| `index.html` | Added `<!-- HERO_PLACEHOLDER -->` + critical inline CSS for FOUC prevention |
| `src/App.tsx` | Added `StaticHeroRouteGate` route-aware hider |
| `src/components/ClarityHero.tsx` | Converted to Tailwind class manifest |
| `src/pages/HomePage.tsx` | Dropped `<ClarityHero />` render |
| `src/pages/ServicesPage.tsx` | Expanded from 1 section to 7; added defensive array guard |
| `src/utils/cloudinary.ts` | New — Cloudinary URL builder |
| `src/data/cloudinaryAssets.ts` | New — public ID registry + pre-built URLs |
| `src/data/caseStudies/daleTiffanySocial.ts` | Cloudinary swaps, metrics refresh, overview rewrite, "launched from zero" framing |
| `src/components/portfolio/SocialMediaCaseStudyPage.tsx` | Light-theme hero gradient fix |
| Multiple component files | Image references swapped from local paths to `cloudinaryAssets` |

---

## Known Follow-ups

- **Phase 2 Dale Tiffany migration** — 13 reel/post entries still reference local files in `public/social-media/dale-tiffany/`. The 146 MB folder can shrink dramatically once those are migrated to Cloudinary (assets already exist there under `dale-tiffany/` folder).
- **`fetchPriority` React warning** — minor case-sensitivity nag on an `<img>` somewhere; not blocking, hasn't been chased down yet.
- **Local images** that are no longer referenced (`lh-5.jpeg`, `card-hero.png`, `ACM_HOME.png`, `DT-LONG.jpg`, `lighthouse-gift.png`) were deleted from `public/images/`. Original PNGs still live in Cloudinary if ever needed.
