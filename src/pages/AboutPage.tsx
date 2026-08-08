import { motion, useScroll, useTransform, useMotionTemplate, type TargetAndTransition } from "framer-motion";
import { IS_PRERENDER } from "@/utils/isPrerender";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
import BrightPathGradientButton from "@/components/BrightPathGradientButton.legacy";
import { PageMeta } from "@/components/PageMeta";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { Heart, MessageCircle, Users, Sparkles } from "lucide-react";

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

const SKILLS = [
  // Frontend
  "React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3",
  // CMS & WordPress
  "WordPress", "Divi", "ACF",
  // Tools & Services
  "Cloudinary", "Netlify", "Git", "GitHub", "Figma",
  // Specializations
  "Performance Optimization", "Lighthouse", "Core Web Vitals", "Responsive Design", "Accessibility", "SEO", "GA4",
];

const VALUES = [
  {
    title: "Vision-Driven",
    description: "I take time to deeply understand your business goals and brand identity. Your website should be an authentic extension of your vision, not a generic template.",
    icon: Heart,
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
    title: "Craft & Quality",
    description: "Every detail counts — from pixel-perfect designs to optimized performance. I build sites that look great and work flawlessly.",
    icon: Sparkles,
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
      title: "A Journey of Dedication and Achievement",
      description:
        "Graduating from Full Sail University was a defining moment in my journey. Combining creativity with technology led me to web development, and my dedication to the craft earned me the honor of class valedictorian.",
      imageUrl: "/images/boysandme.webp",
      highlightColor: "#F2C94C",
    },
    {
      title: "The Lighthouse That Started It All",
      description:
        "At my graduation, one of my instructors gifted me a lighthouse, symbolizing guidance, resilience, and perseverance. It was a reminder that even in the darkest times, we can find our way forward. This symbol became the foundation for BrightPath Web Studio LLC, inspiring me to help businesses navigate the digital world with confidence and clarity.",
      imageUrl: cloudinaryAssets.lighthouseGift,
      highlightColor: "#F2C94C",
    },
    {
      title: "My Approach",
      description:
        "I believe in thoughtful design, seamless functionality, and strategic branding. A website should do more than just exist—it should engage, inspire, and convert.",
      imageUrl: "/images/brightpath-logo-dark.png",
      highlightColor: "#F2C94C",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <PageMeta
        title="About"
        description="Meet Tisha Di Fresco — Full Sail valedictorian, front-end developer, and founder of BrightPath Web Studio. Her journey from creativity to code, and the story behind the studio."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Tisha Di Fresco',
          jobTitle: 'Front-End Developer & Web Designer',
          worksFor: {
            '@type': 'ProfessionalService',
            name: 'BrightPath Web Studio',
            url: 'https://brightpathwebstudio.org',
          },
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Full Sail University',
          },
          knowsAbout: ['React', 'TypeScript', 'WordPress', 'Divi', 'Web Performance', 'Responsive Design'],
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
            <h1 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-primary drop-shadow-lg text-shadow-md">
              TISHA <span className="whitespace-nowrap">DI FRESCO</span>
            </h1>
            <p className="font-lato text-sm md:text-xl mb-6 md:mb-8 leading-normal md:leading-relaxed text-shadow-md">
              Like the mountains that shape my home, my journey in web
              development and design is built on strong foundations and endless
              creativity.
            </p>
            <motion.button
              onClick={() => {
                document.getElementById('story')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className="bg-primary text-white font-bold font-lato py-2 px-6 md:py-3 md:px-8 rounded-md text-sm md:text-lg hover:bg-yellow-400 transition-colors shadow-lg text-shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read My Story
            </motion.button>

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
          >My Digital Journey Timeline
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

      {/* --- SKILLS SECTION --- */}
      <motion.section
        className={`py-12 md:py-20 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-100' : 'bg-[#1A2238]'}`}
        initial={revealFrom({ opacity: 0, y: 50 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-poppins font-bold mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl"
            gradientWords={["Expertise"]}
          >
            Skills & Expertise
          </BrightPathGradientTitle>
          <p className="font-lato text-muted-foreground text-sm md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto leading-normal md:leading-relaxed">
            The tools and technologies I use to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {SKILLS.map((skill) => (
              <motion.span
                key={skill}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-primary/40 ${
                  theme === 'dark' ? 'bg-[#273442] text-foreground' : 'bg-white text-foreground'
                }`}
                whileHover={{ scale: 1.05, borderColor: 'rgba(242, 201, 76, 0.8)' }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
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
              More than just code — it's about building something meaningful together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className={`p-5 md:p-6 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-[#1A2238] border border-primary/20 shadow-glow-primary'
                      : 'bg-white border border-primary/50 shadow-xl'
                  }`}
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
            gradientWords={["Action"]}
          >
            Ready to See My Work in Action?
          </BrightPathGradientTitle>
          <p className="font-lato text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 leading-normal md:leading-relaxed">
            From concept to completion, every project tells a story. Explore my portfolio to see how I've helped businesses shine online.
          </p>
          {/* The <button> here is presentational — the <Link> is the real
              control. Left focusable it produced two tab stops and two
              announcements ("link Explore My Portfolio", then "button Explore
              My Portfolio") for one action, so it's removed from the tab order
              and the accessibility tree. The Link carries the accessible name. */}
          <Link to="/portfolio" aria-label="Explore My Portfolio">
            <BrightPathGradientButton
              tabIndex={-1}
              aria-hidden
              className="bg-primary text-primary-foreground font-bold font-lato py-2 px-6 md:py-3 md:px-8 rounded-md text-sm md:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore My Portfolio
            </BrightPathGradientButton>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
