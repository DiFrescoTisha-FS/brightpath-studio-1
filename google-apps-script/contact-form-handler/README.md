# Contact Form Handler (Google Apps Script) — v2

**Status (Oct 19, 2026):** Built and tested locally on `feature/newsletter-signup`. **Nothing
is deployed.** The live site still posts directly to deployment *Version 1*
(`AKfycbyW1GDP…`), which is unchanged.

## How it works

```
Browser ──POST /api/contact-inquiry──▶ Netlify Function `contact-inquiry`
                                         │  validates input, honeypot, rate limit
                                         │  adds CONTACT_SHARED_SECRET
                                         ▼
                              Apps Script /exec (this Code.gs)
                                         │  checks secret → locks → dedupes by submission ID
                                         │  appends row → reads it back → emails NOTIFY_TO
                                         ▼
           302 → script.googleusercontent.com → JSON {ok, code, submissionId, notification}
```

- The visitor sees "Thank you" **only** when the script replies `ok: true` with code `saved` or
  `duplicate` for the **same submission ID**. Apps Script answers HTTP 200 even when the script
  throws (with an HTML error page), so the HTTP status is never trusted.
- The Sheet row is the record of the inquiry. If the email fails, the inquiry still counts as
  received, and the row's **Notification** column says `failed`.
- A retry of the same message reuses its submission ID, so it can't create a second row. Editing
  the message gets a new ID, so the edit is never discarded.
- The browser waits up to 20 s and the function waits up to 15 s for Google. On a timeout the
  visitor is told the message *may* have arrived, and that retrying won't create a duplicate.
- Every failure keeps the visitor's name, email and message in the form, and offers
  contact@brightpathwebstudio.org and (828) 388-5743 instead.
- Logs contain submission IDs and outcome codes only, never names, emails or messages.

| Piece | File |
|---|---|
| Apps Script | `google-apps-script/contact-form-handler/Code.gs` |
| Netlify Function | `netlify/functions/contact-inquiry.js` (route `/api/contact-inquiry`) |
| Form | `src/pages/ContactPage.tsx` |
| Tests | `tests/` (`npm test`). They use an emulator and mocks and never contact Google. |

## Configuration

**Apps Script → Project Settings → Script properties**

| Property | Value |
|---|---|
| `SHARED_SECRET` | 64 random hex characters, e.g. from `openssl rand -hex 32`. Use different values for test and production. |
| `NOTIFY_TO` | `contact@brightpathwebstudio.org` (once the alias is verified, see step 1) |
| `SPREADSHEET_ID` | **Required for a standalone project** (production): the ID in the Sheet's URL, `docs.google.com/spreadsheets/d/<ID>/edit`. Optional for a project bound to the Sheet (the TEST setup), which falls back to that Sheet. Kept as a property so the production ID never appears in this public repo. A wrong or inaccessible ID fails without writing or emailing. |
| `SHEET_NAME` | Tab name. Optional, but **set it in production** (`Sheet1`) so v2 can never write to the wrong tab. If set but missing, the request fails rather than writing elsewhere. |

Script properties take effect immediately, without a redeploy.

**Netlify → Environment variables** (Functions scope, mark the secret as secret)

| Variable | Value |
|---|---|
| `CONTACT_SCRIPT_URL` | the web app `/exec` URL of the deployment to use |
| `CONTACT_SHARED_SECRET` | the same value as that script's `SHARED_SECRET` |

If either is missing, the form shows "isn't available right now", along with your email and
phone.

## Manual steps

### 1. Verify the contact@ alias receives mail
Send a message to contact@brightpathwebstudio.org from an outside account, such as a personal
Gmail, and confirm it arrives. Then check what happens to mail **the script itself** sends to
the alias in step 2. The script runs as the Google Workspace account that owns the Apps Script
project, and Gmail can file mail you send to your own alias under **Sent** only. If that happens,
add a Gmail filter or use the primary address in `NOTIFY_TO`.

### 2. Set up a separate test (needs your approval)
1. Create a **new blank** Google Sheet, e.g. "Contact Form Submissions — TEST". Don't use a copy
   of the real Sheet, so no customer data is duplicated.
