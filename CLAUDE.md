# BrightPath Web Studio - Project Context

## Resume Here (updated November 27, 2026 — The BrightPath Update is live)

**Current focus:** subscriber acquisition and preparing the **inaugural edition** of The
BrightPath Update (MailerLite). No application changes are planned for this phase. Each item in
"Outstanding maintenance" below is picked up individually, in its own session, with approval.

- **Newsletter status: LIVE in production** since **Nov 26, 2026, 03:12 UTC**.
  - Activated by setting `NEWSLETTER_ENABLED` and `VITE_NEWSLETTER_ENABLED` to `true` in the
    **Production context only**, followed by one production deploy (`6b07a38f…`).
  - Before activating, the production group was confirmed as **BrightPath Updates** (`…5756`),
    not TEST (`…8041`). The ID has been unchanged since Oct 23, and both earlier production
    signups landed in BrightPath Updates.
  - **Final manual subscription test: passed** (owner-reported, after activation). It used a
    genuinely new address through the live footer form. The details are in
    `NEWSLETTER-SETUP.md`, "Test log".
  - **Welcome email redesigned** by the owner on **Nov 27, 2026**:
    - custom HTML in MailerLite's Code block; cream `#FAF7F2`, navy `#1B2845`, deep gold
      `#846300`, Lato body type;
    - a gold star divider and an "Explore BrightPath" button;
    - preheader: "Your journey to a brighter digital presence starts here.";
    - desktop and mobile previews reviewed and approved;
    - the "Simple welcome email" automation was reactivated and confirmed **active** on joining
      BrightPath Updates.
  - **Welcome email verified** (test email, about 11:42 AM ET, Nov 27):
    - sender and reply-to `contact@brightpathwebstudio.org`; SPF and DKIM PASS;
    - mailing address and the footer's subscription explanation;
    - the Explore BrightPath, Facebook, LinkedIn and view-in-browser links (the owner clicked
      each one);
    - **still unverified:** DMARC (not reported), and whether the unsubscribe link works live
      (only the placeholder was seen in the test email).
  - Real subscribers are being invited. **Never create, delete or edit subscribers** during
    verification. Probe the endpoint only with a malformed request: a 400 means it's on, a 503
    means it's off.
- **Production now** (verified Nov 27, 2026):
  - `main` = `b7526f6` (PR #29, docs only, merged with `[skip netlify]`, so it built nothing).
  - The live deploy is **`6b09c7be81d23d577cc9be3c`**, built from `0047d2e` (PR #28) and
    published 2026-11-27 18:11:56 UTC. It is the **current known-good production deploy with
    newsletter subscriptions enabled**. Verified:
    - navigation at 320–1280px;
    - `/review` → `/reviews`, a single 301 that keeps the query string;
    - footer and social links;
    - the band in both themes, with the function answering 400 to a malformed request;
    - the contact form;
    - layout pixel-identical to `6b07a38f`;
    - no console errors.
  - Flags `true` in **Production only**. Production group: BrightPath Updates (`…5756`). Deploy
    previews: TEST group (`…8041`), also with flags `true`, so a PR preview's footer form
    subscribes into **TEST**. Never use a real or final-test address on a preview.
  - **Rollback targets** (`NEWSLETTER-SETUP.md`, "Rollback at any time"):
    - a problem with a later deploy, newsletter staying on → republish `6b09c7be81d23d577cc9be3c`;
    - immediate newsletter-enabled fallback (before the Reviews fix) → republish
      `6b07a38fd4a87a8d14616ced` (`42b847e`). It brings back the mobile `/review` 404 and
      removes the 301;
    - emergency: turn subscriptions **off** → republish `6b07a2691286132cf6f47cc2` (`42b847e`,
      built with the flags unset), **and** blank both Production flags so a later build can't
      turn them back on.
  - Replace these IDs only after a newer production deploy has been verified.
  - **Docs-only merges:** put `[skip netlify]` in the merge commit message, so production stays
    on the verified deploy. Confirmed working on this site on Nov 27.
- **Shipped Nov 25–27, 2026:**
  - **PR #27** (`42b847e`):
    - Facebook and LinkedIn business links: footer icon row, Contact page "Follow BrightPath",
      `index.html` JSON-LD `sameAs`, `BUSINESS.social`;
    - the Contact page **surface-based gold** (see "Surface-based gold");
    - the launch docs.
  - **Newsletter activation:** the Nov 26 production deploy `6b07a38f…`.
  - **PR #28** (`0047d2e`):
    - the mobile Reviews link pointed to `/review` from Jan 23, 2026 (`40fa508` renamed the
      route but updated only the desktop link); it now points to `/reviews`;
    - a forced 301 `/review` → `/reviews` in `netlify.toml`;
    - `tests/navigation-routes.test.js` (121 tests in total).
  - **PR #29** (`b7526f6`): rollback docs.
- **Newsletter rules that still apply:**
  - **Delete only Unconfirmed subscribers.** A Deleted Active subscriber who is submitted again
    is restored as Active, with **no** double opt-in. To take someone off the list, remove them
    from the group; for erasure, use **Forget**.
  - Never import contacts without opt-in.
  - Campaign tracking: opens and clicks **on**, Google Analytics **off**. Set this on **each**
    campaign.
  - The function never sends `status` to MailerLite, and never writes to an address MailerLite
    already knows.
- **Owner decisions still in force:**
  - **TEST environment and token retained** (Nov 27). The long-term testing strategy will be
    decided separately;
  - Turnstile deferred;
  - the custom 404 page deferred;
  - the site-wide gradient review deferred;
  - personal GitHub/LinkedIn on About stay as they are;
  - fresh-branch + PR workflow, and never merge without approval.
- **Business priorities (Nov 27, 2026):**
  - personalized subscriber invitations are underway;
  - the newsletter announcement graphic is finished;
  - the inaugural edition features **Angel City Massage**;
  - proposed send date **December 1, 2026**, pending the owner's final approval.
- **Environment note.** The repo lives on the iCloud-synced Desktop, set to **Keep Downloaded**
  (Nov 25). If the CLI looks hung, check for offloaded files first (see auto-memory
  `icloud-desktop-offloading.md`).
- Fuller running log: the Claude auto-memory file `brightpath-state-2026-10.md`.

### Outstanding maintenance (each is its own future session; nothing here is approved yet)

Newsletter and email:
1. **Finish the email checks.** The welcome email was verified on Nov 27 (sender, reply-to,
   SPF, DKIM, footer, links). Still open:
   - the **confirmation** email's sender, content and PO Box footer, and the thank-you page;
   - **DMARC** (not reported);
   - a **live unsubscribe** test, which must not use a real subscriber.

   See `NEWSLETTER-SETUP.md`, "Remaining checks".
2. **Welcome automation re-entry setting**: a read-only check in MailerLite.
3. **Owner test accounts in BrightPath Updates.** There are two Active ones (Oct 27, and the
   Nov 16 restore), plus the final-test address. Decide before the first send whether they stay
   as seed copies or are **removed from the group** (never Deleted).
4. **TEST environment strategy.** It's retained for now. The options to weigh:
   - keep it as is: previews subscribe into TEST;
   - turn the preview flags off;
   - revoke the TEST token.

   Don't Delete Active TEST subscribers.
5. **Abuse protection** (Turnstile or Netlify rate-limit rules). The current rate limits are
   per instance and best-effort, and double opt-in is the main safeguard.
6. **Monthly maintenance** (`NEWSLETTER-SETUP.md`): Delete only signups that have stayed
   Unconfirmed for over 30 days. The first run is due late December 2026.

Site:

7. **Custom 404 page.** Unknown URLs show React Router's developer error screen, because
   `src/main.tsx` has no `errorElement` or catch-all. Netlify still answers HTTP 200 for them
   (soft 404).
8. **Site-wide gradient accessibility review.** About 60 legacy-gradient headings remain
   outside the Contact page, and many fail on light surfaces. The plan is under
   "Surface-based gold".
9. **Production ships React's development build** (`NODE_ENV=development` in the Netlify
   environment).
10. **Image weight.** `public/images` is about 116 MB, mostly unreferenced, and `/case-study`
    ships 10.6 MB.
11. **Theme pinning.** The first visit stores the theme in `localStorage` permanently.
12. **`SocialMediaCard.tsx`** still passes camelCase `fetchPriority`, which logs a React warning
    on the portfolio and social pages.
13. **Pre-existing lint**: `get-case-studies.ts` (unused `_context`) and `GuidingLight.tsx`
    (hook dependency). `npm run lint` also scans generated `.netlify/` and `dist/` files.
14. **Outdated résumé PDF.** `RESUME_URL` stays `null` until a new React/TypeScript résumé
    exists.

Environment:

15. **iCloud cleanup.** Remove the conflict copies (`.git/index 2`,
    `public/videos/video-1 2.mp4`, `… 2` / `… 3` folders in `dist/` and `.netlify/`), with
    approval.
16. **Move the repo out of iCloud.**

Future enhancement:

17. **Newsletter archive** on the website, for past editions of The BrightPath Update.

## Project Overview
Portfolio website for Tisha Di Fresco / BrightPath Web Studio LLC. Built with React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion for animations
- **CMS Integration**: WordPress REST API for some content (flip cards on Services page)
- **Hosting**: Netlify
- **Images**: Cloudinary for optimized delivery
- **Analytics**: GA4, U.S. visitors only. On `feature/newsletter-signup` (not yet on `main`)
  it loads only on the production hostname, after a device time-zone check and a Netlify
  region check, with advertising storage denied. See "Contact form, Analytics and newsletter"
  below. On `main`, GA4 has recorded nothing since March 2026 (see Known issues)
- **Prerendering**: `vite-plugin-prerender` + Puppeteer, 12 static routes (see below)
- **Local dev**: `npm run dev` (Vite, :5173) has no Netlify functions, so `/api/phases` and
  `/api/reviews` fail there. To review the WordPress-driven phase cards or reviews, run
  `npx netlify dev` (:8888) — it pulls `WORDPRESS_API_URL`/`WORDPRESS_APP_PASSWORD` from the
  linked Netlify site, no `.env` needed. The global `netlify` binary isn't on PATH; use `npx`.
  Exception: the new contact form needs `CONTACT_SCRIPT_URL` / `CONTACT_SHARED_SECRET` for a
  **TEST** Apps Script deployment in a gitignored `.env` (see "Environment variables").
- **Tests**: `npm test` runs Node's built-in test runner on `tests/*.test.js` (no extra
  dependencies). It covers the Netlify functions, an emulated Apps Script and the shared
  origin validator. There are no UI unit tests; browser checks are done ad hoc with Puppeteer.
