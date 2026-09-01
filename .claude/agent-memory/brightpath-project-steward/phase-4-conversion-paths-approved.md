---
name: phase-4-conversion-paths-approved
description: Phase 4 approved — homepage Brand Story closing CTA now points to Contact instead of Reviews, Reviews page gained a "Start Your Project" primary CTA, Contact success message now mentions the 24-hour response time. Conversion-path work only, no redesign.
metadata:
  type: project
---

**Status:** Approved decision. Visually reviewed and approved by the user, about to be
committed. Same "approved, don't reopen without reason" tier as
[[phase-3-hero-support-approved]], [[phase-2-trust-evidence-approved]],
[[gold-system-approved]], [[background-system-approved]],
[[homepage-visual-system-approved]], and [[social-media-metrics-policy-approved]].
Recorded 2026-09-01. Verified directly against the working-tree diff before recording —
diff matched the described changes exactly, three files only.

**What was approved:**

1. **Homepage Brand Story closing CTA changed from "Read Our Reviews" (→ `/reviews`) to
   "Start Your Project" (→ `/contact`)**, in `src/pages/HomePage.tsx`'s `BrandStorySection`
   component. Rationale: the homepage's Client Testimonials section (the full
   `ReviewWidget` set) directly precedes Brand Story, so routing the closing CTA to
   `/reviews` was redundant — the visitor had just seen that same proof. Brand Story is
   the last section before the global footer, making its CTA the homepage's final
   conversion opportunity, so it now drives to Contact rather than looping back to
   already-seen content.

2. **Reviews page (`src/pages/ReviewsPage.tsx`) gained a primary "Start Your Project" CTA
   → `/contact`**, added above the existing "Return to Homepage" action, which is
   retained but demoted from the primary `buttonClasses` styling to the existing `link`
   `Button` variant (no new CTA style introduced — reused the component's existing
   variants). Before this change, Reviews only offered "Return to Homepage" — a dead-end
   loop with no forward path to Contact from that page.

3. **Contact page (`src/pages/ContactPage.tsx`) success-state message** now reads:
   "Thank you! Your message has been sent successfully. We typically respond within 24
   hours." The pre-existing pre-submit/static form-footer reassurance line ("We typically
   respond within 24 hours. Let's start building something brilliant together!") is
   completely unchanged in its original location (line ~374) — the 24-hour claim now
   appears in both places deliberately (pre-submit friction reduction, post-submit
   confirmation), not moved or deduplicated.

4. **Scope discipline confirmed**: Phase 4 is conversion-path work only. No redesign, no
   new sections, no changes to Phase 1–3 approved hero/support messaging
   ([[phase-3-hero-support-approved]], [[phase-2-trust-evidence-approved]]), no visual/
   layout/gold/background system changes ([[gold-system-approved]],
   [[background-system-approved]]), no changes to review data or review-fetching logic, no
   changes to the contact form's actual submission behavior (see
   [[contact-form-architecture-debt-deferred]] for what was *discovered but not touched*
   during this phase).

5. **Files touched**: `src/pages/HomePage.tsx`, `src/pages/ReviewsPage.tsx`,
   `src/pages/ContactPage.tsx` only. Commit message: "feat: improve conversion paths
   across key pages".

**Why this matters:** this closes homepage-to-Reviews-to-dead-end and
Reviews-to-homepage-only loops with an actual forward path to Contact, complementing the
messaging work in [[phase-3-hero-support-approved]] — Phase 3 made the value proposition
and support visibility clearer, Phase 4 makes sure every proof/testimonial surface
actually offers a next step toward conversion instead of circling back to content the
visitor already saw.

See also [[phase-3-hero-support-approved]], [[phase-2-trust-evidence-approved]],
[[contact-form-architecture-debt-deferred]].
