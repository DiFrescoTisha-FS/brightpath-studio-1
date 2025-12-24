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

        {/* Note about images */}
        <div className="mt-12 p-6 rounded-lg bg-muted/50 border border-border max-w-2xl mx-auto">
          <h3 className="font-semibold text-foreground mb-2">Image Setup Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To see the before/after images, add your screenshots to:
          </p>
          <code className="block p-3 bg-background rounded text-xs text-muted-foreground overflow-x-auto">
            public/dale-tiffany/<br />
            ├── before-home.png<br />
            ├── before-retailer.png<br />
            ├── before-about.png<br />
            ├── before-contact.png<br />
            ├── before-catalog.png<br />
            ├── after-home.png<br />
            ├── after-portal.png<br />
            ├── after-about.png<br />
            ├── after-contact.png<br />
            └── after-crm.png
          </code>
        </div>
      </div>
    </div>
  );
}
