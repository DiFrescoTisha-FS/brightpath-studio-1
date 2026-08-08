import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { getCaseStudyBySlug } from '@/data/caseStudies';
import { SocialMediaCaseStudyPage, WebProjectCaseStudyPage } from '@/components/portfolio';
import { BrightPathGradientTitle } from '@/components/portfolio';
import type { SocialMediaCaseStudy, WebProjectCaseStudy } from '@/types/caseStudy';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import { PageMeta } from '@/components/PageMeta';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useAppStore();

  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  const handleBack = () => {
    navigate('/portfolio');
  };

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16">
        <PageMeta
          title="Case Study Not Found"
          description="The BrightPath case study you're looking for doesn't exist or has been moved. Explore the portfolio to view current website and content work."
          path="/portfolio"
        />
        <div className="container mx-auto px-4 text-center">
          <BrightPathGradientTitle
            as="h1"
            className="text-4xl font-bold mb-4 font-poppins"
          >
            Case Study Not Found
          </BrightPathGradientTitle>
          <p className="text-muted-foreground mb-8">
            The case study you're looking for doesn't exist or has been moved.
          </p>
          <BrightPathGradientButton
          onClick={handleBack}
          className="px-6 py-3 text-primary-foreground font-medium rounded-md"
        >
          Back to Portfolio
        </BrightPathGradientButton>
        </div>
      </div>
    );
  }

  // Render based on case study type
  if (caseStudy.type === 'social-media') {
    return (
      <SocialMediaCaseStudyPage
        caseStudy={caseStudy as SocialMediaCaseStudy}
        onBack={handleBack}
        theme={theme}
      />
    );
  }

  return (
    <WebProjectCaseStudyPage
      caseStudy={caseStudy as WebProjectCaseStudy}
      onBack={handleBack}
      theme={theme}
    />
  );
}
