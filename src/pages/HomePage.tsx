import React, { Suspense, useState } from "react";
import { RefreshCcw, Zap, Code } from "lucide-react";
import { useAppStore } from '@/store/appStore';
import { Link } from 'react-router-dom';
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
import { PageMeta } from "@/components/PageMeta";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import ClarityHero from "@/components/ClarityHero";

// Lazy load heavy components to reduce critical path
const ReviewWidget = React.lazy(() => import('../components/ReviewWidget'));
const PortfolioSection = React.lazy(() => import('../components/PortfolioSection'));


type SectionProps = {
  theme: 'light' | 'dark';
};

const ServicesSection = ({ theme }: SectionProps) => {
  const services = [
    {
      title: "Make Your Website Work Better",
      description:
        "If your website feels outdated, confusing, or difficult to use, I’ll identify what’s getting in the way and improve the experience for you and your customers.",
      icon: <RefreshCcw className="h-8 w-8 mb-4 drop-shadow-md text-primary" aria-hidden="true" />,
    },
    {
      title: "Turn More Visits Into Action",
      description:
        "Make it easier for customers to book, call, contact you, or take the next step with clear messaging and a customer journey built around your business.",
      icon: <Zap className="h-8 w-8 mb-4 drop-shadow-md text-primary" aria-hidden="true" />,
    },
    {
      title: "Build What Your Business Needs",
      description:
        "When an off-the-shelf solution isn’t enough, I’ll create the functionality and web experience your business actually needs—without adding things you don’t.",
      icon: <Code className="h-8 w-8 mb-4 drop-shadow-md text-primary" aria-hidden="true" />,
    },
  ];

  // Per-viewport background art direction. Phones get a portrait-oriented
  // bg so the wide desktop composition doesn't crop badly.
  const desktopBg = theme === 'dark'
    ? cloudinaryAssets.homepageServicesBgDark
    : cloudinaryAssets.homepageServicesBgLight;
  const mobileBg = theme === 'dark'
    ? cloudinaryAssets.homepageServicesBgDarkMobile
    : cloudinaryAssets.homepageServicesBgLightMobile;

  return (
    <section id="services" className="home-services relative py-32 md:py-40 overflow-hidden">
      {/* Mobile bg layer — visible below md breakpoint */}
      <div
        aria-hidden="true"
        className="home-services__art absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${mobileBg})` }}
      />
      {/* Desktop bg layer — visible at md and up */}
      <div
        aria-hidden="true"
        className="home-services__art absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: `url(${desktopBg})` }}
      />
      {/* Grading layer — dark theme only. Blends the section's edges into the
          hero and My Work, and re-lights the gold the grade pulls down.
          Transparent in light mode, which is left exactly as it was. */}
      <div aria-hidden="true" className="home-services__veil absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrightPathGradientTitle as="h2" className="font-poppins font-bold text-services mb-4" gradientWords={["Help"]} emphasis="solid">
          How I Help Businesses
        </BrightPathGradientTitle>

        {/* `.services-body` rather than `text-muted-foreground`: the latter
            resolves to a mid-slate measuring 4.03:1 on the cream ground, under
            the 4.5:1 bar for normal text. Colour only — family, size, weight,
            spacing and width are unchanged. */}
        <p className="font-lato services-body mb-12 max-w-2xl mx-auto">
          Your website should support the way you work—and make it easier for customers to choose you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#1A2238] border border-primary/20 shadow-glow-primary' : 'bg-gray-50 border border-primary/50 shadow-2xl'}`}
            >
              <div className="flex justify-center">{service.icon}</div>

              {/* No emphasised word: the gold icon above is the card's accent,
                  so the title reads in the normal foreground colour. */}
              <BrightPathGradientTitle as="h3" className="font-poppins font-semibold mb-4 text-xl" emphasis="none">
                {service.title}
              </BrightPathGradientTitle>

              <p className="font-lato card-subheading text-muted-foreground">
                {service.description}
              </p>

            </div>
          ))}
        </div>

        <p className="font-lato services-body mt-12 max-w-2xl mx-auto">
          And support doesn't end at launch. <Link to="/services#maintenance" className="text-primary hover:underline">Ongoing maintenance</Link> helps keep your site secure, current, and running smoothly.
        </p>
      </div>
    </section>
  );
};

