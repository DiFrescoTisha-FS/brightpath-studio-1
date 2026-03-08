'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Review } from '@/types';
import { useAppStore } from '@/store/appStore';
import BrightPathGradientTitle from './BrightPathGradientTitle';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

interface ReviewCardProps {
  review: Review;
  showFullQuote?: boolean;
  showReadMoreLink?: boolean;
}

const ReviewCard = ({ review, showFullQuote = false, showReadMoreLink = false }: ReviewCardProps) => {
  const { theme } = useAppStore();

  const cardClasses =
    theme === 'dark'
      ? 'bg-[#1A2238] text-white border border-primary/30 shadow-glow-primary'
      : 'bg-gray-50 text-secondary-foreground border border-primary/30 shadow-md';

  const cleanExcerpt = review.excerpt ? stripHtml(review.excerpt) : '';
  const cleanQuote = review.quote ? stripHtml(review.quote) : '';
  const displayText = showFullQuote ? (cleanQuote || cleanExcerpt) : (cleanExcerpt || cleanQuote);
  const shouldShowReadMore = showReadMoreLink && !showFullQuote && Boolean(cleanQuote);

  return (
    <motion.div
      className={`p-8 rounded-lg flex flex-col items-center text-center ${cardClasses}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {review.photoUrl ? (
        <img
          src={review.photoUrl}
          alt={review.author || 'Client'}
          className="w-20 h-20 object-cover mb-4 rounded-lg shadow-md"
        />
      ) : null}

      <div className="flex items-center space-x-2 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < (Number(review.rating) || 0) ? 'text-primary' : 'text-muted-foreground'}`}
            fill="currentColor"
          />
        ))}
      </div>

      {/* ✅ Render excerpt OR quote (never blank unless both truly missing) */}
      {displayText ? (
        <div className="mb-4 flex-grow">
          <p className="text-lg font-lato italic leading-relaxed text-muted-foreground">
            “{displayText}”
          </p>
          {shouldShowReadMore ? (
            <Link
              to="/reviews"
              className="inline-block mt-3 text-sm font-semibold text-primary hover:underline"
            >
              Read more
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="mt-auto">
        <BrightPathGradientTitle as="h4" className="font-poppins font-bold text-lg">
          {review.author}
        </BrightPathGradientTitle>

        {/* Optional line if you add role/company later */}
        {(review.role || review.company) ? (
          <p className="text-sm text-muted-foreground">
            {[review.role, review.company].filter(Boolean).join(' • ')}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Client Review</p>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;
