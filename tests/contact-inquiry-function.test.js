// Tests for netlify/functions/contact-inquiry.js. Apps Script is replaced by a
// mocked fetch, or by a local HTTP server that reproduces its POST → 302 → GET
// reply flow. Nothing contacts Google.
import { test, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { handler } from '../netlify/functions/contact-inquiry.js';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbTEST_deployment-id/exec';
const SECRET = 'test-secret-0123456789abcdef0123456789abcdef';
const ID = '3f2b8c1e-4d5a-4b6c-9e7f-0a1b2c3d4e5f';
const VISITOR = { fullName: 'Ada Lovelace', email: 'ada@example.com', message: 'We need a new church website.' };

let ipCounter = 0;
let logs = [];
const realFetch = globalThis.fetch;

const event = (body, { headers = {}, method = 'POST', ip } = {}) => ({
  httpMethod: method,
  headers: {
    origin: 'https://brightpathwebstudio.org',
    'x-nf-client-connection-ip': ip || `10.1.0.${++ipCounter}`,
    ...headers,
  },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
const submit = (overrides = {}, opts) => handler(event({ ...VISITOR, bp_contact_extra: '', submissionId: ID, ...overrides }, opts));
const parse = (res) => JSON.parse(res.body);
const scriptReplies = (reply, { status = 200, contentType = 'application/json' } = {}) => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    const text = typeof reply === 'function' ? reply(JSON.parse(init.body)) : reply;
    return new Response(typeof text === 'string' ? text : JSON.stringify(text), { status, headers: { 'content-type': contentType } });
  };
  return calls;
};

beforeEach(() => {
  process.env.CONTACT_SCRIPT_URL = SCRIPT_URL;
  process.env.CONTACT_SHARED_SECRET = SECRET;
  delete process.env.NETLIFY_DEV;
  logs = [];
  mock.method(console, 'log', (...a) => logs.push(a));
  mock.method(console, 'error', (...a) => logs.push(a));
});
afterEach(() => {
  globalThis.fetch = realFetch;
  mock.restoreAll();
});

test('confirmed save → received; script gets the secret, browser never does', async () => {
  const calls = scriptReplies((b) => ({ ok: true, code: 'saved', submissionId: b.submissionId, notification: 'sent' }));
  const res = await submit();
  assert.equal(res.statusCode, 200);
  assert.deepEqual(parse(res), { status: 'received', submissionId: ID });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, SCRIPT_URL);
  assert.equal(calls[0].init.method, 'POST');
  assert.equal(calls[0].init.redirect, 'follow');
  assert.deepEqual(calls[0].body, { secret: SECRET, submissionId: ID, ...VISITOR });
  assert.ok(!res.body.includes(SECRET));
});

test('duplicate (a retry of an already-saved inquiry) → received', async () => {
  scriptReplies({ ok: true, code: 'duplicate', submissionId: ID, notification: 'sent' });
  assert.deepEqual(parse(await submit()), { status: 'received', submissionId: ID });
});

test('saved but notification failed → still received, failure logged by ID only', async () => {
  scriptReplies({ ok: true, code: 'saved', submissionId: ID, notification: 'failed' });
  const res = await submit();
  assert.equal(parse(res).status, 'received');
  assert.ok(logs.some((l) => l.join(' ').includes('notification email failed') && l.includes(ID)));
});

test('HTTP 200 with an Apps Script HTML error page is NOT treated as success', async () => {
  scriptReplies('<html><title>Error</title>TypeError: Cannot read properties of null</html>', { contentType: 'text/html' });
  const res = await submit();
  assert.equal(res.statusCode, 502);
  assert.equal(parse(res).status, 'failed');
});

test('a Google sign-in page (access changed from "Anyone") is NOT success', async () => {
  scriptReplies('<html><title>Sign in - Google Accounts</title></html>', { contentType: 'text/html' });
  assert.equal(parse(await submit()).status, 'failed');
});

test('JSON that does not confirm this submission is NOT success', async () => {
  const replies = [
    { ok: true, code: 'saved', submissionId: 'some-other-submission-id' },
    { ok: true, code: 'something_else', submissionId: ID },
    { ok: 'true', code: 'saved', submissionId: ID },
    { success: true },
    [],
  ];
  for (const reply of replies) {
    scriptReplies(reply);
    const res = await submit();
    assert.notEqual(parse(res).status, 'received', JSON.stringify(reply));
  }
});

test('script failure codes map to visitor-facing outcomes', async () => {
  const cases = [
    ['busy', 503, 'failed'],
    ['not_saved', 502, 'failed'],
    ['server_error', 502, 'failed'],
    ['unauthorized', 503, 'unavailable'],
    ['not_configured', 503, 'unavailable'],
    ['invalid_request', 400, 'invalid'],
  ];
  for (const [code, statusCode, status] of cases) {
    scriptReplies({ ok: false, code });
    const res = await submit();
    assert.equal(res.statusCode, statusCode, code);
    assert.equal(parse(res).status, status, code);
  }
});

