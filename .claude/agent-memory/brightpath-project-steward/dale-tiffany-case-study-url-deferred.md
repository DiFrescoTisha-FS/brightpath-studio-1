---
name: dale-tiffany-case-study-url-deferred
description: Dale Tiffany web/B2B case study has no dedicated crawlable route — the ?project=dale-tiffany query-param homepage link is a stopgap, not final architecture; a real registered/prerendered route is deferred future work.
metadata:
  type: project
---

**Status:** Two distinct facts recorded together because they're directly related —
keep both status labels distinct when citing this memory.

**(a) Current implementation fact, explicitly provisional/not final.** As of Phase 2
(approved 2026-08-31), the homepage tile for Dale Tiffany's web/B2B case study routes via
a `?project=dale-tiffany` query parameter, read by `PortfolioDemoPage.tsx` on mount to
auto-open that case study. This exists only because no dedicated route is registered for
this project in the router or the shared case-study data model. **This mechanism does
NOT create a new crawlable/prerenderable URL and therefore does not improve
SEO/AI-discoverability for this project.** Do not treat it as resolved or final — it is a
stopgap that gets homepage visitors to the right content, nothing more.

**(b) Deferred future task (known technical debt to be scheduled).** Dale Tiffany's
web/B2B case study should eventually receive a real, dedicated, crawlable case-study URL
— a proper route registered in the router, added to the prerender allowlist, etc.
Implementing this was judged too large for Phase 2's "smallest implementation necessary"
scope: it would require touching `main.tsx` routing and `vite.config.ts`'s
`PRERENDER_ROUTES` configuration, which Phase 2 explicitly avoided. This was flagged as
a likely gap by this steward during the pre-implementation Phase 2 review (the same gap
independently verified in [[prerender-architecture-facts]] — that memory records the
current 12-route prerender allowlist verified in `vite.config.ts`, which has no entry for
either Angel City Massage or a Dale Tiffany web/B2B slug distinct from
`/portfolio/dale-tiffany-social-media`). Angel City Massage's routing was resolved
differently in Phase 2 (via its existing `/case-study` route, per
[[phase-2-trust-evidence-approved]]) — only the Dale Tiffany web/B2B case remains without
a dedicated crawlable URL.

**How to apply:** when reviewing any future plan/diff that touches `main.tsx` routing or
`vite.config.ts`'s prerender configuration, treat "give Dale Tiffany's web/B2B case study
a real route" as a known, already-scoped-out future task rather than a surprise ask.
Don't describe the query-param mechanism as an SEO fix or as resolving
[[blackmont-consultant-recommendations]] point 6 (protect SEO/AI-discoverability) — it
explicitly doesn't.

See also [[phase-2-trust-evidence-approved]], [[prerender-architecture-facts]].
