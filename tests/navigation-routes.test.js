// Regression coverage for navigation destinations (Nov 2026).
//
// The mobile menu linked to /review for ten months after the route was renamed
// to /reviews (commit 40fa508, Jan 2026), because only the desktop link was
// updated. Mobile visitors got React Router's 404. These tests read the source
// directly (no browser), so they run with the rest of `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const navbar = read('src/components/ui/Navbar.tsx');
const main = read('src/main.tsx');
const netlifyToml = read('netlify.toml');

// Top-level router paths from src/main.tsx (`path: "about"` → "/about").
const routes = new Set(
  [...main.matchAll(/path:\s*["']([^"']+)["']/g)].map(([, p]) => (p === '/' ? '/' : `/${p}`)),
);

// Every <NavLink>/<Link> in the navbar. Mobile-menu links close the menu on
// click; desktop links don't, which is how the two menus are told apart.
const links = [...navbar.matchAll(/<(?:NavLink|Link)\b[^>]*?\bto=["']([^"']+)["'][^>]*>([^<]*)</g)].map(
  ([tag, to, label]) => ({ to, label: label.trim(), mobile: /onClick=\{closeMenu\}/.test(tag) }),
);
const desktop = links.filter((l) => !l.mobile);
const mobile = links.filter((l) => l.mobile);

test('the navbar has both a desktop and a mobile menu', () => {
  assert.ok(desktop.length >= 6, `expected ≥ 6 desktop links, found ${desktop.length}`);
  assert.ok(mobile.length >= 6, `expected ≥ 6 mobile links, found ${mobile.length}`);
});

test('every desktop and mobile nav link points to a real route', () => {
  for (const { to, label, mobile: isMobile } of links) {
    assert.ok(routes.has(to), `${isMobile ? 'mobile' : 'desktop'} "${label}" links to ${to}, which is not a route`);
  }
});

test('the mobile menu offers the same destinations as the desktop menu', () => {
  const pairs = (list) => list.map((l) => `${l.label} → ${l.to}`).sort();
  assert.deepEqual(pairs(mobile), pairs(desktop));
});

test('Reviews links to /reviews in both menus', () => {
  const reviews = links.filter((l) => l.label === 'Reviews');
  assert.equal(reviews.length, 2);
  for (const l of reviews) assert.equal(l.to, '/reviews');
});

// [[redirects]] blocks from netlify.toml, in file order.
const redirects = netlifyToml
  .split(/^\[\[redirects\]\]\s*$/m)
  .slice(1)
  .map((block) => {
    const field = (k) => block.match(new RegExp(`^\\s*${k}\\s*=\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
    return { from: field('from'), to: field('to'), status: Number(field('status')), force: field('force') === 'true' };
  });

test('legacy /review is a forced 301 to /reviews, above the SPA fallback', () => {
  const legacy = redirects.findIndex((r) => r.from === '/review');
  const fallback = redirects.findIndex((r) => r.from === '/*');
  assert.ok(legacy !== -1, 'no /review redirect');
  assert.ok(fallback !== -1, 'no /* SPA fallback');
  assert.ok(legacy < fallback, 'the /review redirect must come before the /* fallback');
  assert.deepEqual(redirects[legacy], { from: '/review', to: '/reviews', status: 301, force: true });
});

test('no redirect sends /reviews anywhere (no loop)', () => {
  assert.equal(redirects.filter((r) => r.from === '/reviews' || r.from === '/reviews/').length, 0);
  assert.ok(routes.has('/reviews'), '/reviews must remain a real route');
});
