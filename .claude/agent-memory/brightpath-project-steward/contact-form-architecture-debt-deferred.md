---
name: contact-form-architecture-debt-deferred
description: Contact form submits client-side directly to a hardcoded Google Apps Script URL with no dev/prod separation and opaque no-cors failure modes; a second, unused Netlify function posts to GoHighLevel instead. Discovered during Phase 4, not addressed or approved for any implementation.
metadata:
  type: project
---

**Status:** Known technical debt. Discovered incidentally while investigating the Phase 4
success-message copy change ([[phase-4-conversion-paths-approved]]) — not independently
audited beyond what's described below, and explicitly not acted on. No code was changed
for this item during Phase 4.

**What was found, verified directly in the repo on 2026-09-01:**

- `src/pages/ContactPage.tsx` submits directly, client-side, to a hardcoded external
  Google Apps Script Web App URL, held in the `CONTACT_FORM_URL` constant
  (`https://script.google.com/macros/s/.../exec`). This is the only path the live form
  actually uses.
- Per an existing in-repo code comment (not independently verifiable from this repo, since
  the Apps Script implementation itself lives outside it), that endpoint saves submissions
  to a Google Sheet and sends a Google Workspace email notification. The actual recipient
  address and full endpoint behavior cannot be confirmed from this repository.
- **No dev/prod separation**: `localhost` and production hit the exact same hardcoded
  endpoint. There is no sandbox or test mode — any local submission during testing is a
  real production submission (same Sheet, same email trigger).
- The fetch call uses `mode: 'no-cors'` (required for Google Apps Script). This means
  network-level/transport failures are caught and surfaced to the user as an error, but
  server-side or application-level failures *inside* the Apps Script are invisible to the
  frontend — the response is opaque, so the UI can show "sent successfully" even if the
  Apps Script itself failed internally.
- A **second, separate, unused implementation exists**: `netlify/functions/submit-contact-form.js`,
  wired up via a `netlify.toml` redirect (`/api/submit-contact-form` →
  `/.netlify/functions/submit-contact-form`), which posts to the GoHighLevel CRM API
  instead. The current frontend does not call this endpoint at all — it's dead code from
  the frontend's perspective, but it is deployed and live at that route.

**How to apply:** this is flagged as a candidate for a future dedicated contact-form/
integration reliability audit — not scheduled, not prioritized, just recorded so it isn't
lost. If a future session is asked to touch contact-form reliability, error handling, or
CRM integration, start here rather than rediscovering this from scratch. Per
[[services-branch-scope-rules]] and CLAUDE.md's instruction to leave `netlify/functions/`
alone absent a specific task, do not touch either endpoint without an explicit task to do
so.

See also [[phase-4-conversion-paths-approved]] (where this was discovered), CLAUDE.md's
`ContactPage.tsx` description ("Contact form with Google Apps Script integration +
honeypot spam protection").
