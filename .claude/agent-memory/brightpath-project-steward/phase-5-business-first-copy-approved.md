---
name: phase-5-business-first-copy-approved
description: Phase 5 approved and live on main (f66aa58, 2026-09-26) — business-first, client-centered copy rewrite of the homepage and Services page; copy only, no layout/styling changes. Supersedes earlier hero lede, homepage card copy and CTA wording.
metadata:
  type: project
---

**Status:** Approved decision. Reviewed locally and approved by the user, committed as
`3dd1df7` (homepage) and `f66aa58` (Services), then `feature/services-page-redesign` was
fast-forwarded into `main` and pushed on 2026-09-26. Same "approved, don't reopen without
reason" tier as [[phase-4-conversion-paths-approved]] and earlier phases. The current
wording lives in code; this note records the decisions, not a copy of the text.

**Positioning.** Copy moved from capability/tech framing ("Custom websites built for
speed…", "Services Built to Perform", React/Lighthouse detail) to first-person,
business-first framing: understand the business and its customers first, then build what
fits. Primary CTA vocabulary on both pages is now **"Let's Talk" → `/contact`**.

**Homepage (`3dd1df7`)** — files: `vite.config.ts` + `src/components/ClarityHero.tsx`
(hero, both locations per [[hero-injection-mirror-fact]]), `src/pages/HomePage.tsx`,
`src/components/PortfolioSection.tsx`.
- Hero: eyebrow "BUILT AROUND YOUR BUSINESS"; new lede; primary CTA "Let's Talk"
  (→ `/contact`). H1 and "View Our Work" secondary unchanged.
- How I Help Businesses: new subheading and three new card titles/descriptions
  ("Make Your Website Work Better", "Turn More Visits Into Action", "Build What Your
  Business Needs"). Icons and card design unchanged. The Phase 3 support sentence
  linking to `/services#maintenance` is untouched.
- My Work: short card descriptions rewritten as client outcomes. **The homepage cards no
  longer carry technical metrics** (AweStruck 26→100, Angel City 62→99) — a deliberate
  user decision. Metrics remain on the Portfolio page cards and case-study pages, which
  were explicitly out of scope.
- Brand Story ("A Beacon in the Digital Fog"): new paragraph; CTA text now "Tell Me About
  Your Business" (destination still `/contact` per [[phase-4-conversion-paths-approved]]);
  the "Illuminating Success" tagline and its gold rule were removed at the user's request.
- Client Testimonials: explicitly unchanged.

**Services page (`f66aa58`)** — file: `src/pages/ServicesPage.tsx` only.
- Hero: gained an eyebrow ("BUILT AROUND YOUR BUSINESS") and a "Let's Talk" CTA — new
  elements, but both reuse existing unscoped classes (`.studio-hero__eyebrow`,
  `.studio-cta--primary`), so no CSS changed. H1 "Web Solutions Built Around Your
  Business".
- What I Build: user-supplied copy for all four cards, including "Social Media That
  Supports Your Business" (the social track was kept). Old Performance card's 26→100
  claim is gone from this page.
- Our Process: the two intro paragraphs were merged into one (the surviving `<p>` keeps
  the old second paragraph's `text-sm md:text-lg` classes); CTA "Let's Talk".
- What's Included: six items rewritten in plain language. The old "90+ mobile Lighthouse
  target" and "WCAG AA" claims were dropped from this copy.
- Tech Stack: tool pills kept unchanged (user choice); paragraph replaced with
  "you don't need to know these tools" reassurance.
- Maintenance: intro softened; **$100/month price, bullets and billing terms unchanged.**
- Final CTA: "Not sure what your website needs? Let's talk." — promises a reply
  **"within one business day"** (changed from "24 hours" at the user's request).
- SEO: title "Web Design & Development Services"; new meta description; the four JSON-LD
  `Service` entries renamed to category names (Website Improvement, Customer Conversion,
  Custom Website Development, Social Media Content & Management) with plain descriptions.
  `/services` is still not prerendered, so this metadata is client-rendered only.

**Our Process phase cards remain WordPress/ACF-driven.** The user rewrote all six cards
directly in WordPress (fixing the third card's bullets duplicated from the first, and the
past-tense "Conducted/Created…" phrasing);
button text there is now "Let's Talk". Never hard-code or override that content. It can
only be reviewed locally through `netlify dev` (port 8888) — plain `vite` has no
`/api/phases` and shows the error state.

**Deferred / loose ends found during this phase (not actioned):**
- Response-time promise is now inconsistent: Services says "one business day",
  `ContactPage.tsx` says "within 24 hours" in two places (success message and form
  footer, see [[phase-4-conversion-paths-approved]]).
- CTA vocabulary: `ReviewsPage.tsx` still uses "Start Your Project" (Phase 4) while
  homepage/Services now use "Let's Talk".
- Project name spelling: code uses "Bamvsthewrld"; the user's brief wrote "Bamvstheworld".
  Title left as-is; user never confirmed which is correct.
- Brand Story spacing: with the tagline removed, paragraph `mb-6` + button `mt-8` leaves
  ~56px; a tighter gap was offered, not answered.
- Pre-existing, not caused here: on mobile the Brand Story image frame (`h-80`) is taller
  than the image, leaving an empty band.
- `globals.css` has a stale comment referring to the "Read Our Reviews" button.

See also [[hero-injection-mirror-fact]], [[phase-3-hero-support-approved]],
[[phase-4-conversion-paths-approved]], [[phase-2-trust-evidence-approved]],
[[blackmont-consultant-recommendations]].
