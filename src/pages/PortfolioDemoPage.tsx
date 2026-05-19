import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BrightPathGradientTitle,
  DaleTiffanyCard,
  DaleTiffanyCaseStudy,
  AngelCityMassageCard,
  AweStruckCard,
  WebProjectCaseStudyPage,
} from '../components/portfolio';
import AngelCityCaseStudy from '../components/features/AngelCityMassageCaseStudy';
import { awestruckIntelligenceCaseStudy } from '@/data/caseStudies';
import { useAppStore } from '@/store/appStore';
import { useParams } from "react-router-dom";
import { trackEvent } from '@/utils/analytics';
import { PageMeta } from '@/components/PageMeta';

type ViewState = 'grid' | 'dale-tiffany' | 'angel-city' | 'awestruck';

export default function PortfolioDemoPage() {
  const { theme } = useAppStore();
  const [view, setView] = useState<ViewState>('grid');

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      trackEvent('view_case_study', {
        category: 'Portfolio',
        action: 'Viewed Case Study',
        label: slug,
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

  if (view === 'awestruck') {
    return (
      <WebProjectCaseStudyPage
        caseStudy={awestruckIntelligenceCaseStudy}
        onBack={() => {
          setView('grid');
          window.scrollTo(0, 0);
        }}
        theme={theme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <PageMeta
        title="Portfolio"
        description="Selected work from BrightPath Web Studio — custom React builds, WordPress modernizations, performance optimizations, and social media content systems."
        path="/portfolio"
      />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AweStruckCard onViewCaseStudy={() => {
            setView('awestruck');
            window.scrollTo(0, 0);
          }} />
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
