import { daleTiffanySocialCaseStudy } from './daleTiffanySocial';
import { livingBetterLifeSocialCaseStudy } from './livingBetterLifeSocial';
import type { CaseStudy, SocialMediaCaseStudy } from '@/types/caseStudy';

// Export individual case studies
export { daleTiffanySocialCaseStudy } from './daleTiffanySocial';
export { livingBetterLifeSocialCaseStudy } from './livingBetterLifeSocial';

// All case studies collection
export const allCaseStudies: CaseStudy[] = [
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
];

// Social media case studies only
export const socialMediaCaseStudies: SocialMediaCaseStudy[] = [
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
];

// Get case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return allCaseStudies.find((cs) => cs.slug === slug);
}

// Get case studies by type
export function getCaseStudiesByType(type: 'web' | 'social-media'): CaseStudy[] {
  return allCaseStudies.filter((cs) => cs.type === type);
}