// Background handled by the `home-story` rules in globals.css, so this
// section no longer needs the theme prop.
const BrandStorySection = () => (
  <section className="home-story py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="w-full h-80 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
          <div className="text-center">
            <img
              src={cloudinaryAssets.lighthouseGraphic}
              alt="Lighthouse Graphic"
              className="h-auto w-full mx-auto mb-4 rounded-lg border border-primary/50 dark:shadow-glow-primary"
            />
          </div>
        </div>
      </div>
      <div>
        <BrightPathGradientTitle as="h3" className="font-poppins font-bold text-foreground mb-4"
          gradientWords={["Beacon"]}
          emphasis="solid"
        >
          A Beacon in the Digital Fog
        </BrightPathGradientTitle>
        <p className="font-lato text-muted-foreground leading-relaxed text-sm md:text-lg mb-6">
          You don’t need to know exactly what your website needs before we talk.
          That’s where I come in. I’ll take the time to understand your business,
          your customers, and what’s getting in the way—then help you find the
          right path forward.
        </p>
        <Link to="/contact">
          <button className="mt-8 bg-primary text-primary-foreground font-bold font-lato py-2 px-6 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-shadow-md">
            Tell Me About Your Business
          </button>
        </Link>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  const theme = useAppStore(state => state.theme);
  // The static hero is absent when the visitor entered on another
  // prerendered route — those snapshots drop it (see StaticHeroRouteGate in
  // App.tsx). Render the mirror in its place. Checked once per mount, so the
  // mirror's own matching id can never flip this back.
  const [renderHero] = useState(
    () => typeof document !== 'undefined' && !document.getElementById('hero-clarity-static'),
  );

  return (
    <div className="min-h-screen">
      <PageMeta
        title="BrightPath Web Studio — Websites Built Around Your Business"
        description="Websites and web applications built around how your business works and what your customers need. Designed and built by frontend engineer Tisha Di Fresco."
        path="/"
      />
      {/* ClarityHero is rendered statically into index.html by the
          brightpath-inject-static-hero Vite plugin so the LCP text paints
          before React boots. The React mirror only renders as a fallback
          when that static copy isn't in the document. <main> starts at
          ServicesSection. */}
      {renderHero && <ClarityHero />}
      <main>
        <ServicesSection theme={theme} />

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading portfolio...</div>}>
          <PortfolioSection />
        </Suspense>
        <section
          id="reviews"
          className="home-reviews relative py-32 md:py-40 overflow-hidden"
        >
          {/* Mobile bg layer — visible below md breakpoint */}
          <div
            aria-hidden="true"
            className="home-reviews__art absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage: `url(${theme === 'dark' ? cloudinaryAssets.homepageTestimonialsBgDarkMobile : cloudinaryAssets.homepageTestimonialsBgLightMobile})`,
            }}
          />
          {/* Desktop bg layer — visible at md and up */}
          <div
            aria-hidden="true"
            className="home-reviews__art absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
            style={{
              backgroundImage: `url(${theme === 'dark' ? cloudinaryAssets.homepageTestimonialsBgDark : cloudinaryAssets.homepageTestimonialsBgLight})`,
            }}
          />
          {/* Grading layer — grades the artwork into midnight in dark mode,
              and in light mode only feathers the edges into cream. */}
          <div aria-hidden="true" className="home-reviews__veil absolute inset-0" />
          <div className="relative container mx-auto px-4 text-center">
            <BrightPathGradientTitle as="h2" className="font-bold font-poppins mb-12"
              gradientWords={["Testimonials"]}
              emphasis="solid"
            >
              Client Testimonials
            </BrightPathGradientTitle>
            <Suspense fallback={<div className="text-center p-8 text-muted-foreground">Loading reviews...</div>}>
              <ReviewWidget />
            </Suspense>
          </div>
        </section>
        <BrandStorySection />
      </main>
    </div>
  );
};

export default HomePage;