test('script error statuses (404 deployment deleted, 500) are failures', async () => {
  for (const status of [404, 500]) {
    scriptReplies('<html>Sorry, unable to open the file at this time.</html>', { status, contentType: 'text/html' });
    assert.equal(parse(await submit()).status, 'failed');
  }
});

test('network failure → failed', async () => {
  globalThis.fetch = async () => {
    throw new TypeError('fetch failed');
  };
  const res = await submit();
  assert.equal(res.statusCode, 502);
  assert.equal(parse(res).status, 'failed');
});

test('no reply within 15 s → timeout (outcome unknown, retry is safe)', async () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  globalThis.fetch = (url, init) =>
    new Promise((_, reject) => {
      init.signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })));
    });
  const pending = submit();
  await Promise.resolve();
  mock.timers.tick(14999);
  let settled = false;
  pending.then(() => (settled = true));
  await Promise.resolve();
  assert.equal(settled, false);
  mock.timers.tick(1);
  const res = await pending;
  assert.equal(res.statusCode, 504);
  assert.equal(parse(res).status, 'timeout');
});

test('honeypot → reported as received, nothing sent to the script', async () => {
  const calls = scriptReplies({ ok: true, code: 'saved', submissionId: ID });
  mock.method(console, 'warn', (...a) => logs.push(a));
  const res = await submit({ bp_contact_extra: 'https://spam.example' });
  assert.deepEqual(parse(res), { status: 'received', submissionId: ID });
  assert.equal(calls.length, 0);
  assert.ok(logs.some((l) => l.join(' ') === `contact: spam trap triggered ${ID}`));
  // The old field name no longer trips the trap.
  const calls2 = scriptReplies((b) => ({ ok: true, code: 'saved', submissionId: b.submissionId }));
  await submit({ website: 'https://brightpathwebstudio.org' });
  assert.equal(calls2.length, 1);
});

test('server-side validation rejects bad input before calling the script', async () => {
  const calls = scriptReplies({ ok: true, code: 'saved', submissionId: ID });
  const bad = [
    { fullName: '' },
    { fullName: '   ' },
    { email: '' },
    { email: 'not-an-email' },
    { email: `${'a'.repeat(250)}@b.co` },
    { message: '' },
    { submissionId: '' },
    { submissionId: 'short' },
    { submissionId: 'contains spaces 123456' },
    { fullName: { $ne: 1 } },
  ];
  for (const overrides of bad) {
    const res = await submit(overrides);
    assert.equal(res.statusCode, 400, JSON.stringify(overrides));
    assert.equal(parse(res).status, 'invalid');
  }
  for (const body of ['{oops', 'null', JSON.stringify({ x: 'y'.repeat(17000) })]) {
    assert.ok([400, 413].includes((await handler(event(body))).statusCode));
  }
  assert.equal(calls.length, 0);
});

test('input is trimmed, length-capped and stripped of control characters', async () => {
  const calls = scriptReplies((b) => ({ ok: true, code: 'saved', submissionId: b.submissionId }));
  await submit({ fullName: ' Ada\u0007 ', message: `Hello\r\nthere\u0000${'x'.repeat(6000)}` });
  assert.equal(calls[0].body.fullName, 'Ada');
  assert.ok(calls[0].body.message.startsWith('Hello\nthere'));
  assert.equal(calls[0].body.message.length, 5000);
});

test('missing or non-Google configuration → unavailable, nothing sent', async () => {
  const calls = scriptReplies({ ok: true, code: 'saved', submissionId: ID });
  for (const [url, secret] of [
    [undefined, SECRET],
    [SCRIPT_URL, undefined],
    ['https://evil.example/exec', SECRET],
    ['http://localhost:9999/exec', SECRET], // only allowed under netlify dev
  ]) {
    if (url === undefined) delete process.env.CONTACT_SCRIPT_URL;
    else process.env.CONTACT_SCRIPT_URL = url;
    if (secret === undefined) delete process.env.CONTACT_SHARED_SECRET;
    else process.env.CONTACT_SHARED_SECRET = secret;
    const res = await submit();
    assert.equal(res.statusCode, 503);
    assert.equal(parse(res).status, 'unavailable');
  }
  assert.equal(calls.length, 0);
});

test('foreign origins, GET and preflight', async () => {
  scriptReplies({ ok: true, code: 'saved', submissionId: ID });
  assert.equal((await submit({}, { headers: { origin: 'https://evil.example' } })).statusCode, 403);
  assert.equal((await handler(event({}, { method: 'GET' }))).statusCode, 405);
  assert.equal((await handler(event({}, { method: 'OPTIONS' }))).statusCode, 204);
});

