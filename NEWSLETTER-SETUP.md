# Newsletter Signup (MailerLite) — Setup and Launch

**Status:** Built on `feature/newsletter-signup`. **Off by default.** Nothing appears on the
live site and the function refuses all signups until the flags below are set.
**Not verified against live MailerLite.** No real subscriber has been created.

---

## What it is

A "Stay Connected with BrightPath" signup at the top of the site footer, so it appears on
every page. It has an optional first name, a required email, a **Keep Me Updated** button,
and a short privacy note linking to `/privacy-policy`. There's no popup or entrance
animation.

| Piece | File |
|---|---|
| Form component | `src/components/NewsletterSignup.tsx` |
| Placement | `src/components/ui/Footer.tsx` (renders only when enabled) |
| Styles | `src/styles/globals.css`, "NEWSLETTER SIGNUP (footer)" |
| Server function | `netlify/functions/newsletter-subscribe.js` |
| Route | `netlify.toml`: `/api/newsletter-subscribe` → the function |
| Env template | `.env.example` |

## How it works

1. The browser posts `{ email, firstName, company }` to `/api/newsletter-subscribe`.
   `company` is a hidden honeypot.
2. The Netlify Function validates the input and calls MailerLite's
   `POST https://connect.mailerlite.com/api/subscribers` with the API token. That call adds
   the subscriber to the **BrightPath Updates** group and sends `fields.name` only when a
   first name is given.
3. The function **never sends `status`**, so MailerLite's account-level API double opt-in
   setting decides what happens. If it sent `status: "active"`, confirmation would be
   skipped.
4. The browser only ever receives a short status code. It never sees the API token,
   MailerLite's response or any subscriber data.

| MailerLite result | Visitor sees |
|---|---|
| 201 new subscriber | "Thanks for signing up! Please check your inbox…" |
| 200 existing, `unconfirmed` | Same confirmation message |
| 200 existing, `active` | "You're already subscribed to BrightPath updates…" |
| 200 existing, `unsubscribed` / `bounced` / `junk` | "We couldn't add this address automatically… contact us" (the API can't reactivate these) |
| 422 bad email | Field error |
| 429 / 5xx / timeout / network | Retryable error; email kept in the field |

**Abuse protection:**

- Honeypot field.
- Server-side validation and length limits (email ≤ 254, name ≤ 100, body ≤ 2 KB).
- Control characters stripped from input.
- Origin check: the live domain, Netlify deploys and localhost are allowed.
- 5 requests per IP per 10 minutes. This limit is per function instance, so it's
  best-effort only.
- Duplicate submissions are blocked client-side.
- Double opt-in is the real safeguard: nobody becomes an active subscriber without clicking
  the confirmation email.

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
| `MAILERLITE_API_KEY` | MailerLite → Integrations → MailerLite API → Generate new token (shown once). Mark it **secret**. | Functions |
| `MAILERLITE_GROUP_ID` | ID of the **BrightPath Updates** group (Subscribers → Groups → open the group; the ID is in the URL) | Functions |
| `NEWSLETTER_ENABLED` | `true` to accept signups. Anything else returns "unavailable". | Functions |
| `VITE_NEWSLETTER_ENABLED` | `true` to show the form. Read at **build time**, so a redeploy is needed after changing it. | Builds |

The two flags are separate on purpose. The server flag is an instant kill switch for
signups, and the build flag controls whether visitors see the form at all.

## Launch checklist

1. ✅ MailerLite sending domain `brightpathwebstudio.org` is authenticated and the sender email
   is verified (confirmed by the owner, Oct 19, 2026).
2. ✅ "Double opt-in for API and integrations" is **on**. The account is on MailerLite's free
   plan, so the confirmation email uses MailerLite's default template, because customising it
   requires an upgrade.
3. ✅ Privacy Policy is updated locally (see "Privacy Policy" below). It ships with this branch.
4. Env vars are set as **deploy-preview / branch-deploy** scope first, not production.
5. On a deploy preview, test with addresses you own:
   - New address with a first name: you get the confirmation email, the subscriber shows as
     *unconfirmed* in **BrightPath Updates** with the name, and becomes *active* after you
     click confirm.
   - New address with no first name.
   - The same confirmed address again shows "already subscribed". Note whether MailerLite
     sends another confirmation email: its help docs say the API double opt-in email "is
     sent every time, regardless of the subscriber's previous status", which hasn't been
     tested.
   - An address you've unsubscribed shows "couldn't add".
6. Delete the test subscribers in MailerLite.
7. Set the production env vars, then merge and deploy.

**To disable** in an emergency, set `NEWSLETTER_ENABLED` to anything except `true`. This
takes effect without a rebuild, and the form shows "isn't available right now". To hide the
form as well, set `VITE_NEWSLETTER_ENABLED=false` and redeploy.

## Privacy Policy

`src/pages/PrivacyPage.tsx` was rewritten on this branch (Oct 19, 2026) to match what the site
actually does. Its newsletter section is `#newsletter`, and the form's privacy link points
there.

**Signup IP and timestamp — what's verified:**

- The function sends MailerLite `ip_address`, taken from Netlify's
  `x-nf-client-connection-ip` header, and only when Node's `net.isIP` accepts it. It sends no
  timestamps and no `status`.
- MailerLite's API documents `ip_address` and `subscribed_at` as fields on the subscriber
  record, and fills in `subscribed_at` itself.
- **Not verified:** whether MailerLite records the *confirmation* click's IP and time
  (`optin_ip` / `opted_in_at`) for API double opt-in. The Privacy Policy therefore claims only
  the signup IP and subscription time. During the deploy-preview test, open the test
  subscriber in MailerLite and note which of these fields are filled in.

## Local review

- `npx netlify dev` runs the function. Add `VITE_NEWSLETTER_ENABLED=true` to a gitignored
  `.env.local` (or prefix the command with it) to show the form. Without MailerLite variables
  the function answers "unavailable", which is safe.
- Plain `npm run dev` has no functions, so submitting shows the generic error.
- Local signups would be **real** signups once real credentials are present. Point local
  testing at a throwaway group, or test on a deploy preview.
