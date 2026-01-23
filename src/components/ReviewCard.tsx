'use client'; 

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Review } from '@/types/index';
import { useAppStore } from '@/store/appStore';
import BrightPathGradientTitle from './BrightPathGradientTitle';

const ReviewCard = ({ review }: { review: Review }) => {
  const { theme } = useAppStore();
  return (
    <motion.div 
      className={`p-8 rounded-lg flex flex-col items-center text-center ${theme === 'dark'? 'bg-[#1A2238] text-white border border-primary/30 shadow-glow-primary' : 'bg-gray-50 shadow-md border border-primary/30'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {review.photoUrl && (
        <img 
          src={review.photoUrl} 
          alt={review.author} 
          className="w-20 h-20 object-cover mb-4 rounded-lg shadow-md"
        />
      )}
      
      <div className="flex items-center space-x-2 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < review.rating ? 'text-primary' : 'text-muted-foreground'}`} 
            fill="currentColor"
          />
        ))}
      </div>
      
      {review.excerpt && (
        <p className="text-base font-lato mb-3 text-muted-foreground font-semibold">
          {review.excerpt}
        </p>
      )}
      
      <p className="text-lg font-lato italic text-muted-foreground leading-relaxed mb-4 flex-grow">"{review.quote}"</p>
      
      <div className="mt-auto">
        <BrightPathGradientTitle as="h4" className="font-poppins font-bold text-lg">{review.author}</BrightPathGradientTitle>
        <p className="text-sm text-muted-foreground">Client Review</p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
