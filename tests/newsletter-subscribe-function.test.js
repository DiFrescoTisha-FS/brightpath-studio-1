// Tests for netlify/functions/newsletter-subscribe.js. MailerLite is replaced
// by a mocked fetch that answers the lookup (GET) and create (POST) calls.
// Nothing contacts MailerLite.
import { test, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { handler, MIN_ELAPSED_MS } from '../netlify/functions/newsletter-subscribe.js';

const API_KEY = 'test-mailerlite-token-0123456789';
const GROUP_ID = '123456789012345678';
const BASE = 'https://connect.mailerlite.com/api/subscribers';
// elapsedMs: what the form reports — time since it appeared, at least its minimum.
const VISITOR = { email: 'ada@example.com', firstName: 'Ada', elapsedMs: 4200 };
const IP = '203.0.113.50';

let ipCounter = 0;
let logs = [];
const realFetch = globalThis.fetch;

const event = (body, { headers = {}, method = 'POST', ip } = {}) => ({
  httpMethod: method,
  headers: {
    origin: 'https://brightpathwebstudio.org',
    'x-nf-client-connection-ip': ip || `10.2.0.${++ipCounter}`,
    ...headers,
  },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
const signup = (overrides = {}, opts) => handler(event({ ...VISITOR, bp_newsletter_extra: '', ...overrides }, opts));
const parse = (res) => JSON.parse(res.body);
const json = (status, body) =>
  new Response(body === undefined ? '' : JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// lookup / create: a Response, or a function returning one (or throwing).
const mailerLite = ({ lookup = () => json(404, { message: 'Not found' }), create = () => json(201, { data: { status: 'unconfirmed' } }) } = {}) => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    const call = { url, method: init.method, headers: init.headers, body: init.body ? JSON.parse(init.body) : undefined, signal: init.signal };
    calls.push(call);
    const reply = init.method === 'GET' ? lookup : create;
    return typeof reply === 'function' ? reply(call) : reply;
  };
  return calls;
};
const created = (calls) => calls.filter((c) => c.method === 'POST');

beforeEach(() => {
  process.env.NEWSLETTER_ENABLED = 'true';
  process.env.MAILERLITE_API_KEY = API_KEY;
  process.env.MAILERLITE_GROUP_ID = GROUP_ID;
  delete process.env.NETLIFY_DEV;
  logs = [];
  for (const level of ['log', 'warn', 'error']) mock.method(console, level, (...a) => logs.push(a));
});
afterEach(() => {
  globalThis.fetch = realFetch;
  mock.restoreAll();
});

// ---- New subscribers ------------------------------------------------------

test('new address → looked up, created in the group with name and IP, pending_confirmation', async () => {
  const calls = mailerLite();
  const res = await signup({}, { ip: IP });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(parse(res), { status: 'pending_confirmation' });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].method, 'GET');
  assert.equal(calls[0].url, `${BASE}/ada%40example.com`);
  assert.equal(calls[1].url, BASE);
  assert.deepEqual(calls[1].body, { email: 'ada@example.com', groups: [GROUP_ID], fields: { name: 'Ada' }, ip_address: IP });
  for (const c of calls) assert.equal(c.headers.Authorization, `Bearer ${API_KEY}`);
});

test('never sends `status` (MailerLite\'s API double opt-in decides)', async () => {
  const calls = mailerLite();
  await signup();
  assert.ok(!('status' in created(calls)[0].body));
});

test('no first name → no fields sent', async () => {
  const calls = mailerLite();
  await signup({ firstName: '   ' });
  assert.ok(!('fields' in created(calls)[0].body));
});

test('email is trimmed and lower-cased; name trimmed, control characters stripped, capped at 100', async () => {
  const calls = mailerLite();
  await signup({ email: '  Ada@Example.COM ', firstName: ` A\u0007da${'x'.repeat(200)} ` });
  const body = created(calls)[0].body;
  assert.equal(body.email, 'ada@example.com');
  assert.equal(body.fields.name, `Ada${'x'.repeat(97)}`);
});

