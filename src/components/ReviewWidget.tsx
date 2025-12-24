// src/components/ReviewWidget.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';
import { Review, MyReviewsResponse } from '@/types/index';

// === FIX APPLIED HERE: Define the API URL ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
const REVIEWS_URL = `${API_BASE_URL}/api/reviews`;
// ===========================================

const ReviewWidget: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<MyReviewsResponse[]>(
          REVIEWS_URL
        );

        // This is the crucial data mapping step!
        const formattedReviews: Review[] = response.data.map((item) => ({
          id: item.id,
          author: item.acf.reviewer_name,
          quote: item.acf.review_text,
          rating: item.acf.star_rating,
          photoUrl: '', // This field isn't in our current API, so we use a placeholder.
          reviewDate: item.date, // Map the review date for a consistent type.
        }));

        setReviews(formattedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">No reviews found.</div>
      )}
    </div>
  );
};

export default ReviewWidget;