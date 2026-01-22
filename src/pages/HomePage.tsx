import { Lightbulb, Compass, Star } from "lucide-react";
import { useAppStore } from '@/store/appStore';
import { Link } from 'react-router-dom';
import ReviewWidget from '../components/ReviewWidget';
import PortfolioSection from '../components/PortfolioSection';
import BrightPathGradientTitle from "@/components/BrightPathGradientTitle";
import BrightPathGradientButton from "@/components/BrightPathGradientButton";

// Define a single props type for all sections that will receive the 'theme' prop
type SectionProps = {
  theme: 'light' | 'dark';
};

// ===================================
// HERO SECTION COMPONENT
// ===================================
const HeroSection = ({ theme }: SectionProps) => (
  <section className="relative text-foreground min-h-screen flex items-center justify-center overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="/videos/video-1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'bg-background/60' : 'bg-background/60'} z-10`}></div>
    <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
      <BrightPathGradientTitle as="h1" className="font-poppins font-bold mb-4 mt-24" gradientWords={["Shine", "Bright", "Online"]}>
        Guiding Your Business to Shine Bright Online
      </BrightPathGradientTitle>
      <p className="text-slate-600 dark:text-slate-100 font-lato mb-8 text-shadow-md">
        We are the beacon in the digital fog, crafting brilliant web experiences
        that navigate your brand to success.
      </p>
      <BrightPathGradientButton className="mt-8 bg-primary text-primary-foreground font-bold font-lato py-2 px-6 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-shadow-md">
        Begin Your Journey
      </BrightPathGradientButton>
    </div>
  </section>
);

// ===================================
// SERVICES SECTION COMPONENT
// ===================================

const ServicesSection = ({ theme }: SectionProps) => {
  const services = [
    {
      title: "Web Design & Development",
      description:
        "Creating stunning, high-performance websites tailored to your brand.",
      icon: <Compass className={`h-8 w-8 mb-4 drop-shadow-md ${theme === 'dark' ? 'text-primary' : 'text-primary'}`} />,
    },
    {
      title: "Digital Strategy",
      description:
        "Crafting data-driven strategies to illuminate your path to growth.",
      icon: <Lightbulb className={`h-8 w-8 mb-4 drop-shadow-md ${theme === 'dark' ? 'text-primary' : 'text-primary'}`} />,
    },
    {
      title: "Brand Identity",
      description:
        "Building memorable brands that shine bright and stand out from the crowd.",
      icon: <Star className={`h-8 w-8 mb-4 drop-shadow-md ${theme === 'dark' ? 'text-primary' : 'text-primary'}`} />,
    },
  ];

  return (
    
    <section className="bg-services-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrightPathGradientTitle as="h2" className="font-poppins font-bold text-services mb-12" gradientWords={["Services"]}>
          Our Services
        </BrightPathGradientTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${theme === 'dark' ? 'bg-[#1A2238] border border-primary/20 shadow-glow-primary' : 'bg-gray-50 border border-primary/50 shadow-2xl'}`}
            >
              <div className="flex justify-center">{service.icon}</div>

              <BrightPathGradientTitle as="h5" className="font-poppins font-semibold mb-4"
              gradientWords={["Design", "Development", "Strategy", "Brand"]}
              >
                {service.title}
              </BrightPathGradientTitle>

              <p className={`font-lato card-subheading ${theme === 'dark' ? 'text-white' : 'text-secondary'}`}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================================
// BRAND STORY SECTION COMPONENT
// ===================================
const BrandStorySection = ({ theme }: SectionProps) => (
  <section className={`py-20 ${theme === 'dark' ? 'bg-[#273442]' : 'bg-gray-200'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="w-full h-80 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
          <div className="text-center">
            <img
              src="/images/lh-5.jpeg"
              alt="Lighthouse Graphic"
              className="h-auto w-full mx-auto mb-4 rounded-lg shadow-glow-primary border border-primary/30"
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
        <Link to="/review">
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
        <HeroSection theme={theme} />
        <ServicesSection theme={theme} />
        
        <PortfolioSection />
        <section id="reviews" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <BrightPathGradientTitle as="h2" className="font-bold font-poppins mb-12"
              gradientWords={["Testimonials"]}
            >
              Client Testimonials
            </BrightPathGradientTitle>
            <ReviewWidget />
           
          </div>
        </section>
        <BrandStorySection theme={theme} />
      </main>
    </div>
  );
};

export default HomePage;