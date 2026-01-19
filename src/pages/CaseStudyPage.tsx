import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { getCaseStudyBySlug } from '@/data/caseStudies';
import { SocialMediaCaseStudyPage } from '@/components/portfolio';
import { BrightPathGradientTitle, BrightPathGradientButton } from '@/components/portfolio';
import type { SocialMediaCaseStudy } from '@/types/caseStudy';

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

  // For web projects, we could add a WebProjectCaseStudyPage component
  // For now, redirect back to portfolio
  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4 text-center">
        <BrightPathGradientTitle
          as="h1"
          className="text-4xl font-bold mb-4 font-poppins"
          gradientWords={["Living", "Better", "Life"]}
        >
          {caseStudy.title}
        </BrightPathGradientTitle>
        <p className="text-muted-foreground mb-8">
          This case study type is not yet supported in the dynamic view.
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
