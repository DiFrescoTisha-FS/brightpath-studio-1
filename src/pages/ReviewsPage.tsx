'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { useReviews } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';
import ReviewCard from '@/components/ReviewCard';
import type { Review } from '@/types';

const ReviewsPage = () => {
  const { theme } = useAppStore();
  const { reviews, loading, error } = useReviews();

  const buttonClasses =
    theme === 'dark'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90 text-shadow-md'
      : 'bg-primary border-2 border-primary text-secondary hover:bg-primary/90 text-shadow-md';

  return (
    <div className="container py-16 pt-28">
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <BrightPathGradientTitle
          as="h1"
          className="text-4xl md:text-6xl font-poppins font-bold mb-4"
          gradientWords={['Clients']}
        >
          What Our Clients Say
        </BrightPathGradientTitle>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Hearing from our clients is the ultimate reward. Their success stories are the foundation of our
          mission to illuminate the digital world.
        </p>
      </motion.section>

      {loading && (
        <div className="text-center text-lg text-muted-foreground">Loading reviews...</div>
      )}

      {error && (
        <div className="text-center text-lg text-destructive">
          Failed to load reviews. Please try again later.
        </div>
      )}

      {!loading && !error && reviews?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(reviews as Review[]).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {!loading && !error && (!reviews || reviews.length === 0) && (
        <div className="text-center text-lg text-muted-foreground">No reviews to display yet.</div>
      )}

      <div className="text-center mt-12">
        <Link to="/">
          <Button size="lg" className={buttonClasses}>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewsPage;
