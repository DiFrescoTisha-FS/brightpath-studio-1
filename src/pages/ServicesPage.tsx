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
  title: "Web Design & Development Services",
  description: "Websites built around how your business works and what your customers need — from improving the site you have to building something new, with support after launch.",
  path: "/services",
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Website Improvement',
      description: 'Updating outdated or hard-to-use websites so they are easier for customers to use and easier for business owners to manage.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Customer Conversion',
      description: 'Clear messaging and a simpler customer journey that make it easier for visitors to call, book, get in touch, or take the next step.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Custom Website Development',
      description: 'Custom-built websites and functionality for businesses whose needs go beyond an off-the-shelf solution.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Social Media Content & Management',
      description: 'Content planning, creation, and posting that keeps a business consistent on social media without managing it all in-house.',
    },
  ],
};

const SERVICES = [
  {
    title: "Make Your Website Work Better",
    description:
      "Update an outdated or frustrating website so it’s easier for your customers to use—and easier for you to manage.",
    icon: RefreshCcw,
  },
  {
    title: "Turn More Visits Into Action",
    description:
      "Make it easier for customers to call, book, contact you, or take the next step.",
    icon: Zap,
  },
  {
    title: "Build What Your Business Needs",
    description:
      "When an off-the-shelf solution isn’t enough, I’ll build the functionality your business actually needs.",
    icon: Code,
  },
  {
    title: "Social Media That Supports Your Business",
    description:
      "Stay consistent with thoughtful content, planning, and posting without having to manage it all yourself.",
    icon: Megaphone,
  },
];

const INCLUDED = [
  { title: "Works on Every Device", icon: Smartphone, description: "Designed for phones first, so your site is easy to read and use wherever your customers find you." },
  { title: "Fast Loading", icon: Zap, description: "Pages load quickly, so visitors don't give up and leave before they see what you offer." },
  { title: "Search-Friendly Foundations", icon: Search, description: "Each page is set up so search engines can understand your business and help the right customers find you." },
  { title: "Accessible to Everyone", icon: Accessibility, description: "Built so people who use a keyboard, a screen reader, or other assistive tools can use your site too." },
  { title: "Visitor Insights", icon: BarChart3, description: "Analytics set up from day one, so you can see how people find your site and what they do there." },
  { title: "Clear Handoff", icon: FileCheck2, description: "Simple guidance on how your site works and how to update it, so you're never left guessing." },
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
            // React 18 doesn't know the camelCase `fetchPriority` prop and warns on it;
            // the lowercase attribute passes straight through to the DOM. The spread
            // keeps TypeScript (whose React 18 types only declare the camelCase name) happy.
            {...{ fetchpriority: 'high' }}
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
          <p className="studio-hero__eyebrow">BUILT AROUND YOUR BUSINESS</p>
          <BrightPathGradientTitle
            as="h1"
            className="services-hero__title font-poppins font-bold mb-6"
            gradientWords={["Business"]}
            emphasis="solid"
            textColor="text-foreground"
          >
            Web Solutions Built Around Your Business
          </BrightPathGradientTitle>
          <p className="services-hero__lede text-base md:text-lg lg:text-xl font-lato leading-relaxed">
            Every business works a little differently. I take the time to understand yours — how you
            work, who your customers are, and what they need — then build a website that fits.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="studio-cta studio-cta--primary">
              Let&rsquo;s Talk
              <span className="studio-cta__arrow" aria-hidden="true">&#8594;</span>
            </Link>
          </div>
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
              Solutions shaped around what your business actually needs.
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
              <p className="text-sm md:text-lg services-body mb-8">
                Every project follows a clear, collaborative process—from planning and design through launch and support—so you always know where your project stands.
              </p>
              <Link to="/contact" className="studio-cta studio-cta--primary">
                Let&rsquo;s Talk
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
              The essentials, built in.
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
            You don&rsquo;t need to know anything about these tools — that&rsquo;s my job. I choose the right ones for your business, so your website is reliable and easy to keep up to date.
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
            Your website needs a little care after launch to stay secure and up to date. A simple monthly
            plan takes care of it for you, so you can stay focused on running your business.
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
            gradientWords={["talk"]}
            emphasis="solid"
            textColor="text-foreground"
          >
            Not sure what your website needs? Let’s talk.
          </BrightPathGradientTitle>
          <p className="font-lato services-body mb-8 max-w-xl mx-auto">
            That&rsquo;s completely fine. Tell me a little about your business and what&rsquo;s on your mind, and I&rsquo;ll get back to you within one business day with the right next step.
          </p>
          <Link to="/contact" className="studio-cta studio-cta--primary">
            Let&rsquo;s Talk
            <span className="studio-cta__arrow" aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
