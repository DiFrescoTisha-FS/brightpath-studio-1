// netlify/lib/allowed-origin.js
// Shared, strict Origin check for the contact-inquiry and newsletter-subscribe
// functions. Lives outside netlify/functions so Netlify doesn't deploy it as a
// function of its own; esbuild bundles it into each function that imports it.
//
// Allowed:
//   • the live site: https://brightpathwebstudio.org, https://www.brightpathwebstudio.org,
//     and Netlify's runtime URL (the site's main address)
//   • this site's own Netlify deploy addresses — https://<SITE_NAME>.netlify.app and
//     https://<prefix>--<SITE_NAME>.netlify.app (deploy previews, deploy permalinks).
//     SITE_NAME is used because it *is* available to functions at runtime;
//     DEPLOY_PRIME_URL / DEPLOY_URL are build-time only, so they can't be relied on.
//   • http://localhost:<port> and http://127.0.0.1:<port>, under `netlify dev` only
//   • no Origin header at all (non-browser clients — they can't be stopped by an
//     Origin check anyway; browsers always send one on these cross-site POSTs)
//
// Everything else is refused, including look-alike hosts, extra ports, paths,
// credentials, other schemes and the literal "null" origin.

const PRODUCTION_ORIGINS = ['https://brightpathwebstudio.org', 'https://www.brightpathwebstudio.org'];
// A Netlify deploy prefix: lowercase letters/digits separated by single hyphens
// (e.g. "deploy-preview-12", a 24-character deploy ID, a branch slug). No "--",
// so "a--b--site" can't pass as a deploy of "site".
const DEPLOY_PREFIX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SITE_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

/** Parses an Origin header value; returns a URL only if the value is exactly a serialized origin. */
const parseOrigin = (value) => {
  if (typeof value !== 'string' || value.length > 255) return null;
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  // Rejects paths, trailing slashes, queries, fragments, credentials, uppercase
  // tricks and anything else that doesn't round-trip to the same origin string.
  if (url.origin === 'null' || url.origin !== value) return null;
  return url;
};

const isNetlifyDeployOfThisSite = (url, siteName) => {
  if (url.protocol !== 'https:' || url.port !== '') return false;
  if (typeof siteName !== 'string' || !SITE_NAME_PATTERN.test(siteName)) return false;
  const suffix = `${siteName}.netlify.app`;
  const host = url.hostname;
  if (host === suffix) return true;
  if (!host.endsWith(`--${suffix}`)) return false;
  return DEPLOY_PREFIX.test(host.slice(0, -(`--${suffix}`.length)));
};

/**
 * @param {string | undefined} origin  the request's Origin header
 * @param {Record<string, string | undefined>} env  usually process.env
 */
export const isAllowedOrigin = (origin, env = process.env) => {
  if (origin === undefined || origin === '') return true;
  const url = parseOrigin(origin);
  if (!url) return false;

  if (PRODUCTION_ORIGINS.includes(url.origin)) return true;
  const siteUrl = parseOrigin(env.URL);
  if (siteUrl && siteUrl.protocol === 'https:' && siteUrl.origin === url.origin) return true;

  if (isNetlifyDeployOfThisSite(url, env.SITE_NAME)) return true;

  return (
    env.NETLIFY_DEV === 'true' &&
    url.protocol === 'http:' &&
    LOCAL_HOSTS.includes(url.hostname) &&
    /^\d{1,5}$/.test(url.port)
  );
};
