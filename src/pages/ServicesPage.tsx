// src/pages/ServicesPage.tsx

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RefreshCcw,
  Zap,
  Code,
  Megaphone,
  Smartphone,
  Search,
  Accessibility,
  BarChart3,
  FileCheck2,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { FlipCardContainer } from "../components/ui/FlipCard";
import { getFlipCardPhases, ApiError } from "../services/api.service";
import { PhaseCard } from "../types/phaseCard";
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
import { PageMeta } from "@/components/PageMeta";

const SERVICES_META = {
  title: "Services",
  description: "Front-end development, performance optimization, and custom React + WordPress builds. BrightPath Web Studio's full service offering and step-by-step project process.",
  path: "/services",
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Website Modernization',
      description: 'Bringing legacy sites into 2026 with modern responsive layouts, improved accessibility, and refreshed visual systems.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Performance Optimization',
      description: 'Lighthouse score lifts, Core Web Vitals improvements, image and asset optimization, and bundle tuning.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Custom Front-End Development',
      description: 'Hand-built React + TypeScript applications and Divi-based WordPress sites with pixel-precise design and scalable architecture.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Social Media Strategy & Content',
      description: 'End-to-end social media content programs including calendars, original photography and video, and multi-platform publishing.',
    },
  ],
};

const SERVICES = [
  {
    title: "Website Modernization",
    description:
      "Bringing legacy sites into 2026 with modern responsive layouts, improved accessibility, and refreshed visual systems. Ideal for sites that look or perform like they were built years ago.",
    icon: RefreshCcw,
  },
  {
    title: "Performance Optimization",
    description:
      "Lighthouse score lifts, Core Web Vitals improvements, image and asset optimization, and bundle tuning. Recent client work moved a Lighthouse mobile score from 26 to 100.",
    icon: Zap,
  },
  {
    title: "Custom Front-End Development",
    description:
      "Hand-built React + TypeScript applications and Divi-based WordPress sites. Pixel-precise designs, smooth animations, and architecture built to scale with your business.",
    icon: Code,
  },
  {
    title: "Social Media Strategy & Content",
    description:
      "End-to-end social media program management — content calendars, original photography and video, posts and reels production, and multi-platform publishing across Facebook, Instagram, LinkedIn, and TikTok.",
    icon: Megaphone,
  },
];

const INCLUDED = [
  { title: "Mobile-First Responsive Design", icon: Smartphone, description: "Every site is designed for the phone first, then scaled up — not the other way around." },
  { title: "Performance Optimization", icon: Zap, description: "Lighthouse-tuned out of the box. Target: 90+ on mobile, with real-world Core Web Vitals in mind." },
  { title: "SEO Foundations", icon: Search, description: "Per-page titles and descriptions, canonical URLs, structured data (JSON-LD), robots.txt, and sitemap.xml." },
  { title: "Accessibility Standards", icon: Accessibility, description: "Semantic HTML, ARIA labeling, keyboard navigation, and WCAG AA color contrast." },
  { title: "Analytics Integration", icon: BarChart3, description: "GA4 wired in, deferred to stay out of the critical render path. Page views and events configured." },
  { title: "Documentation & Handoff", icon: FileCheck2, description: "A clear handoff packet so you (or your team) can take it from here — what's where, how to update content, and what to expect." },
];

const TECH_STACK = [
  "React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion",
  "WordPress", "Divi", "ACF",
  "Cloudinary", "Netlify", "GA4",
  "Figma", "Git / GitHub",
];

