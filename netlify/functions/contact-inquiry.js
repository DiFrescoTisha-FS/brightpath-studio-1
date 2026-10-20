// netlify/functions/contact-inquiry.js
// Receives Contact form submissions and saves them through the "Contact Form
// Handler" Google Apps Script (google-apps-script/contact-form-handler/Code.gs).
//
// The browser is told an inquiry was received ONLY when the script answers
// with JSON { ok: true, code: 'saved' | 'duplicate' } for this exact
// submission ID. HTTP status alone proves nothing: Apps Script answers
// HTTP 200 even when the script itself throws, with an HTML error page.
// ContentService replies arrive via a 302 redirect to
// script.googleusercontent.com; fetch follows it (POST → GET, per the Fetch
// spec), which is what Google requires.
//
// Required environment variables (server-side only — never VITE_*):
//   CONTACT_SCRIPT_URL     the Apps Script web app /exec URL
//   CONTACT_SHARED_SECRET  must match the script's SHARED_SECRET property
//
// Logs carry submission IDs and outcome codes only — never names, email
// addresses or messages.

import { isAllowedOrigin } from '../lib/allowed-origin.js';

const MAX_BODY_BYTES = 16 * 1024;
const LIMITS = { fullName: 200, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ID_PATTERN = /^[A-Za-z0-9-]{16,64}$/;
// The browser gives up at 20 s; answer before that so the visitor gets a
// clear outcome rather than a dropped connection.
const SCRIPT_TIMEOUT_MS = 15000;

// Best-effort, per-instance rate limit (instances are recycled). Generous
// enough for a person retrying after an error.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
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

// Only Google's Apps Script host — or a local stand-in under `netlify dev`.
const isValidScriptUrl = (url) =>
  /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url) ||
  (process.env.NETLIFY_DEV === 'true' && /^http:\/\/(localhost|127\.0\.0\.1):\d+\//.test(url));

const cleanLine = (value, maxLength) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength) : '';

const cleanMessage = (value, maxLength) =>
  typeof value === 'string'
    ? value
        .replace(/\r\n?/g, '\n')
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
        .trim()
        .slice(0, maxLength)
    : '';

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
  const respond = (statusCode, status, extra = {}) => ({
    statusCode,
    headers,
    body: JSON.stringify({ status, ...extra }),
  });

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return respond(405, 'method_not_allowed');
  if (!isAllowedOrigin(origin)) return respond(403, 'forbidden');

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : event.body || '';
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) return respond(413, 'invalid');

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return respond(400, 'invalid');
  }
  if (!payload || typeof payload !== 'object') return respond(400, 'invalid');

  const submissionId = typeof payload.submissionId === 'string' ? payload.submissionId : '';
  if (!ID_PATTERN.test(submissionId)) return respond(400, 'invalid');

  // Honeypot: report success so a bot learns nothing, but save nothing. The
  // log line (ID only) makes any false positive from autofill visible.
  if (cleanLine(payload.bp_contact_extra, 200)) {
    console.warn('contact: spam trap triggered', submissionId);
    return respond(200, 'received', { submissionId });
  }

  const fullName = cleanLine(payload.fullName, LIMITS.fullName);
  const email = cleanLine(payload.email, LIMITS.email + 1);
  const message = cleanMessage(payload.message, LIMITS.message);
  if (!fullName || !message || email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return respond(400, 'invalid');
  }

  const { CONTACT_SCRIPT_URL, CONTACT_SHARED_SECRET } = process.env;
  if (!CONTACT_SCRIPT_URL || !CONTACT_SHARED_SECRET || !isValidScriptUrl(CONTACT_SCRIPT_URL)) {
    console.error('contact: CONTACT_SCRIPT_URL / CONTACT_SHARED_SECRET missing or invalid');
    return respond(503, 'unavailable');
  }

  const clientIp = event.headers['x-nf-client-connection-ip'] || 'unknown';
  if (isRateLimited(clientIp)) return respond(429, 'rate_limited');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SCRIPT_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(CONTACT_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: CONTACT_SHARED_SECRET, submissionId, fullName, email, message }),
      redirect: 'follow',
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timer);
    if (error.name === 'AbortError') {
      // The script may still finish and save the row; a retry with the same
      // submission ID is deduplicated, so the visitor can safely try again.
      console.error('contact: script timed out', submissionId);
      return respond(504, 'timeout');
    }
    console.error('contact: script request failed', submissionId, error.message);
    return respond(502, 'failed');
  }

  let text;
  try {
    text = await response.text();
  } catch (error) {
    console.error('contact: reply interrupted', submissionId, error.name);
    return respond(error.name === 'AbortError' ? 504 : 502, error.name === 'AbortError' ? 'timeout' : 'failed');
  } finally {
    clearTimeout(timer);
  }

  let result = null;
  try {
    result = JSON.parse(text);
  } catch {
    result = null;
  }

  if (!result || typeof result !== 'object') {
    console.error('contact: unconfirmed — non-JSON reply', submissionId, response.status, response.headers.get('content-type'));
    return respond(502, 'failed');
  }

  if (result.ok === true && (result.code === 'saved' || result.code === 'duplicate') && result.submissionId === submissionId) {
    if (result.notification === 'failed') {
      console.error('contact: saved but notification email failed', submissionId);
    }
    console.log('contact:', result.code, submissionId, 'notification:', result.notification);
    return respond(200, 'received', { submissionId });
  }

  console.error('contact: not confirmed', submissionId, 'code:', result.code);
  switch (result.code) {
    case 'busy':
      return respond(503, 'failed');
    case 'invalid_request':
      return respond(400, 'invalid');
    case 'unauthorized':
    case 'not_configured':
      return respond(503, 'unavailable');
    default:
      return respond(502, 'failed');
  }
};
