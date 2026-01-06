import { useState } from 'react';
import { BrightPathGradientTitle, DaleTiffanyCard, DaleTiffanyCaseStudy, AngelCityMassageCard } from '../components/portfolio';
import AngelCityCaseStudy from '../components/features/AngelCityMassageCaseStudy';
import { useAppStore } from '@/store/appStore';

type ViewState = 'grid' | 'dale-tiffany' | 'angel-city';

export default function PortfolioDemoPage() {
  const { theme } = useAppStore();
  const [view, setView] = useState<ViewState>('grid');

  if (view === 'dale-tiffany') {
    return <DaleTiffanyCaseStudy onBack={() => setView('grid')} theme={theme} />;
  }

  if (view === 'angel-city') {
    return (
      <div className="relative">
        <button
          onClick={() => setView('grid')}
          className="fixed top-24 left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium shadow-lg"
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
          <BrightPathGradientTitle className="text-4xl font-bold text-foreground mb-4 text-neutral-800 dark:text-gray-200"
          gradientWords={["Demo"]}
          >Project Demo</BrightPathGradientTitle>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our case studies showcasing BrightPath Web Studio's work.
            Click "View Case Study" to see the full project details.
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <DaleTiffanyCard onViewCaseStudy={() => setView('dale-tiffany')} />
          <AngelCityMassageCard onViewCaseStudy={() => setView('angel-city')} />
        </div>
      </div>
    </div>
  );
}
