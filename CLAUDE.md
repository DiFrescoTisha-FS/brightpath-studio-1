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
- **Colors**: Midnight blue `#1A2238`, near-black ground `#0A0F18`, warm cream ground
  `#FAF6EF`. **One gold per theme** — dark `#F2C94C`, light `#846300`. Both are driven
  by the `--primary` token so every gold role resolves from a single value. See
  "Gold System" below; do not reintroduce per-role gold shades.
- **Text on mobile**: 14px (`text-sm`) for paragraphs, `leading-normal` for tighter line spacing

## Important Files
- `src/pages/AboutPage.tsx` - Hero with scroll-based grayscale (desktop only), Timeline, Skills, Values, CTA
- `src/pages/HomePage.tsx` - Hero injected via Vite plugin for LCP optimization; also wires
  the section background classes (`home-services`, `home-reviews`, `home-story`)
- `src/components/ClarityHero.tsx` - Structural mirror of the static hero. NOT a Tailwind
  class manifest any more — the hero uses dedicated CSS classes, so nothing here is
  load-bearing for purging. Keep it in step with the markup in vite.config.ts
- `src/styles/globals.css` - Carries the whole approved visual system: the `--primary`
  gold token per theme, `.studio-hero*`, `.studio-cta*`, `.nav-link*` / `.nav-cta`,
  `.home-*` homepage backgrounds, `.services-*` / `.services-atmos*` Services
  backgrounds, `.site-footer`, `.text-brand-gold`
- `src/components/ui/FlipCard/FlipCard.css` - Flip-card faces. The light back face uses
  the light theme gold and overrides the markup's hard-coded `text-[#10192b]` to cream,
  because midnight type measures only 2.83:1 on that gold
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

## Homepage Visual System (approved — treat as the baseline)

Completed and approved across Aug 11–12, 2026; committed as `7927270`. The homepage is
the visual reference for the rest of the site. Don't redesign any of it without agreeing
the change first.

**Hero.** Left-aligned studio layout: copy left, workspace photograph right. The photo is
`public/images/brightpath-hero-image.webp` (96 KB, 1672×941) — the production asset. The
current approved treatment uses it as-is; visual blending is handled in CSS via a
two-gradient `mask-image` plus a scrim, so the left edge dissolves into the ground and the
top/bottom soften. Below 1024px the composition *recomposes* — the photo becomes a band
beneath the copy rather than shrinking, because a portrait-tablet side panel makes
`object-fit: cover` magnify the laptop past a natural crop.

**Theme grounds.** Dark: near-black `#0A0F18`. Light: warm cream `#FAF6EF`. Light is not an
inversion of dark — the image grade, scrim direction and gold values all differ.

**Header / nav / CTAs.** Header background matches the hero at `#0A0F18`. Active route is a
1px gold hairline the width of the label plus a gold text shift, via `NavLink` (which also
sets `aria-current="page"`). Browser-default blue focus rings are replaced by palette rings.
The hero secondary stays a text link with a pseudo-element rule. A mid-blue header was
trialled against four candidates and **rejected** — it broke the midnight/gold/cream
palette. Don't re-propose it. CTA colour is covered under "Gold System" below.

**Section backgrounds.** The alternating horizontal-band effect is gone. Artwork sections
(`home-services`, `home-reviews`) keep their original artwork, graded in CSS via `filter` and
feathered into the ground at both edges. Flat-slab sections (`home-work`, `home-story`) became
shallow gradients that lift a few values mid-section, each opening with a faded gold hairline.
The rhythm is artwork-section → gradient-section, so sections stay distinguishable through
artwork and depth rather than colour steps. Grading and feather values were revised on
Aug 15 — see "Background System" below for the current numbers.

**Footer.** `site-footer` is part of the same system: a gradient that deepens toward the
bottom (so the page reads as closing out, not banding), with the same hairline instead of the
old grey `border-t`. It's global, so this treatment appears on every route.

