/**
 * Structural mirror of the homepage hero.
 *
 * The hero is rendered as static HTML directly into index.html by the
 * `brightpath-inject-static-hero` Vite plugin (see vite.config.ts) so its
 * text paints before React boots. HomePage renders this mirror only as a
 * fallback, when the static copy isn't in the document: non-home routes are
 * prerendered without it (see StaticHeroRouteGate in App.tsx), so a visitor
 * who lands on /about and then navigates home gets the hero from here. It
 * must therefore stay an exact match for the injected string — a drift is
 * now visible to visitors, not just to reviewers.
 *
 * The hero styles itself with dedicated `.studio-hero` / `.studio-cta`
 * classes from src/styles/globals.css rather than Tailwind utilities:
 * Tailwind's content scanner never reads the plugin string, so utilities
 * used there would be purged unless this mirror stayed perfectly in sync.
 * Plain CSS removes that failure mode — but if you edit the markup in
 * vite.config.ts, update this file too.
 */
export default function ClarityHeroStructureMirror() {
  return (
    <section id="hero-clarity-static" className="studio-hero">
      <div className="studio-hero__inner">
        <div className="studio-hero__copy">
          <p className="studio-hero__eyebrow">BUILT AROUND YOUR BUSINESS</p>
          <h1 className="studio-hero__title">
            Websites That Work <span className="studio-hero__accent">Beautifully.</span>
          </h1>
          <p className="studio-hero__lede">
            Your business isn’t one-size-fits-all. Your website shouldn’t be either. I take
            the time to understand how your business works, what your customers need, and
            where your website can work harder for you.
          </p>
          <div className="studio-hero__cta">
            <a href="/contact" className="studio-cta studio-cta--primary">
              Let’s Talk{' '}
              <span className="studio-cta__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="/portfolio" className="studio-cta studio-cta--ghost">
              View Our Work{' '}
              <span className="studio-cta__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="studio-hero__media">
        <img
          src="/images/brightpath-hero-image.webp"
          width={1672}
          height={941}
          // React 18 doesn't know the camelCase `fetchPriority` prop and warns on it;
          // the lowercase attribute passes straight through to the DOM. The spread
          // keeps TypeScript (whose React 18 types only declare the camelCase name) happy.
          {...{ fetchpriority: 'high' }}
          decoding="async"
          className="studio-hero__img"
          alt="A laptop on a studio desk showing a BrightPath-built client website, beside a BrightPath mug and design books."
        />
        <span className="studio-hero__scrim" aria-hidden="true" />
      </div>
    </section>
  );
}
