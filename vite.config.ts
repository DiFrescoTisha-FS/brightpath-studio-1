import { defineConfig, type Plugin, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execFileSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const vitePrerender = require('vite-plugin-prerender');
const { PuppeteerRenderer } = require('vite-plugin-prerender');

/**
 * Routes rendered to static HTML at build time.
 *
 * Deterministic routes only. `/services` and `/reviews` are deliberately
 * absent: they fetch live data from the Netlify functions behind
 * /api/phases and /api/reviews, so a build-time snapshot would bake in
 * stale content. They keep working through the SPA fallback (see
 * `snapshotSpaFallback` below and the /* rule in netlify.toml).
 *
 * Portfolio slugs must match `slug` in src/data/caseStudies/* exactly — a
 * typo silently prerenders the "Case Study Not Found" page instead of the
 * case study, which is why `verifyPrerender` checks the canonical URL and
 * the rendered <title> rather than just the file's existence.
 */
const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/portfolio',
  '/portfolio/awestruck-intelligence',
  '/portfolio/bamvsthewrld',
  '/portfolio/dale-tiffany-social-media',
  '/portfolio/living-better-life-social-media',
  '/contact',
  '/case-study',
  '/social-media',
  '/terms-of-service',
  '/privacy-policy',
];

/** Chrome flags for the prerenderer. Shared so the preflight launch in
 *  `ensureChromeExecutable` exercises exactly what the real render will use. */
const PRERENDER_CHROME_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
];

/** Escape hatch: `SKIP_PRERENDER=1 npm run build` drops both the prerender
 *  pass and its verification, producing the plain SPA build. Both go together
 *  on purpose — skipping only the check would be the silent-failure mode this
 *  setup exists to prevent. */
const SKIP_PRERENDER = !!process.env.SKIP_PRERENDER;

/**
 * Guarantees a Chrome binary exists for the prerenderer and returns its path.
 *
 * No machine-specific paths: this resolves to Puppeteer's own Chrome for
 * Testing, which has builds for both Netlify's Linux x64 builders and Apple
 * Silicon. `PUPPETEER_EXECUTABLE_PATH` / `CHROME_PATH` still win if set, so a
 * CI image with its own Chrome can skip the download.
 *
 * The download is performed here, explicitly, rather than being left to
 * Puppeteer's postinstall hook. Install scripts are routinely suppressed —
 * `npm ci --ignore-scripts`, npm's allow-scripts gating, hardened CI images —
 * and when that happens the hook no-ops silently, `launch()` fails with no
 * browser, and vite-plugin-prerender swallows the error. That is exactly how
 * the first Netlify build produced a green `vite build` and zero prerendered
 * routes. Doing it at build time makes it deterministic and loud.
 *
 * `puppeteer browsers install chrome` is idempotent — a no-op once the browser
 * is in the cache directory (PUPPETEER_CACHE_DIR, set for Netlify in
 * netlify.toml so the download survives between deploys).
 */
async function ensureChromeExecutable(): Promise<string> {
  const explicit = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (explicit) {
    if (!fs.existsSync(explicit)) {
      throw new Error(
        `[prerender] PUPPETEER_EXECUTABLE_PATH/CHROME_PATH points at "${explicit}", which does not exist.`,
      );
    }
    return explicit;
  }

  const puppeteer = require('puppeteer');
  const installed = async () => {
    try {
      const executable = await puppeteer.executablePath();
      return executable && fs.existsSync(executable) ? executable : null;
    } catch {
      return null;
    }
  };

  const alreadyThere = await installed();
  if (alreadyThere) return alreadyThere;

  console.log('[prerender] Chrome for Testing not found — downloading it now...');
  try {
    execFileSync(path.resolve(__dirname, 'node_modules/.bin/puppeteer'),
      ['browsers', 'install', 'chrome'], { stdio: 'inherit' });
  } catch (error) {
    throw new Error(
      `[prerender] Could not download Chrome for Testing.\n${(error as Error).message}\n\n` +
        `Set PUPPETEER_EXECUTABLE_PATH to an existing Chrome binary, or build with\n` +
        `SKIP_PRERENDER=1 to ship the plain SPA build.`,
    );
  }

  const afterInstall = await installed();
  if (!afterInstall) {
    throw new Error(
      `[prerender] Chrome for Testing still missing after install. Set\n` +
        `PUPPETEER_EXECUTABLE_PATH, or build with SKIP_PRERENDER=1.`,
    );
  }
  return afterInstall;
}

