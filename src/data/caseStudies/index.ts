import { daleTiffanySocialCaseStudy } from './daleTiffanySocial';
import { livingBetterLifeSocialCaseStudy } from './livingBetterLifeSocial';
import { awestruckIntelligenceCaseStudy } from './awestruckIntelligence';
import { bamvsthewrldCaseStudy } from './bamvsthewrld';
import type { CaseStudy, SocialMediaCaseStudy, WebProjectCaseStudy } from '@/types/caseStudy';

// Export individual case studies
export { daleTiffanySocialCaseStudy } from './daleTiffanySocial';
export { livingBetterLifeSocialCaseStudy } from './livingBetterLifeSocial';
export { awestruckIntelligenceCaseStudy } from './awestruckIntelligence';
export { bamvsthewrldCaseStudy } from './bamvsthewrld';

// All case studies collection
export const allCaseStudies: CaseStudy[] = [
  awestruckIntelligenceCaseStudy,
  bamvsthewrldCaseStudy,
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
];

// Social media case studies only
export const socialMediaCaseStudies: SocialMediaCaseStudy[] = [
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
];

// Web project case studies only
export const webProjectCaseStudies: WebProjectCaseStudy[] = [
  awestruckIntelligenceCaseStudy,
  bamvsthewrldCaseStudy,
];

// Get case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return allCaseStudies.find((cs) => cs.slug === slug);
}

// Get case studies by type
export function getCaseStudiesByType(type: 'web' | 'social-media'): CaseStudy[] {
  return allCaseStudies.filter((cs) => cs.type === type);
}
