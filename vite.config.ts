import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
      <a href="/portfolio" class="inline-flex w-full min-w-[220px] items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-bold font-poppins text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18] sm:w-auto">
        View My Work
      </a>
      <a href="/assets/Tisha-DiFresco-Resume.pdf" download class="inline-flex w-full min-w-[220px] items-center justify-center rounded-md border border-primary/70 bg-white/10 px-8 py-3 text-lg font-bold font-poppins text-[#f5f0e8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white/15 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18] sm:w-auto">
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
  plugins: [react(), injectStaticHero()],
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
