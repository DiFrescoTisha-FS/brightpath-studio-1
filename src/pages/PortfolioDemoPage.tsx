import { useState } from 'react';
import { DaleTiffanyCard, DaleTiffanyCaseStudy } from '../components/portfolio';
import { useAppStore } from '@/store/appStore';

export default function PortfolioDemoPage() {
  const { theme } = useAppStore();
  const [view, setView] = useState<'grid' | 'case-study'>('grid');

  if (view === 'case-study') {
    return <DaleTiffanyCaseStudy onBack={() => setView('grid')} theme={theme} />;
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project <span className={theme === 'dark' ? 'gradient-text-dark' : 'gradient-text-light'}>Demo</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Preview of the Dale Tiffany case study components for BrightPath Web Studio.
            Click "View Case Study" to see the full page.
          </p>
        </div>

        {/* Demo Card */}
        <div className="max-w-md mx-auto">
          <DaleTiffanyCard onViewCaseStudy={() => setView('case-study')} />
        </div>
      </div>
    </div>
  );
}
