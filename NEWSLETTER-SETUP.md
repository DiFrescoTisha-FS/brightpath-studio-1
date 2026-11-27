# The BrightPath Update (MailerLite) — Setup and Launch

**Status: LIVE in production since Nov 26, 2026, 03:12 UTC.** The footer band appears on
every page, and new signups go to **BrightPath Updates** with double opt-in, then the welcome
email. Current focus: subscriber acquisition and the inaugural edition.

- **Activation:** `NEWSLETTER_ENABLED` and `VITE_NEWSLETTER_ENABLED` were set to `true` in the
  **Production context only**, followed by one production deploy (`6b07a38fd4a87a8d14616ced`).
  Deploy previews keep the TEST group.
- **Final manual subscription test: passed** (owner-reported, after activation), with a
  genuinely new address through the live footer form. See "Test log".
- **Welcome email redesigned** by the owner after launch (owner-reported). The "Simple welcome
  email" automation is still active.
- **Current production deploy and rollback options:** "Rollback at any time" below.
- **Real subscribers are being invited.** During any verification, never create, delete or
  edit subscribers. A malformed request to the endpoint is the safe probe: 400 means on, 503
  means off.
- **Still open:** recording the individual email checks, the welcome re-entry setting, a
  decision on the test accounts in BrightPath Updates, and the TEST environment, which is
  retained by owner decision on Nov 27. See "Outstanding newsletter maintenance".
- **History:**
  - the launch-hardening code reached `main` with PR #23 (Oct 22, 2026, `ff46a89`);
  - production signups were proven on Oct 27;
  - the Nov 16 restore was explained on Nov 25 (**only ever Delete Unconfirmed subscribers**;
    see "Deleted subscribers are restored, not recreated").

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
the contact page, and they're handled by hand. See "Signup enquiries" below.

This applies to the **whole MailerLite account**, not just BrightPath Updates. Someone who is
already in the account but **not in BrightPath Updates** (for example, only in another group)
is also left unchanged and not added. Adding them automatically would skip double opt-in for
this newsletter, and would let anyone put a stranger's active address on the list.

**Deleted subscribers are restored, not recreated** (verified in production, Nov 16, 2026).
MailerLite's **Delete** hides a subscriber but keeps the record. The function's lookup doesn't
find a Deleted address (it gets 404), so it treats the address as new and posts it. MailerLite
then **restores the old record with its previous status and history**, instead of creating a
fresh one:

| Status when Deleted | Submitting the address again | Verified |
|---|---|---|
| **Unconfirmed** | Restored as Unconfirmed. A **new confirmation email** is sent, so double opt-in still applies | ✅ Oct 22, 2026 (TEST group) |
| **Active** | Restored as **Active**, with the **original** opt-in date. **No confirmation email.** It's added to BrightPath Updates, and the welcome automation fires | ✅ Nov 16, 2026 (production) |
| **Unsubscribed** | Not tested | — |

**Confirmed vs. untested.**
- **Confirmed** by observation (MailerLite activity):
  - an Unconfirmed subscriber that was Deleted and resubmitted gets a new confirmation email
    (TEST group, Oct 22);
  - an Active subscriber that was Deleted and resubmitted is restored as Active with its
    original opt-in, no confirmation, added to the group, and the welcome email is sent
    (production, Nov 16).
- **Inferred, not tested:** the function's lookup returns 404 for a Deleted address. That's the
  only way it could have posted on both occasions, but the 404 itself wasn't logged.
- **Untested:**
  - Deleted **Unsubscribed** subscribers;
  - how long MailerLite keeps Deleted records restorable;
  - what happens after **Forget** once its 30-day block ends;
  - the HTTP status MailerLite returns for a restore (the function accepts both 200 and 201).

  Don't rely on any of these without testing first.

