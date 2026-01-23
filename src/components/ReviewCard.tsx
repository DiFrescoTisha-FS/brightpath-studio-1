'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Review } from '@/types';
import { useAppStore } from '@/store/appStore';
import BrightPathGradientTitle from './BrightPathGradientTitle';

const ReviewCard = ({ review }: { review: Review }) => {
  const { theme } = useAppStore();

  const cardClasses =
    theme === 'dark'
      ? 'bg-[#1A2238] text-white border border-primary/30 shadow-glow-primary'
      : 'bg-gray-50 text-secondary-foreground border border-primary/30 shadow-md';

  const displayText = (review.excerpt && review.excerpt.trim()) || review.quote || '';

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
            className={`w-5 h-5 ${i < (review.rating || 0) ? 'text-primary' : 'text-muted-foreground'}`}
            fill="currentColor"
          />
        ))}
      </div>

      <p className="text-lg font-lato italic text-muted-foreground leading-relaxed mb-4 flex-grow">
        {displayText ? `"${displayText}"` : ''}
      </p>

      <div className="mt-auto">
        <BrightPathGradientTitle as="h4" className="font-poppins font-bold text-lg">
          {review.author}
        </BrightPathGradientTitle>
        <p className="text-sm text-muted-foreground">Client Review</p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
