---
name: hero-injection-mirror-fact
description: Homepage hero markup lives in two synchronized places (vite.config.ts injected string + ClarityHero.tsx mirror) for LCP; changing hero copy requires editing both.
metadata:
  type: project
---

**Status:** Current implementation fact, verified directly in code on 2026-08-31.

`src/components/ClarityHero.tsx` (`ClarityHeroStructureMirror`) is **not imported or
rendered anywhere** in the app. Its own file header explains why: the real hero is
injected as a static HTML string directly into `index.html` by the
`brightpath-inject-static-hero` Vite plugin in `vite.config.ts`, so hero text paints
before React boots (LCP optimization). The component file exists purely so the injected
markup has a second, reviewable JSX location and an obvious place to keep in sync — it
is not a Tailwind class manifest (Tailwind's content scanner never reads the plugin
string, so the hero uses dedicated `.studio-hero`/`.studio-cta` CSS classes from
`src/styles/globals.css` instead of utility classes, specifically to avoid a purge
failure mode).

Confirmed current hero copy in both the injected plugin string and the mirror (as of
2026-08-31): eyebrow "WEBSITES BUILT FOR BUSINESS", H1 "Websites That Work
**Beautifully.**", lede "Custom websites built for speed, clarity, and growth—so your
online presence works as hard as you do.", CTAs "Start Your Project" (primary, →
`/contact`) and "View Our Work" (ghost, → `/portfolio`).

**Why this matters for the Strategy Gap discussion:** any homepage hero copy change
proposed to better translate capability into client outcome (see
[[blackmont-consultant-recommendations]]) has an architectural cost most people won't
expect — it must be edited in *two* places (the vite.config.ts injected string and
ClarityHero.tsx) or the prerendered/LCP-optimized snapshot will silently drift from the
live React-rendered hero. This is a real implementation constraint on that recommendation,
not a reason to avoid it, but it should be called out when reviewing any such plan/diff.

See also [[homepage-visual-system-approved]], [[prerender-architecture-facts]].
