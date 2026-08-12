# BrightPath Web Studio - Project Context

## Project Overview
Portfolio website for Tisha Di Fresco / BrightPath Web Studio LLC. Built with React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion for animations
- **CMS Integration**: WordPress REST API for some content (flip cards on Services page)
- **Hosting**: Netlify
- **Images**: Cloudinary for optimized delivery
- **Analytics**: GA4
- **Prerendering**: `vite-plugin-prerender` + Puppeteer, 12 static routes (see below)

## Key Design Patterns
- **Theme**: Light/dark mode via `useAppStore` (Zustand)
- **Responsive**: Mobile-first, breakpoints at `md` (768px) and `lg` (1024px)
- **Typography**: Poppins for headings, Lato for body, Open Sans occasionally
- **Colors**: Primary gold (#F2C94C), midnight blue (#1A2238), BrightPath blue
- **Text on mobile**: 14px (`text-sm`) for paragraphs, `leading-normal` for tighter line spacing

## Important Files
- `src/pages/AboutPage.tsx` - Hero with scroll-based grayscale (desktop only), Timeline, Skills, Values, CTA
- `src/pages/HomePage.tsx` - Hero injected via Vite plugin for LCP optimization
- `src/components/ClarityHero.tsx` - Class manifest for static hero (must sync with vite.config.ts)
- `vite.config.ts` - Static hero HTML injection, prerender config, Chrome resolution, build-time verification
- `src/pages/ServicesPage.tsx` - Services, process flip cards, pricing
- `src/pages/PortfolioDemoPage.tsx` - Portfolio grid with case study views
- `src/pages/ContactPage.tsx` - Contact form with Google Apps Script integration + honeypot spam protection
- `src/components/PageMeta.tsx` - Per-route title/description/canonical/OG/JSON-LD; also fires the `prerender-ready` signal
- `src/utils/isPrerender.ts` - `IS_PRERENDER` flag: build-time snapshot vs. real visit
- `netlify.toml` / `public/_headers` - SPA fallback to `/app.html`, `PUPPETEER_CACHE_DIR`, cache rules

## iOS Safari Considerations
- `background-attachment: fixed` doesn't work on iOS - use `md:bg-fixed` instead
- Timeline line/dot hidden on mobile (`hidden md:block`)

## Static Prerendering

12 deterministic routes are rendered to static HTML at build time so crawlers (especially
AI crawlers, which don't run JS) get real content. `/services` and `/reviews` are
**deliberately excluded** — they fetch live data from the Netlify functions behind
`/api/phases` and `/api/reviews`, so a snapshot would bake in stale content.

**Rules to preserve when touching any of this:**

- **Never use `hydrateRoot`.** `main.tsx` always calls `createRoot`, even when `#root`
  contains prerendered markup. A DOM snapshot is not `renderToString` output — it lacks
  the `<!-- -->` text-node separators and `<!--$-->` Suspense markers React 18 requires,
  so hydration always fails (minified errors #418/#423/#425) and React discards the tree
  and client-renders anyway.
- **`/app.html` is the SPA fallback, not `/index.html`.** A `writeBundle` hook copies the
  built shell to `app.html` before the prerenderer overwrites `index.html` with the
  rendered homepage. Falling back to `index.html` would serve homepage content on
  `/services`. Static files win over Netlify's catch-all, so `/about/index.html` is served
  directly.
- **`data-rh="true"` in `index.html` is load-bearing.** It hands those tags to
  react-helmet-async so it *replaces* them instead of appending duplicates. Only tag what
  `PageMeta` always emits — tagging `og:type`/`og:site_name`/`twitter:card` would let
  Helmet delete them.
- **The inline theme script in `index.html` must stay inline** and must not be folded into
  the Zustand store — see the theme note under Known Issues.
- **The prerenderer needs a real Chrome.** Puppeteer's postinstall hook gets suppressed
  (`npm ci --ignore-scripts`, npm allow-scripts gating), so `vite.config.ts` installs the
  browser explicitly at build time and preflights a launch. `PUPPETEER_CACHE_DIR` is set in
  `netlify.toml` so it's cached between deploys.
- **`verifyPrerender` fails the build on purpose** if routes are missing, `#root` is empty,
  metadata is duplicated, or a canonical doesn't match its route. `vite-plugin-prerender`
  swallows its own errors, so this is the only thing standing between a broken prerender
  and a silently un-prerendered deploy. `SKIP_PRERENDER=1` skips prerender *and* the check
  together.
- **Scroll animations need `revealFrom()`.** `whileInView` reveals emit `opacity: 0` into
  the snapshot, which is invisible to crawlers that never scroll. `revealFrom()` in
  `AboutPage.tsx` returns `false` during the snapshot (via `IS_PRERENDER`) so the settled
  state is emitted; visitors still get the animation. Apply the same pattern to any new
  `whileInView` section carrying meaningful copy.

## Recent Session Work (August 8, 2026)

Branch: `test-netlify-prerender`. Verified with a headless-Chrome harness serving `dist/`
the way Netlify does, throttled to 1.6 Mbps / 150 ms.

### Static prerendering (committed)
- `3c4b4cd` — 12 routes prerendered; `data-rh` metadata dedup; `app.html` SPA fallback;
  `verifyPrerender` build gate; inline theme bootstrap. Switched to `createRoot`-always
  after confirming React 18 can't hydrate a DOM snapshot.
- `409f6c0` — Fixed the Netlify build. Root cause was Puppeteer's browser never being
  installed (postinstall hooks suppressed), not the old Puppeteer version. Upgraded
  `puppeteer` 1.20 → 25.5.0 via an `overrides` entry, removed the hardcoded macOS Chrome
  path, install the browser explicitly at build time, added a launch preflight.

### About page performance (`3a1e994`, merged via PR #21 as `c04bb8d`)
- `Mountains.jpeg` 5824×3264 / **7.0 MB → 2560×1435 / 716 KB** (mozjpeg q80). Same
  filename, so no code change. Background is `bg-cover bg-center`, so nothing depends on
  its intrinsic size.
- Portrait `my-profile.png` 349 KB → **`my-profile.webp` 44 KB** (q90, `alphaQuality: 100`;
  35% of its pixels are partially transparent, so alpha had to survive). A lossless PNG
  re-encode came out *larger*, so WebP was the only real saving.
- Removed the portrait's entrance animation — it was the LCP element and the animation
  delayed it twice (snapshot baked `opacity: 0`, then React replayed the fade).
- Added `revealFrom()` + `IS_PRERENDER` so the other 10 scroll reveals emit their settled
  state into the snapshot while visitors keep the animations.
- Fixed the CTA: `<button>` nested inside `<Link>` gave two tab stops and two screen-reader
  announcements. Inner button is now `tabIndex={-1}` + `aria-hidden`, `Link` carries the
  `aria-label`. Needed two optional passthrough props on `BrightPathGradientButton.legacy`.

**Measured on `/about`:** images 7.58 MB → **1.00 MB**; LCP 7868 ms → **4348 ms**;
invisible body text 273/350 words (78%) → **0**. Desktop and mobile screenshots
pixel-identical throughout (maxDelta 0).

### Known issues (deliberately not fixed)
- **Theme pinning**: `initializeTheme()` writes the resolved theme back to `localStorage`,
  so a first visit permanently pins it and a later OS light/dark switch never takes effect.
  Also, `setTheme()` no-ops when the value matches the store default (`'light'`) — which is
  why the inline bootstrap in `index.html` sets `documentElement.className` directly.
- **Image weight elsewhere**: `public/images` is ~116 MB, ~34 files over 1 MB, most
  unreferenced. `/case-study` still ships 10.6 MB (`main_pages1.png` alone is 5.5 MB) with
  no `loading="lazy"` on most images.
- **`/images/*` caching**: falls under the `/*` rule (`max-age=0, must-revalidate`), so
  every navigation revalidates every image. Filenames aren't content-hashed, hence the
  conservative default.
- **Social-media case studies**: `VideoCarousel.tsx` uses mount animations, so whether the
  snapshot catches them mid-fade is a timing race. Only ~10 words of decorative text; left
  alone.

---

## Recent Session Work (June 8, 2026)

### AweStruck Case Study Update
- Updated wording per Robin's feedback:
  - "Biblical SEL" → "Biblically-centered SEL" throughout
  - Introduced AMP wheel as "Biblically-centered SEL wheel (AMP wheel)"
  - Distinguishes AweStruck from other BSEL curriculums

### Commits
- `43d2cf4` — Update AweStruck case study wording per client feedback

---

## Previous Session Work (May 30, 2026)

### About Page Enhancements
- Fixed horizontal overflow on mobile (`overflow-x-hidden`)
- Scroll-based grayscale-to-color hero transition (desktop only via `isMobile` state)
- Mobile shows full color hero immediately
- Fixed "Di Fresco" line break with `whitespace-nowrap`
- Name color changed to gold (`text-primary`) with text shadows for visibility
- Responsive text sizes throughout (14px on mobile)
- Hidden timeline line/dot on mobile
- Added **Skills & Expertise** section (tag cloud of technologies)
- Added **Why Work With Me** section (4 value cards: Vision-Driven, Clear Communication, True Collaboration, Craft & Quality)

### Homepage
- Fixed hero button widths on mobile (removed `w-full`, kept `min-w-[220px]`)

### Portfolio Page
- Increased card spacing on mobile (`gap-10 md:gap-8`)

### Previous Work (May 28, 2026)
- Contact form Google Workspace integration (Apps Script + honeypot)
- Responsive theme-aware backgrounds on Contact and Portfolio pages
- iOS Safari `bg-fixed` fix across all pages
- Services page semi-transparent sections for parallax effect
- AweStruck case study content corrections

## Commit History (Recent)
- `409f6c0` - Fix prerendering for Netlify builds
- `3c4b4cd` - Add static prerendering for key routes
- `5757b6b` - Improve structured data and AI discoverability
- `4a539aa` - Add more spacing between portfolio cards on mobile
- `7bdde08` - Add Skills & Values sections to About page
- `3d9c66a` - Add text shadows to About hero section
- `edc5ad2` - Fix About hero showing grayscale on mobile initial load
- `c74814a` - Fix homepage hero buttons width on mobile
- `2d5e428` - About page mobile fixes + scroll grayscale effect
