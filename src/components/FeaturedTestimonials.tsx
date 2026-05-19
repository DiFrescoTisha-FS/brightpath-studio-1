import type { Review } from '@/types';
import { getFeaturedLabel } from './featuredTestimonials.utils';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

interface FeaturedTestimonialsProps {
  reviews: Review[];
  className?: string;
}

const FeaturedTestimonials = ({ reviews, className = 'mb-10' }: FeaturedTestimonialsProps) => {
  if (reviews.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {reviews.map((review) => {
        const cleanQuote = stripHtml(review.quote || review.excerpt || '');
        const byline = [review.role, review.company].filter(Boolean).join(' • ');

        return (
          <article
            key={`featured-${review.id}`}
            className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#f8fbff] to-[#edf4ff] dark:from-[#111a31] dark:to-[#1A2238] p-6 md:p-8 shadow-xl text-left"
          >
            <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
              {getFeaturedLabel(review)}
            </div>
            <p className="text-base md:text-lg italic leading-relaxed text-gray-800 dark:text-gray-200 mb-6">
              "{cleanQuote}"
            </p>
            <div className="flex items-center gap-3">
              {review.photoUrl ? (
                <img
                  src={review.photoUrl}
                  alt={review.author || 'Client'}
                  className="w-12 h-12 rounded-lg object-cover border border-primary/20"
                />
              ) : null}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {byline || 'Client Endorsement'}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default FeaturedTestimonials;
