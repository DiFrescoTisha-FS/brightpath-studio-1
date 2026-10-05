---
description: About page refresh (2026-10-05) — Founder & Frontend Engineer positioning, Selected Work, grouped skills, hero scrim, metadata + hidden-hero <h1> fix, approved timeline-artwork backgrounds (bg-midnight/60 is a deliberate no-op); merged to main at 0f8dae7 and deployed, plus a fetchPriority warning fix.
description: About page refresh (2026-10-05) — Founder & Frontend Engineer positioning, Selected Work, grouped skills, hero scrim, metadata + hidden-hero <h1> fix, and the approved timeline-artwork backgrounds (bg-midnight/60 is a deliberate no-op); committed and pushed on feature/about-page-refresh, NOT merged.
metadata:
  type: project
---

**Status:** Approved, merged and deployed. Built on `feature/about-page-refresh` (from
`main` at `4d9d80f`): `6f54b89` (refresh, metadata, prerender, hero accessibility) and
`0f8dae7` (About section backgrounds). On 2026-10-05 `main` was fast-forwarded to `0f8dae7`,
pushed, and deployed to production (Netlify deploy `6ac3f2688449550007a9a062`).
Post-deploy production verification passed (content, backgrounds, hero buttons, links,
one `<h1>` per page, layouts at 390/768/1440). A follow-up commit on `main` fixed the
`fetchPriority` warning described below.

**Goal.** One page that works for two readers at once without becoming a résumé site:
a prospective client ("she understands businesses and can build what we need") and a
technical hiring manager ("a legitimate frontend engineer who builds real React/TypeScript
applications"). The business-first positioning from
[[phase-5-business-first-copy-approved]] stays; the engineering evidence is made
discoverable, not shouted. No "open to work" or recruiter language anywhere.

**Positioning decisions (user-approved):**
- Identity line: **"Founder & Frontend Engineer, BrightPath Web Studio"** (hero, Person
  JSON-LD `jobTitle`). Replaces "Front-End Developer & Web Designer".
- The quoted "WordPress Developer & Front-End Specialist" / "Custom WordPress Websites That
  Perform" were *not* on About — they were the old homepage hero, removed in `6834ccc`.
  The WordPress-first framing survived only in metadata, which this work cleaned up.
- **Divi removed** from About skills, About JSON-LD, site-wide keywords and the
  ProfessionalService `knowsAbout`. WordPress, Headless WordPress and ACF stay —
  WordPress is still a BrightPath service.
- **Selected Work = two projects only**: AweStruck Intelligence and Dale Tiffany Retailer
  Portal & CRM. Bamvsthewrld deliberately excluded. No metrics on these cards (they live on
  the case studies), consistent with Phase 5. Dale Tiffany links to the
  `/portfolio?project=dale-tiffany` stopgap ([[dale-tiffany-case-study-url-deferred]]).
- **Skills are grouped** (Frontend / Application Development / CMS & Platforms / Quality &
  Delivery). Rule: every item must be backed by shipped project work or the existing skills
  list. **No testing tools** (Jest/RTL/Vitest) — the repo has no test runner and no project
  demonstrates them. **Figma kept** at the user's request (carried from the old list).
- Section headings keep the legacy yellow→orange gradient — explicitly out of scope
  (site-wide design-system question, see CLAUDE.md "Legacy gradient text").
- Primary CTA vocabulary "Let's Talk" → `/contact` (hero and closing section).

**Professional links.** Quiet GitHub + LinkedIn row at the foot of the page (no heading,
`nav aria-label="Professional profiles"`), also in Person JSON-LD `sameAs`. URLs come from
the existing résumé PDF: `github.com/DiFrescoTisha-FS`,
`linkedin.com/in/tisha-di-fresco-b8aba6309` (user confirmed correct). **Résumé link is
deliberately unrendered**: `RESUME_URL = null` in `AboutPage.tsx`. The existing
`public/assets/Tisha-DiFresco-Resume.pdf` is outdated (headed "WordPress Developer", leads
with Divi, and describes the Dale Tiffany role as "Supported WordPress CMS structure",
contradicting the case study). A new React/TypeScript one-page résumé is being prepared;
when it arrives, replace the asset and set `RESUME_URL` — the link appears automatically.
Do not modify or link the old PDF.

**Hero accessibility (measured on rendered pixels, both themes, 390/768/1024/1440,
grayscale and colour states):**
- Buttons: primary is filled with the theme's single gold + approved label (9.84–10.13:1
  dark, 5.18–5.56:1 light); secondary has a translucent midnight backing (≥9.3:1). Both
  replaced a white-on-gold button with a second yellow hover (`hover:bg-yellow-400`) that
  broke [[gold-system-approved]]. Scoped under `.about-hero__cta` in `globals.css`.
