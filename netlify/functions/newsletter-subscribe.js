// netlify/functions/newsletter-subscribe.js
// Adds a signup for The BrightPath Update (monthly newsletter) to the
// MailerLite "BrightPath Updates" group.
//
// New addresses only. The function first looks the address up; if MailerLite
// already knows it (active, unconfirmed, unsubscribed, bounced or junk), it
// changes NOTHING. MailerLite's create endpoint is an upsert, so writing to an
// existing subscriber would let anyone who knows an address overwrite that
// person's name, add them to the group without their consent, or re-send them
// a confirmation email. Existing addresses aren't re-subscribed for the same
// reasons; people in that position can contact us.
//
// One answer for every accepted signup. New and existing addresses both get
// { status: 'pending_confirmation' }, so the form can't be used to find out
// whether someone is on the list.
//
// Double opt-in: subscribers created through the MailerLite API do NOT receive
// the signup form's confirmation email. They only get one when "Double opt-in
// for API and integrations" is switched on under Account settings >
// Subscription settings, which sends its own (separately edited) confirmation
// email. This function never sends `status`, so MailerLite applies that
// account setting; sending `status: 'active'` would skip confirmation entirely.
//
// Required environment variables (server-side only — never VITE_*):
//   NEWSLETTER_ENABLED   'true' to accept signups; anything else returns 503
//   MAILERLITE_API_KEY   MailerLite API token (Integrations > MailerLite API)
//   MAILERLITE_GROUP_ID  ID of the "BrightPath Updates" group
//
// Bot checks, cheapest first: a browser Origin header from this site (required
// here, unlike the shared default), the honeypot, and a minimum time between
// the form appearing and the request (`elapsedMs`). The form itself waits out
// that minimum before sending, so a real visitor is never refused for being
// quick (autofill); only clients that don't run the form's code trip it.
//
// Logs carry outcome codes and MailerLite status codes only — never email
// addresses, names or IP addresses.

import { isIP } from 'node:net';
import { isAllowedOrigin } from '../lib/allowed-origin.js';

const MAILERLITE_SUBSCRIBERS_URL = 'https://connect.mailerlite.com/api/subscribers';

const MAX_BODY_BYTES = 2048;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
// Deliberately simple: MailerLite does full RFC validation and returns 422.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// One deadline for the lookup and the create together. The browser gives up
// at 15 s; answer before that so the visitor gets a clear outcome.
const MAILERLITE_TIMEOUT_MS = 10000;
// Must stay below NEWSLETTER_MIN_FILL_MS (3250) in src/components/NewsletterSignup.tsx.
export const MIN_ELAPSED_MS = 3000;

// Best-effort, per-instance rate limit. Netlify may run several instances and
// recycles them, so this slows down a casual abuser rather than guaranteeing a
// ceiling. Double opt-in is the real protection: nobody is subscribed without
// clicking the confirmation email.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  recentRequests.set(ip, timestamps);

  if (recentRequests.size > 5000) {
    for (const [key, times] of recentRequests) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentRequests.delete(key);
    }
  }

  return timestamps.length > RATE_LIMIT_MAX;
};

