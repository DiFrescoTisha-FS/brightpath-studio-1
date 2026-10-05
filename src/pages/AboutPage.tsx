import { motion, useScroll, useTransform, useMotionTemplate, type TargetAndTransition } from "framer-motion";
import { IS_PRERENDER } from "@/utils/isPrerender";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
import { PageMeta } from "@/components/PageMeta";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Github,
  Linkedin,
  MessageCircle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Starting state for a scroll-triggered entrance animation.
 *
 * Every section below reveals itself with `whileInView`, which only fires once
 * the element is scrolled into view. That is fine for visitors but invisible to
 * anything that doesn't scroll, so the prerendered HTML was emitting most of
 * this page's text at `opacity: 0`. During the snapshot we return `false`,
 * which tells Framer Motion to skip the hidden starting state and render the
 * element settled and visible. Real visitors get the original value, so the
 * animations and their timing are completely unchanged.
 */
const revealFrom = (hidden: TargetAndTransition) => (IS_PRERENDER ? false : hidden);

const GITHUB_URL = "https://github.com/DiFrescoTisha-FS";
const LINKEDIN_URL = "https://linkedin.com/in/tisha-di-fresco-b8aba6309";

/**
 * Résumé link for the professional-links row at the foot of the page.
 *
 * Deliberately unset. The PDF in public/assets (Tisha-DiFresco-Resume.pdf)
 * predates the current positioning — it is headed "WordPress Developer" and
 * leads with Divi — so it isn't linked. Drop the updated file into
 * public/assets and set this to its path (e.g. "/assets/Tisha-DiFresco-Resume.pdf");
 * the link appears automatically.
 */
const RESUME_URL: string | null = null;

const PROFESSIONAL_LINKS: Array<{ label: string; href: string; icon: LucideIcon }> = [
  ...(RESUME_URL ? [{ label: "Résumé", href: RESUME_URL, icon: FileText }] : []),
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: Linkedin },
];

// Every entry is backed by shipped project work (case studies, this site's own
// codebase) or the existing skills list. Add only what a project demonstrates.
const SKILL_GROUPS = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Vite"],
  },
  {
    title: "Application Development",
    skills: [
      "API Integration",
      "Authentication & Role-Based Access",
      "State Management (Zustand)",
      "Supabase",
      "Firebase",
      "Node.js / Express",
      "MongoDB",
      "Netlify Functions",
    ],
  },
  {
    title: "CMS & Platforms",
    skills: ["WordPress", "Headless WordPress", "ACF", "Netlify", "Cloudinary"],
  },
  {
    title: "Quality & Delivery",
    skills: [
      "Performance Optimization",
      "Core Web Vitals",
      "Lighthouse",
      "Accessibility",
      "Responsive Design",
      "SEO & Structured Data",
      "GA4",
      "Git & GitHub",
      "Figma",
    ],
  },
];

const SELECTED_WORK = [
  {
    title: "AweStruck Intelligence",
    label: "Custom React + TypeScript Build",
    description:
      "A custom site for a Biblically-centered SEL curriculum, built from scratch in React and TypeScript. It features an interactive, audio-driven AMP wheel and video walkthroughs, on a performance-first architecture that keeps heavy scroll animation fast on mobile.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    href: "/portfolio/awestruck-intelligence",
  },
  {
    title: "Dale Tiffany Retailer Portal & CRM",
    label: "Legacy Platform Modernization",
    description:
      "Rebuilt a 20-year-old PHP platform as a modern React and TypeScript system. Retailers sign in to a secure B2B portal for wholesale ordering, with role-based access giving retailers and admins different tools, and the team runs leads and its sales pipeline in an integrated CRM.",
    stack: ["React", "TypeScript", "Supabase", "Zustand", "Tailwind CSS"],
    // Stopgap: the web/B2B case study has no dedicated route yet, so this
    // opens it on the portfolio page — the same link the homepage uses.
    href: "/portfolio?project=dale-tiffany",
  },
];

