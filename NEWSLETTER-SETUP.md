# The BrightPath Update (MailerLite) — Setup and Launch

**Status:** **Off in production.** Nothing appears on the live site and the production function
refuses all signups (503).

- **Code:** the launch hardening (no profile overwrites, no enumeration, required Origin,
  minimum submission time, tests) is **on `main`**. It was merged with PR #23 on Oct 22, 2026
  (`ff46a89`, production deploy `6ada6341dbc60eb37fa3173d`).
- **Production MailerLite credentials are set**, but both activation flags are still unset.
- **Signups verified against live MailerLite on Deploy Preview #23** (TEST group). See
  "Test log".
- **Not yet launched:** see "Remaining checks before launch" under "Launch checklist".

---

## What it is

A signup for **The BrightPath Update**, our newsletter (sent approximately once a month), at the top of the site footer,
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
3. ✅ **Postal address for email footers.** CAN-SPAM requires a valid physical postal address
   in every commercial email, and MailerLite requires one in its campaign footer. BrightPath's
   official business mailing address is **PO Box 186, Edneyville, NC 28727**. It's set in
   MailerLite's company details (recorded Oct 27, 2026). The website deliberately still shows no
   street address.
4. ◐ **Privacy Policy.** The launch version went live on Oct 22, 2026 (frequency, consent
   records, double opt-in for new addresses only, email tracking, retention). A follow-up adds
   the **welcome email** sent after confirmation.
   - Still to do when that follow-up is released: set `LAST_UPDATED` in
     `src/pages/PrivacyPage.tsx` to the **publication date** (not the editing date).
5. ✅ **Production MailerLite credentials** (recorded Oct 27, 2026):
   - `MAILERLITE_API_KEY` (a separate production token) and `MAILERLITE_GROUP_ID` (the
     **BrightPath Updates** group) are set for the **Production** context;
   - the TEST token and TEST group stay in **Deploy Previews**;
   - `NEWSLETTER_ENABLED` and `VITE_NEWSLETTER_ENABLED` remain **unset** in Production.
6. ✅ **Welcome email** (recorded Oct 27, 2026):
   - designed and test-sent, with its website button and its footer (PO Box) checked;
   - the **"Simple welcome email"** automation is **active**, triggered when a subscriber
     joins **BrightPath Updates**.
   - It has **not** yet been seen running after a real API signup; see "Remaining checks
     before launch".
7. ✅ In MailerLite, create a **TEST** group and a test-only API token (group
   "BrightPath Newsletter — TEST", Oct 21, 2026).
8. ✅ Set the four variables for the **Deploy Preview** context only, pointing at the TEST
   group (Oct 21, 2026; production has none of them).
9. On the deploy preview, test with addresses you own:
   - ✅ New address with a first name: confirmation email received and confirmed; subscriber
     **Active** in the TEST group with the first name in the Name field (Oct 21, 2026 — see
     "Test log").
   - ✅ Subscriber data fields checked: subscription date, signup IP, opt-in IP and opt-in date
     are all recorded (see "Privacy Policy" below).
   - ✅ An address already in MailerLite: same message, no duplicate, no group change, no
     confirmation email (Oct 21, 2026).
   - ✅ New address with no first name: created **Unconfirmed** in the TEST group, confirmation
     email received; confirming made it **Active** and recorded the opt-in date and IP (see
     "Test log", second round).
   - ◐ The same address again: an **Active** address got the same message and **no** second
     confirmation email (verified). Not yet verified: submitting it with a **different first
     name** and checking that the name in MailerLite is **unchanged**.
   - ✅ An unconfirmed address submitted again: same message, no new email, still Unconfirmed.
   - ✅ An address you've unsubscribed: same message, no new email, still Unsubscribed.
   - ✅ An unconfirmed address removed with **Delete**, then submitted again: same message, a
     **new** confirmation email, and the address is back in the TEST group as Unconfirmed. So
     the monthly Delete cleanup doesn't stop people re-subscribing through the form.
   - ☐ An invalid address, and a submission with the server flag switched off (both covered by
     `npm test`, but not yet checked on a deploy preview).
   - ☐ Welcome email timing: this **can't be tested on a deploy preview**, because the
     automation watches **BrightPath Updates** and previews use the TEST group. It's covered by
     the live signup test below.
10. ☐ **TEST cleanup:**
    - delete the TEST subscribers and revoke the TEST token in MailerLite;
    - then set the Deploy Preview `NEWSLETTER_ENABLED` to off (or remove the Deploy Preview
      newsletter variables). Otherwise later PR previews show a form that can't subscribe
      anyone.