/**
 * Launches and closes the browser once before the real render starts.
 *
 * A binary can exist and still fail to run — missing shared libraries on a
 * slim CI image is the usual cause. vite-plugin-prerender catches launch
 * failures and logs a generic line, so without this check the symptom is a
 * silent 180-second wait followed by "no routes were generated" and no
 * explanation. Failing here surfaces Chrome's actual error instead.
 */
async function preflightChrome(executablePath: string): Promise<void> {
  const puppeteer = require('puppeteer');
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: PRERENDER_CHROME_ARGS,
    });
    await browser.close();
  } catch (error) {
    throw new Error(
      `[prerender] Chrome exists at "${executablePath}" but could not be launched.\n` +
        `${(error as Error).message}\n\n` +
        `On a slim Linux image this is usually a missing system library.\n` +
        `Set PUPPETEER_EXECUTABLE_PATH to a working Chrome, or build with\n` +
        `SKIP_PRERENDER=1 to ship the plain SPA build.`,
    );
  }
}

/**
 * The homepage hero, injected into index.html at build time by
 * injectStaticHero(). Shared as a constant so snapshotSpaFallback() can strip
 * exactly this markup from app.html. Keep src/components/ClarityHero.tsx in
 * step with it — see injectStaticHero() for why.
 */
const STATIC_HERO_HTML = `
<section id="hero-clarity-static" class="studio-hero">
  <div class="studio-hero__inner">
    <div class="studio-hero__copy">
      <p class="studio-hero__eyebrow">BUILT AROUND YOUR BUSINESS</p>
      <h1 class="studio-hero__title">Websites That Work <span class="studio-hero__accent">Beautifully.</span></h1>
      <p class="studio-hero__lede">Your business isn&#8217;t one-size-fits-all. Your website shouldn&#8217;t be either. I take the time to understand how your business works, what your customers need, and where your website can work harder for you.</p>
      <div class="studio-hero__cta">
        <a href="/contact" class="studio-cta studio-cta--primary">Let&#8217;s Talk <span class="studio-cta__arrow" aria-hidden="true">&#8594;</span></a>
        <a href="/portfolio" class="studio-cta studio-cta--ghost">View Our Work <span class="studio-cta__arrow" aria-hidden="true">&#8594;</span></a>
      </div>
    </div>
  </div>
  <div class="studio-hero__media">
    <img src="/images/brightpath-hero-image.webp" width="1672" height="941" fetchpriority="high" decoding="async" class="studio-hero__img" alt="A laptop on a studio desk showing a BrightPath-built client website, beside a BrightPath mug and design books." />
    <span class="studio-hero__scrim" aria-hidden="true"></span>
  </div>
</section>`;

/**
 * Copies the freshly built index.html to app.html before the prerenderer
 * overwrites index.html with the rendered homepage.
 *
 * Netlify's catch-all serves this file for every route that has no static
 * HTML of its own — /services, /reviews, and any unknown URL. Without it the
 * fallback would be the prerendered *homepage*, so /services would paint
 * homepage content, then hydrate against it and blow up with a mismatch.
 *
 * app.html keeps `#root` empty, so main.tsx takes the createRoot() branch
 * exactly as it does today. It also drops the static homepage hero — see
 * the comment in writeBundle().
 */
function snapshotSpaFallback(): Plugin {
  let outDir = 'dist';
  return {
    name: 'brightpath-spa-fallback-snapshot',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    // writeBundle runs before closeBundle, where the prerenderer does its work.
    writeBundle() {
      const source = path.join(outDir, 'index.html');
      if (!fs.existsSync(source)) return;
      const html = fs.readFileSync(source, 'utf8');
      // The static homepage hero is hidden at runtime on these routes, but a
      // hidden <h1> still ships in the HTML, and crawlers that ignore CSS read
      // "Websites That Work Beautifully." as the heading of /services and
      // /reviews. HomePage renders ClarityHero when the static hero is absent,
      // so visitors who start here and navigate home still get it.
      if (!html.includes(STATIC_HERO_HTML)) {
        throw new Error(
          '[spa-fallback] The static homepage hero was not found in the built index.html, ' +
            'so it cannot be stripped from app.html. Did injectStaticHero() change?',
        );
      }
      fs.writeFileSync(path.join(outDir, 'app.html'), html.replace(STATIC_HERO_HTML, ''));
    },
  };
}

