import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BrightPathTabButton } from '@/components/portfolio';
import {
  ArrowLeft,
  Smartphone,
  Users,
  BarChart3,
  Database,
  Zap,
  Globe,
  ShoppingCart,
  Mail,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Bot,
  Moon,
  Sun,
  TrendingUp,
  RefreshCw,
  Building2,
  Lock,
  Shield,
  Key
} from 'lucide-react';
import BrightPathGradientTitle from '../BrightPathGradientTitle';
import BrightPathGradientButton from '../BrightPathGradientButton.legacy';
import { trackPortfolioClick } from '@/utils/analytics';

interface DaleTiffanyCaseStudyProps {
  onBack?: () => void;
  theme?: 'light' | 'dark';
}

export function DaleTiffanyCaseStudy({ onBack, theme = 'dark' }: DaleTiffanyCaseStudyProps) {
  const pageBg = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-neutral-900';
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50);
  const [activeScreenshot, setActiveScreenshot] = useState(5);

  const screenshots = [
    { before: '/dale-tiffany/before-home.png', after: '/dale-tiffany/after-home.png', label: 'Homepage', useGrayscale: true },
    { before: '/dale-tiffany/before-about.png', after: '/dale-tiffany/after-about.png', label: 'About Page', useGrayscale: true },
    { before: '/dale-tiffany/before-contact.png', after: '/dale-tiffany/after-contact.png', label: 'Contact Page', useGrayscale: true },
    { before: '/dale-tiffany/before-retailer.png', after: '/dale-tiffany/after-retailer-logos.png', label: 'Retailer Logos', useGrayscale: true },
    { before: '/dale-tiffany/before-catalog.png', after: '/dale-tiffany/after-retailer-portal.png', label: 'Retailer Portal', useGrayscale: true },
    { before: null, after: '/dale-tiffany/after-admin-crm.png', label: 'CRM (New)', useGrayscale: false },
    { before: null, after: '/dale-tiffany/after-ai-chatbot-public.png', label: 'AI Assistant', useGrayscale: false },
    { before: null, after: '/dale-tiffany/after-ai-chatbot-retailer.png', label: 'Retailer AI', useGrayscale: false },
    { before: '/dale-tiffany/after-home.png', after: '/dale-tiffany/after-home-light.png', label: 'Dark/Light Theme', useGrayscale: false },
  ];

  const techStack = [
    { name: 'React 19', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Framer Motion', category: 'Frontend' },
    { name: 'Supabase', category: 'Backend' },
    { name: 'Netlify Functions', category: 'Backend' },
    { name: 'WordPress Headless', category: 'CMS' },
    { name: 'Zustand', category: 'State' },
    { name: 'Claude AI', category: 'AI' },
  ];

  const beforeProblems = [
    '20-year-old PHP codebase',
    'No mobile responsiveness',
    'Broken retailer catalog system',
    'Outdated legacy CRM',
    'No modern e-commerce features',
    'Poor user experience',
  ];

  const afterSolutions = [
    'Modern React/TypeScript stack',
    'Fully responsive design',
    'Working B2B retailer portal',
    'Custom CRM with pipeline',
    'AI-powered chatbots',
    'Dark/Light theme support',
  ];

  return (
    <div className={`min-h-screen ${pageBg}`}>
      {/* Back Button */}
      {onBack && (
        <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <BrightPathGradientButton
              onClick={onBack}
              className="px-6 py-3 text-primary-foreground z-[10000] font-medium rounded-md"
            >
              <ArrowLeft />
              Back to Portfolio
            </BrightPathGradientButton>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Digital Transformation
            </div>

            {/* Title */}
            <BrightPathGradientTitle as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-poppins">Dale Tiffany
            </BrightPathGradientTitle>

            {/* Tech Stack */}
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              React • TypeScript • Supabase • Tailwind • Role-Based Auth
            </p>

            {/* Subtitle */}
            <p className="text-muted-foreground font-lato max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Re-architected a 20-year legacy PHP platform into a modern React + Supabase system with role-based access, a secure B2B retailer portal, and an integrated admin CRM.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="https://695c0c5bcf78e900081d78d5--daletiffany.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                onClick={() =>
                  trackPortfolioClick(
                    'dale_tiffany_staging_click',
                    'View Dale Tiffany Staging Site',
                    'https://695c0c5bcf78e900081d78d5--daletiffany.netlify.app/',
                    'Dale Tiffany'
                  )
                }
              >
                <BrightPathGradientButton className="relative z-[9999] px-8 py-4 text-[#1a2238] shadow-xl font-medium">
                  View Dale Tiffany Staging Site
                </BrightPathGradientButton>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Years Modernized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Platforms in One</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Responsive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product UI & Platform Modernization */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-semibold text-center mb-8 font-poppins"
            gradientWords={["Platform"]}
          >
            Product UI & Platform Modernization
          </BrightPathGradientTitle>

          {/* Screenshot Navigation */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {screenshots.map((shot, index) => (
              <BrightPathTabButton
                key={shot.label}
                active={activeScreenshot === index}
                onClick={() => setActiveScreenshot(index)}
              >
                {shot.label}
              </BrightPathTabButton>
            ))}
          </div>

          {/* Comparison Slider */}
          <div className="max-w-5xl mx-auto">
            {screenshots[activeScreenshot].before ? (
              /* Before/After Comparison Mode */
              <>
                <div
                  className="relative aspect-[16/10] rounded-lg overflow-hidden border border-primary/50 dark:shadow-glow-primary shadow-xl"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    setBeforeAfterPosition(Math.max(5, Math.min(95, x)));
                  }}
                  onTouchMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
                    setBeforeAfterPosition(Math.max(5, Math.min(95, x)));
                  }}
                >
                  {/* After Image (Background) */}
                  <img
                    src={screenshots[activeScreenshot].after}
                    alt="After - Modern Site"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />

                  {/* Before Image (Clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${beforeAfterPosition}%` }}
                  >
                    <img
                      src={screenshots[activeScreenshot].before}
                      alt="Before - Legacy Site"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      style={{
                        width: `${100 / (beforeAfterPosition / 100)}%`,
                        filter: screenshots[activeScreenshot].useGrayscale ? 'grayscale(100%)' : 'none'
                      }}
                    />
                  </div>

                  {/* Slider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
                    style={{ left: `${beforeAfterPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <ChevronLeft className="w-4 h-4 text-primary-foreground -mr-1" />
                      <ChevronRight className="w-4 h-4 text-primary-foreground -ml-1" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-destructive text-destructive-foreground text-sm font-medium rounded">
                    BEFORE
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded">
                    AFTER
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Drag or hover to compare before and after
                </p>
              </>
            ) : (
              /* New Feature Mode (no before image) */
              <>
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-primary/50 dark:shadow-glow-primary shadow-xl">
                  <img
                    src={screenshots[activeScreenshot].after}
                    alt="New Feature"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* New Feature Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    NEW FEATURE
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Brand new functionality - no legacy equivalent existed
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Authentication & System Architecture */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center mb-3 font-poppins"
            gradientWords={["Architecture"]}
          >
            Authentication & System Architecture
          </BrightPathGradientTitle>

          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto font-lato">
            Built for secure access, role separation, and scalable B2B workflows.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="p-6 rounded-xl bg-card border border-primary/50 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-foreground font-poppins">
                    Secure retailer login
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground font-lato">
                    Supabase Auth with protected routes and session persistence.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-xl bg-card border border-primary/50 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-foreground font-poppins">
                    Role-based UI states
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground font-lato">
                    Retailers and admins see different tools and workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-xl bg-card border border-primary/50 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-foreground font-poppins">
                    Protected API routes
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground font-lato">
                    Serverless functions validate sessions and permissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-xl bg-card border border-primary/50 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold text-foreground font-poppins">
                    Session handling via Supabase
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground font-lato">
                    Persistent auth state with controlled expiration and refresh handling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="py-24 md:py-28">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center mb-3 font-poppins"
            gradientWords={["Impact"]}
          >
            Business Impact
          </BrightPathGradientTitle>

          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto font-lato">
            Quantifiable results following modernization.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="p-7 rounded-xl bg-card border border-primary/40 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="text-4xl font-bold tracking-tight text-primary leading-none">
                    40%
                  </div>
                  <div className="mt-1 text-base font-semibold text-foreground">
                    Faster load time
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground font-lato">
                    Improved performance across key pages
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-xl bg-card border border-primary/40 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Key className="w-6 h-6 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="text-4xl font-bold tracking-tight text-primary leading-none">
                    3
                  </div>
                  <div className="mt-1 text-base font-semibold text-foreground">
                    Role-based access tiers
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground font-lato">
                    Structured permissions across the platform
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-xl bg-card border border-primary/40 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="text-4xl font-bold tracking-tight text-primary leading-none">
                    Faster
                  </div>
                  <div className="mt-1 text-base font-semibold text-foreground">
                    Retailer onboarding
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground font-lato">
                    Reduced manual setup + improved workflow
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-7 rounded-xl bg-card border border-primary/40 dark:shadow-glow-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="text-4xl font-bold tracking-tight text-primary leading-none">
                    Unified
                  </div>
                  <div className="mt-1 text-base font-semibold text-foreground">
                    Distributor management
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground font-lato">
                    Centralized access to partner data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before - Problems */}
            <div className="p-6 rounded-lg bg-destructive/5 border border-primary/50 dark:shadow-glow-primary">
              <BrightPathGradientTitle
                as="h4"
                className="font-semibold text-foreground mb-4 flex items-center gap-2 font-poppins">
                The Challenge
              </BrightPathGradientTitle>
              <ul className="space-y-3">
                {beforeProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3 text-muted-foreground font-lato">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            {/* After - Solutions */}
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/50 dark:shadow-glow-primary">
              <BrightPathGradientTitle
                as="h4"
                className="font-semibold text-foreground mb-4 flex items-center gap-2 font-poppins">
                The Solution
              </BrightPathGradientTitle>
              <ul className="space-y-3">
                {afterSolutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-3 text-muted-foreground font-lato">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center mb-4 font-poppins"
            gradientWords={["Delivered"]}>
            Key Features Delivered
          </BrightPathGradientTitle>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-lato">
            A complete digital ecosystem replacing outdated systems with modern solutions
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* B2B Portal */}
            <div className="p-6 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h4"
                className="font-semibold text-foreground mb-2 font-poppins"
                gradientWords={["Portal", "B2B"]}
              >B2B Retailer Portal</BrightPathGradientTitle>
              <p className="text-muted-foreground mb-4 font-lato">
                Secure wholesale ordering platform replacing the broken legacy catalog system.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Retailer authentication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Wholesale pricing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Order management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Look book collections
                </li>
              </ul>
            </div>

            {/* CRM System */}
            <div className="p-6 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h4"
                className="font-semibold mb-2 font-poppins"
                gradientWords={["CRM", "System"]}
              >Custom CRM System</BrightPathGradientTitle>
              <p className="text-muted-foreground mb-4 font-lato">
                Full-featured CRM replacing their outdated legacy system with modern capabilities.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Lead management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Kanban pipeline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Email integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Analytics dashboard
                </li>
              </ul>
            </div>

            {/* Responsive Design */}
            <div className="p-6 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h4"
                gradientWords={["Responsive"]}
                className="font-semibold mb-2 font-poppins">Responsive Design</BrightPathGradientTitle>
              <p className="text-muted-foreground mb-4 font-lato">
                Mobile-first approach ensuring perfect display across all devices.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Mobile-first CSS
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Touch-friendly UI
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Optimized images
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Fast load times
                </li>
              </ul>
            </div>

            {/* AI Chatbots */}
            <div className="p-6 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h4"
                gradientWords={["Chatbots"]}
                className="font-semibold mb-2 font-poppins">AI-Powered Chatbots</BrightPathGradientTitle>
              <p className="text-muted-foreground mb-4 font-lato">
                Intelligent assistants for both public visitors and B2B retailers.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Public visitor assistant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Retailer portal assistant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Product recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  24/7 support availability
                </li>
              </ul>
            </div>

            {/* Dark/Light Theme */}
            <div className="p-6 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="relative">
                  <Sun className="w-6 h-6 text-primary absolute -left-1 -top-1" />
                  <Moon className="w-5 h-5 text-primary absolute left-1 top-1" />
                </div>
              </div>
              <BrightPathGradientTitle
                as="h4"
                gradientWords={["Theme"]}
                className="font-semibold mb-2 font-poppins">Dark/Light Theme</BrightPathGradientTitle>
              <p className="text-muted-foreground mb-4 font-lato">
                User-preferred theming with seamless transitions between modes.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  System preference detection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Persistent user choice
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Smooth transitions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  Accessible contrast
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-6">
            <div className="p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary text-center">
              <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
              <BrightPathGradientTitle
                as="h4"
                gradientWords={["Headless"]}
                className="font-medium text-foreground">Headless WordPress</BrightPathGradientTitle>
              <p className=" text-muted-foreground">Content management</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary text-center">
              <Database className="w-6 h-6 text-primary mx-auto mb-2" />
              <BrightPathGradientTitle
                as="h4"
                className="font-medium text-foreground">Supabase</BrightPathGradientTitle>
              <p className="text-muted-foreground">Real-time database</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary text-center">
              <ShoppingCart className="w-6 h-6 text-primary mx-auto mb-2" />
              <BrightPathGradientTitle as="h4"
                className="font-medium text-foreground">E-Commerce</BrightPathGradientTitle>
              <p className="text-muted-foreground">Product catalog</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary text-center">
              <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
              <BrightPathGradientTitle as="h4"
                gradientWords={["Email"]}
                className="font-medium text-foreground">Email System</BrightPathGradientTitle>
              <p className="text-muted-foreground">Resend integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center text-foreground mb-4 font-poppins" gradientWords={["Technology"]}>
            Technology Stack
          </BrightPathGradientTitle>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-lato">
            Built with modern, scalable technologies for long-term maintainability
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded-full bg-card border border-primary/50 dark:shadow-glow-primary hover:border-primary transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{tech.name}</span>
                <span className="text-xs text-muted-foreground ml-2">({tech.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-foreground mb-4 font-poppins"
            gradientWords={["Transform", "Digital", "Presence"]}>
            Ready to Transform Your Digital Presence?
          </BrightPathGradientTitle>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-lato">
            Let's discuss how we can modernize your website and build custom solutions for your business.
          </p>
          <Link to="/contact">
            <BrightPathGradientButton className="px-8 py-3 text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Get in Touch
            </BrightPathGradientButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
