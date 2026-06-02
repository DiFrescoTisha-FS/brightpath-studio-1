import type { WebProjectCaseStudy } from '@/types/caseStudy';
import { cloudinaryAssets } from '@/data/cloudinaryAssets';

export const awestruckIntelligenceCaseStudy: WebProjectCaseStudy = {
  id: 'awestruck-intelligence',
  slug: 'awestruck-intelligence',
  type: 'web',
  title: 'AweStruck Intelligence',
  subtitle: 'A custom React build for a Biblically-centered SEL curriculum — Lighthouse mobile 26 → 100.',
  client: 'Robin Walsh — AweStruck Intelligence',
  industry: 'Education / Faith-based Curriculum',
  category: 'Custom Web Application',
  badge: 'CUSTOM REACT BUILD',
  liveUrl: 'https://iamawestruck.com',
  description:
    'A custom React + TypeScript site for AweStruck Intelligence — a Biblically-centered Social and Emotional Learning (SEL) framework. Designed and engineered from scratch with a performance-first architecture that took Lighthouse mobile from 26 to 100.',
  featuredImage: cloudinaryAssets.awestruckCardHeroFull,
  hoverImage: '/images/case-studies/awestruck/jjarm.png',
  heroImage: '/images/case-studies/awestruck/case-study-hero.png',
  tags: ['React', 'TypeScript', 'Vite', 'Performance', 'Custom Build'],

  overview:
    'AweStruck Intelligence needed a public-facing home for a brand-new Biblically-centered SEL curriculum. The site had to feel space-themed and cinematic, host interactive content (an audio-driven Biblically-centered SEL wheel — the AMP wheel — video walkthroughs, decision-tree cards), and perform well despite heavy use of scroll animations throughout the homepage.',

  goals: [
    'Tell the story of a Biblically-centered SEL framework with a custom, on-brand visual system',
    'Support interactive content: audio playback per pillar, video walkthroughs, decision cards',
    'Hit production-grade performance despite heavy scroll animations throughout the homepage',
    'Stay maintainable for a solo developer post-handoff',
  ],

  deliverables: [
    { title: 'Custom React + TypeScript build', description: 'Vite-powered, no CMS, full design control' },
    { title: 'Performance architecture', description: 'Static Hero injection, viewport lazy-loading, deferred analytics' },
    { title: 'Interactive AMP wheel', description: 'Six clickable pillars with responsive hotspot positioning and per-pillar audio' },
    { title: 'Cloudinary asset pipeline', description: 'Auto-format, auto-quality, delivery widths tuned to displayed size' },
    { title: 'Netlify deploy + Forms integration', description: 'Contact modal wired to Netlify Forms with spam honeypot' },
    { title: 'SEO + analytics', description: 'JSON-LD structured data, sitemap, robots, GA4 deferred load' },
  ],

  process: [
    { step: 1, title: 'Discovery', description: 'Mapped the SEL framework to a section-by-section narrative arc with Robin' },
    { step: 2, title: 'Design system', description: 'Space-themed visual language with unified purple glassmorphism cards and teal accent glow' },
    { step: 3, title: 'Build', description: 'Section-first React build with Tailwind and Framer Motion scroll animations' },
    { step: 4, title: 'Performance overhaul', description: 'Lighthouse mobile 26 → 100 through static Hero injection, lazy loading, and deferred analytics' },
    { step: 5, title: 'Launch + handoff', description: 'Netlify deploy, domain consolidation, GA4 wiring, handoff docs' },
  ],

  results: [
    'Lighthouse mobile 26 → 100',
    'LCP 2.7s, TBT 10ms, CLS 0 on emulated Moto G Power',
    'SEO 100, Accessibility 100, Best Practices 100',
    'Live at iamawestruck.com with 301 from awestruckintelligence.com',
  ],

  techStack: [
    'React 18',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Framer Motion',
    'Cloudinary',
    'Netlify',
    'Netlify Forms',
    'GA4',
  ],

  techStackPills: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Cloudinary', 'Netlify'],

  projectSnapshot: {
    metadata: [
      { label: 'Client', value: 'Robin Walsh — AweStruck Intelligence' },
      { label: 'Project Type', value: 'Custom Web App + Performance Architecture' },
      { label: 'Platform', value: 'React 18 + TypeScript + Vite' },
      { label: 'My Role', value: 'Designer, Developer, Performance Engineer' },
    ],
    achievements: [
      'Built a custom React + TypeScript site from scratch — no CMS, no template',
      'Lifted Lighthouse mobile from 26 → 100 through a five-part performance architecture',
      'Wrote a custom Vite plugin to inject the Hero as static HTML at build time for LCP wins',
      'Implemented viewport-based section lazy-loading via IntersectionObserver',
      'Built an interactive Biblically-centered SEL wheel (AMP wheel) with responsive hotspots and per-pillar audio playback',
      'Set up domain consolidation, structured data, GA4, and Netlify Forms contact integration',
    ],
  },

  challenge: [
    'Robin had the first domain of her Biblically-centered SEL curriculum — Josiah\'s Journey — ready to share, but no website to host it. She needed a public-facing site that felt distinctive — not a template — and could carry interactive content like the audio-driven AMP wheel, video walkthroughs, and decision-tree cards.',
    'The primary audience is homeschool moms browsing on laptops and desktops, but the animation-heavy homepage pushed performance to its limits. The first build came in at a Lighthouse mobile score of 26 — unacceptable for the launch target.',
  ],

  approach: [
    'I built the site as a custom React + TypeScript application on Vite, with Tailwind for styling and Framer Motion for scroll animations. No CMS, no page builder — every section is hand-built so the visual language stays on-brand and the bundle stays lean.',
    'Cloudinary handles all images and audio with automatic format and quality. Delivery widths are tuned per breakpoint so we never ship a 1920px image to a 380px viewport.',
    'When performance became the bottleneck, I rebuilt the loading architecture from the ground up — static Hero injection, viewport-based lazy loading, deferred analytics, and path-based bundle splitting. The result was a 3.8× Lighthouse score lift on mobile.',
  ],

  engineeringHighlights: [
    {
      title: 'Custom Vite plugin for static Hero injection',
      description:
        'Wrote awestruck-inject-static-hero, a Vite plugin that reads hero.json at build time and renders the Hero section as plain HTML in index.html before React boots. The LCP image paints instantly. The React Hero component exists only as a Tailwind class manifest so the compiler keeps emitting required classes.',
    },
    {
      title: 'Viewport-based section lazy loading',
      description:
        'Built LazyOnView, an IntersectionObserver wrapper that fetches each below-the-fold section chunk only when its placeholder is within 300px of the viewport. Replaces a naive single-Suspense pattern that triggered all 10 section chunks at initial render.',
    },
    {
      title: 'Deferred analytics',
      description:
        'GA4 loads on first user interaction (scroll, click, keydown, touch) or after a 6s idle timer — whichever comes first. Keeps GTM out of the TBT window during initial paint.',
    },
    {
      title: 'Path-based bundle splitting',
      description:
        'Reworked Vite manualChunks from array-form to path-based matching. The array form produced a 0.03 KB empty react-vendor chunk because react-router-dom transitively pulled React into the router chunk. Path matching guarantees React and ReactDOM land where they belong.',
    },
  ],

  featureShowcase: [
    {
      title: 'Interactive AMP Wheel',
      description:
        'Six clickable pillar hotspots plus a center node. Each pillar plays a voiceover audio clip via the HTML5 Audio API. Hotspot positions are responsive — a custom useBreakpoint hook re-maps coordinates per device. Replaces an earlier Web Speech API implementation that proved too buggy across browsers.',
      video: '/videos/awestruck-interactive-wheel.mp4',
      videoPoster: '/images/case-studies/awestruck/feature-amp-wheel.png',
    },
    {
      title: "Josiah's Journey Decision Cards",
      description:
        'Three decision-type cards (Wise / Unwise / Responsible) with per-card voiceover. Hover to play on desktop, click to toggle on mobile. Visual feedback via ring highlight and "Playing..." indicator.',
      image: '/images/case-studies/awestruck/josiah-journey-mac.png',
    },
    {
      title: 'Netlify Forms Contact Modal',
      description:
        'Contact form lives inside a glassmorphism modal triggered from the CTA. Wired to Netlify Forms with a hidden form declaration in index.html, honeypot spam protection, and a thank-you success state.',
      image: '/images/case-studies/awestruck/popup-contact-form.png',
    },
    {
      title: 'Custom 404 Page',
      description:
        'Space-themed "Lost in Space" page with animated twinkling stars, on-brand typography, and dual navigation (Back to Home + browser-back). Consistent with the main site\'s visual language.',
      image: '/images/case-studies/awestruck/404.png',
    },
  ],

  mobileShowcase: {
    images: [
      { src: '/images/case-studies/awestruck/hero-phone.jpg', label: 'Hero' },
      { src: '/images/case-studies/awestruck/jjarm-josiah-journey-phone.jpeg', label: "Josiah's Journey" },
      { src: '/images/case-studies/awestruck/satellite-overview-phone.jpeg', label: 'Satellite Overview' },
      { src: '/images/case-studies/awestruck/cta-phone.jpeg', label: 'CTA' },
    ],
    caption:
      'iamawestruck.com on a phone, section by section. Every layout adapts — breakpoint-tuned Cloudinary delivery widths, responsive hotspot positions on the AMP wheel, and a static Hero injection that paints the LCP image before React boots.',
  },

  performanceMetrics: [
    {
      label: 'Mobile',
      before: 26,
      after: 100,
      screenshotSrc: '/images/case-studies/awestruck/lighthouse-mobile.png',
      screenshotAlt: 'AweStruck Intelligence mobile Lighthouse performance score showing 100',
    },
  ],

  performanceSummary:
    'Lighthouse mobile lifted from 26 to 100 through a five-part architecture: static Hero injection via a custom Vite plugin, viewport-based section lazy-loading, deferred analytics, path-based bundle splitting, and per-breakpoint Cloudinary delivery widths. LCP 2.7s, TBT 10ms, CLS 0 on emulated Moto G Power.',

  metrics: {
    pageSpeed: '100',
    mobileScore: '100',
    seoScore: '100',
    loadTime: 'LCP 2.7s',
  },

  screenshots: [
    {
      label: 'Homepage hero',
      after: '/images/case-studies/awestruck/screen-hero.png',
    },
    {
      label: 'AMP wheel interactive section',
      after: '/images/case-studies/awestruck/screen-amp-wheel.png',
    },
    {
      label: "Josiah's Journey",
      after: '/images/case-studies/awestruck/screen-josiah.png',
    },
    {
      label: 'CTA + contact form',
      after: '/images/case-studies/awestruck/screen-cta.png',
    },
  ],

  testimonial: {
    quoteTitle: 'Why Hire Tisha in the Age of DIY Website Builders and AI?',
    quote: `In a world full of DIY website platforms, AI tools, and "vibe coding," it's fair to ask: why hire a professional like Tisha?

After working with her, my answer is simple: because Tisha brings something those tools cannot — vision, strategy, care, and true craftsmanship.

Yes, you can spend hours trying to build a website yourself, learning platforms, troubleshooting templates, managing domains, and piecing everything together along the way. You may eventually end up with a site that works.

But Tisha creates something far beyond "working."

She takes the time to understand your vision, your business, your message, and your brand. Then she transforms that understanding into a website that feels authentic, polished, professional, and completely aligned with who you are.

The best way I can describe the difference is this: building your own website can feel like assembling a NASCAR kit in your garage. It may run, and it may even look good. But working with Tisha is like having a Formula One team behind you — precise, strategic, high-performance, and built to help you win.

Every detail matters to her. Every design choice has purpose. Every section is created with care.

Tisha is not just a designer or developer. She is a creative partner who brings clarity, excellence, and heart to the entire process.

If you want a starter site, the DIY route is always there.

But if you want a top-shelf digital presence built with strategy, beauty, and professionalism, hire Tisha.

She is truly exceptional.`,
    author: 'Robin Walsh',
    role: 'Founder, AweStruck Intelligence',
    image: '/images/case-studies/awestruck/robin-profile.png',
  },
};
