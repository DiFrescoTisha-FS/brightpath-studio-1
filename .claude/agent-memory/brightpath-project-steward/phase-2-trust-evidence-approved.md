---
name: phase-2-trust-evidence-approved
description: Phase 2 trust/evidence improvements (Angel City Lighthouse chip + card copy, Angel City + Dale Tiffany homepage routing fixes, AweStruck/Bamvsthewrld left unchanged) — visually reviewed and approved by the user.
metadata:
  type: project
---

**Status:** Approved decision. Visually reviewed and approved by the user. Same
"approved, don't reopen without reason" tier as [[gold-system-approved]],
[[background-system-approved]], [[homepage-visual-system-approved]], and
[[social-media-metrics-policy-approved]]. Recorded 2026-08-31.

**What was approved:**

1. **Angel City Massage — Portfolio-page card.** Description text changed to
   "WordPress modernization with a Lighthouse desktop lift from 62 to 99." A
   "Lighthouse 99" icon chip replaced the card's "Gift Cards" chip in the feature-chip
   row, reusing AweStruck's existing chip pattern rather than inventing a new visual
   treatment. This surfaces the verified Lighthouse desktop 62→99 result that
   [[social-media-metrics-policy-approved]] point 1 already names as approved-for-
   prominent-use trust evidence — it was previously verified but not surfaced on this
   card.

2. **Angel City Massage — homepage routing.** The homepage tile now routes directly to
   its dedicated case-study route (`/case-study`) instead of the generic `/portfolio`
   grid.

3. **Dale Tiffany (web/B2B) — homepage routing.** The homepage tile now uses a
   `?project=dale-tiffany` query-parameter mechanism, read by `PortfolioDemoPage.tsx` on
   mount to auto-open that case study, so homepage visitors reach the actual case-study
   content directly. This exists because **no dedicated route exists for this project in
   the router or the shared case-study data model** — see
   [[dale-tiffany-case-study-url-deferred]] for why this is a stopgap, not final
   architecture, and for the deferred follow-up task.

4. **AweStruck Intelligence and Bamvsthewrld deliberately left unchanged.** AweStruck
   already surfaces its Lighthouse 26→100 metric everywhere; Bamvsthewrld has a genuine
   honest scope statement with no metric, and no numerical metric was manufactured for
   it merely for cross-project visual consistency. This is recorded as a **deliberate
   application of the "do not invent metrics" principle** from
   [[social-media-metrics-policy-approved]] and [[blackmont-consultant-recommendations]],
   not an oversight — do not "complete" Bamvsthewrld with an invented number later
   without a genuine verified metric to report.

**Why this matters:** this is the user's explicit approval converting part of
[[blackmont-consultant-recommendations]] (point 5, stronger visible trust evidence) from
recommendation to approved-and-implemented, following the review this steward performed
against durable memory before implementation (see prior review-only exchange, not
separately filed as a memory entry per instructions).

See also [[dale-tiffany-case-study-url-deferred]],
[[reviews-testimonials-content-gap-deferred]], [[dale-tiffany-social-stats-deferred-review]]
for the items explicitly NOT resolved by Phase 2.
