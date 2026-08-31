import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BrightPathGradientTitle,
  DaleTiffanyCard,
  DaleTiffanyCaseStudy,
  AngelCityMassageCard,
  AweStruckCard,
  BamvsthewrldCard,
  WebProjectCaseStudyPage,
} from '../components/portfolio';
import AngelCityCaseStudy from '../components/features/AngelCityMassageCaseStudy';
import { awestruckIntelligenceCaseStudy, bamvsthewrldCaseStudy } from '@/data/caseStudies';
import { useAppStore } from '@/store/appStore';
import { useParams, useSearchParams } from "react-router-dom";
import { trackEvent } from '@/utils/analytics';
import { PageMeta } from '@/components/PageMeta';

// Background images by theme and device
const BG_IMAGES = {
  light: {
    desktop: 'https://res.cloudinary.com/djqw1de3s/image/upload/brightpath/background-images/773F3E3F-CEF6-4DA0-BB15-AC025AEAA336_qhyuw3',
    mobile: 'https://res.cloudinary.com/djqw1de3s/image/upload/brightpath/background-images/E163A136-43C0-4F7A-A3BC-D9F60A029A6E_nonghd',
  },
  dark: {
    desktop: 'https://res.cloudinary.com/djqw1de3s/image/upload/brightpath/background-images/A8DC3DBB-E83E-4F6D-8BE0-EB82145DF29A_cyrlwi',
    mobile: 'https://res.cloudinary.com/djqw1de3s/image/upload/brightpath/background-images/786F78DB-EC9D-478E-9F21-52905E7BEB81_rsel8f',
  },
};

type ViewState = 'grid' | 'dale-tiffany' | 'angel-city' | 'awestruck' | 'bamvsthewrld';

export default function PortfolioDemoPage() {
  const { theme } = useAppStore();
  const [view, setView] = useState<ViewState>('grid');

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (slug) {
      trackEvent('view_case_study', {
        category: 'Portfolio',
        action: 'Viewed Case Study',
        label: slug,
      });
    }
  }, [slug]);

  // Dale Tiffany's web/B2B case study has no dedicated route (it isn't part
  // of the shared case-study data model), so a direct homepage link lands
  // here via ?project= and opens the case study immediately.
  useEffect(() => {
    const project = searchParams.get('project');
    if (project === 'dale-tiffany') {
      setView('dale-tiffany');
    }
  }, [searchParams]);

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

  if (view === 'bamvsthewrld') {
    return (
      <WebProjectCaseStudyPage
        caseStudy={bamvsthewrldCaseStudy}
        onBack={() => {
          setView('grid');
          window.scrollTo(0, 0);
        }}
        theme={theme}
      />
    );
  }

  const bgImages = theme === 'dark' ? BG_IMAGES.dark : BG_IMAGES.light;

  return (
    <>
      {/* Responsive background images */}
      <style>{`
        @media (max-width: 767px) {
          .portfolio-page-bg {
            background-image: url('${bgImages.mobile}');
          }
        }
        @media (min-width: 768px) {
          .portfolio-page-bg {
            background-image: url('${bgImages.desktop}');
          }
        }
      `}</style>
      <div className="portfolio-page-bg min-h-screen pt-32 pb-16 bg-cover bg-center bg-no-repeat md:bg-fixed">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 max-w-6xl mx-auto">
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
          {/* 4th card wraps to row 2 on lg; col-start-2 centers it under
              the Dale Tiffany column. On md (2-col) it lands naturally
              in row 2 col 2 next to Angel City. */}
          <BamvsthewrldCard
            className="lg:col-start-2"
            onViewCaseStudy={() => {
              setView('bamvsthewrld');
              window.scrollTo(0, 0);
            }}
          />
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
    </>
  );
}
