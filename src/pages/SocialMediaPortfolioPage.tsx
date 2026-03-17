import { useState } from 'react';
import {
  BrightPathGradientTitle,
  SocialMediaCard,
  SocialMediaCaseStudyPage,
} from '../components/portfolio';
import { useAppStore } from '@/store/appStore';
import {
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
} from '@/data/caseStudies';

type ViewState = 'grid' | 'dale-tiffany-social' | 'living-better-life-social';

export default function SocialMediaPortfolioPage() {
  const { theme } = useAppStore();
  const [view, setView] = useState<ViewState>('grid');
  const socialCards = [
    {
      caseStudy: daleTiffanySocialCaseStudy,
      onViewCaseStudy: () => {
        setView('dale-tiffany-social');
        window.scrollTo(0, 0);
      },
    },
    {
      caseStudy: livingBetterLifeSocialCaseStudy,
      onViewCaseStudy: () => {
        setView('living-better-life-social');
        window.scrollTo(0, 0);
      },
    },
  ];

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
            gradientWords={['Content']}
          >
            Social Media Content
          </BrightPathGradientTitle>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our social media case studies showcasing content creation and brand storytelling across platforms.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {socialCards.map((card, index) => (
            <SocialMediaCard
              key={card.caseStudy.id}
              index={index}
              caseStudy={card.caseStudy}
              onViewCaseStudy={card.onViewCaseStudy}
              className="w-full sm:w-80 md:w-96"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