/**
 * Fails the build when prerendering didn't actually produce what it claimed to.
 *
 * This is load-bearing. vite-plugin-prerender's closeBundle calls an async
 * function without returning its promise, and its internal catch swallows the
 * real error behind a generic log line — so a build where Chrome never
 * launched still exits 0 and deploys un-prerendered HTML. Polling for the
 * expected files (rather than checking once) is what bridges that missing
 * await; the deadline turns a hang into a readable failure.
 */
function verifyPrerender(routes: string[]): Plugin {
  const TIMEOUT_MS = 180_000;
  const POLL_MS = 500;
  let outDir = 'dist';

  const outputPathFor = (route: string) => path.join(outDir, route, 'index.html');

  /** Returns a list of human-readable problems; empty means the route is good. */
  const checkRoute = (route: string): string[] => {
    const file = outputPathFor(route);
    if (!fs.existsSync(file)) return [`${route}: ${path.relative(outDir, file)} was not generated`];

    const html = fs.readFileSync(file, 'utf8');
    const problems: string[] = [];

    if (/<div id="root">\s*<\/div>/.test(html)) {
      problems.push(`${route}: #root is empty — the snapshot captured no rendered page content`);
    }

    // Every tag below is emitted by PageMeta and marked data-rh in index.html,
    // so exactly one of each must survive. Two means Helmet's copy landed
    // alongside the generic default instead of replacing it.
    const singletons: Array<[string, RegExp]> = [
      ['meta description', /<meta[^>]+name="description"/g],
      ['canonical link', /<link[^>]+rel="canonical"/g],
      ['og:title', /<meta[^>]+property="og:title"/g],
      ['og:description', /<meta[^>]+property="og:description"/g],
      ['og:url', /<meta[^>]+property="og:url"/g],
      ['og:image', /<meta[^>]+property="og:image"/g],
      ['twitter:title', /<meta[^>]+name="twitter:title"/g],
      ['twitter:description', /<meta[^>]+name="twitter:description"/g],
      ['twitter:image', /<meta[^>]+name="twitter:image"/g],
    ];
    for (const [label, pattern] of singletons) {
      const count = (html.match(pattern) || []).length;
      if (count !== 1) problems.push(`${route}: expected exactly 1 ${label}, found ${count}`);
    }

    // A wrong slug still renders successfully — as the "not found" page, whose
    // canonical points at /portfolio. Comparing canonical to the route catches it.
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    const expectedPath = route === '/' ? '/' : route;
    if (canonical && new URL(canonical).pathname !== expectedPath) {
      problems.push(`${route}: canonical is ${canonical} — route-specific metadata did not render`);
    }

    // The static hero belongs to "/" only. Other routes drop it before the
    // snapshot (StaticHeroRouteGate in App.tsx); if it survives, crawlers that
    // ignore CSS read the homepage <h1> as that page's first heading.
    const hasStaticHero = html.includes('id="hero-clarity-static"');
    if (route === '/' ? !hasStaticHero : hasStaticHero) {
      problems.push(
        route === '/'
          ? `${route}: the static homepage hero is missing`
          : `${route}: contains the hidden homepage hero (and its <h1>)`,
      );
    }

    return problems;
  };

  /** app.html serves /services, /reviews and unknown URLs; it must not carry the homepage hero. */
  const checkSpaFallback = (): string[] => {
    const file = path.join(outDir, 'app.html');
    if (!fs.existsSync(file)) return ['app.html (SPA fallback) was not generated'];
    return fs.readFileSync(file, 'utf8').includes('id="hero-clarity-static"')
      ? ['app.html: contains the hidden homepage hero (and its <h1>), served on /services and /reviews']
      : [];
  };
  const checkAll = () => [...routes.flatMap(checkRoute), ...checkSpaFallback()];

  return {
    name: 'brightpath-verify-prerender',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outDir = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir);
    },
    async closeBundle() {
      const deadline = Date.now() + TIMEOUT_MS;
      let problems = checkAll();

      while (problems.length > 0 && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, POLL_MS));
        problems = checkAll();
      }

      if (problems.length > 0) {
        throw new Error(
          `[verify-prerender] Prerendering did not complete successfully:\n` +
            problems.map((problem) => `  - ${problem}`).join('\n') +
            `\n\nThe build has been failed on purpose rather than deploying un-prerendered HTML.\n` +
            `If Chrome is unavailable in this environment, set PUPPETEER_EXECUTABLE_PATH,\n` +
            `or build with SKIP_PRERENDER=1 to ship the plain SPA build.`,
        );
      }

      console.log(`[verify-prerender] ${routes.length} routes and the SPA fallback verified.`);
    },
  };
}

