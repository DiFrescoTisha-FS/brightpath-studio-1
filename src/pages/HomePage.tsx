import React, { Suspense } from "react";
import { RefreshCcw, Zap, Code } from "lucide-react";
import { useAppStore } from '@/store/appStore';
import { Link } from 'react-router-dom';
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
import { PageMeta } from "@/components/PageMeta";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";

// Lazy load heavy components to reduce critical path
const ReviewWidget = React.lazy(() => import('../components/ReviewWidget'));
const PortfolioSection = React.lazy(() => import('../components/PortfolioSection'));


type SectionProps = {
  theme: 'light' | 'dark';
};

const ServicesSection = ({ theme }: SectionProps) => {
  const services = [
    {
      title: "Website Modernization",
      description:
        "Updating outdated websites with modern responsive layouts, improved accessibility, and enhanced user experience.",
      icon: <RefreshCcw className="h-8 w-8 mb-4 drop-shadow-md text-primary" aria-hidden="true" />,
    },
    {
      title: "Performance Optimization",
      description:
        "Improving site speed, Lighthouse scores, and Core Web Vitals through asset optimization and layout restructuring.",
      icon: <Zap className="h-8 w-8 mb-4 drop-shadow-md text-primary" aria-hidden="true" />,
    },
    {
      title: "Custom Front-End Development",
      description:
        "Building polished web experiences with responsive layouts, custom styling, and performance-focused implementation.",
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

        <p className="font-lato text-muted-foreground mb-12 max-w-2xl mx-auto">
          Transforming outdated websites into modern, high-performing digital experiences.
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
          In a crowded online world, clarity is everything. Like a lighthouse on
          a rocky coast, BrightPath provides unwavering guidance. We cut through
          the complexity with clear strategy and brilliant design, ensuring your
          business safely reaches its destination and shines for all to see.
        </p>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
          <span className="text-primary font-lato font-bold">
            Illuminating Success
          </span>
        </div>
        <Link to="/reviews">
          <button className="mt-8 bg-primary text-primary-foreground font-bold font-lato py-2 px-6 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-shadow-md">
            Read Our Reviews
          </button>
        </Link>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  const theme = useAppStore(state => state.theme);

  return (
    <div className="min-h-screen">
      <PageMeta
        title="BrightPath Web Studio — Front-End Developer & Web Designer"
        description="Portfolio of Tisha Di Fresco — front-end developer and designer building modern, responsive, high-performance websites in React and WordPress."
        path="/"
      />
      {/* ClarityHero is rendered statically into index.html by the
          brightpath-inject-static-hero Vite plugin so the LCP text paints
          before React boots. <main> starts at ServicesSection. */}
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
