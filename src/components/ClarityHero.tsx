/**
 * ClarityHero is now rendered as static HTML directly into index.html by
 * the `brightpath-inject-static-hero` Vite plugin (see vite.config.ts).
 * This file exists only so Tailwind sees the classes used in that static
 * markup and emits them in the production CSS — it is NOT imported or
 * rendered anywhere in the React tree.
 *
 * If you change classes in the heroHtml string in vite.config.ts, also
 * change them here, and vice versa. The two must stay in sync.
 *
 * Why the static-injection trick: it pulls the LCP text out of the JS
 * critical path so it paints before React boots. Same pattern used on
 * the AweStruck Intelligence site for the LCP win.
 */
export default function ClarityHeroClassManifest() {
  return (
    <section id="hero-clarity-static" className="hero-clarity relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="guiding-light" />
      <div className="horizon-glow" />
      <img alt="" aria-hidden="true" className="lighthouse-silhouette" />
      <div className="clarity-headline text-center max-w-5xl mx-auto px-4">
        <p className="clarity-eyebrow font-poppins mb-4 mt-24 text-sm sm:text-base md:text-lg uppercase tracking-[0.18em] text-white/70" />
        <h1 className="font-poppins font-bold mb-6 mt-24">
          <span className="clarity-text clarity-text-line1 block text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
          <span className="clarity-text clarity-text-line2 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
            <span className="bright-word" />
          </span>
        </h1>
        <p className="clarity-subtitle font-lato mb-10 max-w-2xl mx-auto text-base sm:text-lg" />
        <div className="clarity-cta flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a className="inline-flex min-w-[220px] items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-bold font-poppins text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18]" />
          <a className="inline-flex min-w-[220px] items-center justify-center rounded-md border border-primary/70 bg-white/10 px-8 py-3 text-lg font-bold font-poppins text-[#f5f0e8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-white/15 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f18]" />
        </div>
      </div>
    </section>
  );
}
