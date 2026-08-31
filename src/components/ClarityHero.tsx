/**
 * Structural mirror of the homepage hero.
 *
 * The hero is rendered as static HTML directly into index.html by the
 * `brightpath-inject-static-hero` Vite plugin (see vite.config.ts) so its
 * text paints before React boots. This file is NOT imported or rendered
 * anywhere — it exists so the markup is reviewable as JSX alongside the rest
 * of the components, and so changes to the injected string have an obvious
 * second place to keep in step.
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
          <p className="studio-hero__eyebrow">WEBSITES BUILT FOR BUSINESS</p>
          <h1 className="studio-hero__title">
            Websites That Work <span className="studio-hero__accent">Beautifully.</span>
          </h1>
          <p className="studio-hero__lede">
            Custom websites built for speed, clarity, and growth—so your online presence
            works as hard as you do and makes it easier for customers to understand, trust,
            and engage with your business.
          </p>
          <div className="studio-hero__cta">
            <a href="/contact" className="studio-cta studio-cta--primary">
              Start Your Project{' '}
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
          fetchPriority="high"
          decoding="async"
          className="studio-hero__img"
          alt="A laptop on a studio desk showing a BrightPath-built client website, beside a BrightPath mug and design books."
        />
        <span className="studio-hero__scrim" aria-hidden="true" />
      </div>
    </section>
  );
}
