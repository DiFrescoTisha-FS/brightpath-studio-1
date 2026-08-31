---
name: reviews-testimonials-content-gap-deferred
description: Robin Walsh's and Gavin Di Fresco's testimonials may be missing from the live WordPress reviews feed — a deferred content/data task, not a code defect. Investigated in Phase 2; ReviewWidget.tsx/ReviewCard.tsx confirmed correct.
metadata:
  type: project
---

**Status:** Deferred content/data investigation. Explicitly NOT a code issue and NOT
actioned as code in Phase 2 — no application file was changed for this item.

During Phase 2 (approved 2026-08-31), `ReviewWidget.tsx` and `ReviewCard.tsx` were
re-reviewed and confirmed to correctly render whatever the API returns — no React/
application code defect was found. The suspected gap is that Robin Walsh's and Gavin Di
Fresco's testimonials may simply be absent from the live WordPress reviews feed that
powers the homepage `ReviewWidget` and the `/reviews` page (WordPress content is a
directory this steward and, per CLAUDE.md, casual sessions are instructed to leave alone
absent a specific task — see [[services-branch-scope-rules]]).

**How to apply:** if asked to "fix" missing testimonials, do not treat this as a code
task — the code path was verified correct in Phase 2. The actual next step is a content/
data investigation: confirming whether those testimonials exist in WordPress and are
published/approved in a way the feed picks up. This is a future task for whoever manages
WordPress content, not for a coding session touching `src/`.

See also [[phase-2-trust-evidence-approved]], [[blackmont-consultant-recommendations]]
(point 5, visible trust evidence — testimonials are part of that broader goal, but this
specific gap is content, not implementation).
