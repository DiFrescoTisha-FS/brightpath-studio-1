---
name: about-page-refresh
description: About page refresh (2026-10-05) — Founder & Frontend Engineer positioning, Selected Work (AweStruck + Dale Tiffany), grouped skills, hero scrim, metadata cleanup and hidden-hero <h1> fix; user-reviewed on feature/about-page-refresh, NOT yet committed.
metadata:
  type: project
---

**Status:** Implemented on branch `feature/about-page-refresh` (branched from `main` at
`4d9d80f`) and reviewed by the user in two rounds on 2026-10-05. **Not committed, not
merged, not deployed** as of this note. When it is committed, record the hash here
rather than creating a new note.

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

**Open items:** new résumé (set `RESUME_URL`); Dale Tiffany still lacks a crawlable route.
