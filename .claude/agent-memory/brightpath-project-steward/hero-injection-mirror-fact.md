---
name: hero-injection-mirror-fact
description: Homepage hero markup lives in two synchronized places (STATIC_HERO_HTML in vite.config.ts + ClarityHero.tsx); since 2026-10-05 ClarityHero is RENDERED as a fallback, so drift is visible to visitors. Edit both.
metadata:
  type: project
---

**Status:** Current implementation fact. Re-verified and changed on 2026-10-05 (see the
top section); the 2026-08-31 description below it is history.

**Current (2026-10-05, [[about-page-refresh]]): `ClarityHero.tsx` is load-bearing.**
- The injected markup is the module constant `STATIC_HERO_HTML` in `vite.config.ts`, used
  by `injectStaticHero()` (puts it in `index.html` before `#root`) and by
  `snapshotSpaFallback()` (strips exactly that string from `app.html`; the build throws if
  it can't find it).
- The static hero now exists **only in the `/` HTML**. Every other prerendered route drops
  it during the snapshot (`StaticHeroRouteGate` in `App.tsx` calls `hero.remove()` when
  `IS_PRERENDER` and the path isn't `/`), and `app.html` (served for `/services`,
  `/reviews`, unknown URLs) is written without it. Reason: a `display:none` hero still
  shipped the homepage `<h1>` to crawlers on every non-home route.
- Consequence: a visitor who lands on any non-home page and then navigates home in-app
  has no static hero in the DOM. `HomePage.tsx` checks once per mount
  (`document.getElementById('hero-clarity-static')`) and renders `<ClarityHero />` in its
  place. So **ClarityHero.tsx is what those visitors see**; if it drifts from
  `STATIC_HERO_HTML`, the homepage looks different depending on the entry page.
- `verifyPrerender` fails the build if `/` lacks the hero or any other prerendered route
  or `app.html` contains it.
- Rule: change hero copy/markup in `STATIC_HERO_HTML` and `ClarityHero.tsx` together, and
  keep the same id/classes (the CSS and `StaticHeroRouteGate` key off
  `#hero-clarity-static`).

**History (2026-08-31):** `src/components/ClarityHero.tsx` (`ClarityHeroStructureMirror`)
was **not imported or rendered anywhere** in the app. Its own file header explains why: the real hero is
injected as a static HTML string directly into `index.html` by the
`brightpath-inject-static-hero` Vite plugin in `vite.config.ts`, so hero text paints
before React boots (LCP optimization). The component file exists purely so the injected
markup has a second, reviewable JSX location and an obvious place to keep in sync — it
is not a Tailwind class manifest (Tailwind's content scanner never reads the plugin
string, so the hero uses dedicated `.studio-hero`/`.studio-cta` CSS classes from
`src/styles/globals.css` instead of utility classes, specifically to avoid a purge
failure mode).

Confirmed hero copy as of 2026-08-31 (initialization check): eyebrow "WEBSITES BUILT FOR
BUSINESS", H1 "Websites That Work **Beautifully.**", lede "Custom websites built for
speed, clarity, and growth—so your online presence works as hard as you do.", CTAs
"Start Your Project" (primary, → `/contact`) and "View Our Work" (ghost, → `/portfolio`).

**Superseded 2026-08-31 (Phase 3, approved):** the lede was changed to "Custom websites
built for speed, clarity, and growth—so your online presence works as hard as you do and
makes it easier for customers to understand, trust, and engage with your business." Per
[[phase-3-hero-support-approved]], this was verified programmatically to be
character-identical in both locations and confirmed baked into the prerendered
`dist/index.html` via a full (non-skip) prerender build. Eyebrow, H1, and CTAs were
preserved unchanged. Treat the lede text above as historical; see
[[phase-3-hero-support-approved]] for the current approved wording.

**Superseded again 2026-09-26 (Phase 5, approved, live on main):** eyebrow is now "BUILT
AROUND YOUR BUSINESS", the lede was rewritten, and the primary CTA is "Let's Talk"
(→ `/contact`). H1 and "View Our Work" unchanged. Both locations were edited together and
the new text confirmed in the prerendered `dist/index.html`. See
[[phase-5-business-first-copy-approved]].

**Why this matters for the Strategy Gap discussion:** any homepage hero copy change
proposed to better translate capability into client outcome (see
[[blackmont-consultant-recommendations]]) has an architectural cost most people won't
expect — it must be edited in *two* places (the vite.config.ts injected string and
ClarityHero.tsx) or the prerendered/LCP-optimized snapshot will silently drift from the
live React-rendered hero. This is a real implementation constraint on that recommendation,
not a reason to avoid it, but it should be called out when reviewing any such plan/diff.
Phase 3 is the confirmed example of this constraint being handled correctly.

See also [[homepage-visual-system-approved]], [[prerender-architecture-facts]],
[[phase-3-hero-support-approved]].
