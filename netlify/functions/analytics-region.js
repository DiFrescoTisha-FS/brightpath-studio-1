// netlify/functions/analytics-region.js
// Tells the browser whether Google Analytics may load for this visitor.
//
// Analytics is allowed only where it can run without prior consent. This is
// an allowlist, not a blocklist: visitors anywhere else — including the EEA,
// UK and Switzerland — and visitors whose country Netlify can't determine get
// `false`, and the site never requests the Analytics script for them.
//
// The country comes from Netlify's IP geolocation. Nothing is stored or
// logged, and the reply carries only a yes/no — never the country.

const ANALYTICS_COUNTRIES = new Set(['US']);

const headers = {
  'Content-Type': 'application/json',
  // Per-visitor answer: never let a CDN or browser reuse it for someone else.
  'Cache-Control': 'private, no-store',
  'Netlify-CDN-Cache-Control': 'no-store',
};

export default async (request, context) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ analytics: false }), { status: 405, headers });
  }

  const country = context && context.geo && context.geo.country && context.geo.country.code;
  const analytics = typeof country === 'string' && ANALYTICS_COUNTRIES.has(country.toUpperCase());

  return new Response(JSON.stringify({ analytics }), { status: 200, headers });
};

export const config = { path: '/api/analytics-region' };
