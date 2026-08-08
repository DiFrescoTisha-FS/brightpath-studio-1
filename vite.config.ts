import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
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

/** Escape hatch: `SKIP_PRERENDER=1 npm run build` drops both the prerender
 *  pass and its verification, producing the plain SPA build. Both go together
 *  on purpose — skipping only the check would be the silent-failure mode this
 *  setup exists to prevent. */
const SKIP_PRERENDER = !!process.env.SKIP_PRERENDER;

/**
 * Finds a Chrome/Chromium binary for the prerenderer.
 *
 * Nothing here is specific to one machine. In priority order:
 *   1. PUPPETEER_EXECUTABLE_PATH / CHROME_PATH — set these in the Netlify UI
 *      (or locally) to pin an exact binary.
 *   2. A conventional install path that actually exists on this platform.
 *   3. `undefined`, which lets Puppeteer use the Chromium it downloaded on
 *      install. That is the expected path on Netlify's Linux x64 builders.
 *
 * Step 2 matters on Apple Silicon: puppeteer 1.20 only ever shipped an x64
 * Chromium, so its bundled binary fails with EBADARCH on arm64 unless Rosetta
 * is installed. Falling back to the system Chrome keeps local builds working
 * without hardcoding anything that would break on Linux.
 */
function resolveChromeExecutable(): string | undefined {
  const explicit = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (explicit) return explicit;

  const candidates =
    process.platform === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Chromium.app/Contents/MacOS/Chromium',
        ]
      : [
          '/usr/bin/google-chrome-stable',
          '/usr/bin/google-chrome',
          '/usr/bin/chromium-browser',
          '/usr/bin/chromium',
        ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

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
 * exactly as it does today.
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
      fs.copyFileSync(source, path.join(outDir, 'app.html'));
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

    return problems;
  };

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
      let problems = routes.flatMap(checkRoute);

      while (problems.length > 0 && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, POLL_MS));
        problems = routes.flatMap(checkRoute);
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

      console.log(`[verify-prerender] ${routes.length} routes verified.`);
    },
  };
}

/**
 * Renders the homepage hero as static HTML directly into index.html so the
 * LCP element ("Custom WordPress Websites / That Perform") paints before
 * React boots. Pulls the section out of the JS critical path entirely —
 * same pattern as `awestruck-inject-static-hero` on the AweStruck site.
 *
 * The React `ClarityHero.tsx` component is no longer rendered by HomePage;
 * it exists only so Tailwind sees the classes used in this static markup
 * and emits them in the production CSS. If you edit classes here, also
 * edit them in `ClarityHero.tsx` and vice versa.
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
        const heroHtml = `
<section id="hero-clarity-static" class="hero-clarity relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="guiding-light"></div>
  <div class="horizon-glow"></div>
  <img src="/images/lighthouse-sillouette.svg" alt="" aria-hidden="true" class="lighthouse-silhouette" />
  <div class="clarity-headline text-center max-w-5xl mx-auto px-4">
    <p class="clarity-eyebrow font-poppins mb-4 mt-24 text-sm sm:text-base md:text-lg uppercase tracking-[0.18em] text-white/70">
      WordPress Developer &amp; Front-End Specialist
    </p>
    <h1 class="font-poppins font-bold mb-6 mt-24">
      <span class="clarity-text clarity-text-line1 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Custom WordPress Websites</span>
      <span class="clarity-text clarity-text-line2 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">That <span class="bright-word">Perform</span></span>
    </h1>
    <p class="clarity-subtitle font-lato mb-10 max-w-2xl mx-auto text-base sm:text-lg">
      I build fast, responsive websites using WordPress, ACF, JavaScript, and performance-focused front-end development.
    </p>
    <div class="clarity-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
      <a href="/portfolio" class="inline-flex min-w-[220px] items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-bold font-poppins text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18]">
        View My Work
      </a>
      <a href="/assets/Tisha-DiFresco-Resume.pdf" download class="inline-flex min-w-[220px] items-center justify-center rounded-md border border-primary/70 bg-white/10 px-8 py-3 text-lg font-bold font-poppins text-[#f5f0e8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white/15 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18]">
        Download Resume
      </a>
    </div>
  </div>
</section>`;
        return html.replace('<!-- HERO_PLACEHOLDER -->', heroHtml);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    injectStaticHero(),
    ...(SKIP_PRERENDER
      ? []
      : [
          snapshotSpaFallback(),
          vitePrerender({
            staticDir: path.resolve(__dirname, 'dist'),
            routes: PRERENDER_ROUTES,
            renderer: new PuppeteerRenderer({
              headless: true,
              executablePath: resolveChromeExecutable(),
              args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
              ],
              // PageMeta fires this once Helmet has committed the route's
              // <head>. Note there is no renderAfterTime fallback: the
              // renderer treats these as if/else-if, so setting both would
              // silently discard the timeout anyway.
              renderAfterDocumentEvent: 'prerender-ready',
            }),
          }),
          verifyPrerender(PRERENDER_ROUTES),
        ]),
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
});