test('malformed or missing IP header → no ip_address sent', async () => {
  for (const ip of ['not-an-ip', '1.2.3.4, 5.6.7.8']) {
    const calls = mailerLite();
    await signup({}, { ip });
    assert.ok(!('ip_address' in created(calls)[0].body), ip);
  }
});

test('address with + and other characters is URL-encoded in the lookup', async () => {
  const calls = mailerLite();
  await signup({ email: 'ada+news@example.com' });
  assert.equal(calls[0].url, `${BASE}/ada%2Bnews%40example.com`);
});

test('created as active (double opt-in switched off) → still accepted, but an error is logged', async () => {
  mailerLite({ create: () => json(201, { data: { status: 'active' } }) });
  assert.equal(parse(await signup()).status, 'pending_confirmation');
  assert.ok(logs.some((l) => l.join(' ').includes('Double opt-in for API and integrations')));
});

test('address appears between lookup and create (MailerLite answers 200) → accepted', async () => {
  mailerLite({ create: () => json(200, { data: { status: 'unconfirmed' } }) });
  assert.equal(parse(await signup()).status, 'pending_confirmation');
});

// ---- Existing subscribers: never modified, same answer -----------------------

for (const existingStatus of ['active', 'unconfirmed', 'unsubscribed', 'bounced', 'junk']) {
  test(`existing ${existingStatus} subscriber → nothing written, same answer as a new address`, async () => {
    const calls = mailerLite({ lookup: () => json(200, { data: { id: '1', email: 'ada@example.com', status: existingStatus } }) });
    const res = await signup({ firstName: 'Mallory' });
    assert.equal(res.statusCode, 200);
    assert.deepEqual(parse(res), { status: 'pending_confirmation' });
    assert.equal(calls.length, 1, 'only the lookup');
    assert.equal(calls[0].method, 'GET');
    assert.equal(created(calls).length, 0);
  });
}

test('existing and new addresses get byte-identical responses (no enumeration)', async () => {
  mailerLite();
  const fresh = await signup({}, { ip: '198.51.100.1' });
  mailerLite({ lookup: () => json(200, { data: { status: 'active' } }) });
  const known = await signup({}, { ip: '198.51.100.2' });
  assert.equal(known.statusCode, fresh.statusCode);
  assert.equal(known.body, fresh.body);
  assert.deepEqual(known.headers, fresh.headers);
});

// ---- Invalid input ------------------------------------------------------------

test('missing email → 400 missing_email, MailerLite not called', async () => {
  const calls = mailerLite();
  for (const email of [undefined, '', '   ', 42]) {
    const res = await signup({ email });
    assert.equal(res.statusCode, 400);
    assert.equal(parse(res).status, 'missing_email');
  }
  assert.equal(calls.length, 0);
});

test('malformed or over-long email → 400 invalid_email, MailerLite not called', async () => {
  const calls = mailerLite();
  for (const email of ['ada', 'ada@', 'ada@example', 'a da@example.com', `${'a'.repeat(250)}@example.com`]) {
    const res = await signup({ email });
    assert.equal(res.statusCode, 400, email);
    assert.equal(parse(res).status, 'invalid_email', email);
  }
  assert.equal(calls.length, 0);
});

test('MailerLite rejects the email (422) → 400 invalid_email', async () => {
  mailerLite({ create: () => json(422, { message: 'invalid', errors: { email: ['The email must be a valid email address.'] } }) });
  const res = await signup();
  assert.equal(res.statusCode, 400);
  assert.equal(parse(res).status, 'invalid_email');
});

