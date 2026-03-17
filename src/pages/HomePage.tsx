import React, { Suspense } from "react";
import { RefreshCcw, Zap, Code } from "lucide-react";
import { useAppStore } from '@/store/appStore';
import { Link } from 'react-router-dom';
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
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

  return (
    <section id="services" className="bg-services-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrightPathGradientTitle as="h2" className="font-poppins font-bold text-services mb-4" gradientWords={["Help"]}>
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

              <BrightPathGradientTitle as="h3" className="font-poppins font-semibold mb-4 text-xl"
                gradientWords={["Modernization", "Optimization", "Development"]}
              >
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

const BrandStorySection = ({ theme }: SectionProps) => (
  <section className={`py-20 ${theme === 'dark' ? 'bg-[#273442]' : 'bg-gray-200'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="w-full h-80 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
          <div className="text-center">
            <img
              src="/images/lh-5.jpeg"
              alt="Lighthouse Graphic"
              className="h-auto w-full mx-auto mb-4 rounded-lg border border-primary/50 dark:shadow-glow-primary"
            />
          </div>
        </div>
      </div>
      <div>
        <BrightPathGradientTitle as="h3" className="font-poppins font-bold text-foreground mb-4"
          gradientWords={["Beacon"]}
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
      <main>
        <ClarityHero />
        <ServicesSection theme={theme} />

        <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading portfolio...</div>}>
          <PortfolioSection />
        </Suspense>
        <section id="reviews" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <BrightPathGradientTitle as="h2" className="font-bold font-poppins mb-12"
              gradientWords={["Testimonials"]}
            >
              Client Testimonials
            </BrightPathGradientTitle>
            <Suspense fallback={<div className="text-center p-8 text-muted-foreground">Loading reviews...</div>}>
              <ReviewWidget />
            </Suspense>
          </div>
        </section>
        <BrandStorySection theme={theme} />
      </main>
    </div>
  );
};

export default HomePage;