2. Add the header row: `Timestamp | Full Name | Email | Message | Submission ID | Notification`.
3. **Extensions → Apps Script**, paste `Code.gs`, and save.
4. Set the script properties (a test `SHARED_SECRET`, plus `NOTIFY_TO`).
5. **Deploy → New deployment → Web app**: Execute as *Me*, Who has access *Anyone*. Authorize
   when asked. Google warns that the app is unverified because it's your own script; choose
   *Advanced → Go to …*. The script needs to view and manage the spreadsheet and to send email
   as you.
6. Put the test `/exec` URL and secret in a gitignored `.env` file in the project, as
   `CONTACT_SCRIPT_URL=…` and `CONTACT_SHARED_SECRET=…`. Then run `npx netlify dev`.
7. Tests to run against the **test** deployment:
   - A normal submission: the row appears, Notification is `sent`, and the email arrives.
   - The same message again: still one row.
   - Set `NOTIFY_TO` to `invalid`: the row is saved and Notification is `failed`.
   - Set `SHEET_NAME` to `DoesNotExist`: the visitor sees an error and nothing is written.
   - A name like `=1+1`: the cell shows the text `=1+1`, not `2`.
   - Restore the properties afterwards.

### 3. Production rollout (each step needs your approval)
Production v2 runs in its **own standalone Apps Script project** ("BrightPath Contact Form —
Production v2"). The original project bound to the Sheet, and its active deployment, stay
**completely untouched** until after the release has been watched; that deployment is what the
live site still posts to.

1. In the "Contact Form Submissions" Sheet, add `Submission ID` and `Notification` to E1/F1 of
   the submissions tab (`Sheet1`). v1 writes columns A–D only, so this doesn't affect it.
2. In the standalone project, paste this `Code.gs` and save. Then set the Script properties:
   - a **new** production `SHARED_SECRET`;
   - `NOTIFY_TO`;
   - `SPREADSHEET_ID` (the production Sheet's ID);
   - `SHEET_NAME` = `Sheet1`.
3. **Deploy → New deployment → Web app** (Execute as Me, Who has access: Anyone). Authorize,
   then copy the `/exec` URL.
   - A standalone script that opens a spreadsheet by ID asks for permission to "see, edit,
     create and delete all your Google Sheets spreadsheets". A bound script's prompt names its
     own Sheet, but it uses the same Sheets permission, so this isn't a wider permission.
   - The account it runs as must be able to edit the production Sheet.
4. Verify the new deployment without writing anything:
   - a GET returns `method_not_allowed`;
   - a POST with a wrong secret returns `unauthorized`;
   - a POST with the correct secret but an incomplete request returns `invalid_request`.
5. Optional, with approval: one clearly labelled test submission straight to the new
   deployment. Confirm the row (Submission ID, Notification = `sent`) and the email, then
   delete the row.
6. Set `CONTACT_SCRIPT_URL` and `CONTACT_SHARED_SECRET` in Netlify for the **Production context
   only**, marked secret. The test deployment stays the deploy-preview value.
7. Merge and deploy the site. Send one real test inquiry and confirm the row and the email.
8. After 48 hours with no problems, **archive the original project's deployment** under Deploy →
   Manage deployments. Its URL is public in older site code and git history.

**Why a new deployment, not a new version of the existing one?** v2 rejects requests without
the secret. Publishing it into the deployment the live site posts to would break the live form
until the new site went live. A separate deployment avoids that gap, and its URL only ever lives
server-side in Netlify, so visitors never see it change.

### Rollback
Until Version 1 is archived, roll back by republishing the previous Netlify deploy. The old site
posts to Version 1 exactly as before. The v2 deployment can stay; nothing else calls it.

## Known limitations
- The rate limit (8 requests per IP per 10 minutes) is per function instance, so it's
  best-effort only. The shared secret, honeypot and validation are the main spam defences.
- There's no automatic alert when a notification fails. Watch the Sheet's Notification column
  and the Netlify function logs (`contact: saved but notification email failed`).
- If Google is down, visitors see the error with your email and phone; nothing is queued.
- Workspace quotas: 1,500 email recipients a day, 30 simultaneous executions. Both are far
  above current volume.
