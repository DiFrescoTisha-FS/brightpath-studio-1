---
name: prerender-architecture-facts
description: 12-route prerender allowlist, /services + /reviews deliberately excluded (live data), createRoot-always / never hydrateRoot, app.html SPA fallback (hero-stripped since 2026-10-05), verifyPrerender build gate incl. static-hero checks.
metadata:
  type: project
---

**Status:** Current implementation fact, verified directly in code on 2026-08-31.

`PRERENDER_ROUTES` in `vite.config.ts` (currently lines 26-39) lists exactly 12 routes:
`/`, `/about`, `/portfolio`, `/portfolio/awestruck-intelligence`,
`/portfolio/bamvsthewrld`, `/portfolio/dale-tiffany-social-media`,
`/portfolio/living-better-life-social-media`, `/contact`, `/case-study`,
`/social-media`, `/terms-of-service`, `/privacy-policy`. `/services` and `/reviews` are
not in the list — confirmed absent, matching CLAUDE.md's claim that they're deliberately
excluded because they fetch live data from Netlify functions behind `/api/phases` and
`/api/reviews`, so a build-time snapshot would bake in stale content.

`src/main.tsx` (verified around line 89-103): always calls `ReactDOM.createRoot(...)`,
never `hydrateRoot`, with an explicit comment explaining a DOM snapshot lacks the
`<!-- -->`/`<!--$-->` markers React 18 hydration requires, so hydration would always fail
and React would discard the tree anyway.

Other rules from CLAUDE.md not independently re-verified line-by-line this session but
consistent with what was inspected (`writeBundle` app.html copy, `verifyPrerender` gate
function present in `vite.config.ts` around line 193-270, `data-rh` tag-ownership
contract, inline theme bootstrap script, `IS_PRERENDER`/`revealFrom()` pattern): treat as
reliable current facts, but re-grep before quoting exact line numbers since this branch
is still active and line numbers will drift.

**Why this matters:** this is the kind of thing a future session could break without
realizing — e.g., adding `/services` or `/reviews` to the prerender allowlist would bake
stale live-data content into the static snapshot; switching to `hydrateRoot` would break
every prerendered page; missing the `:not()` exclusion equivalent pattern (see
[[background-system-approved]]) or the `data-rh` tags would cause silent metadata bugs
crawlers rely on.

**Added 2026-10-05 ([[about-page-refresh]]):** the static homepage hero ships only in
`dist/index.html`. Prerendered non-home routes remove it before the snapshot, and
`snapshotSpaFallback()` writes `app.html` with `STATIC_HERO_HTML` stripped. `verifyPrerender`
now also checks: `/` contains `id="hero-clarity-static"`; every other prerendered route does
not; `app.html` exists and does not. Its success line reads "12 routes and the SPA fallback
verified." Verified in a build on 2026-10-05: every non-home route and `app.html` have zero
or one `<h1>`, never the homepage's.

**Intermittent failure observed 2026-10-05:** Netlify's first build of `6a43b8a` failed the
guard with "/privacy-policy: contains the hidden homepage hero" although every route
rendered. Config was correct (route listed and routed; same config deployed at `0f8dae7`;
local builds clean). A retry with no changes passed (deploy `6ac3fb855f4d1bf95bb3567a`).
Cause unknown — record it as intermittent, retry first if it recurs, and never weaken the
guard in response. Details in [[about-page-refresh]].

See also [[hero-injection-mirror-fact]].
