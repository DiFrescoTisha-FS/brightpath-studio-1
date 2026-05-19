// Case Study Data Model Types
// Supports both web projects and social media case studies

export type CaseStudyType = 'web' | 'social-media';

// Metrics for social media case studies
export interface SocialMediaMetrics {
  impressions?: string;
  accountsReached?: string;
  nonFollowerReach?: string;
  reportingPeriod?: string;
  reach?: string;
  engagement?: string;
  followers?: string;
  growth?: string;
  views?: string;
  likes?: string;
  shares?: string;
  comments?: string;
  profileVisits?: string;
  linkTaps?: string;
}

// Metrics for web projects
export interface WebProjectMetrics {
  pageSpeed?: string;
  conversionRate?: string;
  bounceRate?: string;
  loadTime?: string;
  mobileScore?: string;
  seoScore?: string;
}

// Lighthouse before/after metric for PerformanceResults
export interface LighthouseMetric {
  label: string;
  before: number;
  after: number;
  screenshotSrc: string;
  screenshotAlt: string;
}

// Snapshot metadata row (used by ProjectSnapshot)
export interface SnapshotMetadataItem {
  label: string;
  value: string;
}

// Engineering / feature highlight card
export interface HighlightItem {
  title: string;
  description: string;
  image?: string;
  video?: string;
  videoPoster?: string;
}

// Content sample (image or video)
export interface ContentSample {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string; // For videos
  alt: string;
  caption?: string;
  platform?: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'twitter';
}

// Deliverable item
export interface Deliverable {
  title: string;
  description: string;
  icon?: string;
}

export interface QuickImpactItem {
  label: string;
  value: string;
}

// Process step
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// Base case study interface
export interface BaseCaseStudy {
  id: string;
  slug: string;
  type: CaseStudyType;
  title: string;
  client: string;
  industry: string;
  category: string;
  description: string;
  featuredImage: string;
  hoverImage?: string;
  tags: string[];
  overview: string;
  goals: string[];
  deliverables: Deliverable[];
  process: ProcessStep[];
  results: string[];
  techStack?: string[];
  testimonial?: {
    quote: string;
    quoteTitle?: string;
    author: string;
    role: string;
    image?: string;
  };
}

// Social Media Case Study
export interface SocialMediaCaseStudy extends BaseCaseStudy {
  type: 'social-media';
  platforms: ('instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'twitter')[];
  metrics: SocialMediaMetrics;
  contentSamples: ContentSample[];
  skills?: string[];
  role?: string;
  strategySummary?: string;
  quickImpact?: QuickImpactItem[];
  campaignPeriod?: string;
  postFrequency?: string;
  heroBackground?: string;
  heroBackgroundPosition?: string;
}

// Web Project Case Study
export interface WebProjectCaseStudy extends BaseCaseStudy {
  type: 'web';
  metrics: WebProjectMetrics;
  screenshots: {
    before?: string;
    after: string;
    label: string;
  }[];
  liveUrl?: string;
  subtitle?: string;
  heroImage?: string;
  challenge?: string[];
  approach?: string[];
  engineeringHighlights?: HighlightItem[];
  featureShowcase?: HighlightItem[];
  performanceMetrics?: LighthouseMetric[];
  performanceSummary?: string;
  projectSnapshot?: {
    metadata: SnapshotMetadataItem[];
    achievements: string[];
  };
  techStackPills?: string[];
  badge?: string;
  mobileShowcase?: {
    images: { src: string; label?: string }[];
    caption?: string;
  };
}

// Union type for all case studies
export type CaseStudy = SocialMediaCaseStudy | WebProjectCaseStudy;

// Card display props
export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onViewCaseStudy: () => void;
  className?: string;
}

// Case study page props
export interface CaseStudyPageProps {
  caseStudy: CaseStudy;
  onBack?: () => void;
  theme?: 'light' | 'dark';
}