test('MailerLite 422 on another field → 502 error, logs field names only', async () => {
  mailerLite({ create: () => json(422, { errors: { groups: ['The selected groups is invalid.'] } }) });
  const res = await signup();
  assert.equal(res.statusCode, 502);
  assert.equal(parse(res).status, 'error');
  assert.ok(logs.some((l) => l.join(' ').includes('fields: groups')));
});

test('body that is not JSON, not an object, or over 2 KB → invalid_request', async () => {
  mailerLite();
  assert.equal(parse(await handler(event('not json'))).status, 'invalid_request');
  assert.equal(parse(await handler(event('null'))).status, 'invalid_request');
  const big = await handler(event({ ...VISITOR, firstName: 'x'.repeat(3000) }));
  assert.equal(big.statusCode, 413);
  assert.equal(parse(big).status, 'invalid_request');
});

test('base64-encoded body is decoded', async () => {
  const calls = mailerLite();
  const ev = event('');
  ev.body = Buffer.from(JSON.stringify(VISITOR)).toString('base64');
  ev.isBase64Encoded = true;
  assert.equal(parse(await handler(ev)).status, 'pending_confirmation');
  assert.equal(created(calls)[0].body.email, 'ada@example.com');
});

// ---- Honeypot ---------------------------------------------------------------

test('honeypot filled → looks like success, MailerLite never called, logged without personal data', async () => {
  const calls = mailerLite();
  const res = await signup({ bp_newsletter_extra: 'http://spam.example' });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(parse(res), { status: 'pending_confirmation' });
  assert.equal(calls.length, 0);
  assert.ok(logs.some((l) => l.join(' ').includes('spam trap')));
});

test('honeypot with only whitespace is treated as empty', async () => {
  const calls = mailerLite();
  await signup({ bp_newsletter_extra: '   ' });
  assert.equal(created(calls).length, 1);
});

// ---- Switches, method and origin -------------------------------------------------

test('disabled unless NEWSLETTER_ENABLED is exactly "true" and both MailerLite variables are set', async () => {
  const calls = mailerLite();
  for (const [key, value] of [['NEWSLETTER_ENABLED', 'TRUE'], ['NEWSLETTER_ENABLED', ''], ['MAILERLITE_API_KEY', ''], ['MAILERLITE_GROUP_ID', '']]) {
    const saved = process.env[key];
    process.env[key] = value;
    const res = await signup();
    assert.equal(res.statusCode, 503, `${key}=${value}`);
    assert.equal(parse(res).status, 'unavailable');
    process.env[key] = saved;
  }
  assert.equal(calls.length, 0);
});

test('OPTIONS → 204; GET → 405', async () => {
  mailerLite();
  assert.equal((await handler(event('', { method: 'OPTIONS' }))).statusCode, 204);
  const res = await handler(event('', { method: 'GET' }));
  assert.equal(res.statusCode, 405);
  assert.equal(parse(res).status, 'method_not_allowed');
});

test('another website\'s origin → 403, MailerLite not called', async () => {
  const calls = mailerLite();
  const res = await signup({}, { headers: { origin: 'https://brightpathwebstudio.org.evil.example' } });
  assert.equal(res.statusCode, 403);
  assert.equal(calls.length, 0);
});

test('responses are never cached and echo only allowed origins', async () => {
  mailerLite();
  const res = await signup();
  assert.equal(res.headers['Cache-Control'], 'no-store');
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://brightpathwebstudio.org');
});

// ---- Rate limiting --------------------------------------------------------------

test('rate limit: 6th request from one IP in 10 minutes is refused before MailerLite is called', async () => {
  const calls = mailerLite();
  for (let i = 0; i < 5; i++) assert.equal((await signup({}, { ip: '203.0.113.77' })).statusCode, 200);
  const before = calls.length;
  const res = await signup({}, { ip: '203.0.113.77' });
  assert.equal(res.statusCode, 429);
  assert.equal(parse(res).status, 'rate_limited');
  assert.equal(calls.length, before);
  assert.equal((await signup({}, { ip: '203.0.113.78' })).statusCode, 200, 'other IPs unaffected');
});

