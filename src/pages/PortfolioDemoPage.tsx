import { useState } from 'react';
import {
  BrightPathGradientTitle,
  DaleTiffanyCard,
  DaleTiffanyCaseStudy,
  AngelCityMassageCard,
  SocialMediaCard,
  SocialMediaCaseStudyPage,
} from '../components/portfolio';
import AngelCityCaseStudy from '../components/features/AngelCityMassageCaseStudy';
import { useAppStore } from '@/store/appStore';
import {
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
} from '@/data/caseStudies';

type ViewState =
  | 'grid'
  | 'dale-tiffany'
  | 'angel-city'
  | 'dale-tiffany-social'
  | 'living-better-life-social';

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

  if (view === 'dale-tiffany-social') {
    return (
      <SocialMediaCaseStudyPage
        caseStudy={daleTiffanySocialCaseStudy}
        onBack={() => setView('grid')}
        theme={theme}
      />
    );
  }

  if (view === 'living-better-life-social') {
    return (
      <SocialMediaCaseStudyPage
        caseStudy={livingBetterLifeSocialCaseStudy}
        onBack={() => setView('grid')}
        theme={theme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <BrightPathGradientTitle
            as="h1"
            className="mb-4 font-poppins"
            gradientWords={['Demo']}
          >
            Project Demo
          </BrightPathGradientTitle>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our case studies showcasing BrightPath Web Studio's work. Click "View Case
            Study" to see the full project details.
          </p>
        </div>

        {/* Web Projects Section */}
        <div className="mb-16">
          <BrightPathGradientTitle
            as="h2"
            className="text-center mb-8 font-poppins"
            gradientWords={['Projects']}
          >
            Web Projects
          </BrightPathGradientTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <DaleTiffanyCard onViewCaseStudy={() => setView('dale-tiffany')} />
            <AngelCityMassageCard onViewCaseStudy={() => setView('angel-city')} />
          </div>
        </div>

        {/* Social Media Content Section */}
        <div>
          <BrightPathGradientTitle
            as="h2"
            className="text-center mb-8 font-poppins"
            gradientWords={['Content']}
          >
            Social Media Content
          </BrightPathGradientTitle>
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            <SocialMediaCard
              caseStudy={daleTiffanySocialCaseStudy}
              onViewCaseStudy={() => setView('dale-tiffany-social')}
              className="w-full sm:w-80 md:w-96"
            />
            <SocialMediaCard
              caseStudy={livingBetterLifeSocialCaseStudy}
              onViewCaseStudy={() => setView('living-better-life-social')}
              className="w-full sm:w-80 md:w-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
