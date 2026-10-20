// Tests for netlify/functions/analytics-region.js — the allowlist that decides
// whether Google Analytics may load for a visitor.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { config } from '../netlify/functions/analytics-region.js';

const ask = async (geo, method = 'GET') => {
  const res = await handler(new Request('https://brightpathwebstudio.org/api/analytics-region', { method }), { geo });
  return { status: res.status, headers: res.headers, body: await res.json() };
};
const country = (code) => ({ country: { code, name: 'x' } });

test('United States visitors may use Analytics', async () => {
  for (const code of ['US', 'us']) {
    const { status, body } = await ask(country(code));
    assert.equal(status, 200);
    assert.deepEqual(body, { analytics: true });
  }
});

test('EEA, UK and Switzerland visitors never get Analytics', async () => {
  const eea = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO'];
  for (const code of [...eea, 'GB', 'CH']) {
    assert.deepEqual((await ask(country(code))).body, { analytics: false }, code);
  }
});

test('every other country is excluded too (allowlist, not blocklist)', async () => {
  for (const code of ['CA', 'MX', 'BR', 'AU', 'JP', 'IN', 'CN', 'ZA', 'TR', 'KR', 'PR']) {
    assert.deepEqual((await ask(country(code))).body, { analytics: false }, code);
  }
});

test('unknown or malformed location → no Analytics', async () => {
  for (const geo of [undefined, null, {}, { country: {} }, { country: { code: '' } }, { country: { code: 42 } }, { country: null }]) {
    assert.deepEqual((await ask(geo)).body, { analytics: false }, JSON.stringify(geo));
  }
  const res = await handler(new Request('https://brightpathwebstudio.org/api/analytics-region'), undefined);
  assert.deepEqual(await res.json(), { analytics: false });
});

test('the answer is never cached and never reveals the country', async () => {
  const { headers, body } = await ask(country('US'));
  assert.equal(headers.get('cache-control'), 'private, no-store');
  assert.equal(headers.get('netlify-cdn-cache-control'), 'no-store');
  assert.deepEqual(Object.keys(body), ['analytics']);
});

test('only GET is answered', async () => {
  const { status, body } = await ask(country('US'), 'POST');
  assert.equal(status, 405);
  assert.deepEqual(body, { analytics: false });
});

test('served at /api/analytics-region', () => {
  assert.deepEqual(config, { path: '/api/analytics-region' });
});