11. ☐ **Activate** (Production context only, one step at a time):
    - set `NEWSLETTER_ENABLED=true` (takes effect without a rebuild);
    - then set `VITE_NEWSLETTER_ENABLED=true` and redeploy production (build time).

### Remaining checks before launch

1. ☐ **Confirmation email footer.** API double opt-in sends MailerLite's own confirmation
   email, not the welcome email's template. Check that its footer shows the updated company
   details and the PO Box.
2. ☐ **Automation trigger timing.** The function adds new subscribers to BrightPath Updates
   while they're still **Unconfirmed**. MailerLite's documentation says automations don't run
   for unconfirmed subscribers, but it doesn't state that "joins a group" then fires **on
   confirmation**. Confirm the welcome email arrives **after** confirming, never before, and
   check the automation's re-entry setting:
   - an address removed with Delete that signs up again re-joins the group, so it may get the
     welcome email again;
   - a known address that resubmits never re-joins, so it doesn't.
3. ☐ **Complete signup-to-welcome test** on production, after step 11, with an address you own:
   form → generic success message → confirmation email → confirm → status **Active** in
   BrightPath Updates → **welcome email** arrives, with the website button and PO Box footer
   working. Then Delete the test subscriber if you don't want it on the list.
4. ☐ **TEST environment cleanup** (step 10).
5. ☐ **Launch verification** after the production redeploy:
   - the band and form appear in both themes;
   - all 12 prerendered routes load;
   - the newsletter function no longer answers 503;
   - the **contact form** still loads and its function answers normally;
   - the Privacy Policy shows the welcome-email sentence and its publication date;
   - there are no console errors.

   Only then announce the newsletter.

**Rollback at any time:**
- set `NEWSLETTER_ENABLED` to anything except `true` to stop signups at once;
- set `VITE_NEWSLETTER_ENABLED=false` and redeploy (or republish the previous deploy) to hide
  the form.

**Before the first campaign:** set each campaign's tracking to match the policy (open tracking
on, Google Analytics off).

## Test log

**Oct 21, 2026 — Deploy Preview #23** (deploy `6ad8ee522254dbad2f7d2c59`, commit `405decb`,
TEST group, Deploy-Preview-only variables; production untouched). Test addresses and IPs are
deliberately not recorded here.

| Test | Result |
|---|---|
| Form appears on the preview (footer, "The BrightPath Update") | ✅ |
| New Gmail plus-address submitted, with a first name | ✅ Success message shown |
| MailerLite double opt-in email | ✅ Received; confirmation clicked |
| Subscriber in "BrightPath Newsletter — TEST" | ✅ 1 Active; activity shows activation by email confirmation |
| First name | ✅ Saved in the subscriber's Name field |
| Subscriber data fields | ✅ Subscription date, signup IP, opt-in IP and opt-in date all recorded |
| Address already in MailerLite submitted | ✅ Same message; no duplicate, no group change, no confirmation email |

What this establishes: the lookup returns 404 for a new address (so new signups are created),
known addresses are left untouched, API double opt-in is on, the first name reaches
MailerLite, and the preview's token, group ID and flags are correct. Function logs for deploy
previews aren't visible in Netlify's dashboard, so outcomes were checked in MailerLite.

**Second round, Deploy Preview #23** (TEST group). Verified by the owner and recorded here on
Oct 22, 2026. The test date, deploy and commit weren't recorded. No addresses, names or IPs
are kept here.

| Test | Result |
|---|---|
| New address, no first name | ✅ Created Unconfirmed in "BrightPath Newsletter — TEST"; confirmation email arrived |
| Confirmation link clicked | ✅ Status Active; opt-in date and IP recorded |
| Same **Active** address submitted again | ✅ Generic success message; no second confirmation email |
| **Unconfirmed** address submitted again | ✅ Generic success message; no new email; still Unconfirmed |
| **Unsubscribed** address submitted again | ✅ Still Unsubscribed; no new confirmation email |
| Unconfirmed address **Deleted** in MailerLite, then submitted again | ✅ Success message **and** a new confirmation email; shown as Unconfirmed in the TEST group |