/**
 * Renders the homepage hero as static HTML directly into index.html so the
 * LCP element ("Websites That Work Beautifully.") paints before React boots.
 * Pulls the section out of the JS critical path entirely — same pattern as
 * `awestruck-inject-static-hero` on the AweStruck site.
 *
 * Styling lives in the `.studio-hero` block of src/styles/globals.css.
 * `ClarityHero.tsx` is a React copy of STATIC_HERO_HTML, and it IS rendered:
 * HomePage falls back to it whenever this static copy isn't in the document
 * (every page except "/" is built without it — see StaticHeroRouteGate in
 * App.tsx and snapshotSpaFallback below). Edit both together. The hero uses
 * dedicated CSS classes rather than Tailwind utilities, because Tailwind's
 * content scanner never reads this string.
 *
 * Navbar is already `fixed top-0 z-50`, so it overlays the static hero
 * cleanly from the very first paint.
 */
function injectStaticHero(): Plugin {
  return {
    name: 'brightpath-inject-static-hero',
    transformIndexHtml: {
      order: 'pre',
      handler(html: string) {
        return html.replace('<!-- HERO_PLACEHOLDER -->', STATIC_HERO_HTML);
      },
    },
  };
}

// https://vitejs.dev/config/
// Async because the prerenderer's browser is resolved (and downloaded if
// missing) before the plugin is constructed. Gated on `command === 'build'`
// so `vite dev` never touches it.
export default defineConfig(async ({ command }): Promise<UserConfig> => {
  const prerendering = command === 'build' && !SKIP_PRERENDER;
  const chromePath = prerendering ? await ensureChromeExecutable() : undefined;
  if (prerendering && chromePath) {
    await preflightChrome(chromePath);
    console.log(`[prerender] Using Chrome at ${chromePath}`);
  }

  return {
  plugins: [
    react(),
    injectStaticHero(),
    ...(prerendering
      ? [
          snapshotSpaFallback(),
          vitePrerender({
            staticDir: path.resolve(__dirname, 'dist'),
            routes: PRERENDER_ROUTES,
            renderer: new PuppeteerRenderer({
              headless: true,
              executablePath: chromePath,
              args: PRERENDER_CHROME_ARGS,
              // PageMeta fires this once Helmet has committed the route's
              // <head>. Note there is no renderAfterTime fallback: the
              // renderer treats these as if/else-if, so setting both would
              // silently discard the timeout anyway.
              renderAfterDocumentEvent: 'prerender-ready',
              // Defines window.__PRERENDER_INJECTED before any page script
              // runs, which is how components tell this build-time render
              // apart from a real visit. Scroll-triggered reveals use it to
              // emit their settled (visible) state instead of opacity: 0 —
              // see src/utils/isPrerender.ts.
              inject: {},
            }),
          }),
          verifyPrerender(PRERENDER_ROUTES),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Strip console.* and debugger statements from production bundles.
  // Lifts Best Practices score and removes a small perf cost from
  // leftover dev logging in service files.
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // Emits .map files alongside the JS so Lighthouse's "Missing source
    // maps for large first-party JavaScript" audit passes. Sourcemaps are
    // separate files — they don't bloat the JS the user downloads.
    sourcemap: true,
    // Path-based chunking — keep React + ReactDOM in their own chunk so
    // router/animation libraries don't drag them into the main bundle.
    // Same pattern as the AweStruck site after we fixed its phantom-chunk
    // bug from the array-form manualChunks.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom/') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run/') ||
            id.includes('node_modules/history/')
          ) {
            return 'router';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer';
          }
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  };
});