**Typography emphasis.** The legacy yellow→orange clipped gradient is retired *on the
homepage*. `BrightPathGradientTitle` gained an optional `emphasis` prop:
`'gradient'` (default — every other call site is unaffected), `'solid'` (one theme-aware gold
via `.text-brand-gold`), `'none'` (no emphasis at all). `'none'` exists because omitting
`gradientWords` makes the component gradient the *entire* title. Section headings use
`'solid'`; service-card and project titles use `'none'`, leaving the gold icon and the
Featured badge as each card's accent. In light mode the emphasis word *is* still gold, so
`'solid'` continues to produce a visible shift in both themes.

## Gold System (approved Aug 15, 2026 — ONE GOLD PER THEME)

**This is the rule: each theme has exactly one gold, used for every gold role.** Do not
create per-role shades (display gold vs. small-text gold vs. button gold) to optimise
individual elements. Visual consistency beats per-element optimisation. Both values are
set on the `--primary` token, so `bg-primary` / `text-primary` / `border-primary` and every
opacity modifier resolve from the single value automatically.

| Theme | Gold | Token | Label on a gold fill |
|---|---|---|---|
| Dark | **`#F2C94C`** | `--primary: 45.2 86.5% 62.4%` | `#1A2238` (10.13:1) |
| Light | **`#846300`** | `--primary: 45 100% 25.9%` | `#FAF6EF` cream (5.18:1) |

`.text-brand-gold` resolves to `#846300` (base) and `#F2C94C` under `html.dark`.

**Both golds cover the same roles**: display emphasis text, section emphasis words, hero
eyebrow, active nav label + indicator hairline, focus rings, primary CTA fills, gold
borders, section hairlines, card and pill accents, icons, footer brand treatments, badges.

**Why light mode is a deeper mustard, and why that is deliberate.** `#F2C94C` measures
**1.47:1** on cream — it misses even the 3:1 large-text bar by half, so it cannot carry
light-mode text at any size. `#846300` is the deepest member of the brand gold family and
the only value that satisfies *every* role at once. It is an approved part of the light
identity, not a fallback.

**Do not reintroduce** any of: mustard text alongside bright-yellow buttons; separate
display-gold and small-text-gold tiers (`#9E6E04`/`#8C6103`, or the hue-corrected
`#A27B00`/`#846300` pair); navy-only emphasis across light mode; or several near-identical
golds. All of these were built and rejected during Aug 15.

**Primary CTAs use their theme's gold as the fill.** Light mode must **not** revert to
navy-filled primary CTAs — that combination was trialled and rejected, because deep-gold
emphasis text beside a bright-yellow or navy button made the theme read as two systems.
Hover darkens the same gold with `filter: brightness(0.88)` rather than declaring a second
value.

**The one unavoidable exception, and it is a label colour, not a second gold.** A light gold
fill cannot carry a navy label: `#1A2238` on `#846300` is 2.83:1. The constraints are
mutually exclusive — gold *text* on cream needs luminance ≤ 0.1666, a navy label on gold
needs ≥ 0.2492 (even black needs ≥ 0.175). So light-mode button labels are cream. Two
consequences follow from the same fact: the flip-card light back face overrides its
hard-coded `text-[#10192b]` to cream, and `html.light h1.text-primary` (the About hero name,
which sits on a *dark* photograph even in light mode) keeps `#F2C94C`, since a dark ground
takes the luminous value.

## Background System (approved Aug 15, 2026)

**Principle: the artwork is part of the design language and must be clearly perceptible —
not reduced to a barely-visible texture.** It still sits behind the content hierarchy, but
do not fade it back without a specific design reason.

**Grades (current production values).**

```css
html.dark  .home-services__art,
html.dark  .services-atmos::before { filter: brightness(0.9)   saturate(0.82) contrast(1.12); }
html.dark  .home-reviews__art,
html.dark  .services-cta__art      { filter: brightness(0.87)  saturate(0.8)  contrast(1.11); }
html.light .home-services__art,
html.light .home-reviews__art,
html.light .services-atmos::before { filter: brightness(0.955) saturate(1.18); }
```