test('MailerLite rate limit (429) on lookup or create → 429 rate_limited', async () => {
  mailerLite({ lookup: () => json(429, {}) });
  assert.equal(parse(await signup()).status, 'rate_limited');
  mailerLite({ create: () => json(429, {}) });
  assert.equal(parse(await signup()).status, 'rate_limited');
});

// ---- MailerLite failures -----------------------------------------------------------

test('lookup fails (401 bad token, 500) → 502 error, nothing created', async () => {
  for (const status of [401, 500]) {
    const calls = mailerLite({ lookup: () => json(status, { message: 'nope' }) });
    const res = await signup();
    assert.equal(res.statusCode, 502, String(status));
    assert.equal(parse(res).status, 'error');
    assert.equal(created(calls).length, 0);
  }
});

test('create fails (500, 503, non-JSON) → 502 error', async () => {
  for (const reply of [() => json(500, {}), () => json(503, {}), () => new Response('<html>oops</html>', { status: 502 })]) {
    mailerLite({ create: reply });
    const res = await signup();
    assert.equal(res.statusCode, 502);
    assert.equal(parse(res).status, 'error');
  }
});

test('network failure → 502 error', async () => {
  mailerLite({ lookup: () => { throw new TypeError('fetch failed'); } });
  const res = await signup();
  assert.equal(res.statusCode, 502);
  assert.equal(parse(res).status, 'error');
});

test('MailerLite never answers → aborted by the deadline, 502 error', async () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  mailerLite({
    lookup: (call) =>
      new Promise((_, reject) => call.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })))),
  });
  const pending = signup();
  await new Promise((r) => setImmediate(r));
  mock.timers.tick(10000);
  const res = await pending;
  assert.equal(res.statusCode, 502);
  assert.ok(logs.some((l) => l.join(' ').includes('timed out')));
});

// ---- Privacy ----------------------------------------------------------------

test('responses never carry the token, and logs never contain emails, names or IPs', async () => {
  const replies = [
    { lookup: () => json(200, { data: { status: 'active', email: 'ada@example.com' } }) },
    {},
    { create: () => json(201, { data: { status: 'active', email: 'ada@example.com' } }) },
    { create: () => json(422, { errors: { groups: ['bad ada@example.com'] } }) },
    { create: () => json(500, { data: { email: 'ada@example.com' } }) },
    { lookup: () => { throw new Error('ada@example.com failed'); } },
  ];
  for (const r of replies) {
    mailerLite(r);
    const res = await signup({}, { ip: IP });
    assert.ok(!res.body.includes(API_KEY));
  }
  await signup({ bp_newsletter_extra: 'x' }, { ip: IP });
  const all = logs.map((l) => l.join(' ')).join('\n');
  for (const secret of ['ada@example.com', 'Ada', IP, API_KEY]) assert.ok(!all.includes(secret), `log contains ${secret}`);
});

// ---- Required Origin header ----------------------------------------------------

test('no Origin header → 403 forbidden, MailerLite not called', async () => {
  const calls = mailerLite();
  const res = await signup({}, { headers: { origin: undefined } });
  assert.equal(res.statusCode, 403);
  assert.equal(parse(res).status, 'forbidden');
  assert.equal(calls.length, 0);
});

test('empty or "null" Origin → 403 forbidden', async () => {
  const calls = mailerLite();
  for (const origin of ['', 'null']) {
    const res = await signup({}, { headers: { origin } });
    assert.equal(res.statusCode, 403, JSON.stringify(origin));
  }
  assert.equal(calls.length, 0);
});

test('Origin with a path, other scheme or extra port → 403', async () => {
  const calls = mailerLite();
  for (const origin of ['https://brightpathwebstudio.org/', 'http://brightpathwebstudio.org', 'https://brightpathwebstudio.org:8443']) {
    assert.equal((await signup({}, { headers: { origin } })).statusCode, 403, origin);
  }
  assert.equal(calls.length, 0);
});