const ServicesPage: React.FC = () => {
  const [cards, setCards] = useState<PhaseCard[]>([]);
  const [processLoading, setProcessLoading] = useState(true);
  const [processError, setProcessError] = useState<string | null>(null);
  const [processDetail, setProcessDetail] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // getFlipCardPhases now guarantees an array or throws an ApiError that
        // says which failure it was, so no shape-guard is needed here.
        setCards(await getFlipCardPhases());
      } catch (err) {
        if (err instanceof ApiError) {
          // The dev-proxy case is a local setup issue, not a site fault — name
          // it so it isn't mistaken for a broken endpoint.
          setProcessError(
            err.kind === 'dev-proxy'
              ? 'Process details are unavailable in this dev server.'
              : "Process details couldn't load — but the rest of the page works. Refresh to try again.",
          );
          setProcessDetail(err.detail ?? err.message);
          console.warn(`[phases] ${err.kind}: ${err.message}`, err.detail ?? '');
        } else {
          setProcessError("Process details couldn't load — but the rest of the page works. Refresh to try again.");
          console.warn('[phases] unexpected failure', err);
        }
      } finally {
        setProcessLoading(false);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="services-page">
      <PageMeta {...SERVICES_META} />

      {/* === HERO === */}
      <section className="services-hero">
        <div className="services-hero__media" aria-hidden="true">
          <img
            src="/images/lighthouse-hero-dark.webp"
            alt=""
            width={1717}
            height={916}
            fetchPriority="high"
            decoding="async"
            className="services-hero__img services-hero__img--dark"
          />
          <img
            src="/images/lighthouse-hero-light.webp"
            alt=""
            width={1718}
            height={915}
            decoding="async"
            className="services-hero__img services-hero__img--light"
          />
          <span className="services-hero__scrim" />
        </div>
        <motion.div
          className="services-hero__inner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BrightPathGradientTitle
            as="h1"
            className="services-hero__title font-poppins font-bold mb-6"
            gradientWords={["Perform"]}
            emphasis="solid"
            textColor="text-foreground"
          >
            Services Built to Perform
          </BrightPathGradientTitle>
          <p className="services-hero__lede text-base md:text-lg lg:text-xl font-lato leading-relaxed">
            Front-end development, performance optimization, custom React and WordPress builds,
            and social media strategy — delivered with a focus on craft, clarity, and measurable results.
          </p>
        </motion.div>
      </section>

      {/* === WHAT I BUILD === */}
      <section className="services-section services-atmos services-atmos--build py-20 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4"
              gradientWords={["Build"]}
              emphasis="solid"
            >
              What I Build
            </BrightPathGradientTitle>
            <p className="font-lato services-body max-w-2xl mx-auto">
              Four core service tracks — pick one or combine them for a full launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="services-card p-8">
                  <Icon className="services-card__icon h-10 w-10 mb-4" aria-hidden="true" />
                  <BrightPathGradientTitle
                    as="h3"
                    className="font-poppins font-semibold mb-3 text-xl"
                    emphasis="none"
                  >
                    {service.title}
                  </BrightPathGradientTitle>
                  <p className="font-lato services-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === OUR PROCESS (existing — async-loaded FlipCards) === */}
      <section className="services-section services-atmos services-atmos--process services-rule py-20 md:py-24 px-4">
        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
            <div>
              <BrightPathGradientTitle
                as="h2"
                className="font-bold mb-4"
                gradientWords={["Process"]}
                emphasis="solid"
              >
                Our Process
              </BrightPathGradientTitle>
              <p className="mb-6 services-body">
                Every website I create follows a clear, purposeful path — from the first spark of an idea
                to a seamless, fully launched experience.
              </p>
              <p className="text-sm md:text-lg services-body mb-8">
                A six-phase approach so each project is thoughtfully planned, beautifully designed, and built to perform.
              </p>
              <Link to="/contact" className="studio-cta studio-cta--primary">
                Start Your Project
                <span className="studio-cta__arrow" aria-hidden="true">&#8594;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 min-h-[200px]">
              {processLoading ? (
                <div className="col-span-full text-center services-body py-8">Loading process…</div>
              ) : processError ? (
                <div className="col-span-full text-center py-8" role="status">
                  <p className="services-body">{processError}</p>
                  {processDetail && (
                    <p className="mt-2 text-xs services-body opacity-70 max-w-md mx-auto">{processDetail}</p>
                  )}
                </div>
              ) : (
                <FlipCardContainer cards={cards} />
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* === WHAT'S INCLUDED === */}
      <section className="services-section services-atmos services-atmos--included services-rule py-20 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4"
              gradientWords={["Included"]}
              emphasis="solid"
            >
              What's Included With Every Project
            </BrightPathGradientTitle>
            <p className="font-lato services-body max-w-2xl mx-auto">
              These aren't add-ons — they're the baseline. Every site I build ships with all of them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {INCLUDED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="services-card p-6 pr-8">
                  <div className="flex items-start gap-4">
                    <Icon className="services-card__icon h-6 w-6 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-poppins font-semibold text-sm mb-2 text-foreground">{item.title}</h3>
                      <p className="font-lato text-sm services-body leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === TECH STACK === */}
      <section className="services-section services-section--tonal services-atmos services-atmos--stack services-rule py-20 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4"
            gradientWords={["Stack"]}
            emphasis="solid"
          >
            Tech Stack
          </BrightPathGradientTitle>
          <p className="font-lato services-body mb-10 max-w-2xl mx-auto">
            The tools I reach for day to day. Whatever the right fit is for your project — custom React build or CMS-driven WordPress site — these are the building blocks.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {TECH_STACK.map((tool) => (
              <span
                key={tool}
                className="services-pill px-4 py-2 text-sm md:text-base font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* === MAINTENANCE === */}
      <section id="maintenance" className="services-section services-atmos services-atmos--warm services-rule py-20 md:py-24 px-4 scroll-mt-24">
        <div className="container mx-auto max-w-3xl text-center">
          <Wrench className="services-card__icon h-10 w-10 mx-auto mb-4" aria-hidden="true" />
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4"
            gradientWords={["Maintenance"]}
            emphasis="solid"
          >
            Ongoing Maintenance
          </BrightPathGradientTitle>
          <p className="font-lato services-body mb-10 max-w-2xl mx-auto">
            Modern sites need periodic upkeep — security patches, dependency updates, content swaps.
            BrightPath offers a flat-rate monthly plan so you don't have to think about it.
          </p>

          <div className="services-card p-8 md:p-10 text-left max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-6">
              <h3 className="font-poppins font-bold text-2xl">Monthly Maintenance</h3>
              <div>
                <span className="services-card__icon font-poppins font-bold text-3xl">$100</span>
                <span className="services-body">/month</span>
              </div>
            </div>

            <ul className="space-y-3 font-lato">
              {[
                "Security and dependency updates as they're released",
                "Browser compatibility checks",
                "Up to 1 small content update per month (text, image, or link swaps)",
                "Quick-response support for anything that breaks",
                "Monthly check that analytics is still tracking properly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="services-card__icon h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="font-lato text-sm services-body mt-6">
              Billed on the same day each month. Larger changes (new sections, redesigns) are quoted separately.
            </p>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="services-cta py-24 md:py-28 px-4">
        <div className="services-cta__art" aria-hidden="true" />
        <div className="services-cta__scrim" aria-hidden="true" />
        <div className="services-cta__inner container mx-auto max-w-3xl text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4"
            gradientWords={["project"]}
            emphasis="solid"
            textColor="text-foreground"
          >
            Ready to start a project?
          </BrightPathGradientTitle>
          <p className="font-lato services-body mb-8 max-w-xl mx-auto">
            Tell me what you're building and where you're stuck. I'll get back within 24 hours with next steps.
          </p>
          <Link to="/contact" className="studio-cta studio-cta--primary">
            Get in touch
            <span className="studio-cta__arrow" aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
