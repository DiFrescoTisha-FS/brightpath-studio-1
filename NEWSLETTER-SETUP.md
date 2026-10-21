# The BrightPath Update (MailerLite) — Setup and Launch

**Status:** On `main` since `aa1bec5`, **off by default**. Nothing appears on the live site
and the function refuses all signups until the flags below are set. Launch hardening (no
profile overwrites, no enumeration, tests) is on `feature/newsletter-launch-hardening`.
**Not yet verified against live MailerLite.** No real subscriber has been created.

---

## What it is

A signup for **The BrightPath Update**, our monthly newsletter, at the top of the site footer,
so it appears on every page. It has an optional first name, a required email, a **Keep Me
Updated** button, and a short privacy note linking to `/privacy-policy#newsletter`. There's no
popup or entrance animation.

| Piece | File |
|---|---|
| Form component | `src/components/NewsletterSignup.tsx` |
| Placement | `src/components/ui/Footer.tsx` (renders only when enabled) |
| Styles | `src/styles/globals.css`, "NEWSLETTER SIGNUP (footer)" |
| Server function | `netlify/functions/newsletter-subscribe.js` |
| Tests | `tests/newsletter-subscribe-function.test.js` (`npm test`; MailerLite is mocked) |
| Route | `netlify.toml`: `/api/newsletter-subscribe` → the function |
| Env template | `.env.example` |

## How it works

1. The browser posts `{ email, firstName, bp_newsletter_extra, elapsedMs }` to
   `/api/newsletter-subscribe`. `bp_newsletter_extra` is a hidden honeypot, deliberately not
   named `company` or `website`, which autofill and password managers fill in. `elapsedMs` is
   the time since the form appeared (see "Minimum submission time" below).
2. The Netlify Function checks the Origin header (required), the flags, the honeypot, the
   minimum submission time, the input and the rate limit.
3. It **looks the address up** in MailerLite (`GET /api/subscribers/{email}`).
   - **Already known** (any status: active, unconfirmed, unsubscribed, bounced, junk): the
     function **changes nothing** and answers as if it were a new signup.
   - **Not found (404)**: it creates the subscriber (`POST /api/subscribers`) in the
     **BrightPath Updates** group, with `fields.name` only when a first name is given and
     `ip_address` only when Netlify's client IP header is a valid IP.
4. The function **never sends `status`**, so MailerLite's account-level API double opt-in
   setting decides what happens. Sending `status: "active"` would skip confirmation.
5. The browser only ever receives a short status code. It never sees the API token,
   MailerLite's response or any subscriber data.

**Why existing addresses are left alone.** MailerLite's create endpoint is an upsert: posting
an existing address updates that subscriber. Without the lookup, anyone who knew a
subscriber's address could overwrite their name, add them to the group without consent, or
trigger repeat confirmation emails. The trade-off: a person who has unsubscribed, or who lost
their confirmation email, can't fix that through the form. The success message points them to
the contact page, and they can be handled by hand in MailerLite.

**Why every accepted signup gets the same answer.** If the form said "already subscribed", it
would tell a stranger whether an address is on the list. Response code, body and headers are
identical for new and known addresses (a test enforces this). The one remaining difference is
timing: a new address makes two MailerLite calls instead of one.