test('allowed origins pass: www, capitalised header name, this site\'s deploy preview', async () => {
  mailerLite();
  process.env.SITE_NAME = 'brightpathwebstudio';
  try {
    for (const headers of [
      { origin: 'https://www.brightpathwebstudio.org' },
      { origin: undefined, Origin: 'https://brightpathwebstudio.org' },
      { origin: 'https://deploy-preview-23--brightpathwebstudio.netlify.app' },
    ]) {
      const res = await signup({}, { headers });
      assert.equal(res.statusCode, 200, JSON.stringify(headers));
      assert.equal(parse(res).status, 'pending_confirmation');
    }
  } finally {
    delete process.env.SITE_NAME;
  }
});

test('preflight (OPTIONS) still answers 204 without an Origin', async () => {
  assert.equal((await handler(event('', { method: 'OPTIONS', headers: { origin: undefined } }))).statusCode, 204);
});

// ---- Minimum submission time -----------------------------------------------------

for (const [label, elapsedMs] of [
  ['missing', undefined],
  ['null', null],
  ['a string', '5000'],
  ['negative', -1],
  ['zero', 0],
  ['just under the minimum', MIN_ELAPSED_MS - 1],
]) {
  test(`elapsedMs ${label} → looks like success, MailerLite never called, logged without personal data`, async () => {
    const calls = mailerLite();
    const res = await signup({ elapsedMs });
    assert.equal(res.statusCode, 200);
    assert.deepEqual(parse(res), { status: 'pending_confirmation' });
    assert.equal(calls.length, 0);
    assert.ok(logs.some((l) => l.join(' ').includes('submitted too fast')));
    assert.ok(!logs.map((l) => l.join(' ')).join('\n').includes('ada@example.com'));
  });
}

test('elapsedMs at exactly the minimum, or much later, is accepted', async () => {
  for (const elapsedMs of [MIN_ELAPSED_MS, 60 * 60 * 1000]) {
    const calls = mailerLite();
    assert.equal(parse(await signup({ elapsedMs })).status, 'pending_confirmation');
    assert.equal(created(calls).length, 1, String(elapsedMs));
  }
});

test('too-fast reply is byte-identical to a real signup\'s reply', async () => {
  mailerLite();
  const real = await signup({}, { ip: '198.51.100.10' });
  const fast = await signup({ elapsedMs: 100 }, { ip: '198.51.100.11' });
  assert.equal(fast.statusCode, real.statusCode);
  assert.equal(fast.body, real.body);
  assert.deepEqual(fast.headers, real.headers);
});

test('too-fast check runs before validation, so a fast bot learns nothing about its input', async () => {
  const calls = mailerLite();
  const res = await signup({ email: 'not-an-email', elapsedMs: 10 });
  assert.equal(parse(res).status, 'pending_confirmation');
  assert.equal(calls.length, 0);
});

test('too-fast submissions don\'t count against the visitor\'s rate limit', async () => {
  mailerLite();
  for (let i = 0; i < 10; i++) await signup({ elapsedMs: 10 }, { ip: '203.0.113.90' });
  assert.equal((await signup({}, { ip: '203.0.113.90' })).statusCode, 200);
});

test('the form waits longer than the function\'s minimum (timer jitter margin)', () => {
  const source = readFileSync(new URL('../src/components/NewsletterSignup.tsx', import.meta.url), 'utf8');
  const match = source.match(/const NEWSLETTER_MIN_FILL_MS = (\d+);/);
  assert.ok(match, 'NEWSLETTER_MIN_FILL_MS not found');
  assert.ok(Number(match[1]) > MIN_ELAPSED_MS, `form waits ${match[1]} ms, function requires ${MIN_ELAPSED_MS} ms`);
});