The Delete → re-subscribe result shows that after **Delete**, the function's lookup no longer
finds the address (it's treated as new), so the monthly cleanup is safe for the form. No code
change was needed.

**To disable** in an emergency, set `NEWSLETTER_ENABLED` to anything except `true`. This
takes effect without a rebuild, and the form shows "isn't available right now". To hide the
form as well, set `VITE_NEWSLETTER_ENABLED=false` and redeploy.

## Privacy Policy

`src/pages/PrivacyPage.tsx` was rewritten on Oct 19, 2026 to match what the site actually
does. Its newsletter section is `#newsletter`, and the form's privacy link points there.

**Signup and opt-in data — what's verified:**

- The function sends MailerLite `ip_address`, taken from Netlify's
  `x-nf-client-connection-ip` header, and only when Node's `net.isIP` accepts it. It sends no
  timestamps and no `status`.
- **Verified on Oct 21, 2026** (test subscriber, Deploy Preview #23): MailerLite records all
  four fields for an API double opt-in signup —
  - subscription date (`subscribed_at`),
  - signup IP (`ip_address`, from the function),
  - opt-in IP (`optin_ip`, from the confirmation click),
  - opt-in date (`opted_in_at`).

**MailerLite settings the policy relies on** (checked by the owner, Oct 22, 2026). If any of
these change, update Section 3 of the policy:

- Campaign open tracking: **on**.
- Google Analytics tracking in the campaign defaults: **off**. The policy doesn't say newsletter
  clicks reach Google Analytics.
- E-commerce link tracking: **off**.
- Link tracking has UTM values configured, but it hasn't been verified that sent emails carry
  them, so the policy doesn't mention UTM tags.
- Click tracking: MailerLite's documentation says regular clicks are always tracked, but this
  hasn't been verified in our reports. The policy says MailerLite "may" record clicks.

**What the policy says** (Section 3 `#newsletter` and Section 8; updated Oct 22, 2026):

- The newsletter is **The BrightPath Update**, sent **approximately once a month**. The form
  says the same.
- **Consent records:** subscription date, signup IP, confirmation date and confirmation IP.
- **Double opt-in for new addresses only.** An address already on the list isn't changed and
  gets no email.
- **Unsubscribing withdraws consent.** The form can't reactivate an unsubscribed address;
  people email us instead.
- **Retention:**
  - active subscribers: kept while subscribed;
  - unconfirmed signups: removed from the list (MailerLite **Delete**) by the **manual** monthly
    review below, once more than 30 days old. The policy says this doesn't necessarily erase
    MailerLite's history;
  - unsubscribed records: kept as reasonably necessary to honor the opt-out and document
    consent. They are **not** removed automatically;
  - deletion requests: handled individually.
- **No response deadline is promised** for privacy requests.

## Monthly maintenance

Once a month, in MailerLite (production group). Don't copy subscriber details anywhere else.

1. **Subscribers → Unconfirmed.** Find signups that have been unconfirmed for more than 30
   days (MailerLite documents no automatic expiry) and remove them with **Delete**.
   - Delete takes them off the mailing list, but MailerLite keeps their history in case they
     re-subscribe. The policy says only that they're removed from our list, not that their
     data is erased.
   - Verified on the TEST group: a Deleted address that signs up again through the form gets
     a new confirmation email (see "Test log").
   - **Don't use Forget for this cleanup.** Forget permanently erases a subscriber within 30
     days, can't be undone, and blocks the address from being re-added for 30 days. It's for
     individual erasure requests (step 3).

   Basis: MailerLite's help docs (Delete keeps information; Forget erases it), plus guidance
   from MailerLite's AI support assistant, LiteBot (Oct 2026, not a human representative): use
   Delete for routine cleanup of unconfirmed subscribers, and keep Forget for erasure requests.
2. **Subscribers → Unsubscribed.** Review the list only. Don't reactivate anyone, and don't
   delete or forget unsubscribed records in bulk: the record is what stops them being emailed
   again, and the signup form never re-subscribes a known address.
3. **Privacy requests** (access, correction, deletion) come in by email. Handle each one
   individually, in MailerLite.
   - **Correction:** edit the subscriber's name or email address.
   - **Deletion / erasure:** use **Forget**, MailerLite's permanent erasure, on that one
     subscriber's profile. Delete would keep their data. After Forget there's no record of an
     earlier unsubscribe, so tell the person a future signup would start fresh.
4. **Record that the review was done:** the date, and the number of records removed. Keep this
   in a private admin note, never in this public repository, and never record email addresses,
   names or IP addresses.

## Local review

- `npm test` covers the function against a mocked MailerLite; nothing is contacted.
- `npx netlify dev` runs the function. Add `VITE_NEWSLETTER_ENABLED=true` to a gitignored
  `.env.local` (or prefix the command with it) to show the form. Without MailerLite variables
  the function answers "unavailable", which is safe.
- Plain `npm run dev` has no functions, so submitting shows the generic error.
- Local signups would be **real** signups once real credentials are present. Point local
  testing at a TEST group, or test on a deploy preview.