const cleanText = (value, maxLength) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLength)
    : '';

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin || '';
  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin(origin) && origin ? origin : 'https://brightpathwebstudio.org',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };

  const respond = (statusCode, status) => ({
    statusCode,
    headers,
    body: JSON.stringify({ status }),
  });
  const accepted = () => respond(200, 'pending_confirmation');

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return respond(405, 'method_not_allowed');
  }

  // Browsers always send Origin on a POST. The shared validator lets a missing
  // header through (the contact form serves non-browser clients too); the
  // newsletter has no such clients, so here it's required.
  if (!origin || !isAllowedOrigin(origin)) {
    return respond(403, 'forbidden');
  }

  const { NEWSLETTER_ENABLED, MAILERLITE_API_KEY, MAILERLITE_GROUP_ID } = process.env;
  if (NEWSLETTER_ENABLED !== 'true' || !MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    return respond(503, 'unavailable');
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : event.body || '';
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return respond(413, 'invalid_request');
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return respond(400, 'invalid_request');
  }
  if (!payload || typeof payload !== 'object') {
    return respond(400, 'invalid_request');
  }

  // Honeypot: a hidden field people never see. Report success so the bot
  // learns nothing, but don't contact MailerLite. Logged (no personal data)
  // so a false positive from autofill would be visible.
  if (cleanText(payload.bp_newsletter_extra, 200)) {
    console.warn('newsletter: spam trap triggered');
    return accepted();
  }

  // Too fast, or not sent: treated like the honeypot, for the same reason.
  const { elapsedMs } = payload;
  if (typeof elapsedMs !== 'number' || !Number.isFinite(elapsedMs) || elapsedMs < MIN_ELAPSED_MS) {
    console.warn('newsletter: submitted too fast');
    return accepted();
  }

  const email = cleanText(payload.email, MAX_EMAIL_LENGTH + 1).toLowerCase();
  const firstName = cleanText(payload.firstName, MAX_NAME_LENGTH);

  if (!email) {
    return respond(400, 'missing_email');
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return respond(400, 'invalid_email');
  }

  // Netlify sets this header to the visitor's IP. It's passed to MailerLite as
  // the signup IP (shown on the subscriber's profile); MailerLite stamps the
  // signup time itself. Only a well-formed address is sent, since MailerLite
  // rejects the whole request (422) over an invalid one.
  const rawIp = (event.headers['x-nf-client-connection-ip'] || '').trim();
  const clientIp = isIP(rawIp) ? rawIp : '';
  if (isRateLimited(clientIp || 'unknown')) {
    return respond(429, 'rate_limited');
  }

  const apiHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${MAILERLITE_API_KEY}`,
  };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MAILERLITE_TIMEOUT_MS);

  try {
    // 1. Is this address already known to MailerLite? (200 = yes, 404 = no.)
    const lookup = await fetch(`${MAILERLITE_SUBSCRIBERS_URL}/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: apiHeaders,
      signal: controller.signal,
    });

    if (lookup.status === 200) {
      const existing = await readJson(lookup);
      const existingStatus = (existing && existing.data && existing.data.status) || 'unknown';
      console.log('newsletter: address already known, left unchanged', existingStatus);
      return accepted();
    }
    if (lookup.status === 429) {
      return respond(429, 'rate_limited');
    }
    if (lookup.status !== 404) {
      console.error('newsletter: MailerLite lookup failed', lookup.status);
      return respond(502, 'error');
    }

    // 2. New address: create it in the group. No `status` (see top).
    const subscriber = { email, groups: [MAILERLITE_GROUP_ID] };
    if (firstName) subscriber.fields = { name: firstName };
    if (clientIp) subscriber.ip_address = clientIp;

    const created = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(subscriber),
      signal: controller.signal,
    });
    const result = await readJson(created);

    // 201 = created. 200 = the address appeared between the lookup and the
    // create (a near-simultaneous double signup); either way it's accepted.
    if (created.status === 201 || created.status === 200) {
      if (created.status === 201 && result && result.data && result.data.status === 'active') {
        // Created active means no confirmation email went out.
        console.error(
          'newsletter: MailerLite created an active subscriber without confirmation — check that ' +
            '"Double opt-in for API and integrations" is enabled.'
        );
      }
      return accepted();
    }

    if (created.status === 422) {
      const errors = (result && result.errors) || {};
      if (errors.email) return respond(400, 'invalid_email');
      console.error('newsletter: MailerLite rejected the request, fields:', Object.keys(errors).join(',') || 'none');
      return respond(502, 'error');
    }

    if (created.status === 429) {
      return respond(429, 'rate_limited');
    }

    console.error('newsletter: MailerLite create failed', created.status);
    return respond(502, 'error');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('newsletter: MailerLite timed out');
    } else {
      console.error('newsletter: MailerLite request failed', error.name);
    }
    return respond(502, 'error');
  } finally {
    clearTimeout(timer);
  }
};
