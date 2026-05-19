import type { Review } from '@/types';

const FEATURED_AUTHORS = ['bridget', 'marlene'];

export const getFeaturedLabel = (review: Review): string => {
  const author = review.author?.toLowerCase() || '';

  if (author.includes('bridget')) return 'Featured Endorsement • Living Better Life';
  if (author.includes('marlene')) return 'Featured Endorsement • Angel City Massage';
  if (review.projectContext) return `Featured Endorsement • ${review.projectContext}`;
  if (review.company) return `Featured Endorsement • ${review.company}`;

  return 'Featured Endorsement';
};

export const splitFeaturedReviews = (reviews: Review[], maxFeatured: number = 2) => {
  const featuredFromNames = FEATURED_AUTHORS
    .map((name) => reviews.find((review) => review.author?.toLowerCase().includes(name)))
    .filter((review): review is Review => Boolean(review));

  const featuredReviews = [...featuredFromNames];
  if (featuredReviews.length < maxFeatured) {
    const fallback = reviews
      .filter((review) => !featuredReviews.some((item) => item.id === review.id))
      .slice(0, maxFeatured - featuredReviews.length);
    featuredReviews.push(...fallback);
  }

  const featuredIds = new Set(featuredReviews.map((review) => review.id));
  const remainingReviews = reviews.filter((review) => !featuredIds.has(review.id));

  return { featuredReviews, remainingReviews };
};