- Copy scrim: `.about-hero__scrim`, a localized gradient behind the copy only (stops per
  breakpoint, documented in `globals.css`). Before: eyebrow ~1.1:1 and name 1.2–1.5:1 on
  phones/tablets. After: ≥95% of backdrop pixels behind every element pass 4.5:1 (or 3:1 for
  large text), with ~10% margin. Lighter stops were tried and failed the name on phones
  (2.76:1). This resolves the old known issue "About hero name fails contrast".

**Architecture changes** — see [[hero-injection-mirror-fact]] and
[[prerender-architecture-facts]]: the hidden homepage hero is no longer shipped in any
non-home HTML (prerendered routes *and* `app.html`), `ClarityHero.tsx` became load-bearing,
and `verifyPrerender` guards both.

**Metadata.** Homepage + `index.html` defaults: title "BrightPath Web Studio — Websites Built
Around Your Business", business-first description, keywords without "WordPress developer,
Divi". About: title "About Tisha Di Fresco", Person JSON-LD with degree credential, awards,
`sameAs`.

**About section backgrounds (approved after visual review, 2026-10-05).** My Journey, Why
Work With Me and the closing "Have a Project in Mind?" CTA share one treatment, copied from
My Journey: `--timeline-bg-dark/-light` inline `backgroundImage`, `bg-cover bg-center
md:bg-fixed`, an `absolute inset-0 bg-midnight/60 z-10` overlay element, content at
`relative z-20`. Selected Work and Skills stay plain navy → approved rhythm artwork / plain /
artwork / plain / artwork. Hard section edges are intentional. Light-mode text on the two
new artwork sections uses `.services-body` (6.0–6.4:1); CTA spacing `py-24 md:py-28`.
Rejected for these sections (don't re-propose): flat `#273442`/`bg-gray-200`; the Services
CTA `.services-cta*` treatment (edge mask left ~20% artwork visible); the homepage
`.home-services` / `.home-reviews` treatments. `globals.css` was not changed for any of this.

**`bg-midnight/60` is a no-op, and the approved look relies on it.** `midnight` is not
defined in `tailwind.config.js`, so the class emits no CSS (computed overlay
`rgba(0,0,0,0)`). Defining it would darken all three sections — a design change, not a fix.

**`fetchPriority` warning — found in post-deploy verification, fixed.** React 18.3 logs
"React does not recognize the `fetchPriority` prop". It pre-existed on `/services`
(`ServicesPage.tsx` hero image, confirmed on the `4d9d80f` deploy) and became exposed on
About → Home through the new `ClarityHero` fallback. Fixed in both files with
`{...{ fetchpriority: 'high' }}` (lowercase attribute passes through; spread avoids React 18's
camelCase-only TS types). Same rendered `fetchpriority="high"`, same loading behaviour.
Verified on a `NODE_ENV=development` build: no warning on direct Home/About/Services,
About → Home, Home → Services, About → Services.

**Found alongside it, NOT changed (needs its own decision):**
- Netlify's site env sets `NODE_ENV=development`, so production ships React's development
  build (`react-vendor` ~340 KB vs ~142 KB locally) — which is why dev warnings show in the
  live console at all. Pre-existing.
- `SocialMediaCard.tsx` still uses camelCase `fetchPriority` (out of the fix's scope).

**Open items:** new résumé (set `RESUME_URL`); Dale Tiffany still lacks a crawlable route;
the two items directly above.
