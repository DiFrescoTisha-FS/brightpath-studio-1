// src/services/api/reviews.service.ts
import axios from 'axios';
import { WpReviewPost, Review } from '@/types';

// API Base URL Configuration:
// - In production (Netlify): Uses relative paths which get redirected via netlify.toml
// - In development: Falls back to localhost:3002 for the local Express server
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '' : 'http://localhost:3002');
const API_REVIEWS_PATH = '/api/reviews';
const FULL_API_URL = `${API_BASE_URL}${API_REVIEWS_PATH}`;

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get<WpReviewPost[]>(FULL_API_URL);

    return response.data.map((review) => ({
      // Convert the incoming ID to a NUMBER, as required by the Review type.
      id: Number(review.id),

      // Map WordPress excerpt field (it comes as {rendered: "text"})
      excerpt: review.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',

      // Keep existing ACF mapping
      rating: review.acf.rating,
      author: review.acf.reviewer_name,
      quote: review.acf.review_text,
      photoUrl: review.acf.client_headshot?.url || '',
      reviewDate: review.acf.review_date,
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews.');
  }
};
