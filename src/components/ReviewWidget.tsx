// src/components/ReviewWidget.tsx

import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import type { Review } from '@/types/index';
import { fetchReviews, getReviewsEndpoints } from '@/services/reviews.service';

const ReviewWidget: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching reviews for ReviewWidget:', {
          error: err,
          endpointsTried: getReviewsEndpoints(),
        });
        setError('Failed to load reviews.');
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadReviews();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {Array.isArray(reviews) && reviews.length > 0 ?(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showReadMoreLink />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">No reviews found.</div>
      )}
    </div>
  );
};

export default ReviewWidget;