The old dark grade was `brightness(0.68) saturate(0.58)`, which removed a third of the
luminance and over 40% of the colour *before* any overlay landed; that is what made the
artwork imperceptible. **Light mode is now deliberately graded** — it used to be
`filter: none`, on the theory that cream-keyed artwork needed no help, but the artwork's own
low contrast against cream was the entire limit.

**Light grading must use `brightness`, not `contrast`.** The light artwork is near-white
with linework only a few values below the cream ground, so a contrast lift clips it all to
pure white. A trial at `contrast(1.14)` erased the topographic lines completely, dropping the
share of the section carrying visible artwork from 95% to 2%.

**Feathers.** Edge ramps end at **15–17%** of section height (they were 26–30%), which
roughly doubles the clear middle band. They still reach full ground colour at the boundary,
which is what keeps section joins seamless — shorten further only with measurement.

**Section-wide washes → localized copy protection.** The full-coverage diagonal navy dropped
from `0.34 / 0.10 / 0.36` alpha to `0.20 / 0.04 / 0.22`. Readability is bought instead with
`--services-copy-scrim`, an ellipse sized to the heading/lede block. Cards carry their own
surfaces and need no protection.

**Per-section fixes that must not regress:**

- **Tech Stack** had three reductions stacked in one place — a mask confining the artwork to
  the bottom edge, an `opacity: 0.62` multiplier, *and* the veil painting solid ground colour
  at exactly that edge. The `opacity` is gone and the mask now peaks mid-section
  (`background-size: 118% auto; background-position: center 62%`).
- **Our Process** artwork is `background-size: auto max(92%, 42.5vw); background-position:
  right top`. The previous fixed `-199px` lift sliced the compass rose against the section
  boundary. It is top-anchored so the rose stays whole; the heading is protected by a scrim
  centred on the heading line rather than by masking the artwork away.
- **Homepage Services on mobile** is reframed to `background-size: 165% auto;
  background-position: 24% 46%` (below `md`). At plain `cover` the portrait artwork put all
  its interest in the top third and read as having run out.

**Architecture — the two pages differ, keep the distinction.**

- **Homepage** uses real DOM layers: `.home-services__art` / `.home-reviews__art` (two each,
  swapped at `md` for portrait vs. landscape crops) plus a sibling `__veil` div.
- **Services** is pseudo-element based: `.services-atmos::before` is the artwork,
  `::after` is the veil, with the hairline riding as `::after`'s first background layer.
  The closing CTA is the exception and uses a real DOM layer, `.services-cta__art`.

**`.services-rule:not(.services-atmos)::before` — do not remove the exclusion.** Sections
carrying `.services-rule` draw their hairline with `::before`, but `.services-atmos` sections
already use `::before` for artwork. Without the `:not()`, the hairline's `height: 1px` wins
over the artwork's `inset: 0` and the artwork paints into a one-pixel strip — which is how
the Services backgrounds went invisible once before. Atmosphere sections get the same
hairline via the `--services-hairline` background layer instead.

**Atmosphere glows stay luminous in both themes.** The gold radial pools inside the veils and
scrims (`home-story`, `services-cta__scrim`, `services-atmos--build/process`) use
`rgba(242, 201, 76, …)` even in light mode. They are atmospheric light within the background
system, not UI gold, and are deliberately exempt from the one-gold-per-theme rule.

## Accessibility (conclusions from Aug 15 testing)

- **Measure against the actual rendered backdrop**, not the stylesheet — especially where
  artwork or scrims sit behind copy. Sampling the rendered pixels is how the light-mode
  homepage lede was found at 4.03:1 and how the "Process" heading was caught at 2.90:1.
- Two measurement traps that produced wrong answers during this work, both worth avoiding:
  hiding an element with `visibility: hidden` to sample its backdrop also removes *its own
  background* (this made a passing button look like a 1.22:1 failure); and a near-black
  coverage mask collides with the `#0A0F18` ground.
- **Thresholds**: normal text ≥ 4.5:1; large display text (≥24px, or ≥18.66px bold) ≥ 3:1;
  UI component boundaries and focus indicators ≥ 3:1. Purely decorative marks — hairlines,
  glows, aria-hidden icons beside a visible label — carry no requirement.
