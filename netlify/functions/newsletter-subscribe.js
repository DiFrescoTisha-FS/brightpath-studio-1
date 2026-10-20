// netlify/functions/newsletter-subscribe.js
// Adds a newsletter signup to the MailerLite "BrightPath Updates" group.
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

import { isAllowedOrigin } from '../lib/allowed-origin.js';

const axios = require('axios');
const { isIP } = require('net');

const MAILERLITE_SUBSCRIBERS_URL = 'https://connect.mailerlite.com/api/subscribers';

const MAX_BODY_BYTES = 2048;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
// Deliberately simple: MailerLite does full RFC validation and returns 422.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return respond(405, 'method_not_allowed');
  }

  if (!isAllowedOrigin(origin)) {
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
    return respond(200, 'pending_confirmation');
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

  const subscriber = {
    email,
    groups: [MAILERLITE_GROUP_ID],
  };
  if (firstName) subscriber.fields = { name: firstName };
  if (clientIp) subscriber.ip_address = clientIp;

  try {
    const response = await axios.post(MAILERLITE_SUBSCRIBERS_URL, subscriber, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
      },
      timeout: 8000,
      validateStatus: () => true,
    });

    const subscriberStatus = response.data && response.data.data && response.data.data.status;

    // 201 = new subscriber, 200 = this email was already on the list.
    if (response.status === 201) {
      if (subscriberStatus === 'active') {
        // Created active means no confirmation email went out.
        console.error(
          'MailerLite created an active subscriber without confirmation — check that ' +
            '"Double opt-in for API and integrations" is enabled.'
        );
      }
      return respond(200, 'pending_confirmation');
    }

    if (response.status === 200) {
      if (subscriberStatus === 'active') return respond(200, 'already_subscribed');
      if (subscriberStatus === 'unconfirmed') return respond(200, 'pending_confirmation');
      // unsubscribed, bounced or junk: the API can't (and shouldn't) reactivate these.
      return respond(200, 'cannot_subscribe');
    }

    if (response.status === 422) {
      const errors = (response.data && response.data.errors) || {};
      if (errors.email) return respond(400, 'invalid_email');
      console.error('MailerLite rejected the request:', JSON.stringify(errors));
      return respond(502, 'error');
    }

    if (response.status === 429) {
      return respond(429, 'rate_limited');
    }

    console.error('MailerLite API error:', response.status, JSON.stringify(response.data));
    return respond(502, 'error');
  } catch (error) {
    console.error('MailerLite request failed:', error.message);
    return respond(502, 'error');
  }
};