| Situation | Function answer | Visitor sees |
|---|---|---|
| New address, created | 200 `pending_confirmation` | "Thanks for signing up! If this is a new subscription, you'll get an email shortly asking you to confirm it. Nothing arrived? Check your spam folder, or contact us." |
| Address already known (any status) | 200 `pending_confirmation` | Same message; nothing changes in MailerLite |
| Honeypot filled | 200 `pending_confirmation` | Same message; MailerLite isn't contacted |
| `elapsedMs` missing, not a number, or under 3000 | 200 `pending_confirmation` | Same message; MailerLite isn't contacted (the real form never sends this) |
| Missing / malformed email, or MailerLite 422 on the email | 400 `missing_email` / `invalid_email` | Field error |
| Too many attempts (ours or MailerLite's 429) | 429 `rate_limited` | "Too many attempts…" |
| Flags off or MailerLite variables missing | 503 `unavailable` | "Newsletter signup isn't available right now…" |
| MailerLite error, timeout (10 s for both calls) or network failure | 502 `error` | Retryable error; email kept in the field |
| Bad JSON, non-object, body over 2 KB | 400 / 413 `invalid_request` | Generic error |
| No Origin header, `null`, or another website's origin | 403 `forbidden` | Generic error |

**Logs** carry outcome codes, MailerLite status codes and (for 422s) the names of rejected
fields only. They never contain email addresses, names, IP addresses or the token; a test
checks this.

**Abuse protection:**

- Double opt-in is the real safeguard: nobody becomes an active subscriber without clicking
  the confirmation email.
- Existing addresses are never written to, so the same address can't be sent repeated
  confirmation emails through the form.
- Honeypot field.
- **Required Origin header.** Uses the shared validator, but unlike the contact form a
  missing header is refused: browsers always send Origin on a POST, so only scripts omit it.
  The form's `fetch` sets `referrerPolicy: 'strict-origin-when-cross-origin'` so a stricter
  page-wide policy could never turn its Origin into `null`. A script can still forge the
  header; this stops casual tools, not a determined attacker.
- **Minimum submission time** (below).
- Server-side validation and length limits (email ≤ 254, name ≤ 100, body ≤ 2 KB).
- Control characters stripped from input.
- Allowed origins (shared with the contact form, `netlify/lib/allowed-origin.js`): the live
  domain, this site's Netlify deploys, and localhost under `netlify dev`.
- 5 requests per IP per 10 minutes. This limit is per function instance, so it's
  best-effort only.
- Duplicate submissions are blocked client-side.

**Minimum submission time.** The function ignores signups reporting less than
`MIN_ELAPSED_MS` (3000 ms) since the form appeared, or none at all, and answers them like the
honeypot so a bot learns nothing. The form never refuses a person for being quick: if someone
submits sooner (autofill makes 1–2 s possible), it waits out the rest of
`NEWSLETTER_MIN_FILL_MS` (3250 ms, a margin for timer jitter) while the button shows
"Subscribing…" and the form is `aria-busy`, then sends. It uses `performance.now()`, so a
clock change can't shorten the wait. Keyboard and assistive-technology users only take longer,
so they're unaffected. A test fails if the form's value ever drops to or below the function's.
This check stops scripts that post to the endpoint without running the form; a headless
browser that runs the page's JavaScript passes it, because the form waits for it too.

**Remaining risk:** a script can still submit addresses it doesn't own, causing **one**
confirmation email per new address. Stronger protection (for example Cloudflare Turnstile)
is a separate decision; evaluate it before promoting the newsletter publicly.

## ⚠️ Double opt-in: the form's setting does NOT apply here

Turning on double opt-in for the **BrightPath Newsletter Signup** form only covers people
who sign up *through that MailerLite form*. MailerLite treats API signups separately:

- They only get a confirmation email when **Account settings → Subscription settings →
  "Double opt-in for API and integrations"** is turned on.
- That setting sends **its own confirmation email**, which is **not** the form's confirmation
  email. On the free plan it uses MailerLite's default template; customising it needs an
  upgrade.
- With the setting off, API signups go straight to **active** with no confirmation. The
  function logs an error in the Netlify function logs if MailerLite ever creates an active
  subscriber this way.

The MailerLite embedded form itself isn't used. You can keep it as a fallback.

## What you need to supply

Set these in **Netlify → Site configuration → Environment variables**. Never put the token
or group ID in a `VITE_` variable, because those are compiled into public JavaScript.

| Variable | Value | Scope |
|---|---|---|
| `MAILERLITE_API_KEY` | MailerLite → Integrations → MailerLite API → Generate new token (shown once). Mark it **secret**. Use a separate token for testing. | Functions |
| `MAILERLITE_GROUP_ID` | ID of the group (Subscribers → Groups → open the group; the ID is in the URL). Use a TEST group while testing. | Functions |
| `NEWSLETTER_ENABLED` | `true` to accept signups. Anything else returns "unavailable". | Functions |
| `VITE_NEWSLETTER_ENABLED` | `true` to show the form. Read at **build time**, so a redeploy is needed after changing it. | Builds |

The two flags are separate on purpose. The server flag is an instant kill switch for
signups, and the build flag controls whether visitors see the form at all.

Set test values for the **Deploy Preview context only**, so production can never pick them
up — the same approach as the contact form's `CONTACT_*` variables.

## Launch checklist

1. ✅ MailerLite sending domain `brightpathwebstudio.org` is authenticated and the sender email
   is verified (confirmed by the owner, Oct 19, 2026).
2. ✅ "Double opt-in for API and integrations" is **on** (free plan: default confirmation
   template).
3. ❌ **Postal address for email footers.** CAN-SPAM requires a valid physical postal address
   in every commercial email, and MailerLite requires one in its campaign footer. The site
   deliberately shows no street address; a P.O. box or virtual mailbox is planned. This blocks
   *sending* newsletters, not testing the signup.
4. Privacy Policy review for launch (newsletter frequency, data kept after unsubscribing, and
   that a confirmation email goes to *new* subscriptions). Bump `LAST_UPDATED` if it changes.
5. In MailerLite, create a **TEST** group and a test-only API token.
6. Set the four variables for the **Deploy Preview** context only, pointing at the TEST group.
7. On the deploy preview, test with addresses you own:
   - New address with a first name: you get the confirmation email, the subscriber shows as
     *unconfirmed* in the TEST group with the name, and becomes *active* after you click
     confirm. Note which of `ip_address`, `subscribed_at`, `optin_ip` and `opted_in_at` are
     filled in (see "Privacy Policy" below).
   - New address with no first name.
   - The same address again with a different first name: same message, **no** second
     confirmation email, and the name in MailerLite is **unchanged**.
   - An unconfirmed address submitted again: same message, no new email.
   - An address you've unsubscribed: same message, still unsubscribed.
   - An invalid address, and a submission with the server flag switched off.
   - If a welcome automation exists, check that it runs only after confirmation.
8. Delete the test subscribers and the TEST group's token.
9. Set the production variables (Production context only), server flag first, then rebuild
   with the build flag on, then one live signup with your own address.

**To disable** in an emergency, set `NEWSLETTER_ENABLED` to anything except `true`. This
takes effect without a rebuild, and the form shows "isn't available right now". To hide the
form as well, set `VITE_NEWSLETTER_ENABLED=false` and redeploy.

## Privacy Policy

`src/pages/PrivacyPage.tsx` was rewritten on Oct 19, 2026 to match what the site actually
does. Its newsletter section is `#newsletter`, and the form's privacy link points there.

**Signup IP and timestamp — what's verified:**

- The function sends MailerLite `ip_address`, taken from Netlify's
  `x-nf-client-connection-ip` header, and only when Node's `net.isIP` accepts it. It sends no
  timestamps and no `status`.
- MailerLite's API documents `ip_address` and `subscribed_at` as fields on the subscriber
  record, and fills in `subscribed_at` itself.
- **Not verified:** whether MailerLite records the *confirmation* click's IP and time
  (`optin_ip` / `opted_in_at`) for API double opt-in. The Privacy Policy therefore claims only
  the signup IP and subscription time.

## Local review

- `npm test` covers the function against a mocked MailerLite; nothing is contacted.
- `npx netlify dev` runs the function. Add `VITE_NEWSLETTER_ENABLED=true` to a gitignored
  `.env.local` (or prefix the command with it) to show the form. Without MailerLite variables
  the function answers "unavailable", which is safe.
- Plain `npm run dev` has no functions, so submitting shows the generic error.
- Local signups would be **real** signups once real credentials are present. Point local
  testing at a TEST group, or test on a deploy preview.