So deleting an Active subscriber would let *anyone* who submits that address put it straight
back on the list without that person confirming. The function can't prevent this, because
MailerLite's lookup doesn't report Deleted records. **The safeguard is procedural: Delete only
Unconfirmed subscribers.**
- Never Delete Active or Unsubscribed subscribers.
- To take a test or Active account off the newsletter, **remove it from the BrightPath Updates
  group** instead (the record stays known, so the form won't re-add it).
  - **Consequence:** that person **can't rejoin through the form by themselves**. The address
    is still known (Active, not in the group), so the function leaves it unchanged; it logs
    `active not-in-group`, and the visitor sees the generic success message with no email.
  - To rejoin, they email us, and we add them back to the group by hand with that email as the
    consent record ("Signup enquiries", the row for Active but not in BrightPath Updates).
  - This is the same accepted trade-off as for unsubscribed people. For the owner's own test
    accounts it doesn't matter.
- For erasure requests, use **Forget**.

See "Monthly maintenance".

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
fields only. They never contain email addresses, names, IP addresses, the group ID or the
token; tests check this.

For a known address the line reads
`newsletter: address already known, left unchanged <status> <membership>`:
- `<status>` is `active`, `unconfirmed`, `unsubscribed`, `bounced`, `junk`, or `other` for
  anything unexpected;
- `<membership>` is `in-group`, `not-in-group`, or `group-unknown` (MailerLite's reply had no
  groups list).

The log can't tell you *who* signed up, only what kind of case it was.

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
| `NEWSLETTER_ENABLED` | `true` to accept signups. Anything else returns "unavailable". Takes effect on the **next deploy**. | Functions |
| `VITE_NEWSLETTER_ENABLED` | `true` to show the form. Read at **build time**, so it takes effect on the **next deploy**. | Builds |

**Every variable change needs a new deploy, including the server-side ones.** Netlify gives
each deploy the variable values that existed when it was built. Changing a value in the
dashboard, CLI or API doesn't affect the deploy that's already live; it only applies once a
new deploy is created (trigger a deploy, or push a commit). See Netlify's
[environment variables and functions](https://docs.netlify.com/build/functions/environment-variables/)
docs. This applies to `NEWSLETTER_ENABLED`, `MAILERLITE_*` and `CONTACT_*` alike.

The same rule gives the **fastest rollback**: republishing an earlier deploy (Netlify →
Deploys → choose the deploy → "Publish deploy") brings back that deploy's code *and* the
variable values it was built with, instantly, without a build. If you do this, check whether
Netlify has paused automatic publishing, and switch it back on afterwards.

The two flags are separate on purpose:
- the server flag decides whether the function accepts signups;
- the build flag decides whether visitors see the form at all.

So the function can be switched on for a controlled test while the form stays hidden.

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
4. ✅ **Privacy Policy.**
   - The launch version went live on Oct 22, 2026: frequency, consent records, double opt-in
     for new addresses only, email tracking, retention.
   - The **welcome email** sentence followed with PR #25 (`LAST_UPDATED` October 27, 2026, live).
   - Bump `LAST_UPDATED` again only if the policy text changes.
5. ✅ **Production MailerLite credentials** (recorded Oct 27, 2026):
   - `MAILERLITE_API_KEY` (a separate production token) and `MAILERLITE_GROUP_ID` (the
     **BrightPath Updates** group) are set for the **Production** context;
   - the TEST token and TEST group stay in **Deploy Previews**;
   - `NEWSLETTER_ENABLED` and `VITE_NEWSLETTER_ENABLED` stayed **unset** in Production until
     activation on Nov 26, 2026 (step 11).
6. ✅ **Welcome email** (recorded Oct 27, 2026):
   - designed and test-sent, with its website button and its footer (PO Box) checked;
   - the **"Simple welcome email"** automation is **active**, triggered when a subscriber
     joins **BrightPath Updates**.
   - Seen running in production:
     - Oct 27, 2026: about 6 s **after** a new subscriber confirmed;
     - Nov 16, 2026: when a restored **Active** subscriber was added to the group.

     See "Test log".
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
     - ⚠️ This holds only for **Unconfirmed** addresses. A Deleted **Active** address is
       restored as Active with **no** confirmation (production, Nov 16, 2026). See "Deleted
       subscribers are restored, not recreated".
   - ☐ An invalid address, and a submission with the server flag switched off (both covered by
     `npm test`, but not yet checked on a deploy preview).
   - ☐ Welcome email timing: this **can't be tested on a deploy preview**, because the
     automation watches **BrightPath Updates** and previews use the TEST group. It's covered by
     the live signup test below.
10. ⏸ **TEST cleanup: deferred.** The owner decided on Nov 27, 2026 to **retain the TEST
    environment and token** while the long-term testing strategy is decided separately. When
    it's revisited:
    - revoke the TEST token in MailerLite;
    - **don't Delete Active TEST subscribers.** A Deleted Active address comes back Active if it's
      ever submitted again. Leave them in the TEST group (it's never mailed), or use **Forget**.
      Unconfirmed ones can be Deleted;
    - then set the Deploy Preview `NEWSLETTER_ENABLED` to off (or remove the Deploy Preview
      newsletter variables). Otherwise later PR previews show a form that can't subscribe
      anyone.
11. ✅ **Activated Nov 26, 2026, 03:12 UTC** (Production context only). The flags-off
    deploy at the time was `6b07a2691286132cf6f47cc2`, and the activation deploy was
    `6b07a38fd4a87a8d14616ced`. See "Test log". The original procedure:
    - Set `NEWSLETTER_ENABLED=true` **and** `VITE_NEWSLETTER_ENABLED=true`, then **redeploy**
      production once. Nothing changes until the new deploy is live.
    - Run the final test ("Remaining checks", item 3) immediately.
    - The server-only step was already proven twice (Oct 27 and Nov 16), so one deploy is
      enough. The cautious alternative is the server flag first, then the form flag, with a
      redeploy after each.

### Remaining checks before launch

*Updated Nov 27, 2026, after launch. Items still open are also listed under "Outstanding
newsletter maintenance".*

1. ◐ **Email verification items.** The final test passed (item 3), but these items weren't
   recorded one by one, so each stays ☐ until it's confirmed and written down **individually**. API double opt-in sends MailerLite's own confirmation email,
   not the welcome email's template. No production confirmation email has been inspected yet:
   the Oct 27 one wasn't recorded, and Nov 16 sent none.
   - ☐ Confirmation email **sender** is `contact@brightpathwebstudio.org`.
   - ☐ Confirmation email **content** reads correctly: subject, wording, confirm button.
   - ☐ Confirmation email **footer** shows the company details and **PO Box 186, Edneyville, NC
     28727**.
   - ☐ **SPF** = PASS (Gmail: ⋮ → Show original).
   - ☐ **DKIM** = PASS.
   - ☐ **DMARC** = PASS.
   - ☐ **Confirmation thank-you page** appears after clicking confirm, and reads correctly.
   - ☐ **Welcome email button** opens the website.
   - ☐ **Welcome email footer** shows the PO Box and a working unsubscribe link.
2. ◐ **Automation trigger timing.**
   - ✅ Fires **after** confirmation, never before: about 6 s after confirming (Oct 27).
   - ✅ Also fires when an **Active** subscriber is added to BrightPath Updates (Nov 16 restore;
     the same happens when adding someone by hand, see "Signup enquiries").
   - ☐ Check the automation's **re-entry** setting in MailerLite (read-only): would someone
     who leaves and re-joins the group get the welcome email again? It matters little under
     the rule "Delete only Unconfirmed".
3. ✅ **Final signup-to-welcome test: passed** (owner-reported, after the Nov 26 activation),
   with a genuinely new address through the live footer form. See "Test log".
4. ☐ **Test accounts in BrightPath Updates.** Two Active owner test accounts, from Oct 27 and
   the Nov 16 restore, plus the final-test address, will receive every campaign. Decide before
   the inaugural send.
   - Keep them as seed copies, or **remove them from the group**.
   - **Don't Delete them** (see "Deleted subscribers are restored, not recreated").
5. ⏸ **TEST environment cleanup** (step 10): **retained** by owner decision, Nov 27, 2026.

**Final test requirements (genuinely new address):**
- **The address.** It must never have existed **anywhere in this MailerLite account**: any
  group, any status, and never Deleted or Forgotten.
  - A MailerLite search doesn't show Deleted records, so search alone can't prove this.
  - Use an address that has certainly never been used, such as a Gmail plus-address with a tag
    never used before. Don't record it in this repository.
- **How to submit.** Use the **footer form on the live site** (not the console), with a first
  name, so the form, success message and Name field are all checked.
- **Expected, in order:**
  1. The form shows the generic success message.
  2. MailerLite: a new profile with today's date, "via API", status **Unconfirmed**, group
     **BrightPath Updates** only, and activity "Added to BrightPath Updates".
  3. The confirmation email arrives (item 1 checks).
  4. **No welcome email** while it's unconfirmed (wait about 5 minutes).
  5. Click confirm: the thank-you page appears.
  6. MailerLite: status **Active**, "activated by confirming signup", today's opt-in date, and
     the first name saved.
  7. The welcome email arrives within seconds; check its content, website button and PO Box
     footer.
  8. The Netlify function log has **no** "address already known" or "submitted too fast" line
     for that time.
- **Fails, so roll back** by republishing the flags-off deploy:
  - Active immediately without a confirmation event;
  - a welcome email before confirming;
  - no confirmation email within about 10 minutes;
  - the wrong group;
  - a 5xx reply.
5. ✅ **Launch verification** after the production redeploy, passed Nov 26 (deploy
   `6b07a38f…`) and again Nov 27 (deploy `6b09c7be…`):
   - the band and form appear in both themes;
   - all 12 prerendered routes load;
   - the newsletter function no longer answers 503;
   - the **contact form** still loads and its function answers normally;
   - the Privacy Policy shows the welcome-email sentence and its publication date;
   - there are no console errors.

   Only then announce the newsletter.

**Rollback at any time:**
- **Known deploys** (updated Nov 27, 2026 after PR #28; replace only after a newer production deploy has
  been verified):

  | Deploy | Commit | Newsletter | Use it to |
  |---|---|---|---|
  | `6b09c7be81d23d577cc9be3c` | `0047d2e` | **on** (flags `true`) | **Current known-good production deploy with subscriptions enabled** (published Nov 27, 18:11:56 UTC; includes the mobile Reviews fix and the `/review` → `/reviews` 301). Undo a bad later deploy while keeping signups open. |
  | `6b07a38fd4a87a8d14616ced` | `42b847e` | **on** (flags `true`) | Immediate newsletter-enabled fallback if `6b09c7be…` misbehaves. Brings back the mobile `/review` 404. |
  | `6b07a2691286132cf6f47cc2` | `42b847e` | off (flags unset) | **Emergency:** turn subscriptions off instantly. Then blank both Production flags so a later build can't turn them back on. |

- **Instantly:** republish the last deploy built with the flags off. That restores its code
  and variable values with no build.
- **Permanently:** set `NEWSLETTER_ENABLED` to anything except `true` (and
  `VITE_NEWSLETTER_ENABLED=false` to hide the form), then **redeploy** so future deploys stay
  off. Changing the variables alone does nothing until a new deploy.

**Before the first campaign:** set each campaign's tracking to match the policy: opens and
clicks on, Google Analytics off.

### Outstanding newsletter maintenance

Recorded Nov 27, 2026. Each item is its own future session and needs approval; the site-wide
register is "Outstanding maintenance" in `CLAUDE.md`.

1. **Record the individual email checks** ("Remaining checks", item 1): confirmation sender,
   content and PO Box footer; SPF, DKIM and DMARC; the thank-you page; the welcome button and
   footer. Use a real confirmation or welcome email already received; no new signup is needed.
2. **Welcome automation re-entry setting**, a read-only check in MailerLite.
3. **Test accounts in BrightPath Updates**: keep them as seed copies, or remove them from the
   group (never Delete). Decide before the inaugural send.
4. **TEST environment strategy** (retained for now). PR deploy previews show a working form
   that subscribes into TEST, so never use a real address there.
5. **Abuse protection** (Turnstile or Netlify rate-limit rules); see `CLAUDE.md`,
   "Abuse-protection limits".
6. **Monthly maintenance**: the first run is due in late December 2026 (see "Monthly
   maintenance").

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

**Oct 27, 2026 — production, controlled window.** Server flag only, form hidden: deploy
`6ae10bf4adf4fc92ea2a7e85`, commit `d594690`. It was rolled back at 21:51 UTC by republishing
`6ae1056e6047a2149586d237`. Recorded Nov 16, 2026 from the owner's MailerLite activity view;
no addresses kept here.

| Step | Result |
|---|---|
| First console attempt | ⚠️ `pending_confirmation` but nothing created. The body lacked a numeric `elapsedMs`, so the function treated it as "submitted too fast" (by design) |
| Retest with `elapsedMs: 5000` (number), brand-new address | ✅ 21:44:14 UTC: added to **BrightPath Updates** (Unconfirmed) |
| Confirmation link clicked | ✅ 21:47:35: activated by email confirmation |
| Welcome automation | ✅ 21:47:41: sent about 6 s **after** confirming, never before; opened 21:47:54 |

What this establishes in production: the production token and group are correct, account-level
API double opt-in applies, and the welcome automation fires on confirmation (this answers
"Remaining checks" item 2, apart from the re-entry setting). The confirmation email's sender
and PO Box footer, the thank-you page, and the current welcome email content weren't recorded,
so they're still to check.

**Subscriber review, Nov 16, 2026** (owner, counts only).
- TEST group "BrightPath Newsletter — TEST": 3 Active, 2 Unconfirmed, 1 Unsubscribed, all
  owner test accounts.
- BrightPath Updates: 1 Active, the Oct 27 test account above.

Nothing was deleted by this review. (The test account in the Nov 16 entry below was Deleted
separately, during that test.) Before the first campaign, decide whether the test accounts in
BrightPath Updates should receive it. To exclude one, **remove it from the group; don't Delete
it.**

**Nov 16, 2026 — production, second controlled window.** Server flag only, form hidden: deploy
`6afb4bcfa57471cb75d72d10`, commit `4974213`, live 18:31–18:58 UTC.
- The pre-checks passed: a malformed request got 400 (not 503), no band was shown, and contact
  GET returned 405.
- It was rolled back by republishing `6afb454209385463bd75d2d0`, and `NEWSLETTER_ENABLED` was
  removed (verified Nov 17: 503, both flags unset).
- **Result** (verified Nov 25, 2026 from the owner's MailerLite profile activity and the Gmail
  welcome email; no address recorded). The address wasn't new: it was an owner test account
  first subscribed through Deploy Preview #23.

| Time (UTC) | Event |
|---|---|
| Oct 21, 18:00:11 | Added to "BrightPath Newsletter — TEST" via API (preview test) |
| Oct 21, 18:00:43 | Activated by confirming signup (its original opt-in) |
| Nov 16, 18:49:31 | **Deleted** in MailerLite. The function has no delete call, so this was done in MailerLite, during the test |
| Nov 16, 18:51:42 | Submitted again; MailerLite **restored** the subscriber and added it to **BrightPath Updates** |
| Nov 16, 18:51:47 | Welcome automation email sent (received in Gmail, Promotions tab) |
| Nov 16, 18:51:56 | Email open recorded |

- Afterwards the profile is **Active**, still showing the Oct 21 subscription and opt-in date,
  in **both** the TEST group and BrightPath Updates.
- **No confirmation event on Nov 16, and no confirmation email.** The email first remembered as
  a confirmation was this welcome email.

What this establishes:
1. The function behaved as designed. The lookup didn't find the Deleted address (404), so it
   posted it as new.
2. **MailerLite restores a Deleted subscriber with its old status.** For a previously Active
   one, that means no new double opt-in.
3. The welcome automation fires when an Active subscriber joins BrightPath Updates.
4. It did **not** test a genuinely new signup. That was already proven on Oct 27, and it's
   repeated in the final test.

Rule adopted: **Delete only Unconfirmed subscribers.** See "Deleted subscribers are restored,
not recreated". No code change was needed.

**Nov 26, 2026 — production activation.** Owner-approved; no test subscription was made by
the agent.
- **Pre-checks.**
  - Production group ID `…5756` differs from the Deploy Preview TEST ID `…8041`.
  - It has been unchanged since Oct 23, and both earlier production signups (Oct 27 and the
    Nov 16 restore) landed in **BrightPath Updates**.
  - `netlify env:get` returns a masked placeholder for the secret API key, so a CLI-side
    MailerLite lookup answers 401. That isn't a fault.
- **Change.** Both flags were set to `true` in the Production context only. Every other
  context was unchanged.
- **Deploy.** One production build of `42b847e`, deploy `6b07a38fd4a87a8d14616ced`, published
  03:12:55 UTC.
- **Verified:**
  - the band on Home, About, Services and Contact, in both themes and at 375px;
  - the endpoint: malformed request → 400 (so it's on), GET → 405, a foreign origin → 403;
  - the contact form and its function: GET → 405, empty POST → 400;
  - social links;
  - all routes;
  - no console errors.

**Final manual subscription test — passed** (owner-reported). The owner ran it after
activation, with a genuinely new address through the live footer form, per "Final test
requirements". The address, timestamps and individual email checks weren't recorded here, so
"Remaining checks", item 1 stays open until they're written down.

**Welcome email redesign** (owner, after launch). The welcome email was redesigned in
MailerLite. The "Simple welcome email" automation on joining BrightPath Updates is unchanged.
The details of the new design aren't recorded here.

**Nov 27, 2026 — production deploy `6b09c7be81d23d577cc9be3c`** (PR #28, `0047d2e`, published
18:11:56 UTC; flags still `true`).
- Re-verified without touching any subscriber:
  - the band in both themes;
  - malformed request → 400, foreign origin → 403;
  - the production group is still `…5756`, and previews are still TEST `…8041`;
  - the contact form;
  - social links;
  - no console errors;
  - layout pixel-identical to `6b07a38f`.
- PR #29 (docs) merged with `[skip netlify]`, so no deploy was built.

**To disable in an emergency,** republish the last deploy built with the flags off. It takes
effect immediately, with no build, and the function answers "unavailable" again. Then set
`NEWSLETTER_ENABLED` to anything except `true` (and `VITE_NEWSLETTER_ENABLED=false` to hide the
form) and **redeploy**, so the next deploy doesn't switch it back on. A variable change on its
own has no effect until a new deploy.

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
   - **Only ever Delete *Unconfirmed* subscribers.** A Deleted subscriber is restored with its
     old status if the address is submitted again. A Deleted **Active** subscriber comes back
     Active with no new confirmation (production, Nov 16, 2026). To take an Active or test
     account off the newsletter, remove it from the group instead.
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

## Signup enquiries ("I signed up but nothing arrived")

The form gives everyone the same success message, so some people will write in. Handle each
enquiry **by hand, one person at a time**. The function never does any of this automatically.

**Consent rules for every case:**
- Act only on a request that comes **by email from the address in question**, clearly asking to
  receive The BrightPath Update. A request from someone else, or for someone else, isn't
  consent.
- **Keep that email** in the `contact@` mailbox as the consent record. Don't copy it, or any
  address, name or IP, into this repository or other notes.
- **Never change a subscriber's status on our own initiative**, never move anyone to Active by
  hand (MailerLite says that isn't a confirmation), and never act in bulk.

**First look the address up in MailerLite** (Subscribers → search, all statuses). Then:

| What you find | What to do |
|---|---|
| **Not in MailerLite at all** | Ask them to sign up again on the website. That sends a fresh confirmation email. Don't add them by hand. |
| **Active, already in BrightPath Updates** | They're subscribed. Suggest checking spam or promotions folders, and adding the sender to their contacts. Change nothing. |
| **Active, but not in BrightPath Updates** | With their emailed request, add them to **BrightPath Updates** from their profile (add to group). This doesn't change their status. It triggers the welcome automation, which is expected. Keep the email as the consent record. |
| **Unconfirmed** | Don't activate them. With their emailed request, **Delete** them, then ask them to sign up again on the website, which starts a fresh confirmation (verified on Oct 22, 2026). |
| **Unsubscribed** | They opted out, so do nothing unless their email explicitly asks to be resubscribed. Resubscribing changes their status, so treat it as your own decision each time. MailerLite also requires clear, documented permission (their email) before using its **Subscribe** action on the profile. Never resubscribe anyone because of a form submission alone. |
| **Bounced** or **Junk** | Don't resubscribe. Bounced addresses can't receive mail. Junk means they reported an email as spam. Reply directly if appropriate. |

The function's log line ("Logs" above) shows how often each kind of case happens, but not who
it was. Always identify the case from the person's own email and the MailerLite lookup.

## Local review

- `npm test` covers the function against a mocked MailerLite; nothing is contacted.
- `npx netlify dev` runs the function. Add `VITE_NEWSLETTER_ENABLED=true` to a gitignored
  `.env.local` (or prefix the command with it) to show the form. Without MailerLite variables
  the function answers "unavailable", which is safe.
- Plain `npm run dev` has no functions, so submitting shows the generic error.
- Local signups would be **real** signups once real credentials are present. Point local
  testing at a TEST group, or test on a deploy preview.