- **`#F2C94C` is excellent on navy (12.09:1) and unusable as text on cream (1.47:1).** That
  single fact is why the light theme has its own gold.
- Final light-mode measurements, worth keeping as a regression guard: gold text
  **4.73–5.58:1**; gold CTA fill with cream label **5.18:1** (hover 4.76:1); CTA boundary vs
  cream **5.18:1**. Dark-mode gold emphasis **11.10–12.39:1**; gold fill with midnight label
  **10.13:1**.
- Fixed during this pass: the homepage services lede (4.03:1 → passing, now uses
  `.services-body`), and every `text-primary` label on light grounds (was 1.54–1.74:1).

## Metallic Gold Gradient — EXPERIMENT ONLY, not production

A "signature gold gradient" was built and tested against real BrightPath typography, then
**not adopted**. Do not assume it is part of the design system.

```css
linear-gradient(110deg, #B8860B 0%, #D4AF37 22%, #F2C94C 46%,
                        #FFD966 54%, #D4AF37 67%, #A97C00 100%)
```

Findings: attractive on large dark-mode display type and strong on navy (min **5.16:1**,
max 14.04:1). On cream it fails badly — min **1.27:1** — and the limiting region is the
`#FFD966` highlight itself, so the very thing that reads as polished metal is the lowest-
contrast part. It also scales with the element box, not the type: the gradient line runs
399px across the hero accent but only 79px across "Beacon" at 390px wide, so the same
declaration reads as several different materials. Short words compress the ramp; multi-line
headings run the axis diagonally across the whole block and colour each line differently.

The test harness lives **outside the repo** in the session scratchpad. Keep it there.

## Parallax — discussed, NOT implemented

No **scroll-transform** parallax exists, and none was built on Aug 15. Note the separate,
older thing that does exist: `md:bg-fixed` (`background-attachment: fixed`) still ships on
AboutPage, ContactPage, PortfolioDemoPage and MultiPageFlowSection — desktop-only, because
it doesn't work on iOS. That is attachment-based, predates the current artwork system, and
is not on the Homepage or Services page.

If transform parallax is explored later, the two strongest candidates are
**Homepage Reviews** (`.home-reviews__art`) and the **Services CTA** (`.services-cta__art`),
because both are real DOM layers that can be transformed independently of their veils — the
`.services-atmos::before` pseudo-elements already carry tuned `transform`/`background-position`
maths and are poor candidates.

If implemented: subtle `translate3d` only, rAF-throttled passive scroll listener, gated behind
`prefers-reduced-motion: reduce`, disabled below `md` unless testing proves otherwise, and
**never `background-attachment: fixed`** (it does not work on iOS — see iOS Safari notes).

## Current Approved Visual State (as of August 15, 2026)

Do not reopen these without a specific reason:

- Homepage background visibility — **approved**
- Services background visibility — **approved**
- Light-mode background visibility — **approved**
- Dark-mode background visibility — **approved**
- Background clipping/cutoff issues from this pass (sliced compass rose, Tech Stack stacking,
  mobile Services framing) — **resolved**
- Light and dark gold systems (one gold per theme) — **approved**
- Primary CTA colour coordination with each theme's gold — **approved**
- Typography, layout, copy and component structure — **not intentionally redesigned** in this
  pass; the only type change was a colour correction to the homepage services lede
- Metallic gradient — **not production**
- Parallax — **not implemented**

## Recent Session Work (August 15, 2026) — approved, not yet committed

Branch `feature/services-page-redesign`. Background visibility pass plus the gold-system
consolidation. Detail lives in "Gold System", "Background System", "Accessibility" and
"Current Approved Visual State" above — this is just the shape of the session.

- **Backgrounds made visible.** Dark grade eased, light grade introduced, feathers shortened,
  section-wide washes cut in favour of localized copy scrims. Tech Stack, Our Process and
  mobile Homepage Services each had a specific geometry bug fixed. Verified with a headless
  Chrome harness measuring artwork contribution per section × theme × viewport, plus a
  row-to-row luminance scan confirming no hard section seams.