- **Decision log**: detailed approved decisions and deferred items live in
  `.claude/agent-memory/brightpath-project-steward/` (index: `MEMORY.md`). This file is the
  overview; check there before reopening anything marked approved.

## Key Design Patterns
- **Theme**: Light/dark mode via `useAppStore` (Zustand)
- **Responsive**: Mobile-first, breakpoints at `md` (768px) and `lg` (1024px)
- **Typography**: Poppins for headings, Lato for body, Open Sans occasionally
- **Colors**: Midnight blue `#1A2238`, near-black ground `#0A0F18`, warm cream ground
  `#FAF6EF`. **One gold per theme** — dark `#F2C94C`, light `#846300`. Both are driven
  by the `--primary` token so every gold role resolves from a single value. See
  "Gold System" below; do not reintroduce per-role gold shades. On light
  surfaces inside a dark page, the surface picks the gold: see "Surface-based gold".
- **Text on mobile**: 14px (`text-sm`) for paragraphs, `leading-normal` for tighter line spacing

## Important Files
- `src/pages/AboutPage.tsx` - Hero (scroll-based grayscale on desktop, copy scrim,
  "Founder & Frontend Engineer" role line), My Journey timeline, Selected Work, Why Work
  With Me, grouped Skills, closing CTA + GitHub/LinkedIn row. My Journey, Why Work With Me
  and the closing CTA share the approved timeline-artwork background (see "About page
  backgrounds" in the Oct 5 section). `RESUME_URL` is deliberately `null` — see "Recent
  Session Work (October 5, 2026)"
- `src/pages/HomePage.tsx` - Hero injected via Vite plugin for LCP optimization; renders
  `ClarityHero` itself only when the static hero is absent (see below). Also wires the
  section background classes (`home-services`, `home-reviews`, `home-story`)
- `src/components/ClarityHero.tsx` - **Load-bearing React copy of the static hero**
  (`STATIC_HERO_HTML` in vite.config.ts). The static hero only ships in the `/` HTML, so a
  visitor who enters on any other page and navigates home sees *this* component instead.
  Any drift between the two makes the homepage look different depending on the entry page.
  Edit both together and keep `id="hero-clarity-static"` and the `.studio-hero*` classes.
  Not a Tailwind manifest — the hero uses dedicated CSS classes
- `src/styles/globals.css` - Carries the whole approved visual system: the `--primary`
  gold token per theme, `.studio-hero*`, `.studio-cta*`, `.nav-link*` / `.nav-cta`,
  `.home-*` homepage backgrounds, `.services-*` / `.services-atmos*` Services
  backgrounds, `.site-footer`, `.text-brand-gold`
- `src/components/ui/FlipCard/FlipCard.css` - Flip-card faces. The light back face uses
  the light theme gold and overrides the markup's hard-coded `text-[#10192b]` to cream,
  because midnight type measures only 2.83:1 on that gold
- `vite.config.ts` - Static hero HTML (`STATIC_HERO_HTML`) injection, hero-stripped `app.html`
  fallback, prerender config, Chrome resolution, build-time verification
- `src/pages/ServicesPage.tsx` - Services, process flip cards, pricing
- `src/pages/PortfolioDemoPage.tsx` - Portfolio grid with case study views
- `src/pages/ContactPage.tsx` - Contact form. **On `main`** it posts straight to Google
  Apps Script (`no-cors`, can't confirm success). **On `feature/newsletter-signup`** it
  posts to `/api/contact-inquiry` and shows success only after a confirmed save. On both, the
  honeypot is `bp_contact_extra`, and Send is disabled in the prerendered HTML (`IS_PRERENDER`)
- `netlify/functions/contact-inquiry.js` + `google-apps-script/contact-form-handler/` -
  Contact form v2: Netlify Function → Apps Script v2 (`Code.gs`, rollout guide in its README)
- `netlify/functions/newsletter-subscribe.js` + `src/components/NewsletterSignup.tsx` -
  MailerLite signup in the footer, off unless its flags are set (`NEWSLETTER-SETUP.md`)
- `netlify/lib/allowed-origin.js` - Strict Origin check shared by the contact and newsletter
  functions. It lives outside `netlify/functions` so Netlify doesn't deploy it as a function
- `src/utils/analytics.ts` + `netlify/functions/analytics-region.js` - GA4 loader and its
  U.S.-only region check
- `src/config/contact.ts` - `BUSINESS`, the single source for public contact details and the
  business social URLs (`BUSINESS.social`, rendered via `SOCIAL_LINKS` in the footer and on the
  Contact page). `index.html` JSON-LD, including `sameAs`, must be kept in sync by hand. The
  About page's GitHub/LinkedIn are Tisha's **personal** profiles and stay separate
- `src/components/legal/` - Shared layout for the Privacy Policy and Terms of Service
- `src/components/PageMeta.tsx` - Per-route title/description/canonical/OG/JSON-LD; also fires the `prerender-ready` signal
- `src/utils/isPrerender.ts` - `IS_PRERENDER` flag: build-time snapshot vs. real visit
- `netlify.toml` / `public/_headers` - SPA fallback to `/app.html`, `PUPPETEER_CACHE_DIR`, cache rules

## iOS Safari Considerations
- `background-attachment: fixed` doesn't work on iOS - use `md:bg-fixed` instead
- Timeline line/dot hidden on mobile (`hidden md:block`)

## Static Prerendering

12 deterministic routes are rendered to static HTML at build time so crawlers (especially
AI crawlers, which don't run JS) get real content. `/services` and `/reviews` are
**deliberately excluded** — they fetch live data from the Netlify functions behind
`/api/phases` and `/api/reviews`, so a snapshot would bake in stale content.

**Rules to preserve when touching any of this:**

- **Never use `hydrateRoot`.** `main.tsx` always calls `createRoot`, even when `#root`
  contains prerendered markup. A DOM snapshot is not `renderToString` output — it lacks
  the `<!-- -->` text-node separators and `<!--$-->` Suspense markers React 18 requires,
  so hydration always fails (minified errors #418/#423/#425) and React discards the tree
  and client-renders anyway.
- **`/app.html` is the SPA fallback, not `/index.html`.** A `writeBundle` hook copies the
  built shell to `app.html` before the prerenderer overwrites `index.html` with the
  rendered homepage. Falling back to `index.html` would serve homepage content on
  `/services`. Static files win over Netlify's catch-all, so `/about/index.html` is served
  directly.
- **`data-rh="true"` in `index.html` is load-bearing.** It hands those tags to
  react-helmet-async so it *replaces* them instead of appending duplicates. Only tag what
  `PageMeta` always emits — tagging `og:type`/`og:site_name`/`twitter:card` would let
  Helmet delete them.
- **The inline theme script in `index.html` must stay inline** and must not be folded into
  the Zustand store — see the theme note under Known Issues.
- **The prerenderer needs a real Chrome.** Puppeteer's postinstall hook gets suppressed
  (`npm ci --ignore-scripts`, npm allow-scripts gating), so `vite.config.ts` installs the
  browser explicitly at build time and preflights a launch. `PUPPETEER_CACHE_DIR` is set in
  `netlify.toml` so it's cached between deploys.
- **`verifyPrerender` fails the build on purpose** if routes are missing, `#root` is empty,
  metadata is duplicated, or a canonical doesn't match its route. `vite-plugin-prerender`
  swallows its own errors, so this is the only thing standing between a broken prerender
  and a silently un-prerendered deploy. `SKIP_PRERENDER=1` skips prerender *and* the check
  together. It has failed once intermittently on Netlify (Oct 5, 2026, `/privacy-policy`,
  passed on retry with no changes) — see that session's notes before "fixing" anything.
- **Scroll animations need `revealFrom()`.** `whileInView` reveals emit `opacity: 0` into
  the snapshot, which is invisible to crawlers that never scroll. `revealFrom()` in
  `AboutPage.tsx` returns `false` during the snapshot (via `IS_PRERENDER`) so the settled
  state is emitted; visitors still get the animation. Apply the same pattern to any new
  `whileInView` section carrying meaningful copy.
- **The static homepage hero ships only in the `/` HTML.** It's injected into the shell
  before `#root`, and used to stay in every other route's HTML as `display: none` — which
  still handed crawlers the homepage `<h1>` ("Websites That Work Beautifully.") as the first
  heading of /about, /services, etc. Now `StaticHeroRouteGate` (App.tsx) *removes* it during
  the prerender snapshot on non-home routes, and `snapshotSpaFallback` writes `app.html`
  with `STATIC_HERO_HTML` stripped (it throws if the string isn't found). At runtime the gate
  still hides/shows the hero on in-app navigation, and HomePage renders `ClarityHero` when
  the static copy is missing. `verifyPrerender` fails the build if `/` lacks the hero, or
  any other prerendered route or `app.html` contains it.

## Homepage Visual System (approved — treat as the baseline)

Completed and approved across Aug 11–12, 2026; committed as `7927270`. The homepage is
the visual reference for the rest of the site. Don't redesign any of it without agreeing
the change first.

**Hero.** Left-aligned studio layout: copy left, workspace photograph right. The photo is
`public/images/brightpath-hero-image.webp` (96 KB, 1672×941) — the production asset. The
current approved treatment uses it as-is; visual blending is handled in CSS via a
two-gradient `mask-image` plus a scrim, so the left edge dissolves into the ground and the
top/bottom soften. Below 1024px the composition *recomposes* — the photo becomes a band
beneath the copy rather than shrinking, because a portrait-tablet side panel makes
`object-fit: cover` magnify the laptop past a natural crop.

**Theme grounds.** Dark: near-black `#0A0F18`. Light: warm cream `#FAF6EF`. Light is not an
inversion of dark — the image grade, scrim direction and gold values all differ.

**Header / nav / CTAs.** Header background matches the hero at `#0A0F18`. Active route is a
1px gold hairline the width of the label plus a gold text shift, via `NavLink` (which also
sets `aria-current="page"`). Browser-default blue focus rings are replaced by palette rings.
The hero secondary stays a text link with a pseudo-element rule. A mid-blue header was
trialled against four candidates and **rejected** — it broke the midnight/gold/cream
palette. Don't re-propose it. CTA colour is covered under "Gold System" below.

**Section backgrounds.** The alternating horizontal-band effect is gone. Artwork sections
(`home-services`, `home-reviews`) keep their original artwork, graded in CSS via `filter` and
feathered into the ground at both edges. Flat-slab sections (`home-work`, `home-story`) became
shallow gradients that lift a few values mid-section, each opening with a faded gold hairline.
The rhythm is artwork-section → gradient-section, so sections stay distinguishable through
artwork and depth rather than colour steps. Grading and feather values were revised on
Aug 15 — see "Background System" below for the current numbers.

**Footer.** `site-footer` is part of the same system: a gradient that deepens toward the
bottom (so the page reads as closing out, not banding), with the same hairline instead of the
old grey `border-t`. It's global, so this treatment appears on every route.

**Typography emphasis.** The legacy yellow→orange clipped gradient is retired *on the
homepage*. `BrightPathGradientTitle` gained an optional `emphasis` prop:
`'gradient'` (default — every other call site is unaffected), `'solid'` (one theme-aware gold
via `.text-brand-gold`), `'none'` (no emphasis at all). `'none'` exists because omitting
`gradientWords` makes the component gradient the *entire* title. Section headings use
`'solid'`; service-card and project titles use `'none'`, leaving the gold icon and the
Featured badge as each card's accent. In light mode the emphasis word *is* still gold, so
`'solid'` continues to produce a visible shift in both themes.

## Gold System (approved Aug 15, 2026 — ONE GOLD PER THEME)

**This is the rule: each theme has exactly one gold, used for every gold role.** Do not
create per-role shades (display gold vs. small-text gold vs. button gold) to optimise
individual elements. Visual consistency beats per-element optimisation. Both values are
set on the `--primary` token, so `bg-primary` / `text-primary` / `border-primary` and every
opacity modifier resolve from the single value automatically.

| Theme | Gold | Token | Label on a gold fill |
|---|---|---|---|
| Dark | **`#F2C94C`** | `--primary: 45.2 86.5% 62.4%` | `#1A2238` (10.13:1) |
| Light | **`#846300`** | `--primary: 45 100% 25.9%` | `#FAF6EF` cream (5.18:1) |

`.text-brand-gold` resolves to `#846300` (base) and `#F2C94C` under `html.dark`.

**Both golds cover the same roles**: display emphasis text, section emphasis words, hero
eyebrow, active nav label + indicator hairline, focus rings, primary CTA fills, gold
borders, section hairlines, card and pill accents, icons, footer brand treatments, badges.

**Why light mode is a deeper mustard, and why that is deliberate.** `#F2C94C` measures
**1.47:1** on cream — it misses even the 3:1 large-text bar by half, so it cannot carry
light-mode text at any size. `#846300` is the deepest member of the brand gold family and
the only value that satisfies *every* role at once. It is an approved part of the light
identity, not a fallback.

**Do not reintroduce** any of: mustard text alongside bright-yellow buttons; separate
display-gold and small-text-gold tiers (`#9E6E04`/`#8C6103`, or the hue-corrected
`#A27B00`/`#846300` pair); navy-only emphasis across light mode; or several near-identical
golds. All of these were built and rejected during Aug 15.

**Primary CTAs use their theme's gold as the fill.** Light mode must **not** revert to
navy-filled primary CTAs — that combination was trialled and rejected, because deep-gold
emphasis text beside a bright-yellow or navy button made the theme read as two systems.
Hover darkens the same gold with `filter: brightness(0.88)` rather than declaring a second
value.

**The one unavoidable exception, and it is a label colour, not a second gold.** A light gold
fill cannot carry a navy label: `#1A2238` on `#846300` is 2.83:1. The constraints are
mutually exclusive — gold *text* on cream needs luminance ≤ 0.1666, a navy label on gold
needs ≥ 0.2492 (even black needs ≥ 0.175). So light-mode button labels are cream. Two
consequences follow from the same fact: the flip-card light back face overrides its
hard-coded `text-[#10192b]` to cream, and `html.light h1.text-primary` (the About hero name,
which sits on a *dark*, scrimmed photograph even in light mode) keeps `#F2C94C`, since a dark ground
takes the luminous value.

## Surface-based gold (owner decision Nov 25, 2026 — Contact page only so far)

**The surface an element sits on picks its gold, not the site theme.** This extends the
Gold System above. It was decided because the Contact page puts light cards on a dark page in
dark mode, where theme-based gold measured about 1.3–1.9:1.

| Surface | Emphasised title words (`gradientWords`) | Small labels, form labels, icons |
|---|---|---|
| **Light** (cream, gray-50, `#F3F4F6`, light artwork) | **Deep gold gradient** `#846300 → #604400` (`emphasis="deep-gradient"` → `.text-gold-deep-gradient`) | **Solid `#846300`** (`emphasis="solid"` / `.text-brand-gold`) |
| **Dark** (navy, near-black, gray-700, dark artwork) | The **original bright gold gradient** (`emphasis="gradient"`, yellow-500 → yellow-600), where it passes | Theme gold `#F2C94C` |

- **Contrast:** the deep gradient's weakest stop is `#846300`, so it is ≥ 5.07:1 on
  `#F3F4F6` and ≥ 5.34:1 on gray-50, which passes AA even for small text. `#604400` measures
  8.21–8.65:1. The bright gradient's weakest stop, yellow-600, measures 3.51:1 on gray-700,
  which passes only as **large text** (≥ 24px, or ≥ 18.66px bold), so keep it to headings.
  On any light surface it fails (1.2–2.8:1).
- **Selective highlighting stays.** Only the chosen words get the gradient. Small labels are
  solid, because a gradient across small type reads as uneven colour.
- **Light-ground cards keep the deep gold in dark mode too.** `.contact-light-card` scopes
  `html.dark … .text-brand-gold` to `#846300`. Theme-switched surfaces (the "Why Choose" box,
  the "Contact Us" heading on the artwork) pick `emphasis` by theme in the component.
- **Contact page (PR #27).**
  - Both cards are `#F3F4F6` in dark mode and gray-50 in light mode. The form card used to be
    gray-200 in dark mode.
  - Deep gradient: "Touch", "BrightPath" in the legal name, "Message"; in light mode only,
    "Contact" in the page heading and "BrightPath" in "Why Choose BrightPath?".
  - Solid `#846300`: the four card headings, the three form labels and the card icons.
  - Measured on rendered pixels at 375/768/1280 in both themes: all solid marks 5.07:1 (dark)
    and 5.34:1 (light); deep-gradient words 6.1–6.8:1. The light "Contact" heading rose from
    1.7:1 to 6.1:1; in dark mode it keeps the bright gradient at about 9.5:1.
- **Not yet rolled out elsewhere.** About 60 legacy-gradient headings remain site-wide (see
  Known issues). Extending this rule beyond the Contact page needs its own approval. Measure
  each surface; don't assume it from the theme.
- **Owner approved** the final Contact page design on Nov 25, 2026: the deep gradient, the
  matching card backgrounds, solid labels and icons, and the "Contact Us" heading
  correction. It shipped with PR #27.
- **Future enhancement, deferred by the owner on Nov 25, 2026: a site-wide gradient
  accessibility review.** Deliberately left out of the launch, so don't start it without
  approval.
  1. Inventory every remaining legacy-gradient heading and its actual surface in both themes.
  2. Measure rendered pixels at 375/768/1280.
  3. Apply this table where a heading fails.
  4. Reconcile the duplicate `src/components/portfolio/BrightPathGradientTitle.tsx`, which
     has no `emphasis` prop.
  5. Get visual approval page by page.
- **Not the metallic experiment.** The deep gradient stays within the dark end of the brand
  gold family. The rejected metallic gradient (below) fails on cream because of its light
  highlight.

## Background System (approved Aug 15, 2026)

**Principle: the artwork is part of the design language and must be clearly perceptible —
not reduced to a barely-visible texture.** It still sits behind the content hierarchy, but
do not fade it back without a specific design reason.

**Grades (current production values).**

```css
html.dark  .home-services__art,
html.dark  .services-atmos::before { filter: brightness(0.9)   saturate(0.82) contrast(1.12); }
html.dark  .home-reviews__art,
html.dark  .services-cta__art      { filter: brightness(0.87)  saturate(0.8)  contrast(1.11); }
html.light .home-services__art,
html.light .home-reviews__art,
html.light .services-atmos::before { filter: brightness(0.955) saturate(1.18); }
```

The old dark grade was `brightness(0.68) saturate(0.58)`, which removed a third of the
luminance and over 40% of the colour *before* any overlay landed; that is what made the
artwork imperceptible. **Light mode is now deliberately graded** — it used to be
`filter: none`, on the theory that cream-keyed artwork needed no help, but the artwork's own
low contrast against cream was the entire limit.

**Light grading must use `brightness`, not `contrast`.** The light artwork is near-white
with linework only a few values below the cream ground, so a contrast lift clips it all to
pure white. A trial at `contrast(1.14)` erased the topographic lines completely, dropping the
share of the section carrying visible artwork from 95% to 2%.

**Feathers.** Edge ramps end at **15–17%** of section height (they were 26–30%), which
roughly doubles the clear middle band. They still reach full ground colour at the boundary,
which is what keeps section joins seamless — shorten further only with measurement.

**Section-wide washes → localized copy protection.** The full-coverage diagonal navy dropped
from `0.34 / 0.10 / 0.36` alpha to `0.20 / 0.04 / 0.22`. Readability is bought instead with
`--services-copy-scrim`, an ellipse sized to the heading/lede block. Cards carry their own
surfaces and need no protection.

**Per-section fixes that must not regress:**

- **Tech Stack** had three reductions stacked in one place — a mask confining the artwork to
  the bottom edge, an `opacity: 0.62` multiplier, *and* the veil painting solid ground colour
  at exactly that edge. The `opacity` is gone and the mask now peaks mid-section
  (`background-size: 118% auto; background-position: center 62%`).
- **Our Process** artwork is `background-size: auto max(92%, 42.5vw); background-position:
  right top`. The previous fixed `-199px` lift sliced the compass rose against the section
  boundary. It is top-anchored so the rose stays whole; the heading is protected by a scrim
  centred on the heading line rather than by masking the artwork away.
- **Homepage Services on mobile** is reframed to `background-size: 165% auto;
  background-position: 24% 46%` (below `md`). At plain `cover` the portrait artwork put all
  its interest in the top third and read as having run out.

**Architecture — the two pages differ, keep the distinction.**

- **Homepage** uses real DOM layers: `.home-services__art` / `.home-reviews__art` (two each,
  swapped at `md` for portrait vs. landscape crops) plus a sibling `__veil` div.
- **Services** is pseudo-element based: `.services-atmos::before` is the artwork,
  `::after` is the veil, with the hairline riding as `::after`'s first background layer.
  The closing CTA is the exception and uses a real DOM layer, `.services-cta__art`.

**`.services-rule:not(.services-atmos)::before` — do not remove the exclusion.** Sections
carrying `.services-rule` draw their hairline with `::before`, but `.services-atmos` sections
already use `::before` for artwork. Without the `:not()`, the hairline's `height: 1px` wins
over the artwork's `inset: 0` and the artwork paints into a one-pixel strip — which is how
the Services backgrounds went invisible once before. Atmosphere sections get the same
hairline via the `--services-hairline` background layer instead.

**Atmosphere glows stay luminous in both themes.** The gold radial pools inside the veils and
scrims (`home-story`, `services-cta__scrim`, `services-atmos--build/process`) use
`rgba(242, 201, 76, …)` even in light mode. They are atmospheric light within the background
system, not UI gold, and are deliberately exempt from the one-gold-per-theme rule.

## Accessibility (conclusions from Aug 15 testing)

- **Measure against the actual rendered backdrop**, not the stylesheet — especially where
  artwork or scrims sit behind copy. Sampling the rendered pixels is how the light-mode
  homepage lede was found at 4.03:1 and how the "Process" heading was caught at 2.90:1.
- Two measurement traps that produced wrong answers during this work, both worth avoiding:
  hiding an element with `visibility: hidden` to sample its backdrop also removes *its own
  background* (this made a passing button look like a 1.22:1 failure); and a near-black
  coverage mask collides with the `#0A0F18` ground.
- **Thresholds**: normal text ≥ 4.5:1; large display text (≥24px, or ≥18.66px bold) ≥ 3:1;
  UI component boundaries and focus indicators ≥ 3:1. Purely decorative marks — hairlines,
  glows, aria-hidden icons beside a visible label — carry no requirement.
- **`#F2C94C` is excellent on navy (12.09:1) and unusable as text on cream (1.47:1).** That
  single fact is why the light theme has its own gold.
- Final light-mode measurements, worth keeping as a regression guard: gold text
  **4.73–5.58:1**; gold CTA fill with cream label **5.18:1** (hover 4.76:1); CTA boundary vs
  cream **5.18:1**. Dark-mode gold emphasis **11.10–12.39:1**; gold fill with midnight label
  **10.13:1**.
- Fixed during this pass: the homepage services lede (4.03:1 → passing, now uses
  `.services-body`), and every `text-primary` label on light grounds (was 1.54–1.74:1).

## Metallic Gold Gradient — EXPERIMENT ONLY, not production

A "signature gold gradient" was built and tested against real BrightPath typography, then
**not adopted**. Do not assume it is part of the design system.

```css
linear-gradient(110deg, #B8860B 0%, #D4AF37 22%, #F2C94C 46%,
                        #FFD966 54%, #D4AF37 67%, #A97C00 100%)
```

Findings: attractive on large dark-mode display type and strong on navy (min **5.16:1**,
max 14.04:1). On cream it fails badly — min **1.27:1** — and the limiting region is the
`#FFD966` highlight itself, so the very thing that reads as polished metal is the lowest-
contrast part. It also scales with the element box, not the type: the gradient line runs
399px across the hero accent but only 79px across "Beacon" at 390px wide, so the same
declaration reads as several different materials. Short words compress the ramp; multi-line
headings run the axis diagonally across the whole block and colour each line differently.

The test harness lives **outside the repo** in the session scratchpad. Keep it there.

## Parallax — discussed, NOT implemented

No **scroll-transform** parallax exists, and none was built on Aug 15. Note the separate,
older thing that does exist: `md:bg-fixed` (`background-attachment: fixed`) still ships on
AboutPage, ContactPage, PortfolioDemoPage and MultiPageFlowSection — desktop-only, because
it doesn't work on iOS. That is attachment-based and is not on the Homepage or Services
page. On AboutPage it is now an **approved** part of the design (Oct 5, 2026): the
timeline background with `bg-cover bg-center md:bg-fixed` on My Journey, Why Work With Me
and the closing CTA. That approval covers the existing attachment-based effect only — it
is not a green light for transform parallax.

If transform parallax is explored later, the two strongest candidates are
**Homepage Reviews** (`.home-reviews__art`) and the **Services CTA** (`.services-cta__art`),
because both are real DOM layers that can be transformed independently of their veils — the
`.services-atmos::before` pseudo-elements already carry tuned `transform`/`background-position`
maths and are poor candidates.

If implemented: subtle `translate3d` only, rAF-throttled passive scroll listener, gated behind
`prefers-reduced-motion: reduce`, disabled below `md` unless testing proves otherwise, and
**never `background-attachment: fixed`** (it does not work on iOS — see iOS Safari notes).

## Current Approved Visual State (as of August 15, 2026)

Do not reopen these without a specific reason:

- Homepage background visibility — **approved**
- Services background visibility — **approved**
- Light-mode background visibility — **approved**
- Dark-mode background visibility — **approved**
- Background clipping/cutoff issues from this pass (sliced compass rose, Tech Stack stacking,
  mobile Services framing) — **resolved**
- Light and dark gold systems (one gold per theme) — **approved**
- Primary CTA colour coordination with each theme's gold — **approved**
- Typography, layout, copy and component structure — **not intentionally redesigned** in this
  pass; the only type change was a colour correction to the homepage services lede
- Metallic gradient — **not production**
- Parallax — **not implemented**

## Contact form, Analytics and newsletter (October 19–20, 2026)

### Where things stand

> **Historical snapshot (Oct 19–20, 2026)**; it predates the later releases. For the
> newsletter, the code reached `main` with PR #23 on Oct 22, 2026 (`ff46a89`). The current
> newsletter status is under "Newsletter (MailerLite)" below.

- **Live on `main` / production**: `20b331a` (deploy `6ad7916293e90352aa2b531e`). Two small
  contact-form hotfixes shipped on their own branches and were verified with real
  submissions:
  - `ffd41b6` renamed the honeypot from `website` (which browser autofill filled, so the form
    faked success and sent nothing) to `bp_contact_extra`, with password-manager ignore hints.
  - `20b331a` disables the prerendered Send button via `IS_PRERENDER`. Before that, pressing
    Send before React took over submitted the form natively and put the visitor's name,
    email and message in the URL.

  The production Apps Script deployment was also corrected by the owner: its notification
  recipient pointed at an address on `brightpathwebstudio.com`, a domain that doesn't exist,
  and now goes to `contact@brightpathwebstudio.org`.
- **Committed locally on `feature/newsletter-signup`, not yet pushed or deployed**:
  - `e81ffb5`: contact details, Privacy Policy and Terms
  - `a867fd6`: Analytics fix and U.S.-only safeguards, plus `npm test`
  - `bb787c1`: contact form v2 and the shared origin validator
  - `b09e6c3`: the newsletter behind its flags

  None of this is live. Release follows the reviewed rollout plan: a deploy preview first,
  then production with explicit approval at each step.

### Contact form v2 — confirmed submissions

Browser → `POST /api/contact-inquiry` (Netlify Function) → Apps Script v2 (`Code.gs`) → 302 to
`script.googleusercontent.com` → JSON reply.

- **Success means confirmed.** The visitor sees "Thank you" only when the script replies
  `{ ok: true, code: 'saved' | 'duplicate' }` for the **same submission ID**. Never trust
  the HTTP status: Apps Script answers 200 even when the script throws.
- **Order of operations.** The script saves the row first (under a lock, deduplicated by
  submission ID), reads it back, then emails `NOTIFY_TO`. An email failure is recorded in
  the Sheet's Notification column; it doesn't fail the inquiry.
- **Spreadsheet formulas** (`=`, `+`, `-`, `@`, tab, CR) are stored as plain text.
- **On failure** (20 s browser timeout, 15 s script timeout) the form keeps the visitor's
  text and shows `contact@` and the phone number as alternatives. A retry reuses the
  submission ID; editing the message gets a new one.
- **Logs** carry submission IDs and outcome codes only, never names, emails or messages.
- **Apps Script properties**: `SHARED_SECRET`, `NOTIFY_TO`, `SPREADSHEET_ID` (required for
  the standalone production project; it's kept out of the repo), and `SHEET_NAME`
  (production: `Sheet1`). Production v2 runs in its own standalone project; the original
  project bound to the Sheet stays untouched.
  Requests without the shared secret are refused, so the public `/exec` URL can't be used
  to spam the Sheet.
- **Rule: test before replacing the working integration.** The live form still posts to the
  existing production deployment, which must stay active and untouched until v2 is proven.
  The replacement goes live as a **new** Apps Script deployment, never a new version of the
  existing one: v2 rejects requests without the secret, so updating the live deployment
  would break the live form. After a 48-hour watch, archive the old deployment. The full
  sequence and rollback are in `google-apps-script/contact-form-handler/README.md`.
  - All five checks passed against a separate TEST Sheet and TEST deployment on Oct 19–20:
    normal, duplicate retry, email failure, Sheet failure, formula injection.
  - Not yet run on Netlify's servers (deploy preview) or against production.

### Google Analytics — U.S.-only privacy safeguards (on the feature branch)

- **Root cause of the outage.** `gtag()` pushed a rest-parameter **array** onto `dataLayer`,
  and gtag.js only processes the `arguments` object. So **production GA4 has recorded
  nothing since `468f363` (March 2026)**; the fix is in `a867fd6`. Keep
  `dataLayer.push(arguments)` and its `eslint-disable prefer-rest-params` comment.
- **Load order.** Analytics loads only after the first interaction, and only if every check
  passes. Any failure means it doesn't load: fail closed.
  1. The hostname is `brightpathwebstudio.org` or `www.` (never localhost or deploy
     previews).
  2. The **device time zone** is one of the 29 U.S. IANA zones (plus legacy aliases). This
     is read on the device only. Non-U.S. zones, UTC, and missing or unrecognised values
     stop here without even calling the region check.
  3. `/api/analytics-region` returns `{ analytics: true }`. It's an **allowlist (`US` only)**
     based on Netlify's IP geolocation. Unknown locations, errors and timeouts mean no
     Analytics. The function stores nothing and returns no country.
- **Consent Mode.** `ad_storage`, `ad_user_data` and `ad_personalization` are denied
  everywhere. `analytics_storage` is denied by default and granted only for region `US`
  (Google's own location check). Google signals and ad personalization are off in the
  config; the GA property also has signals off, 2-month retention and Form interactions
  off.
- **Known limitation.** If our checks say U.S. but Google's location doesn't, Google still
  receives **cookieless** pings (`gcs=G100`, no cookies). This was tested and is disclosed in
  the Privacy Policy. Don't describe the setup as "zero Google requests for every non-U.S.
  visitor".
- **Never send form data.** Page addresses sent to GA keep only `project` and `utm_*`.
  `contact_submit` fires only after a confirmed save, via `loadAnalytics().then(trackEvent)`.

### Newsletter (MailerLite) — LIVE since Nov 26, 2026 (see "Resume Here" for current state)

- **Two flags.**
  - `VITE_NEWSLETTER_ENABLED=true` (compiled in at build time) renders the footer form.
  - `NEWSLETTER_ENABLED=true` (read by the function) accepts signups; otherwise the function
    answers "unavailable".
  - **Both take effect only on a new deploy.** Netlify gives each deploy the variable values
    from when it was built, so changing either one does nothing to the live site until you
    redeploy. The fastest rollback is republishing an earlier flags-off deploy, which takes
    effect instantly.
- **Double opt-in.** API signups rely on MailerLite's account-level "Double opt-in for API
  and integrations" setting, which is enabled. The function must **never send `status`**:
  `status: 'active'` skips confirmation.
- **Launch hardening (PR #23, `feature/newsletter-launch-hardening`):**
  - The function looks the address up first and **never writes to an address MailerLite
    already knows** (any status).
  - Every accepted signup gets the same reply (no enumeration).
  - Origin is required.
  - Signups under 3 s after the form appeared are ignored. The form waits out the rest, so
    people are never refused.
  - Unsubscribed or unconfirmed people need manual help to rejoin — an accepted trade-off.
  - An address removed with MailerLite **Delete** is restored with its **old status** when it
    is submitted again:
    - Unconfirmed comes back Unconfirmed, with a new confirmation email;
    - Active comes back Active **without** confirmation (verified Nov 16, 2026).

    Hence: Delete only Unconfirmed subscribers.
  - "Known" means anywhere in the **MailerLite account**, so someone in another group but
    not in BrightPath Updates is also left out. **Never auto-add them** (it would skip double
    opt-in). The log line records status plus `in-group` / `not-in-group` / `group-unknown`,
    never personal data. Enquiries are handled by hand, with consent kept as the person's own
    email: `NEWSLETTER-SETUP.md`, "Signup enquiries".
- **Production status: live since Nov 26, 2026, 03:12 UTC.** Both flags are `true` in
  Production only; the current deploy and rollback IDs are in "Resume Here". History: the code
  shipped to `main` with PR #23 on Oct 22, 2026 (`ff46a89`, deploy `6ada6341dbc60eb37fa3173d`)
  and stayed off, answering 503 with no band, until activation.
  - Per the owner on Oct 27, 2026: `MAILERLITE_API_KEY` (a production token) and
    `MAILERLITE_GROUP_ID` (**BrightPath Updates**) are set for **Production**, and the TEST
    values stay in Deploy Previews.
  - `NEWSLETTER_ENABLED` and `VITE_NEWSLETTER_ENABLED` are still **unset** in Production.
  - `CONTACT_*` has separate Production and Deploy Preview values.
  - **Nov 16, 2026:**
    - PR #26 merged (`4974213`, deploy `6afb454209385463bd75d2d0`). It adds the
      known-address log (status + `in-group` / `not-in-group` / `group-unknown`, 115 tests)
      and the "Signup enquiries" consent procedure.
    - Controlled server-flag-only window: deploy `6afb4bcfa57471cb75d72d10`, 18:31–18:58 UTC.
    - Rolled back by republishing `6afb4542…`; the flag is removed again (verified Nov 17).
    - **Result (verified Nov 25):** the address was not new. It had been confirmed in the
      TEST group on Oct 21 and was Deleted in MailerLite just before resubmitting. MailerLite
      **restored** it as Active (original opt-in, no new confirmation), added it to BrightPath
      Updates, and sent the welcome email.
    - The function behaved as designed: its lookup returns 404 for Deleted records.
    - **Rule: Delete only Unconfirmed subscribers;** remove Active or test accounts from the
      group instead. See `NEWSLETTER-SETUP.md`, "Deleted subscribers are restored, not
      recreated".
  - **Oct 27, 2026 controlled window** (`6ae10bf4…`, rolled back to `6ae1056e…` at 21:51 UTC):
    - the first attempt was silently dropped as "submitted too fast" (no numeric `elapsedMs`);
    - the retest succeeded end to end (see `NEWSLETTER-SETUP.md`, "Test log").
  - **Subscriber review (owner, Nov 16, counts only):**
    - TEST group: 3 Active, 2 Unconfirmed, 1 Unsubscribed, all test accounts;
    - BrightPath Updates: 1 Active, the Oct 27 test account.

    The review deleted nothing. Since the Nov 16 restore, BrightPath Updates has **2 Active**
    owner test accounts, both kept until final testing.
- **MailerLite setup (owner, recorded Oct 27, 2026):**
  - the sending domain `brightpathwebstudio.org` is authenticated;
  - the company details use the official mailing address **PO Box 186, Edneyville, NC 28727**
    (email footers only; the website still shows no street address);
  - the welcome email is designed and tested (website button and footer checked); it was
    redesigned and re-verified on Nov 27, 2026 (see "Resume Here");
  - the **"Simple welcome email"** automation is **active** on joining BrightPath Updates.
- **Launch (done):** the live signup → confirm → welcome test passed after activation
  (owner-reported), and launch verification passed on Nov 26 and Nov 27. The welcome email was
  re-verified on Nov 27. Still open: the confirmation email checks, DMARC, a live unsubscribe
  test, and the TEST environment, which is kept by owner decision. See
  "Outstanding maintenance" in "Resume Here". The welcome email can't be tested on a preview,
  because previews use the TEST group.
- **Verified end to end on Deploy Preview #23** (TEST group, Deploy-Preview-only variables).
  - Oct 21: a new address with a first name → confirmation email → Active, name saved; a
    known address was left untouched.
  - Second round, recorded Oct 22, all passed:
    - a new address with no first name;
    - Active, Unconfirmed and Unsubscribed addresses resubmitted (no new email, status
      unchanged);
    - Delete → re-subscribe (a new confirmation email).
  - MailerLite records subscription date, signup IP, opt-in IP and opt-in date. Results and
    the remaining unverified checks are in `NEWSLETTER-SETUP.md`.
- **Privacy Policy** (Section 3 `#newsletter`, live version `LAST_UPDATED` Oct 22, 2026):
  - "approximately once a month";
  - consent records;
  - double opt-in for new addresses only, followed by a welcome email after
    confirming (added on `docs/newsletter-launch-status`; `LAST_UPDATED` must be set to its
    publication date);
  - open tracking;
  - retention, including a **manual monthly Delete** of signups unconfirmed for over 30 days.
    **Forget** is only for individual erasure requests. The procedure is in
    `NEWSLETTER-SETUP.md`, "Monthly maintenance".
- **Deploy-preview function logs aren't visible** in Netlify's dashboard; check outcomes in
  MailerLite. The function logs nothing on a successful creation.
- **Styling** reuses existing values only: `.studio-cta--primary` filled as on the About hero,
  `.services-body` tints, theme gold via `--primary`, and site reds `red-400` / `red-700`.
- **Artwork band (approved Oct 22, 2026)** — `.newsletter-band*` in globals.css, real layers
  (`__art`, `__veil`, `__inner`) in `Footer.tsx`, rendered only when the newsletter flag is on.
  Treat it as approved; don't re-tune it without a specific reason.
  - **Below 1440px** (both themes): the homepage Services artwork at half size, masked to its
    lighthouse emblem, centred above the heading.
  - **1440px and up, light**: its **own** image, `--newsletter-art-light` → Cloudinary
    `brightpath/background-images/Optimized_Golden_Lighthouse_on_Topographic_Coast_imar8l`
    (1942×810; the bare public ID 404s, the folder is required). Full width
    (`100% auto`), anchored `left 42%` so the lighthouse stays whole, standard light grade
    `saturate(1.18)` (`1.6` turned the glow lemon-yellow). Never point it at the Services art.
  - **1440px and up, dark**: the Services dark artwork, top-anchored. The veil feathers the top
    edge to `#0A0F18` and the bottom to **`#0B1220`**, the footer gradient's own colour at
    that boundary. Feathering to `#0A0F18` left a visible step.
  - The dark input fill is the opaque `#141921`, so the artwork can't show through it.
  - `.site-footer:has(> .newsletter-band)::before` keeps the footer hairline above the artwork.
    Browsers without `:has()` (Firefox < 121) draw the artwork over it; cosmetic only.
  - **Known and accepted**: at 2560px the light image is stretched ~1.32× (the source is
    1942px wide) and its ring is trimmed into the feathers; below 1440px the emblem mask reads
    as a soft disc.
- **Footer link focus**: `.site-footer a:focus-visible` gives every footer link the theme-gold
  ring (2px, +2px offset) in place of the browser's blue: 4.8:1 on the light ground, 12.3:1 on
  the dark one.
- **Visual QA (Oct 22, 2026)**, measured on rendered pixels in Chrome at 375 / 768 / 1280 /
  1440 / 1920 / 2560, both themes, on `localhost:8888` with the flag on:
  - no horizontal overflow at any width;
  - all text passes. Lowest: light Privacy Policy link 4.58:1, light gold heading word 4.8:1
    (large text), light input border 3.45:1;
  - keyboard order is First name → Email → button → Privacy link, each with a visible ring;
  - the empty-email error is `role="alert"`, sets `aria-invalid`, and focus moves to the field;
  - the art and veil layers are `aria-hidden`.

### Shared origin validator — `netlify/lib/allowed-origin.js`

- **Allowed:**
  - the production origins and Netlify's runtime `URL`;
  - **this site's** Netlify deploys: `https://<SITE_NAME>.netlify.app` and
    `https://<prefix>--<SITE_NAME>.netlify.app`;
  - `http://localhost|127.0.0.1:<port>`, only when `NETLIFY_DEV=true`.
- **Refused:** look-alikes, other sites' previews, extra ports, paths, credentials and the
  `null` origin.
- **Why `SITE_NAME`.** Functions only get `URL`, `SITE_NAME` and `SITE_ID` at runtime;
  `DEPLOY_PRIME_URL` and `DEPLOY_URL` are build-time only.
- **Requests with no Origin header are allowed.** Non-browser clients can omit or forge it,
  so the check only stops other websites using a visitor's browser.

### Environment variables (names only — values live in Netlify or a gitignored `.env`)

| Variable | Local dev (`.env`) | Deploy preview | Production | Notes |
|---|---|---|---|---|
| `CONTACT_SCRIPT_URL` | TEST deployment `/exec` | TEST deployment | new **production v2** deployment | Functions scope; must be a `script.google.com/macros/s/…/exec` URL (localhost allowed only under `netlify dev`) |
| `CONTACT_SHARED_SECRET` | TEST secret | TEST secret | production secret (different) | Mark secret; must equal that script's `SHARED_SECRET` |
| `NEWSLETTER_ENABLED` | unset / `false` | `true` (TEST group; kept, Nov 27) | **`true`** since Nov 26, 2026 | Read by the function; still needs a **redeploy** to change |
| `MAILERLITE_API_KEY` | unset | TEST token | production token | Mark secret; full account access |
| `MAILERLITE_GROUP_ID` | unset | TEST group (`…8041`) | BrightPath Updates (`…5756`) | Never swap these |
| `VITE_NEWSLETTER_ENABLED` | optional for review | `true` (kept, Nov 27) | **`true`** since Nov 26, 2026 | **Build time**; needs a rebuild |
| `WORDPRESS_API_URL`, `WORDPRESS_APP_PASSWORD` | from the linked site | existing | existing | Unchanged |

- **Placeholders** are in `.env.example`.
- **Any variable change needs a new deploy**, functions included (`CONTACT_*`,
  `MAILERLITE_*`, `NEWSLETTER_ENABLED`). Each Netlify deploy keeps the values it was built
  with. Republishing an older deploy restores *its* values instantly.
- **Never** prefix a credential with `VITE_`: those values are compiled into public
  JavaScript.
- **Set preview values for the `deploy-preview` context only**, so production can never pick
  up TEST values.
- **The repo is public.** Before any commit, scan for the TEST secret and deployment ID.

### Abuse-protection limits (read before public activation)

- **Rate limits are per function instance and in memory**: contact 8 and newsletter 5
  requests per IP per 10 minutes. Netlify runs and recycles several instances, so this is
  best-effort only.
- **What actually protects each endpoint:**
  - contact: the shared secret, validation, the honeypot, and Apps Script deduplication;
  - newsletter: double opt-in, plus validation and the honeypot.
- **Remaining risk.** A scripted client can still post junk to the Sheet, or trigger
  MailerLite confirmation emails to addresses it doesn't own. That could hurt sender
  reputation.
- **Stronger protection** (Netlify rate-limiting rules, or a challenge such as Cloudflare
  Turnstile) was deferred by the owner until after launch. The newsletter went live on Nov 26,
  2026 without it. It's still open as its own decision ("Outstanding maintenance", item 5).

### Content and legal pages (on the feature branch)

- **Official contact details** live in `src/config/contact.ts` (`BUSINESS`): BrightPath Web
  Studio, LLC, contact@brightpathwebstudio.org, (828) 388-5743, "North Carolina, United
  States". There's deliberately no street address. Confirmed by the owner on Oct 19, 2026.
- **The Privacy Policy and Terms** share `src/components/legal/`, on the cream / near-black
  grounds. This replaced the `bg-stone` grey slab, which put white text on `#9CA5AF` in dark
  mode.
- **Terms decisions confirmed by the owner:**
  - 18+ applies only to entering a service agreement;
  - the Henderson County, NC venue is kept;
  - the written agreement or quote governs pricing.
- **The Privacy Policy discloses:**
  - the contact form (Google Workspace) and the newsletter (MailerLite);
  - U.S.-only Analytics, including the time-zone check and its limits;
  - the Cloudflare `__cf_bm` security cookie on Services page images from the WordPress CMS;
  - the service providers.
- **Bump `LAST_UPDATED`** on both legal pages to the real release date.
- **Contact page refinements** (approved): balanced card spacing; the email field uses the
  input text colour instead of the gold gradient class; new "Why Choose BrightPath?" copy;
  response time "one business day" everywhere.

## Recent Session Work (October 5, 2026) — approved, merged to `main` and deployed

Branch `feature/about-page-refresh` (from `main` at `4d9d80f`); commits `6f54b89` (refresh,
metadata, prerender and hero accessibility) and `0f8dae7` (About section backgrounds).
`main` was fast-forwarded to `0f8dae7` and deployed to production (Netlify deploy
`6ac3f2688449550007a9a062`). Post-deploy production verification passed: new content live,
timeline backgrounds fixed from `md` up and scrolling below, Selected Work/Skills solid,
hero buttons correct, all About links working, one `<h1>` per page, no layout regressions
at 390/768/1440. Follow-up `6a43b8a` on `main` fixed the `fetchPriority` warning below;
its first Netlify deploy failed on an intermittent prerender check (see below), and a
retry of the same commit with no changes published as deploy
`6ac3fb855f4d1bf95bb3567a`. Full decisions: `about-page-refresh.md` in the steward memory.

- **Positioning.** About now presents Tisha as **"Founder & Frontend Engineer, BrightPath
  Web Studio"** while keeping Phase 5's business-first voice. Two readers: a prospective
  client and a technical hiring manager. No recruiter / "open to work" language.
- **Structure:** Hero → My Journey (4 cards, lighthouse story kept verbatim) → Selected Work
  (AweStruck + Dale Tiffany only, no metrics — those stay on the case studies) → Why Work
  With Me → Skills (4 groups) → closing "Let's Talk" + quiet GitHub/LinkedIn row.
- **Skills rule:** only what shipped work or the existing list supports. Divi removed; no
  testing tools (no test runner exists in the repo); Figma kept by request.
- **Résumé link is intentionally off.** `RESUME_URL = null` in AboutPage.tsx. The current
  `public/assets/Tisha-DiFresco-Resume.pdf` is outdated ("WordPress Developer", Divi). Don't
  link or edit it; replace it with the new React/TypeScript résumé, then set `RESUME_URL`.
- **Hero contrast.** `.about-hero__scrim` (localized gradient, per-breakpoint stops) plus
  `.about-hero__cta` (filled theme-gold primary, midnight-backed secondary) in globals.css.
  Measured on rendered pixels, both themes, 390/768/1024/1440, grayscale and colour states:
  ≥95% of backdrop pixels behind each text element pass 4.5:1 (3:1 for the 30–60px name and
  the 24px role line). Before: eyebrow ~1.1:1, name 1.2–1.5:1 on phones/tablets. Lighter
  stops failed (name 2.76:1 on phones) — retune only by measurement. The old
  `hover:bg-yellow-400` second yellow is gone.
- **Hidden-hero `<h1>` fix** across all non-home HTML including `app.html` — see the
  Static Prerendering rule above. `ClarityHero.tsx` is now load-bearing.
- **Metadata.** Homepage + `index.html` defaults: "BrightPath Web Studio — Websites Built
  Around Your Business", business-first description, keywords and ProfessionalService
  schema without "WordPress developer"/Divi. About: "About Tisha Di Fresco", Person JSON-LD
  with `jobTitle`, degree credential, awards and GitHub/LinkedIn `sameAs`.
- **Left alone on purpose:** the legacy yellow→orange gradient section headings (site-wide
  design-system question).
- **About page backgrounds (approved after visual review).** My Journey, Why Work With Me
  and "Have a Project in Mind?" all use the *same* treatment, copied from My Journey:
  `--timeline-bg-dark` / `--timeline-bg-light` as an inline `backgroundImage`, classes
  `bg-cover bg-center md:bg-fixed`, an `absolute inset-0 bg-midnight/60 z-10` overlay
  element, and content at `relative z-20`. Selected Work and Skills & Expertise stay plain
  deep navy (`#1A2238`; `bg-gray-100` in light), giving the approved rhythm
  artwork → plain → artwork → plain → artwork. Section edges are deliberately hard (no
  feathers or veils). Light-mode text on the two new artwork sections uses `.services-body`
  (6.0–6.4:1 measured); dark-mode text is 16–19:1. The closing CTA keeps `py-24 md:py-28`.
  - **Rejected along the way, don't re-propose for these sections:** the flat
    `#273442` / `bg-gray-200` slab (read as the old grey system); the Services closing-CTA
    treatment `.services-cta*` (its edge mask left only ~20% of the section showing
    artwork); and the homepage `.home-services` / `.home-reviews` treatments (approved on
    the homepage, but not the look wanted here).
  - **`bg-midnight/60` is a no-op — and the approved look depends on that.** No `midnight`
    colour exists in `tailwind.config.js`, so the class generates no CSS and the overlay
    computes to `rgba(0,0,0,0)`. All three sections therefore show their artwork unveiled.
    Defining `midnight` (or "fixing" the class) would darken all three sections at once
    and change the approved appearance — treat it as a design change, not a bug fix.
  - Measuring note: `md:bg-fixed` backgrounds render wrongly in full-page screenshots.
    Sample contrast from viewport screenshots with the element scrolled into view.
- **`fetchPriority` console warning — found after deploy, fixed.** React 18.3 doesn't know
  the camelCase `fetchPriority` prop and logs "React does not recognize the
  `fetchPriority` prop". It already fired on `/services` (`ServicesPage.tsx` hero image)
  before this work; the new `ClarityHero` fallback exposed it on About → Home as well.
  Fix in both files: `{...{ fetchpriority: 'high' }}` — the lowercase attribute passes
  through to the DOM unchanged (same `fetchpriority="high"` as `STATIC_HERO_HTML`), and the
  spread sidesteps React 18's TypeScript types, which only declare the camelCase name.
  Verified on a `NODE_ENV=development` build (the build Netlify ships): no warning on
  direct Home/About/Services, About → Home, Home → Services or About → Services; images
  still load with `fetchpriority="high"`. Verified again in production after deploy
  `6ac3fb855f4d1bf95bb3567a`: zero "does not recognize" warnings on direct Home, About,
  Services and Privacy Policy, About → Home, Home → Services, About → Services and
  Privacy → Home. `SocialMediaCard.tsx` still uses the camelCase prop — deliberately out
  of that fix's scope.
- **Intermittent prerender failure on `/privacy-policy` (Oct 5, 2026) — unexplained.**
  The first Netlify deploy of `6a43b8a` failed with `[verify-prerender] … /privacy-policy:
  contains the hidden homepage hero (and its <h1>)`, even though vite-plugin-prerender
  reported "All routes rendered successfully!". `/privacy-policy` is correctly listed in
  `PRERENDER_ROUTES` and routed in `main.tsx`; the same commit prerendered cleanly locally
  (both normal and `NODE_ENV=development` builds); the identical config deployed fine at
  `0f8dae7`. No code or config was changed — a retry of the exact same commit succeeded
  (deploy `6ac3fb855f4d1bf95bb3567a`). Treat it as intermittent, **not** a missing route or
  config error. The guard did its job: it blocked un-prerendered/hero-carrying HTML from
  shipping. If it recurs, retry first and capture the full build log; never respond by
  removing the check, dropping routes, or using `SKIP_PRERENDER=1`.

## Recent Session Work (September 26, 2026) — approved, merged to `main` and pushed

**Business-first copy rewrite of the homepage and Services page** (Phase 5). Copy only — no
layout, styling or component changes beyond the Services hero gaining an eyebrow and a CTA
that reuse existing classes. Commits `3dd1df7` (homepage) and `f66aa58` (Services);
`feature/services-page-redesign` was then fast-forwarded into `main` (`b9e4aa7..f66aa58`)
and pushed, which triggers Netlify's production deploy. Full decisions and deferred loose
ends: `phase-5-business-first-copy-approved.md` in the steward memory.

- Primary CTA vocabulary is now **"Let's Talk" → `/contact`** on both pages.
- Homepage My Work cards and the Services page **no longer show technical metrics**
  (26→100, 62→99) — a deliberate choice; Portfolio cards and case studies keep them.
- Brand Story lost the "Illuminating Success" tagline and rule; its CTA reads "Tell Me About
  Your Business".
- Services phase cards were rewritten by the user **in WordPress/ACF** and must stay
  WordPress-driven — never hard-code them.
- Deferred: response time now reads "one business day" on Services but "24 hours" on
  Contact; Reviews page still says "Start Your Project".

## Recent Session Work (August 15, 2026) — approved, committed and pushed

Branch `feature/services-page-redesign`, committed as `8bea351` (feat: refine services page
experience) and `fb8b2be` (style: refine backgrounds and theme gold system), pushed to
origin. Background visibility pass plus the gold-system consolidation. Detail lives in "Gold
System", "Background System", "Accessibility" and "Current Approved Visual State" above —
this is just the shape of the session.

- **Backgrounds made visible.** Dark grade eased, light grade introduced, feathers shortened,
  section-wide washes cut in favour of localized copy scrims. Tech Stack, Our Process and
  mobile Homepage Services each had a specific geometry bug fixed. Verified with a headless
  Chrome harness measuring artwork contribution per section × theme × viewport, plus a
  row-to-row luminance scan confirming no hard section seams.
- **Gold consolidated to one value per theme.** Reached after three rejected intermediate
  systems: hue-corrected mustard pair, navy-only light emphasis, and mixed
  mustard-text/yellow-button. Dark also lost a second yellow — `--primary` was `#F4BC1F`
  alongside `#F2C94C` and is now brand gold, verified by a pixel diff whose `maxDelta` was
  exactly 45, the distance between those two colours.
- **Accessibility fixes carried along**: homepage services lede, all `text-primary` labels on
  light grounds, and the flip-card light back face.
- **Not adopted**: metallic gradient (experiment, outside the repo), parallax (not built).

## Recent Session Work (August 11–12, 2026)

### Homepage redesign — complete and approved (`7927270`)
Hero, header/nav/CTA, full light/dark background system, footer integration and typography
emphasis. Detail in "Homepage Visual System" above. Verified per pass with a headless-Chrome
harness at 1440px and 390px in both themes, pixel-diffing approved regions to confirm nothing
locked had moved.

- Removed `public/images/hero-image.png` (1.8 MB, unreferenced) in favour of the WebP.
- Contrast was verified against *rendered pixels*, not the stylesheet — which is how the
  primary CTA was found rendering white-on-gold at 1.59:1. Cause: `.studio-hero__cta a
  { color: inherit }` in the critical inline CSS outranks a single class, so colour rules
  for hero CTAs must be scoped one level deeper.

---

## Recent Session Work (August 8, 2026)

Branch: `test-netlify-prerender`. Verified with a headless-Chrome harness serving `dist/`
the way Netlify does, throttled to 1.6 Mbps / 150 ms.

### Static prerendering (committed)
- `3c4b4cd` — 12 routes prerendered; `data-rh` metadata dedup; `app.html` SPA fallback;
  `verifyPrerender` build gate; inline theme bootstrap. Switched to `createRoot`-always
  after confirming React 18 can't hydrate a DOM snapshot.
- `409f6c0` — Fixed the Netlify build. Root cause was Puppeteer's browser never being
  installed (postinstall hooks suppressed), not the old Puppeteer version. Upgraded
  `puppeteer` 1.20 → 25.5.0 via an `overrides` entry, removed the hardcoded macOS Chrome
  path, install the browser explicitly at build time, added a launch preflight.

### About page performance (`3a1e994`, merged via PR #21 as `c04bb8d`)
- `Mountains.jpeg` 5824×3264 / **7.0 MB → 2560×1435 / 716 KB** (mozjpeg q80). Same
  filename, so no code change. Background is `bg-cover bg-center`, so nothing depends on
  its intrinsic size.
- Portrait `my-profile.png` 349 KB → **`my-profile.webp` 44 KB** (q90, `alphaQuality: 100`;
  35% of its pixels are partially transparent, so alpha had to survive). A lossless PNG
  re-encode came out *larger*, so WebP was the only real saving.
- Removed the portrait's entrance animation — it was the LCP element and the animation
  delayed it twice (snapshot baked `opacity: 0`, then React replayed the fade).
- Added `revealFrom()` + `IS_PRERENDER` so the other 10 scroll reveals emit their settled
  state into the snapshot while visitors keep the animations.
- Fixed the CTA: `<button>` nested inside `<Link>` gave two tab stops and two screen-reader
  announcements. Inner button is now `tabIndex={-1}` + `aria-hidden`, `Link` carries the
  `aria-label`. Needed two optional passthrough props on `BrightPathGradientButton.legacy`.

**Measured on `/about`:** images 7.58 MB → **1.00 MB**; LCP 7868 ms → **4348 ms**;
invisible body text 273/350 words (78%) → **0**. Desktop and mobile screenshots
pixel-identical throughout (maxDelta 0).

### Known issues (deliberately not fixed)
- **Theme pinning**: `initializeTheme()` writes the resolved theme back to `localStorage`,
  so a first visit permanently pins it and a later OS light/dark switch never takes effect.
  Also, `setTheme()` no-ops when the value matches the store default (`'light'`) — which is
  why the inline bootstrap in `index.html` sets `documentElement.className` directly.
- **Image weight elsewhere**: `public/images` is ~116 MB, ~34 files over 1 MB, most
  unreferenced. `/case-study` still ships 10.6 MB (`main_pages1.png` alone is 5.5 MB) with
  no `loading="lazy"` on most images.
- **`/images/*` caching**: falls under the `/*` rule (`max-age=0, must-revalidate`), so
  every navigation revalidates every image. Filenames aren't content-hashed, hence the
  conservative default.
- **Social-media case studies**: `VideoCarousel.tsx` uses mount animations, so whether the
  snapshot catches them mid-fade is a timing race. Only ~10 words of decorative text; left
  alone.
- **Legacy gradient text still site-wide**: ~60 occurrences remain outside the homepage
  (ServicesPage, AboutPage, ReviewsPage, PortfolioDemoPage, SocialMediaPortfolioPage and the
  case-study components; ContactPage was converted on Nov 25, 2026). Not migrated. Many of
  them fail contrast on light surfaces (the bright gradient measures 1.2–2.8:1 there). This
  is the deferred **site-wide gradient accessibility review**; see "Surface-based gold" for
  the rule and plan. There is also a
  near-duplicate `src/components/portfolio/BrightPathGradientTitle.tsx` used by the
  portfolio/case-study components — it does *not* have the `emphasis` prop. Any site-wide
  rollout has to reconcile both files.
- **Pre-existing TypeScript error**: `src/pages/ContactPage.tsx` — TS2717, conflicting
  `gtag` declarations. Predates this work; deliberately not fixed in `7927270`.
  **Resolved on `feature/newsletter-signup`** (`bb787c1`: the Contact page sends its event
  through `utils/analytics`). Still present on `main` until that branch merges.
- **GA4 has recorded nothing since March 2026 on production** (`dataLayer.push(args)` instead
  of `arguments`, from `468f363`). It's fixed on `feature/newsletter-signup` (`a867fd6`),
  not yet on `main`. See "Contact form, Analytics and newsletter".
- **The live contact form can still show "Thank you" when Google fails.** It uses
  `mode: 'no-cors'`, so it can't read the reply. Contact form v2 (on the feature branch)
  fixes this. Until it ships, the Sheet and the `contact@` inbox are the source of truth.
- **The function rate limits are per instance (best-effort)**, and no-Origin requests are
  allowed. Stronger abuse protection was deferred past launch (newsletter live Nov 26, 2026).
  See "Abuse-protection limits" and "Outstanding maintenance", item 5.
- **Pre-existing lint**: `netlify/functions/get-case-studies.ts:178` unused `_context`
  (error) and `src/components/ui/GuidingLight.tsx:230` missing hook dependency (warning).
  Both predate this work and were left alone.
- ~~About hero name fails contrast~~ — **resolved Oct 5, 2026** with `.about-hero__scrim`
  (a localized copy scrim, not a colour change). See "Recent Session Work (October 5, 2026)".
- **Intermittent prerender verification failure** — seen once on Netlify (Oct 5, 2026,
  `/privacy-policy` snapshot carried the homepage hero); cause unknown, retry passed. See
  the Oct 5 session notes.
- **Production ships React's development build.** The Netlify site environment sets
  `NODE_ENV=development`, so `vite build` on Netlify emits development React: the
  `react-vendor` chunk is ~340 KB in production vs ~142 KB in a local build, and dev-only
  warnings (like the `fetchPriority` one) appear in the live console. Discovered Oct 5,
  2026; pre-existing (also on deploy `4d9d80f`) and **not changed** — it's a Netlify
  setting, and the variable may exist so devDependencies install. Fixing it needs its own
  decision and a check that the build still installs and prerenders.
- **`SocialMediaCard.tsx` still passes camelCase `fetchPriority`** (two `<img>`s), so the
  React warning can still appear on the portfolio/social pages. Same one-line fix as
  ClarityHero/ServicesPage if wanted.
- **`bg-midnight/60` generates no CSS** (no `midnight` colour in `tailwind.config.js`). Used
  on AboutPage's three timeline-artwork sections, where the resulting *unveiled* artwork is
  the approved appearance. Left as-is on purpose — see the Oct 5 "About page backgrounds".
- **Legacy `--services-card-*` tokens** in `globals.css` still carry the retired
  `44 91% 54%` gold, but nothing references them. Left in place rather than removed as
  unrelated cleanup.

---

## Recent Session Work (June 8, 2026)

### AweStruck Case Study Update
- Updated wording per Robin's feedback:
  - "Biblical SEL" → "Biblically-centered SEL" throughout
  - Introduced AMP wheel as "Biblically-centered SEL wheel (AMP wheel)"
  - Distinguishes AweStruck from other BSEL curriculums

### Commits
- `43d2cf4` — Update AweStruck case study wording per client feedback

---

## Previous Session Work (May 30, 2026)

### About Page Enhancements
- Fixed horizontal overflow on mobile (`overflow-x-hidden`)
- Scroll-based grayscale-to-color hero transition (desktop only via `isMobile` state)
- Mobile shows full color hero immediately
- Fixed "Di Fresco" line break with `whitespace-nowrap`
- Name color changed to gold (`text-primary`) with text shadows for visibility
- Responsive text sizes throughout (14px on mobile)
- Hidden timeline line/dot on mobile
- Added **Skills & Expertise** section (tag cloud of technologies)
- Added **Why Work With Me** section (4 value cards: Vision-Driven, Clear Communication, True Collaboration, Craft & Quality)

### Homepage
- Fixed hero button widths on mobile (removed `w-full`, kept `min-w-[220px]`)

### Portfolio Page
- Increased card spacing on mobile (`gap-10 md:gap-8`)

### Previous Work (May 28, 2026)
- Contact form Google Workspace integration (Apps Script + honeypot)
- Responsive theme-aware backgrounds on Contact and Portfolio pages
- iOS Safari `bg-fixed` fix across all pages
- Services page semi-transparent sections for parallax effect —
  **superseded**: the Services page now uses the `.services-atmos` artwork system
  (see "Background System"), not `bg-fixed` semi-transparent slabs
- AweStruck case study content corrections

## Commit History (Recent)

**Newer `main` history (Oct 21 – Nov 27, 2026), most recent first:**
- `b7526f6` - Merge PR #29: rollback docs after the Reviews fix `[skip netlify]` (built
  nothing; production stays on `6b09c7be…`)
- `0047d2e` - Merge PR #28: mobile Reviews link → `/reviews`, 301 `/review` → `/reviews`,
  navigation regression tests (live, deploy `6b09c7be81d23d577cc9be3c`, Nov 27, 2026)
- `42b847e` - Merge PR #27: business social links, Contact page surface-based gold, launch docs
  (deploy `6b07a2691286132cf6f47cc2` flags off, Nov 26 03:08 UTC; then the newsletter
  activation deploy `6b07a38fd4a87a8d14616ced` flags on, 03:12 UTC)
- `4974213` - Merge PR #26: known-address group logging + signup-enquiry procedure (deploy
  `6afb454209385463bd75d2d0`)
- `d594690` - Merge PR #25: welcome-email policy sentence, `LAST_UPDATED` October 27, 2026
- `ff46a89` - PR #23: newsletter launch hardening + artwork band (flags off)
- `180cec7` - PR #24: prerender hero race fix
- `aa1bec5` - contact form v2, U.S.-only Analytics, legal pages (from `feature/newsletter-signup`)

**Historical — `feature/newsletter-signup` before it merged (hashes later rewritten):**
- `b09e6c3` - feat: add MailerLite newsletter signup behind feature flags
- `bb787c1` - feat: confirm contact form submissions before showing success
- `a867fd6` - fix: restore Google Analytics with U.S.-only privacy safeguards
- `e81ffb5` - content: unify contact details and rewrite Privacy Policy and Terms

**On `main`:**
- `20b331a` - fix: prevent the contact form submitting before the app loads (current
  `main`; production deploy `6ad7916293e90352aa2b531e`, Oct 20, 2026)
- `ffd41b6` - fix: stop browser autofill from triggering the contact form honeypot
  (production deploy `6ad6dfec3fd8b421609a530c`, Oct 20, 2026)
- `4fbfb88` - docs: record 6a43b8a deploy retry and intermittent prerender failure
  (production deploy `6ac3fcb1c6dc0d00087d9f74`, Oct 5, 2026)
- `6a43b8a` - fix: pass fetchpriority as a lowercase attribute (first deploy failed
  intermittently on verify-prerender; retry of the same commit succeeded)
- `0f8dae7` - style: unify About section backgrounds on the timeline artwork
- `6f54b89` - feat: refresh About page and frontend positioning (+ metadata, hidden-hero
  `<h1>` fix, hero accessibility)
- `f66aa58` - feat: update services page copy for business-first positioning
- `3dd1df7` - feat: update homepage copy for business-first positioning
- `62154f5` / `d2c77e2` / `d5751a3` / `e94c235` - Phases 4 / 3 / 2 / 1 (conversion paths,
  hero + support visibility, portfolio trust evidence, evidence-integrity cleanup)
- `fb8b2be` / `8bea351` - Aug 15 backgrounds + gold system / Services page refinement
- `6834ccc` - Redesign homepage visual system. **Note:** this file cites it as `7927270`
  elsewhere; that hash was rewritten and is no longer on any branch — `6834ccc` is the one
  on `main`.
- `c04bb8d` - Merge PR #21 (test-netlify-prerender)
- `3a1e994` - Optimize About page and improve prerender visibility
- `409f6c0` - Fix prerendering for Netlify builds
- `3c4b4cd` - Add static prerendering for key routes
- `5757b6b` - Improve structured data and AI discoverability
- `4a539aa` - Add more spacing between portfolio cards on mobile
- `7bdde08` - Add Skills & Values sections to About page
- `3d9c66a` - Add text shadows to About hero section
- `edc5ad2` - Fix About hero showing grayscale on mobile initial load
- `c74814a` - Fix homepage hero buttons width on mobile
- `2d5e428` - About page mobile fixes + scroll grayscale effect
