---
name: strategy-gap-analysis
description: A prior session's repo-review analysis responding to Blackmont feedback — findings that gaps are copy/emphasis/surfacing, not structural. Analysis/recommendation, not an approved decision.
metadata:
  type: project
---

**Status:** Consultant recommendation / analysis-derived recommendation. Not approved.
Not implemented. Same rule as [[blackmont-consultant-recommendations]]: do not promote
to approved decision without the user explicitly deciding.

A prior session apparently reviewed the BrightPath repository against the Blackmont/
Grace Lo feedback and produced this analysis (relayed via the orchestrating session on
2026-08-31; this steward has not independently re-derived every claim below, only the
hero-injection point which is separately verified as a fact — see below):

- Conclusion: nothing structural is missing; the primary gaps are copy, emphasis, and
  surfacing existing material — not another redesign.
- Genuine trust evidence (real case-study metrics, etc.) already exists in the
  repository, but much of the strongest evidence is reportedly buried rather than
  surfaced in homepage/portfolio teaser content. (Spot-checked 2026-08-31: confirmed the
  repo does have a dedicated case-study data/component architecture —
  `src/data/caseStudies`, `src/hooks/useCaseStudies.ts`, `src/types/caseStudy.ts`, and
  per-client components like `DaleTiffanyCaseStudy.tsx`, `AngelCityMassageCaseStudy.tsx`
  — so the claim that genuine case-study material exists in-repo is plausible and
  consistent with what's there; this steward did not evaluate whether it's "buried" on
  the homepage/portfolio teasers, which would require a content-level judgment call.)
- Homepage client-outcome messaging is described as "directionally close" but still
  framed more around BrightPath's capabilities than the client's customer outcomes.
- Ongoing maintenance/support exists on the Services page but isn't sufficiently visible
  elsewhere on the site.
- Personal story and SEO foundations are already strong and should be protected, not
  changed.
- Homepage hero copy has an architectural sync constraint (the vite.config.ts injected
  string + ClarityHero.tsx mirror) that any hero copy change must account for. **This one
  sub-point is a current implementation fact, independently verified in code — see
  [[hero-injection-mirror-fact]] — not itself a recommendation.**

**How to apply:** Same as [[blackmont-consultant-recommendations]] — reference criteria
for anti-drift review of any proposed homepage/trust-evidence/support-visibility work,
not a mandate. If the user asks this steward to implement the "Strategy Gap Report,"
redirect to the main session/coding agent per this agent's role definition.