- **Gold consolidated to one value per theme.** Reached after three rejected intermediate
  systems: hue-corrected mustard pair, navy-only light emphasis, and mixed
  mustard-text/yellow-button. Dark also lost a second yellow — `--primary` was `#F4BC1F`
  alongside `#F2C94C` and is now brand gold, verified by a pixel diff whose `maxDelta` was
  exactly 45, the distance between those two colours.
- **Accessibility fixes carried along**: homepage services lede, all `text-primary` labels on
  light grounds, and the flip-card light back face.
- **Not adopted**: metallic gradient (experiment, outside the repo), parallax (not built).

## Recent Session Work (August 11–12, 2026)

### Homepage redesign — complete and approved (`7927270`)
Hero, header/nav/CTA, full light/dark background system, footer integration and typography
emphasis. Detail in "Homepage Visual System" above. Verified per pass with a headless-Chrome
harness at 1440px and 390px in both themes, pixel-diffing approved regions to confirm nothing
locked had moved.

- Removed `public/images/hero-image.png` (1.8 MB, unreferenced) in favour of the WebP.
- Contrast was verified against *rendered pixels*, not the stylesheet — which is how the
  primary CTA was found rendering white-on-gold at 1.59:1. Cause: `.studio-hero__cta a
  { color: inherit }` in the critical inline CSS outranks a single class, so colour rules
  for hero CTAs must be scoped one level deeper.

---

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
- **Legacy gradient text still site-wide**: ~60 occurrences remain outside the homepage
  (ServicesPage, ContactPage, AboutPage, ReviewsPage, PortfolioDemoPage,
  SocialMediaPortfolioPage and the case-study components). Not migrated. There is also a
  near-duplicate `src/components/portfolio/BrightPathGradientTitle.tsx` used by the
  portfolio/case-study components — it does *not* have the `emphasis` prop. Any site-wide
  rollout has to reconcile both files.
- **Pre-existing TypeScript error**: `src/pages/ContactPage.tsx:16` — TS2717, conflicting
  `gtag` declarations. Predates this work; deliberately not fixed in `7927270`.
- **Pre-existing lint**: `netlify/functions/get-case-studies.ts:178` unused `_context`
  (error) and `src/components/ui/GuidingLight.tsx:230` missing hook dependency (warning).
  Both predate this work and were left alone.
- **About hero name fails contrast**: `TISHA DI FRESCO` is gold text over the mountain
  photograph (backdrop luminance 0.30 measured), giving ~2.02:1 against a 3:1 bar. It needs
  a scrim behind the copy, not a colour change — every gold value makes it worse, and it was
  left alone on Aug 15 for that reason.
- **Legacy `--services-card-*` tokens** in `globals.css` still carry the retired
  `44 91% 54%` gold, but nothing references them. Left in place rather than removed as
  unrelated cleanup.

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
- Services page semi-transparent sections for parallax effect —
  **superseded**: the Services page now uses the `.services-atmos` artwork system
  (see "Background System"), not `bg-fixed` semi-transparent slabs
- AweStruck case study content corrections

## Commit History (Recent)
- `7927270` - Redesign homepage visual system: hero, backgrounds, and typography
- `c04bb8d` - Merge PR #21 (test-netlify-prerender)
- `3a1e994` - Optimize About page and improve prerender visibility
- `409f6c0` - Fix prerendering for Netlify builds
- `3c4b4cd` - Add static prerendering for key routes
- `5757b6b` - Improve structured data and AI discoverability
- `4a539aa` - Add more spacing between portfolio cards on mobile
- `7bdde08` - Add Skills & Values sections to About page
- `3d9c66a` - Add text shadows to About hero section
- `edc5ad2` - Fix About hero showing grayscale on mobile initial load
- `c74814a` - Fix homepage hero buttons width on mobile
- `2d5e428` - About page mobile fixes + scroll grayscale effect
