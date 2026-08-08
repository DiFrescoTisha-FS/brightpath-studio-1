import { Helmet } from 'react-helmet-async';
import { useCallback, useRef } from 'react';

interface PageMetaProps {
  /** Page title — gets " — BrightPath Web Studio" appended automatically (unless it already includes the site name). */
  title: string;
  /** Meta description shown in search results and link previews. Keep under ~160 chars. */
  description: string;
  /** Path including leading slash, e.g. "/about". Used for canonical and og:url. Defaults to "/". */
  path?: string;
  /** Optional override for the OG/Twitter image (absolute URL). Falls back to the site-wide social-preview image set in index.html. */
  image?: string;
  /** Optional schema.org JSON-LD block(s) to inject into <head>. Helps Google produce rich-snippet results (breadcrumbs, ratings, etc.). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'BrightPath Web Studio';
const SITE_URL = 'https://brightpathwebstudio.org';
/** Site-wide social card, used whenever a page doesn't pass its own `image`.
 *  Must stay in sync with the og:image/twitter:image defaults in index.html —
 *  those tags carry `data-rh`, so Helmet owns them and always overwrites them. */
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/social-preview.png`;

/**
 * Per-page meta block — sets title, description, canonical URL, and the
 * Open Graph / Twitter Card overrides for a single route. Sits next to
 * (or near the top of) each page component. Without this, Google sees
 * the same title/description on every route and can't tell pages apart.
 */
export function PageMeta({ title, description, path = '/', image, jsonLd }: PageMetaProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const canonical = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const socialImage = image ?? DEFAULT_SOCIAL_IMAGE;

  // Signals the prerenderer (vite-plugin-prerender) that this route's <head>
  // is final and the DOM can be snapshotted.
  //
  // Timing is the whole point here. Helmet defers its DOM writes to a
  // requestAnimationFrame, so a plain useEffect fires *before* the
  // route-specific description/canonical/JSON-LD exist in <head> — the
  // snapshot would capture only index.html's defaults. `onChangeClientState`
  // runs at the end of Helmet's commit, so by the time it fires every tag is
  // in the document.
  //
  // The event must be dispatched on `document`, not `window`: the renderer
  // registers `document.addEventListener('prerender-ready', ...)`, and an
  // event dispatched on `window` is never in that listener's propagation path.
  const signalled = useRef(false);
  const handleHelmetCommit = useCallback(() => {
    if (signalled.current || typeof document === 'undefined') return;
    signalled.current = true;
    document.dispatchEvent(new Event('prerender-ready'));
  }, []);

  return (
    <Helmet onChangeClientState={handleHelmetCommit}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />

      {jsonLdBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
