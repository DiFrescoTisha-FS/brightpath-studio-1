---
name: rejected-explorations
description: Metallic gold gradient and scroll-transform parallax were explored/tested and explicitly NOT adopted — don't reintroduce without a fresh decision.
metadata:
  type: project
---

**Status:** Two separate items, both explicitly not adopted / not implemented — distinct
from "unresolved idea" because these were actively tried and rejected, not just floated.

**Metallic gold gradient (rejected, Aug 15, 2026).** A six-stop "signature gold gradient"
(`linear-gradient(110deg, #B8860B 0%, #D4AF37 22%, #F2C94C 46%, #FFD966 54%, #D4AF37 67%,
#A97C00 100%)`) was built and tested against real BrightPath typography, then not
adopted. It looks good on navy/dark mode (min 5.16:1, max 14.04:1) but fails badly on
cream (min 1.27:1, the `#FFD966` highlight itself is the failure point), and it scales
with the element's box rather than the type, so the same CSS declaration reads as
different "materials" on different-width headings. The test harness for this lives
outside the repo, in a session scratchpad — not part of the codebase. Do not assume this
gradient is available or in use anywhere.

**Scroll-transform parallax (not implemented, discussed Aug 15, 2026).** No
scroll-transform parallax exists anywhere in the app. Do not confuse this with the
separate, older, still-shipping `md:bg-fixed` (`background-attachment: fixed`) pattern
on AboutPage, ContactPage, PortfolioDemoPage, and MultiPageFlowSection — that's
attachment-based, desktop-only (doesn't work on iOS), predates the current artwork
system, and is not on Homepage or Services. If transform parallax is explored later, the
two candidates identified as strongest are Homepage Reviews (`.home-reviews__art`) and
Services CTA (`.services-cta__art`) — both real DOM layers, unlike
`.services-atmos::before` pseudo-elements which already carry tuned transform math and
are poor candidates. If ever implemented: subtle `translate3d` only, rAF-throttled
passive listener, gated behind `prefers-reduced-motion: reduce`, disabled below `md`
unless testing proves otherwise, never `background-attachment: fixed` (iOS).

**Why this matters:** both are the kind of thing that looks like "an obvious next
enhancement" to someone who didn't see the testing — flag proposals to reintroduce either
one and point to this record so the prior testing isn't silently repeated or ignored.
