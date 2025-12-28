// src/types/index.ts

/**
 * @typedef {object} WpImage - A type for the image object returned by the WordPress API.
 * The 'url' field is the most important for our frontend.
 * @property {string} url - The URL of the image.
 * @property {string} alt - The alt text of the image.
 */
export type WpImage = {
    url: string;
    alt: string;
};

/**
 * @typedef {object} AcfFields - The custom fields from ACF.
 * This directly matches the keys in your 'Review Details' field group.
 * @property {string} reviewer_name - The name of the reviewer (ACF Field: 'reviewer_name').
 * @property {string} review_text - The main review text (ACF Field: 'review_text').
 * @property {WpImage} client_headshot - The client's headshot image object (ACF Field: 'client_headshot').
 * @property {number} rating - The numerical rating (ACF Field: 'rating').
 * @property {string} review_date - The date of the review (ACF Field: 'review_date').
 */
export type AcfFields = {
    reviewer_name: string;
    review_text: string;
    client_headshot: WpImage;
    rating: number;
    review_date: string;
};

/**
 * @typedef {object} WpContent - The raw data structure from the WordPress API for rendered content.
 * @property {string} rendered - The HTML-rendered content.
 */
export type WpContent = {
    rendered: string;
};

/**
 * @typedef {object} WpReviewPost - The raw data structure for a single review post from the WordPress API.
 * This is what our backend will receive.
 * @property {number} id - The unique ID of the review post.
 * @property {WpContent} title - The title of the review post.
 * @property {WpContent} content - The main content of the review.
 * @property {AcfFields} acf - The custom fields from ACF.
 */
export type WpReviewPost = {
    id: number;
    title: WpContent;
    content: WpContent;
    acf: AcfFields;
};

// ===========================================
// NEW INTERFACES FOR UI CONSISTENCY
// ===========================================

/**
 * @typedef {object} Review - The simplified data structure for our front-end components.
 * This is what our UI will consume after processing the raw API response.
 * @property {number} rating - The numerical star rating.
 * @property {string} author - The name of the reviewer.
 * @property {string} quote - The main review text.
 * @property {string} photoUrl - The URL of the reviewer's photo.
 * @property {string} reviewDate - The date of the review.
 */
export interface Review {
  id: number;
  rating: number;
  author: string;
  quote: string;
  photoUrl?: string; // The '?' makes this field optional
  reviewDate?: string;
}

/**
 * @typedef {object} MyReviewsResponse - The data structure from our backend API endpoint.
 * This helps us match the incoming data from the backend to our internal types.
 * @property {number} id - The ID of the review post.
 * @property {object} acf - The custom ACF fields.
 * @property {string} acf.reviewer_name - The reviewer's name.
 * @property {string} acf.review_text - The review text.
 * @property {number} acf.star_rating - The star rating.
 * @property {string} date - The date of the review post.
 */
export interface MyReviewsResponse {
  id: number;
  acf: {
    reviewer_name: string;
    review_text: string;
    rating: number;
    review_date?: string;
    client_headshot?: {
      url: string;
      alt?: string;
    };
  };
  date: string;
}