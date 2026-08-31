---
name: prerender-architecture-facts
description: 12-route prerender allowlist, /services + /reviews deliberately excluded (live data), createRoot-always / never hydrateRoot, app.html SPA fallback, verifyPrerender build gate.
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

See also [[hero-injection-mirror-fact]].
