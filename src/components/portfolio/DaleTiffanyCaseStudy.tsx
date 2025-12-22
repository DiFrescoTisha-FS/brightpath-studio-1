import { useState } from 'react';
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
} from 'lucide-react';
import BrightPathGradientTitle from '../BrightPathGradientTitle';
import BrightPathGradientButton from '../BrightPathGradientButton';

interface DaleTiffanyCaseStudyProps {
  onBack?: () => void;
}

export function DaleTiffanyCaseStudy({ onBack }: DaleTiffanyCaseStudyProps) {
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const screenshots = [
    { before: '/dale-tiffany/before-home.png', after: '/dale-tiffany/after-home.png', label: 'Homepage' },
    { before: '/dale-tiffany/before-about.png', after: '/dale-tiffany/after-about.png', label: 'About Page' },
    { before: '/dale-tiffany/before-contact.png', after: '/dale-tiffany/after-contact.png', label: 'Contact Page' },
    { before: '/dale-tiffany/before-retailer.png', after: '/dale-tiffany/after-retailer-logos.png', label: 'Retailer Logos' },
    { before: '/dale-tiffany/before-catalog.png', after: '/dale-tiffany/after-retailer-portal.png', label: 'Retailer Portal' },
    { before: null, after: '/dale-tiffany/after-admin-crm.png', label: 'CRM (New)' },
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
    'Full e-commerce capabilities',
    'Smooth, animated UX',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      {onBack && (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Digital Transformation
            </div>

            {/* Title */}
            <BrightPathGradientTitle
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins">
              Dale Tiffany
            </BrightPathGradientTitle>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground font-lato max-w-2xl mx-auto">
              Transforming a 20-year-old legacy PHP site into a modern, responsive e-commerce platform with B2B portal and integrated CRM.
            </p>

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

      {/* Before/After Comparison Slider */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="text-2xl font-semibold text-center mb-8 font-poppins"
            gradientWords={["After"]}
          >
            
            Before & After
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
                  className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border shadow-xl"
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
                      className="absolute inset-0 w-full h-full object-cover object-top grayscale"
                      style={{ width: `${100 / (beforeAfterPosition / 100)}%` }}
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
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border shadow-xl">
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

      {/* Challenge & Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before - Problems */}
            <div className="p-6 rounded-lg bg-destructive/5 border border-primary/30">
              <BrightPathGradientTitle
                as="h3"
                className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2 font-poppins">
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
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <BrightPathGradientTitle 
              as="h3"
              className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2 font-poppins">                
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="text-3xl font-bold text-center mb-4 font-poppins"
            gradientWords={["Delivered"]}>
            Key Features Delivered
          </BrightPathGradientTitle>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-lato">
            A complete digital ecosystem replacing outdated systems with modern solutions
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* B2B Portal */}
            <div className="p-6 rounded-lg bg-card border border-primary/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h3"
                className="text-lg font-semibold text-foreground mb-2 font-poppins">B2B Retailer Portal</BrightPathGradientTitle>
              <p className="text-sm text-muted-foreground mb-4 font-lato">
                Secure wholesale ordering platform replacing the broken legacy catalog system.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
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
            <div className="p-6 rounded-lg bg-card border border-primary/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h3"
                className="text-lg font-semibold mb-2 font-poppins">Custom CRM System</BrightPathGradientTitle>
              <p className="text-sm text-muted-foreground mb-4 font-lato">
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
            <div className="p-6 rounded-lg bg-card border border-primary/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <BrightPathGradientTitle
                as="h3"
                className="text-lg font-semibold mb-2 font-poppins">Responsive Design</BrightPathGradientTitle>
              <p className="text-sm text-muted-foreground mb-4 font-lato">
                Mobile-first approach ensuring perfect display across all devices.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
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
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-6">
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Headless WordPress</div>
              <div className="text-xs text-muted-foreground">Content management</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <Database className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Supabase</div>
              <div className="text-xs text-muted-foreground">Real-time database</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <ShoppingCart className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">E-Commerce</div>
              <div className="text-xs text-muted-foreground">Product catalog</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Email System</div>
              <div className="text-xs text-muted-foreground">Resend integration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="text-3xl font-bold text-center text-foreground mb-4 font-poppins" gradientWords={["Technology"]}>
            Technology Stack
          </BrightPathGradientTitle>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto font-lato">
            Built with modern, scalable technologies for long-term maintainability
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded-full bg-card border border-primary/30 hover:border-primary transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{tech.name}</span>
                <span className="text-xs text-muted-foreground ml-2">({tech.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <BrightPathGradientTitle
            as="h2"
            className="text-2xl font-bold text-foreground mb-4 font-poppins"
            gradientWords={["Transform", "Digital", "Presence"]}>
            Ready to Transform Your Digital Presence?
          </BrightPathGradientTitle>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-lato">
            Let's discuss how we can modernize your website and build custom solutions for your business.
          </p>
          <BrightPathGradientButton className="px-8 py-3 text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            Get in Touch
          </BrightPathGradientButton>
        </div>
      </section>
    </div>
  );
}
