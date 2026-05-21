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
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { FlipCardContainer } from "../components/ui/FlipCard";
import { getFlipCardPhases } from "../services/api.service";
import { PhaseCard } from "../types/phaseCard";
import { useAppStore } from '@/store/appStore';
import BrightPathGradientButton from "@/components/BrightPathGradientButton.legacy";
import { BrightPathGradientTitle } from "@/components/portfolio";
import { PageMeta } from "@/components/PageMeta";

const SERVICES_META = {
  title: "Services",
  description: "Front-end development, performance optimization, and custom React + WordPress builds. BrightPath Web Studio's full service offering and step-by-step project process.",
  path: "/services",
};

// Lighthouse parallax background applied to hero, process, and CTA sections.
const LIGHTHOUSE_BG_STYLE: React.CSSProperties = {
  backgroundImage: "url('/images/BG-Lighthouse-Desktop.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
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
  const { theme } = useAppStore();
  const [cards, setCards] = useState<PhaseCard[]>([]);
  const [processLoading, setProcessLoading] = useState(true);
  const [processError, setProcessError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getFlipCardPhases();
        // Defensive normalize — the phases endpoint can return a non-array
        // (e.g. a WP error envelope object) with a 200 status. Without this
        // guard, FlipCardContainer's `cards.map(...)` crashes the section.
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          console.warn('Phases endpoint returned non-array response:', data);
          setProcessError("Process data isn't available right now");
        }
      } catch (err) {
        setProcessError(err instanceof Error ? err.message : "Couldn't load process data");
      } finally {
        setProcessLoading(false);
      }
    };
    fetchCards();
  }, []);

  const tintedSectionBg = theme === 'dark' ? 'bg-[#273442]' : 'bg-gray-100';
  const cardBg = theme === 'dark'
    ? 'bg-[#1A2238] border border-primary/20 shadow-glow-primary'
    : 'bg-white border border-primary/50 shadow-xl';

  return (
    <>
      <PageMeta {...SERVICES_META} />

      {/* === HERO === */}
      <section
        className="relative min-h-[55vh] flex items-center justify-center px-4 pt-36 pb-20 overflow-hidden"
        style={LIGHTHOUSE_BG_STYLE}
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <motion.div
          className="relative z-10 container mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BrightPathGradientTitle
            as="h1"
            className="font-poppins font-bold mb-6 text-white"
            gradientWords={["Services", "Perform"]}
            textColor="text-white"
          >
            Services Built to Perform
          </BrightPathGradientTitle>
          <p className="text-base md:text-lg lg:text-xl text-white/90 font-lato max-w-2xl mx-auto leading-relaxed text-shadow-md">
            Front-end development, performance optimization, custom React and WordPress builds,
            and social media strategy — delivered with a focus on craft, clarity, and measurable results.
          </p>
        </motion.div>
      </section>

      {/* === WHAT I BUILD === */}
      <section className={`py-20 px-4 ${tintedSectionBg}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4"
              gradientWords={["Build"]}
            >
              What I Build
            </BrightPathGradientTitle>
            <p className="font-lato text-muted-foreground max-w-2xl mx-auto">
              Four core service tracks — pick one or combine them for a full launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className={`p-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${cardBg}`}>
                  <Icon className="h-10 w-10 mb-4 text-primary drop-shadow-md" aria-hidden="true" />
                  <BrightPathGradientTitle
                    as="h3"
                    className="font-poppins font-semibold mb-3 text-xl"
                    gradientWords={["Modernization", "Optimization", "Development", "Content"]}
                  >
                    {service.title}
                  </BrightPathGradientTitle>
                  <p className="font-lato text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === OUR PROCESS (existing — async-loaded FlipCards) === */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={LIGHTHOUSE_BG_STYLE}
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <motion.div
          className="relative z-10 container mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
            <div className="text-white">
              <BrightPathGradientTitle
                as="h2"
                className="font-bold mb-4"
                gradientWords={["Process"]}
                textColor="text-white"
              >
                Our Process
              </BrightPathGradientTitle>
              <p className="mb-6 text-shadow-md">
                Every website I create follows a clear, purposeful path — from the first spark of an idea
                to a seamless, fully launched experience.
              </p>
              <p className="text-sm md:text-lg text-shadow-md mb-8">
                A six-phase approach so each project is thoughtfully planned, beautifully designed, and built to perform.
              </p>
              <Link to="/contact">
                <BrightPathGradientButton className="text-muted-foreground text-shadow-md font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors">
                  Start Your Project
                </BrightPathGradientButton>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 min-h-[200px]">
              {processLoading ? (
                <div className="col-span-full text-center text-white/80 py-8">Loading process…</div>
              ) : processError ? (
                <div className="col-span-full text-center text-red-300 py-8">
                  Process details couldn't load — but the rest of the page works. Refresh to try again.
                </div>
              ) : (
                <FlipCardContainer cards={cards} />
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* === WHAT'S INCLUDED === */}
      <section className={`py-20 px-4 ${tintedSectionBg}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4"
              gradientWords={["Included"]}
            >
              What's Included With Every Project
            </BrightPathGradientTitle>
            <p className="font-lato text-muted-foreground max-w-2xl mx-auto">
              These aren't add-ons — they're the baseline. Every site I build ships with all of them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUDED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`p-6 rounded-lg ${cardBg}`}>
                  <div className="flex items-start gap-4">
                    <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-poppins font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="font-lato text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === TECH STACK === */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4"
            gradientWords={["Stack"]}
          >
            Tech Stack
          </BrightPathGradientTitle>
          <p className="font-lato text-muted-foreground mb-10 max-w-2xl mx-auto">
            The tools I reach for day to day. Whatever the right fit is for your project — custom React build or CMS-driven WordPress site — these are the building blocks.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {TECH_STACK.map((tool) => (
              <span
                key={tool}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium border border-primary/40 ${theme === 'dark' ? 'bg-[#1A2238] text-foreground' : 'bg-white text-foreground'}`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* === MAINTENANCE === */}
      <section className={`py-20 px-4 ${tintedSectionBg}`}>
        <div className="container mx-auto max-w-3xl text-center">
          <Wrench className="h-10 w-10 mx-auto mb-4 text-primary" aria-hidden="true" />
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4"
            gradientWords={["Maintenance"]}
          >
            Ongoing Maintenance
          </BrightPathGradientTitle>
          <p className="font-lato text-muted-foreground mb-10 max-w-2xl mx-auto">
            Modern sites need periodic upkeep — security patches, dependency updates, content swaps.
            BrightPath offers a flat-rate monthly plan so you don't have to think about it.
          </p>

          <div className={`p-8 md:p-10 rounded-lg ${cardBg} text-left max-w-2xl mx-auto`}>
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-6">
              <h3 className="font-poppins font-bold text-2xl">Monthly Maintenance</h3>
              <div>
                <span className="font-poppins font-bold text-3xl text-primary">$100</span>
                <span className="text-muted-foreground">/month</span>
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
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="font-lato text-sm text-muted-foreground mt-6">
              Billed on the same day each month. Larger changes (new sections, redesigns) are quoted separately.
            </p>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={LIGHTHOUSE_BG_STYLE}
      >
        <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
        <div className="relative z-10 container mx-auto max-w-3xl text-center text-white">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4 text-white"
            gradientWords={["project"]}
            textColor="text-white"
          >
            Ready to start a project?
          </BrightPathGradientTitle>
          <p className="font-lato text-white/90 text-shadow-md mb-8 max-w-xl mx-auto">
            Tell me what you're building and where you're stuck. I'll get back within 24 hours with next steps.
          </p>
          <Link to="/contact" className="inline-block">
            <BrightPathGradientButton className="inline-flex items-center gap-2 text-shadow-md font-bold py-3 px-8 rounded-md hover:bg-yellow-400 transition-colors">
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </BrightPathGradientButton>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