const VALUES = [
  {
    title: "Business First",
    description: "Before I design or write any code, I learn how your business works, who your customers are, and what you need your website to do. The build follows from that, not from a template.",
    icon: Briefcase,
  },
  {
    title: "Clear Communication",
    description: "No jargon, no disappearing acts. I keep you informed at every step with regular updates, quick responses, and explanations that actually make sense.",
    icon: MessageCircle,
  },
  {
    title: "True Collaboration",
    description: "Your input matters throughout the process. I see every project as a partnership where your feedback shapes the final result.",
    icon: Users,
  },
  {
    title: "Built to Last",
    description: "Clean, well-structured code, fast load times and accessibility built in from the start, so your site keeps working well long after launch.",
    icon: ShieldCheck,
  },
];

const AboutPage = () => {
  // Fetch theme internally via the custom hook
  const { theme } = useTheme();

  // Detect mobile for conditional grayscale effect
  // Default to true (mobile) so phone users see color immediately on first paint
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return true; // Default to mobile (no grayscale) for SSR
  });
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-based grayscale transition for hero (desktop only)
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Map scroll progress (0-0.5) to grayscale (100%-0%)
  const grayscale = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  // Create reactive filter string for Framer Motion
  const grayscaleFilter = useMotionTemplate`grayscale(${grayscale}%)`;

  const timelineEvents = [
    {
      title: "Where It Started",
      description:
        "I earned my Bachelor of Science in Web Development from Full Sail University in June 2024, graduating as class valedictorian with the Advanced Achievement Award and two Director's Awards.",
      imageUrl: "/images/boysandme.webp",
    },
    {
      title: "The Lighthouse That Started It All",
      description:
        "At my graduation, one of my instructors gifted me a lighthouse, symbolizing guidance, resilience, and perseverance. It was a reminder that even in the darkest times, we can find our way forward. This symbol became the foundation for BrightPath Web Studio LLC, inspiring me to help businesses navigate the digital world with confidence and clarity.",
      imageUrl: cloudinaryAssets.lighthouseGift,
    },
    {
      title: "Building for Real Businesses",
      description:
        "Since graduating, I've been building production work through BrightPath and contract work: marketing sites, custom React applications, and business systems with authentication, role-based access and real data behind them. It's work that has to hold up after launch, not just on launch day.",
      imageUrl: "/images/brightpath-hero-image.webp",
    },
    {
      title: "How I Approach Every Project",
      description:
        "Start with the business: who its customers are, what they need to do, and where the website can help. Then build what solves it well, with clean, component-based code that's fast, accessible and easy to maintain.",
      imageUrl: "/images/brightpath-logo-dark.png",
    },
  ];

  const cardSurface =
    theme === 'dark'
      ? 'bg-[#1A2238] border border-primary/20 shadow-glow-primary'
      : 'bg-white border border-primary/50 shadow-xl';

  return (
    <div className="min-h-screen overflow-x-hidden">
      <PageMeta
        title="About Tisha Di Fresco"
        description="Tisha Di Fresco, founder and frontend engineer at BrightPath Web Studio, builds websites and React + TypeScript applications around how each business works."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Tisha Di Fresco',
          jobTitle: 'Founder & Frontend Engineer',
          worksFor: {
            '@type': 'ProfessionalService',
            name: 'BrightPath Web Studio',
            url: 'https://brightpathwebstudio.org',
          },
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Full Sail University',
          },
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: 'Bachelor of Science in Web Development',
            recognizedBy: {
              '@type': 'CollegeOrUniversity',
              name: 'Full Sail University',
            },
          },
          award: [
            'Class Valedictorian, Full Sail University',
            'Advanced Achievement Award, Full Sail University',
            "Two Director's Awards, Full Sail University",
          ],
          knowsAbout: [
            'React',
            'TypeScript',
            'JavaScript',
            'Frontend Development',
            'Web Application Development',
            'API Integration',
            'Authentication and Access Control',
            'State Management',
            'Web Performance',
            'Accessibility',
            'Responsive Design',
            'WordPress',
          ],
          sameAs: [GITHUB_URL, LINKEDIN_URL],
          url: 'https://brightpathwebstudio.org/about',
        }}
      />
      {/* --- HERO SECTION --- */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center p-4 sm:p-8 pt-28 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/Mountains.jpeg')",
          // Grayscale scroll effect only on desktop; mobile shows full color
          ...(isMobile ? {} : { filter: grayscaleFilter }),
        }}
        whileHover={isMobile ? undefined : { filter: "grayscale(0%)" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        {/* Copy protection — a soft gradient behind the text only. Styled by
            `.about-hero__scrim` in globals.css. */}
        <div aria-hidden="true" className="about-hero__scrim absolute inset-0 pointer-events-none" />

        {/* Bottom fade gradient to blend into timeline section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #1A2238 100%)',
          }}
        />

        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-0">
          {/* Left Column: Text Content */}
          <div className="text-white text-center md:text-left">
            <p className="font-lato text-sm md:text-lg mb-2 tracking-wider text-shadow-md">ABOUT ME</p>
            <h1 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-primary drop-shadow-lg text-shadow-md">
              TISHA <span className="whitespace-nowrap">DI FRESCO</span>
            </h1>
            <p className="font-poppins font-semibold text-base md:text-xl lg:text-2xl mb-4 md:mb-6 text-shadow-md">
              Founder &amp; Frontend Engineer, BrightPath Web Studio
            </p>
            <p className="font-lato text-sm md:text-lg mb-6 md:mb-8 leading-normal md:leading-relaxed text-shadow-md">
              I build websites and web applications around how a business actually works:
              who its customers are, what they need to do, and what's getting in the way.
              Most of that work happens in React and TypeScript, and every project starts
              with understanding the business first.
            </p>
            {/* Styled by `.about-hero__cta` in globals.css — filled, not
                outlined, because these sit on the photograph in both themes. */}
            <div className="about-hero__cta flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3">
              <Link to="/contact" className="studio-cta studio-cta--primary">
                Let’s Talk <span className="studio-cta__arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/portfolio" className="studio-cta studio-cta--ghost">
                View My Work <span className="studio-cta__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Arched Image
              Deliberately not animated. This is the LCP element, and any
              entrance animation delays it twice over: the prerendered
              snapshot bakes in the animation's `initial` state (opacity 0),
              and React then replays the fade after it boots — so the portrait
              could not appear until well after its bytes had arrived. */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/images/my-profile.webp"
                alt="Portrait of Tisha Di Fresco"
                className="max-w-sm md:max-w-md w-full rounded-t-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- TIMELINE SECTION --- */}
      <motion.section
        id="story"
        className="relative py-12 md:py-20 px-4 md:px-8 min-h-screen flex flex-col justify-center bg-cover bg-center md:bg-fixed"
        style={{
          // This remains correct based on your initial intention for the timeline background
          backgroundImage: theme === 'light'
            ? 'var(--timeline-bg-light)'
            : 'var(--timeline-bg-dark)',
        }}
      >
        {/* Top fade gradient to blend from hero section */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to bottom, #1A2238, transparent)',
          }}
        />

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-midnight/60 z-10"></div>

        {/* Vertical Timeline Line (Desktop only - hidden on mobile) */}
        <div
          className="hidden md:block absolute left-1/2 w-2
            top-72 h-[calc(100%-18rem)]
            bg-gradient-to-b
            from-primary
            via-primary
            to-transparent
            transform -translate-x-1/2 z-10"
        ></div>

        <div className="container mx-auto space-y-4 relative z-20">
          {/* H2 Title with Theme Awareness */}

          <BrightPathGradientTitle as="h2" className="font-extrabold text-center mb-8 md:mb-12 pt-0 font-poppins text-2xl md:text-3xl lg:text-4xl" gradientWords={["Journey"]}
          >My Journey
          </BrightPathGradientTitle>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={revealFrom({ opacity: 0, x: index % 2 === 0 ? -100 : 100 })}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex items-center w-full ${index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
            >
              {/* Timeline dot (Desktop only - hidden on mobile) */}
              <div
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brightpath-blue rounded-full border-4 border-white shadow-lg z-30"
                style={{ top: "280px" }}
              ></div>

              <div
                className={`w-full md:w-5/12 ${index % 2 === 0
                    ? "pr-0 md:pr-16 text-center md:text-right"
                    : "pl-0 md:pl-16 text-center md:text-left"
                  }`}
              >
                <motion.div
                  className="shadow-2xl overflow-hidden
                             relative flex flex-col items-center"
                  style={{
                    background: `linear-gradient(#1A2238, #1A2238) padding-box,
                                 linear-gradient(to right, #F2C94C, #1A2238, #F2C94C) border-box`,
                    border: "2px solid transparent",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 0 40px rgba(242, 201, 76, 0.6), 0 0 15px rgba(242, 201, 76, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Image */}
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-32 pt-4 rounded-t-xl object-cover"
                  />

                  <div className="p-4 md:p-8 text-[#F2C94C] text-center">
                    <BrightPathGradientTitle as="h3" className="font-poppins text-lg md:text-xl lg:text-2xl font-bold mb-3 gradient-text-dark drop-shadow-lg">
                      {event.title}
                    </BrightPathGradientTitle>
                    <p className="font-lato text-sm md:text-base text-white leading-normal md:leading-[1.6em]">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- SELECTED WORK SECTION --- */}
      <motion.section
        className={`py-12 md:py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1A2238]'}`}
        initial={revealFrom({ opacity: 0, y: 50 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl"
              gradientWords={["Work"]}
            >
              Selected Work
            </BrightPathGradientTitle>
            <p className="font-lato text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-normal md:leading-relaxed">
              A closer look at two recent builds. The full case studies, and more projects, are in the portfolio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {SELECTED_WORK.map((project, index) => (
              <motion.article
                key={project.title}
                className={`flex flex-col p-5 md:p-6 rounded-lg ${cardSurface}`}
                initial={revealFrom({ opacity: 0, y: 30 })}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="font-poppins text-xs md:text-sm font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                  {project.label}
                </p>
                <h3 className="font-poppins font-semibold text-lg md:text-xl mb-3 text-foreground">
                  {project.title}
                </h3>
                <p className="font-lato text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>
                <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium border border-primary/40 text-foreground ${
                        theme === 'dark' ? 'bg-[#273442]' : 'bg-gray-50'
                      }`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link
                  to={project.href}
                  className="mt-auto inline-flex items-center gap-2 self-start rounded-sm font-poppins font-semibold text-sm md:text-base text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  View case study<span className="sr-only">: {project.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- VALUES SECTION --- */}
      <motion.section
        className={`py-12 md:py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-200' : 'bg-[#273442]'}`}
        initial={revealFrom({ opacity: 0, y: 50 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl"
              gradientWords={["Me"]}
            >
              Why Work With Me
            </BrightPathGradientTitle>
            <p className="font-lato text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-normal md:leading-relaxed">
              Good websites start with understanding the business behind them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className={`p-5 md:p-6 rounded-lg ${cardSurface}`}
                  initial={revealFrom({ opacity: 0, y: 30 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-poppins font-semibold text-base md:text-lg mb-2 text-foreground">
                        {value.title}
                      </h3>
                      <p className="font-lato text-sm md:text-base text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* --- SKILLS SECTION --- */}
      <motion.section
        className={`py-12 md:py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1A2238]'}`}
        initial={revealFrom({ opacity: 0, y: 50 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <BrightPathGradientTitle
              as="h2"
              className="font-poppins font-bold mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl"
              gradientWords={["Expertise"]}
            >
              Skills & Expertise
            </BrightPathGradientTitle>
            <p className="font-lato text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-normal md:leading-relaxed">
              The technologies behind the work. You don't need to know any of them, but they're why the sites I build are fast, reliable and ready to grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="font-poppins font-semibold text-sm md:text-base uppercase tracking-[0.12em] text-foreground mb-3 md:mb-4">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2 md:gap-3">
                  {group.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-primary/40 hover:border-primary transition-colors text-foreground ${
                        theme === 'dark' ? 'bg-[#273442]' : 'bg-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- CTA SECTION --- */}
      <motion.section
        className={`py-12 md:py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-200' : 'bg-[#273442]'}`}
        initial={revealFrom({ opacity: 0, y: 50 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4 md:mb-6 leading-tight text-2xl md:text-3xl lg:text-4xl"
            gradientWords={["Project"]}
          >
            Have a Project in Mind?
          </BrightPathGradientTitle>
          <p className="font-lato text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 leading-normal md:leading-relaxed">
            Tell me about your business and what you need your website to do.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md bg-primary text-primary-foreground font-bold font-lato py-2 px-6 md:py-3 md:px-8 text-sm md:text-lg shadow-lg transition-all hover:brightness-[0.88] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Let’s Talk
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md border border-primary text-foreground font-bold font-lato py-2 px-6 md:py-3 md:px-8 text-sm md:text-lg transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore My Portfolio
            </Link>
          </div>

          <nav aria-label="Professional profiles" className="mt-10 md:mt-12 pt-6 border-t border-primary/25 max-w-sm mx-auto">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {PROFESSIONAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm font-lato text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