test('origin check: production, this site\'s deploy previews and netlify dev allowed; others refused', async () => {
  scriptReplies((b) => ({ ok: true, code: 'saved', submissionId: b.submissionId, notification: 'sent' }));
  process.env.URL = 'https://brightpathwebstudio.org';
  process.env.SITE_NAME = 'brightpathwebstudio';
  try {
    const status = async (origin) => (await submit({}, { headers: { origin } })).statusCode;
    for (const origin of [
      'https://brightpathwebstudio.org',
      'https://www.brightpathwebstudio.org',
      'https://deploy-preview-12--brightpathwebstudio.netlify.app',
      'https://6ad7916293e90352aa2b531e--brightpathwebstudio.netlify.app',
    ]) assert.equal(await status(origin), 200, origin);
    for (const origin of [
      'https://deploy-preview-12--brightpathwebstudio.netlify.app.evil.com',
      'https://deploy-preview-12--evilsite.netlify.app',
      'https://evil-brightpathwebstudio.netlify.app',
      'https://brightpathwebstudio.org.evil.com',
      'http://localhost:8888', // not under netlify dev
      'null',
      'https://brightpathwebstudio.org/',
    ]) assert.equal(await status(origin), 403, origin);
    // The CORS header only ever echoes an allowed origin.
    const refusedRes = await submit({}, { headers: { origin: 'https://evil.example' } });
    assert.equal(refusedRes.headers['Access-Control-Allow-Origin'], 'https://brightpathwebstudio.org');
    const previewRes = await submit({}, { headers: { origin: 'https://deploy-preview-12--brightpathwebstudio.netlify.app' } });
    assert.equal(previewRes.headers['Access-Control-Allow-Origin'], 'https://deploy-preview-12--brightpathwebstudio.netlify.app');
    process.env.NETLIFY_DEV = 'true';
    assert.equal(await status('http://localhost:8888'), 200);
  } finally {
    delete process.env.URL;
    delete process.env.SITE_NAME;
    delete process.env.NETLIFY_DEV;
  }
});

test('rate limit: 9th request from one IP in 10 minutes is refused', async () => {
  scriptReplies((b) => ({ ok: true, code: 'saved', submissionId: b.submissionId }));
  for (let i = 0; i < 8; i++) assert.equal((await submit({}, { ip: '203.0.113.9' })).statusCode, 200);
  const res = await submit({}, { ip: '203.0.113.9' });
  assert.equal(res.statusCode, 429);
  assert.equal(parse(res).status, 'rate_limited');
});

test('logs never contain visitor names, emails or messages', async () => {
  const replies = [
    [{ ok: true, code: 'saved', submissionId: ID, notification: 'failed' }],
    ['<html>error</html>', { contentType: 'text/html' }],
    [{ ok: false, code: 'server_error' }],
  ];
  for (const [reply, opts] of replies) {
    scriptReplies(reply, opts);
    await submit();
  }
  const text = JSON.stringify(logs);
  assert.ok(logs.length > 0);
  for (const value of Object.values(VISITOR)) assert.ok(!text.includes(value), `log contains ${value}`);
  assert.ok(!text.includes(SECRET));
});

// Reproduces Apps Script's real reply flow: POST /exec answers 302 to a
// one-time googleusercontent URL, which must be fetched with GET.
test('follows the Apps Script POST → 302 → GET redirect and reads the JSON', async () => {
  const seen = [];
  const replies = new Map();
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      seen.push(`${req.method} ${req.url.split('?')[0]}`);
      if (req.method === 'POST' && req.url === '/macros/s/TEST/exec') {
        const data = JSON.parse(body);
        const key = Math.random().toString(36).slice(2);
        replies.set(key, { ok: true, code: 'saved', submissionId: data.submissionId, notification: 'sent' });
        res.writeHead(302, { Location: `/macros/echo?user_content_key=${key}` });
        return res.end();
      }
      if (req.method === 'GET' && req.url.startsWith('/macros/echo')) {
        const key = new URL(req.url, 'http://x').searchParams.get('user_content_key');
        const reply = replies.get(key);
        replies.delete(key); // one-time URL
        res.writeHead(reply ? 200 : 404, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(reply || {}));
      }
      res.writeHead(405).end();
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  try {
    process.env.NETLIFY_DEV = 'true';
    process.env.CONTACT_SCRIPT_URL = `http://127.0.0.1:${port}/macros/s/TEST/exec`;
    const res = await submit();
    assert.deepEqual(parse(res), { status: 'received', submissionId: ID });
    assert.deepEqual(seen, ['POST /macros/s/TEST/exec', 'GET /macros/echo']);
  } finally {
    server.close();
  }
});
