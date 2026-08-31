---
name: trust-evidence-integrity-open-issues
description: Two evidence-integrity problems surfaced by a read-only trust-evidence audit (2026-08-31) — Living Better Life's contradictory metrics and Dale Tiffany's unsupported/qualitative "metric" cards. Coordinator reports both were addressed by Phase 1 cleanup; not independently verified against code by this steward.
metadata:
  type: project
---

**Status:** Known technical debt / evidence-integrity issue, originally recorded as
open and NOT resolved/NOT validated. **Update (2026-08-31, later in the same day):** the
coordinator subsequently reported that "Phase 1 evidence-integrity cleanup" has already
been implemented for both items below — Living Better Life's contradictory numbers and
Dale Tiffany's unsupported "40% faster" claim / qualitative-labels-as-metrics. **This
steward has not independently re-verified that implementation against the actual code
in this session** — the report was relayed via a coordinator message in the context of
a separate, unrelated memory task (recording [[dale-tiffany-social-stats-deferred-review]]),
not confirmed by re-reading the source files. Treat the two items below as
"reported fixed, pending independent verification," not as confirmed-resolved by this
steward's own inspection. A future session should re-read
`src/data/caseStudies/livingBetterLifeSocial.ts` and
`src/components/portfolio/DaleTiffanyCaseStudy.tsx` to confirm before fully closing this
memory out. Do not let [[social-media-metrics-policy-approved]]'s approval alone be read
as fixing or verifying either item (that policy's point 6 says so directly) — it is the
separately-reported Phase 1 implementation, not the policy itself, that is claimed to
have addressed them.

**1. Living Better Life Social Media** —
`src/data/caseStudies/livingBetterLifeSocial.ts`. The file's `quickImpact` field (48
posts, 948 impressions, 253 reach, 114% visibility growth, 73 engagements, period
"January 2026") directly contradicts the same file's `metrics` field and matching
`results` prose (1.8M+ impressions, 620K+ reach, 32K+ followers, +185% growth, 5.2%
engagement) — an unexplained ~1,900x gap within one file. Both sets render live to
visitors; the card surfaces the larger set.

**2. Dale Tiffany web/B2B rebuild case study** —
`src/components/portfolio/DaleTiffanyCaseStudy.tsx`. A "40% Faster load time" stat card
has no baseline, methodology, or timeframe stated anywhere in the file — unlike every
other performance metric in the repo, which are Lighthouse-score-backed with
screenshots (see AweStruck and Angel City Massage examples cited in
[[social-media-metrics-policy-approved]]). Two additional stat cards on the same
page — "Faster" (retailer onboarding) and "Unified" (distributor management) — are
qualitative word-labels styled visually as if they were data metrics, not actual
numbers.

**Why this matters:** these are real, user-facing accuracy problems, not stylistic
ones — a visitor or crawler reading either case study could be shown numbers that
contradict each other or that have no verifiable basis. This is exactly the kind of
"invented/unverifiable proof" that [[blackmont-consultant-recommendations]] and
[[social-media-metrics-policy-approved]] both explicitly warn against creating or
implying.

**How to apply:** This steward does not fix data files — that's implementation work for
the main session or a coding agent. When asked to review any future case-study or
trust-evidence change, check whether it touches either of these two files; if so, flag
that the underlying contradiction/unsupported-claim issue is still open regardless of
what else changes in that diff. Do not describe either issue as resolved until a future
session confirms in the actual repo state that the data has been corrected — at that
point, update this memory file's Status rather than leaving it stale.
