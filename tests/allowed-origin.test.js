// Tests for netlify/lib/allowed-origin.js — the strict Origin check shared by
// the contact-inquiry and newsletter-subscribe functions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedOrigin } from '../netlify/lib/allowed-origin.js';

// What Netlify actually provides to functions at runtime on this site.
const NETLIFY = { URL: 'https://brightpathwebstudio.org', SITE_NAME: 'brightpathwebstudio' };
const DEV = { ...NETLIFY, NETLIFY_DEV: 'true' };

const allowed = (origin, env = NETLIFY) => assert.equal(isAllowedOrigin(origin, env), true, `should allow ${JSON.stringify(origin)}`);
const refused = (origin, env = NETLIFY) => assert.equal(isAllowedOrigin(origin, env), false, `should refuse ${JSON.stringify(origin)}`);

test('production origins are allowed', () => {
  allowed('https://brightpathwebstudio.org');
  allowed('https://www.brightpathwebstudio.org');
  allowed('https://brightpathwebstudio.org', {}); // even with no Netlify env at all
});

test("Netlify's runtime URL is allowed (exact origin only)", () => {
  allowed('https://custom.example.org', { URL: 'https://custom.example.org' });
  refused('https://custom.example.org.evil.com', { URL: 'https://custom.example.org' });
  refused('http://custom.example.org', { URL: 'http://custom.example.org' }); // https only
  refused('https://anything.example', { URL: 'not a url' });
});

test("this site's Netlify deploy addresses are allowed", () => {
  allowed('https://deploy-preview-1--brightpathwebstudio.netlify.app');
  allowed('https://deploy-preview-427--brightpathwebstudio.netlify.app');
  allowed('https://6ad7916293e90352aa2b531e--brightpathwebstudio.netlify.app'); // deploy permalink
  allowed('https://feature-newsletter-signup--brightpathwebstudio.netlify.app'); // branch-style prefix
  allowed('https://brightpathwebstudio.netlify.app');
});

test('look-alike and foreign Netlify hosts are refused', () => {
  refused('https://deploy-preview-1--evilsite.netlify.app');
  refused('https://evil-brightpathwebstudio.netlify.app');
  refused('https://brightpathwebstudio-evil.netlify.app');
  refused('https://evilbrightpathwebstudio.netlify.app');
  refused('https://deploy-preview-1-brightpathwebstudio.netlify.app'); // single hyphen, not a prefix separator
  refused('https://a--b--brightpathwebstudio.netlify.app'); // "--" inside the prefix
  refused('https://-x--brightpathwebstudio.netlify.app');
  refused('https://x---brightpathwebstudio.netlify.app');
  refused('https://--brightpathwebstudio.netlify.app');
  refused('https://déploy-preview-1--brightpathwebstudio.netlify.app'); // Unicode look-alike
  refused('https://deploy-preview-1--brightpathwebstudio.netlify.app.evil.com');
  refused('https://deploy-preview-1--brightpathwebstudio.netlify.application');
  refused('https://brightpathwebstudio.netlify.app.evil.com');
  refused('https://deploy-preview-1--brightpathwebstudio.netlify.com');
  refused('https://deploy-preview-1--brightpathwebstudio.netlify.app:8443'); // extra port
  refused('http://deploy-preview-1--brightpathwebstudio.netlify.app'); // not https
});

test('deploy addresses need a valid SITE_NAME from Netlify', () => {
  refused('https://deploy-preview-1--brightpathwebstudio.netlify.app', { URL: NETLIFY.URL });
  refused('https://x--.netlify.app', { SITE_NAME: '' });
  // A malformed SITE_NAME can't turn into a wildcard
  refused('https://anything.netlify.app', { SITE_NAME: '.*' });
  refused('https://x--a.netlify.app', { SITE_NAME: 'a|b' });
});

test('look-alikes of the production domain are refused', () => {
  refused('https://brightpathwebstudio.org.evil.com');
  refused('https://evilbrightpathwebstudio.org');
  refused('https://brightpathwebstudio.com'); // the unregistered .com
  refused('https://brightpathstudio.com');
  refused('https://sub.brightpathwebstudio.org'); // only the apex and www are the site
  refused('http://brightpathwebstudio.org'); // not https
  refused('https://brightpathwebstudio.org:444');
});

test('malformed origins are refused', () => {
  for (const origin of [
    'null',
    'https://brightpathwebstudio.org/', // trailing slash: not an origin
    'https://brightpathwebstudio.org/contact',
    'https://brightpathwebstudio.org?x=1',
    'https://brightpathwebstudio.org#x',
    'https://user:pass@brightpathwebstudio.org',
    'https://user@brightpathwebstudio.org',
    'HTTPS://BRIGHTPATHWEBSTUDIO.ORG', // not the canonical serialization browsers send
    ' https://brightpathwebstudio.org',
    'https://brightpathwebstudio.org ',
    'brightpathwebstudio.org',
    '//brightpathwebstudio.org',
    'javascript:alert(1)',
    'data:text/html,hi',
    'file://',
    'ftp://brightpathwebstudio.org',
    'https://xn--brightpathwebstudio-.org',
    'https://brightpathwebstudio.org\u0000.evil.com',
    `https://${'a'.repeat(300)}.org`,
  ]) refused(origin);
  for (const value of [null, 42, {}, ['https://brightpathwebstudio.org']]) refused(value);
});

test('local development is allowed only under netlify dev', () => {
  allowed('http://localhost:8888', DEV);
  allowed('http://localhost:8899', DEV);
  allowed('http://127.0.0.1:8899', DEV);
  refused('http://localhost:8888'); // production: never
  refused('http://127.0.0.1:8888');
  refused('http://localhost:8888', { ...NETLIFY, NETLIFY_DEV: 'false' });
  refused('http://localhost', DEV); // no port
  refused('https://localhost:8888', DEV);
  refused('http://localhost.evil.com:8888', DEV);
  refused('http://localhost:8888.evil.com', DEV);
  refused('http://0.0.0.0:8888', DEV);
  refused('http://[::1]:8888', DEV);
  refused('http://192.168.1.10:8888', DEV);
});

test('a missing Origin header is allowed (non-browser clients)', () => {
  allowed(undefined);
  allowed('');
});
