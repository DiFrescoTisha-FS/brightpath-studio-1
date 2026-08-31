---
name: phase-3-hero-support-approved
description: Phase 3 approved — new hero client-outcome lede (implementing Blackmont/Grace's messaging recommendation), homepage support-visibility sentence linking to a new /services#maintenance anchor, and a ScrollToTop extension enabling hash-based deep links.
metadata:
  type: project
---

**Status:** Approved decision. Visually reviewed and approved by the user. Same
"approved, don't reopen without reason" tier as [[phase-2-trust-evidence-approved]],
[[gold-system-approved]], [[background-system-approved]], [[homepage-visual-system-approved]],
and [[social-media-metrics-policy-approved]]. Recorded 2026-08-31.

**What was approved:**

1. **Homepage hero client-outcome wording.** The hero lede, in both required
   locations — `vite.config.ts`'s injected static hero string, and its structural
   mirror `src/components/ClarityHero.tsx` (see [[hero-injection-mirror-fact]]) — now
   reads: "Custom websites built for speed, clarity, and growth—so your online presence
   works as hard as you do and makes it easier for customers to understand, trust, and
   engage with your business." Eyebrow, H1, and CTAs were preserved unchanged, as was
   the hero's layout/visual treatment. This implements
   [[blackmont-consultant-recommendations]] point 3 (translate technical capability into
   client-outcome messaging) — the "understand, trust, and engage" phrasing is a direct
   pull from that recommendation's own wording. Verified programmatically that both
   locations are character-identical, and confirmed the new text is correctly baked into
   the prerendered `dist/index.html` via a full (non-skip) prerender build — i.e. the
   dual-location-edit constraint in [[hero-injection-mirror-fact]] was handled correctly,
   not just asserted.

2. **Homepage support-visibility sentence.** Below the existing three-card "How I Help
   Businesses" grid on the homepage (`ServicesSection` in `src/pages/HomePage.tsx`), a
   new sentence was added: "And support doesn't end at launch. Ongoing maintenance helps
   keep your site secure, current, and running smoothly." "Ongoing maintenance" links to
   `/services#maintenance`. This implements
   [[blackmont-consultant-recommendations]] point 4 (make ongoing post-launch support
   more visible) without touching the Services page's existing maintenance pricing,
   deliverables, or layout.

3. **`/services#maintenance` deep link.** A plain `id="maintenance"` and a
   `scroll-mt-24` Tailwind utility (to clear the fixed navbar) were added to the existing
   Ongoing Maintenance `<section>` in `src/pages/ServicesPage.tsx`. Purely additive — no
   existing class removed. Confirmed no interaction with the
   [[background-system-approved]] `.services-atmos` / `.services-rule:not(.services-atmos)`
   exclusion (that system is entirely class-selector-based; an `id` attribute doesn't
   participate in it).

4. **`ScrollToTop` (in `src/App.tsx`) was extended, not duplicated, to support hash
   navigation with lazy-loaded routes.** This is a load-bearing architectural pattern
   worth tracking alongside the other unusual patterns in CLAUDE.md's "Architectural
   memory" list (hero mirror, prerender allowlist, `PageMeta`'s `prerender-ready`
   signal, `IS_PRERENDER`/`revealFrom()`, inline theme bootstrap). Before Phase 3,
   `ScrollToTop` only watched `pathname` and unconditionally called `scrollTo(0, 0)` on
   every route change. It now also reads `hash` from `useLocation()`: when a hash is
   present, it scrolls to the matching element via `scrollIntoView` (which respects
   `scroll-mt-24` automatically) instead of forcing scroll-to-top, retrying via
   `requestAnimationFrame` (capped at 50 attempts) to tolerate the target route's
   lazy-loaded mount timing (`ServicesPage` is `React.lazy`-loaded, so the target element
   may not exist in the DOM on the first animation frame after navigation). Normal
   route navigation without a hash is unchanged. **Why this exists:** visual review
   caught a bug where clicking the new homepage link navigated to `/services` but did not
   scroll to the section, because the pre-existing unconditional `ScrollToTop` was
   overriding any hash-based scroll target. **Why a future agent could break this
   without realizing it:** any future edit to `ScrollToTop` that removes the hash branch,
   changes the retry/RAF logic, or converts `ServicesPage` (or any future hash-linked
   route) away from lazy-loading without accounting for mount timing could silently
   regress deep-linking site-wide, not just for this one link — `ScrollToTop` is global
   in `App.tsx`, so it affects every route.

5. **Explicitly NOT touched by Phase 3** (confirmed per the coordinator's approval
   message): maintenance pricing, maintenance deliverables, the three homepage service
   cards, the Services page layout, all Phase 1/2 work
   ([[trust-evidence-integrity-open-issues]], [[phase-2-trust-evidence-approved]]), and
   all deferred items — [[dale-tiffany-case-study-url-deferred]],
   [[dale-tiffany-social-stats-deferred-review]],
   [[reviews-testimonials-content-gap-deferred]], and the Living Better Life raw-data
   reconciliation noted in [[trust-evidence-integrity-open-issues]]. None of these should
   be treated as touched or resolved by Phase 3.

**Why this matters:** this is the user converting the second and final open item from
[[blackmont-consultant-recommendations]] (points 3 and 4) into approved, implemented
work — following Phase 2's conversion of point 5. Per [[strategy-gap-analysis]], this
closes out the two messaging/visibility gaps that analysis identified as the primary
remaining strategy work; the personal-story and SEO/AI-discoverability points from that
same recommendation set were already assessed as already-strong and were correctly left
untouched here.

See also [[hero-injection-mirror-fact]] (updated to reflect the new lede as current),
[[homepage-visual-system-approved]], [[background-system-approved]],
[[prerender-architecture-facts]].
