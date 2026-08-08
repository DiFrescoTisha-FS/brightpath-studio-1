/**
 * True only while vite-plugin-prerender is snapshotting the app at build time.
 *
 * The Puppeteer renderer defines `window.__PRERENDER_INJECTED` via
 * `evaluateOnNewDocument`, so the property exists before any bundle code runs
 * (configured as `inject: {}` in vite.config.ts). In a real browser it is
 * absent, which is what makes this a reliable build-vs-visit discriminator.
 *
 * Used by scroll-triggered entrance animations: during the snapshot they emit
 * their settled, visible state rather than the `opacity: 0` starting state, so
 * crawlers that never scroll — most AI crawlers, and any renderer that doesn't
 * fire IntersectionObserver — still get the page's actual content. Real
 * visitors are unaffected and see the animations exactly as before.
 *
 * Evaluated once at module load; the value cannot change during a session.
 */
export const IS_PRERENDER =
  typeof window !== 'undefined' && '__PRERENDER_INJECTED' in window;
