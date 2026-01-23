import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ReviewCard from "../ReviewCard";
import type { Review } from "@/types/index";

// WordPress API response structure
interface WordPressReview {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    reviewer_name: string;
    review_excerpt: string;
    review_text: string;
    rating: number;
    client_headshot?: string;
    review_date: string;
    reviewer_role?: string;
    reviewer_company?: string;
    project_context?: string;
  };
}

const ReviewsList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://bskfporucm.wpdns.site/wp-json/wp/v2/reviews?_embed"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: WordPressReview[] = await response.json();

        // Transform WordPress data to Review format
        const formattedReviews: Review[] = data.map((item) => ({
          id: item.id,
          author: item.acf.reviewer_name,
          excerpt: item.acf.review_excerpt,
          quote: item.acf.review_text,
          rating: item.acf.rating,
          photoUrl: item.acf.client_headshot || '',
          reviewDate: item.acf.review_date,
        }));

        setReviews(formattedReviews);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2C94C] mx-auto mb-4"></div>
          <p className="text-[#1A2238] font-lato text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F2C94C] text-[#1A2238] font-bold py-2 px-4 rounded hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#1A2238] mb-4">
            Client Reviews
          </h2>
          <p className="text-lg text-gray-600 font-lato max-w-2xl mx-auto">
            See what our clients have to say about working with BrightPath Web
            Studio
          </p>
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </AnimatePresence>

        {reviews.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-lato text-lg">
              No reviews available at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
