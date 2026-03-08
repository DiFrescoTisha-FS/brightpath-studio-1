import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { Link } from 'react-router-dom';
import {
  BrightPathGradientTitle,
  DaleTiffanyCard,
  DaleTiffanyCaseStudy,
  AngelCityMassageCard,
} from '../components/portfolio';
import AngelCityCaseStudy from '../components/features/AngelCityMassageCaseStudy';
import { useAppStore } from '@/store/appStore';
import { useParams } from "react-router-dom";

type ViewState = 'grid' | 'dale-tiffany' | 'angel-city';

export default function PortfolioDemoPage() {
  const { theme } = useAppStore();
  const [view, setView] = useState<ViewState>('grid');

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      ReactGA.event({
        category: "Portfolio",
        action: "Viewed Case Study",
        label: slug
      });
    }
  }, [slug]);

  if (view === 'dale-tiffany') {
    return <DaleTiffanyCaseStudy onBack={() => setView('grid')} theme={theme} />;
  }

  if (view === 'angel-city') {
    return (
      <div className="relative">
        <button
          onClick={() => setView('grid')}
          className="fixed top-24 left-4 z-[10000] px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium shadow-lg"
        >
          ← Back to Portfolio
        </button>
        <AngelCityCaseStudy />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <BrightPathGradientTitle
            as="h1"
            className="mb-4 font-poppins"
            gradientWords={['Portfolio']}
          >
            Portfolio
          </BrightPathGradientTitle>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real-world systems built with modern stacks — focused on performance, scalability, and measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <DaleTiffanyCard onViewCaseStudy={() => {
            setView('dale-tiffany');
            window.scrollTo(0, 0);
          }} />
          <AngelCityMassageCard onViewCaseStudy={() => {
            setView('angel-city');
            window.scrollTo(0, 0);
          }} />
        </div>

        <div className="text-center mt-16">
          <Link
            to="/social-media"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Also see my Social Media & Content Strategy work →
          </Link>
        </div>
      </div>
    </div>
  );
}
