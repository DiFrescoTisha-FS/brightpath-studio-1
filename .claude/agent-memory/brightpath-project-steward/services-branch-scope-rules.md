---
name: services-branch-scope-rules
description: feature/services-page-redesign is committed+pushed but not merged to main; leave backend/netlify/wordpress dirs and known pre-existing issues alone absent a specific task.
metadata:
  type: feedback
---

**Status:** Project/process rule, derived from CLAUDE.md's explicit instructions plus
verified current git state.

As of 2026-08-31: `feature/services-page-redesign` is at `fb8b2be`, tracking and up to
date with `origin/feature/services-page-redesign` (confirmed via `git branch -vv` and
`git status`). `main` is at `b9e4aa7`, one commit behind the homepage-redesign chain and
several commits behind the services/gold/background work. **The branch has not been
merged to main.** This steward does not know of any explicit "don't merge yet" statement
from the user beyond CLAUDE.md's framing of this work as a still-active session — treat
non-merge as the current state to report accurately, not as a rule to enforce
unprompted.

**Reason:** Do not merge, commit, or push on this steward's own initiative under any
circumstance — that's a hard constraint from this agent's role definition, independent
of branch state.

**Directories to leave alone absent a specific task** (per CLAUDE.md's explicit
instruction, restated in this agent's role definition): `backend/`, `netlify/functions/`,
`wordpress/`, `wordpress-plugin/`.

**Known pre-existing issues, deliberately left unfixed per CLAUDE.md — do not "helpfully"
fix these unless specifically asked:**
- `src/pages/ContactPage.tsx:16` — TS2717 conflicting `gtag` declarations.
- `netlify/functions/get-case-studies.ts:178` — unused `_context` lint error.
- `src/components/ui/GuidingLight.tsx:230` — missing hook dependency lint warning.
- `public/images` ~116 MB, ~34 files over 1 MB mostly unreferenced; `/case-study` ships
  10.6 MB with `main_pages1.png` alone at 5.5 MB, no `loading="lazy"` on most images.
- Theme pinning: `initializeTheme()` writes resolved theme to `localStorage` on first
  visit, permanently pinning it against later OS-level light/dark switches.
- About hero name (`TISHA DI FRESCO`) measures ~2.02:1 against its photo backdrop,
  below the 3:1 bar — needs a scrim, not a color change; every gold value makes it worse.
  Left alone on Aug 15 for that reason.
- Legacy `--services-card-*` CSS tokens in globals.css still carry a retired
  `44 91% 54%` gold value but nothing references them.

See also [[claude-md-drift-services-branch]].
