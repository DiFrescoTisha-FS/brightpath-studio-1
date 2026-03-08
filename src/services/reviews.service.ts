import axios from "axios";
import type { Review, WpReviewPost, WpImage } from "@/types";

/**
 * Review API endpoints in priority order.
 * 1) Explicit base URL from Vite env
 * 2) Same-origin /api route
 * 3) Netlify functions fallback
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const API_CANDIDATES = [
  `${API_BASE_URL}/api/reviews`,
  "/api/reviews",
  "/.netlify/functions/reviews",
];

const stripHtml = (html: string): string =>
  (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const makeExcerpt = (text: string, max = 180): string => {
  const clean = stripHtml(text);
  if (!clean) return "";
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, "").trim() + "…";
};

// ✅ Normalize ACF headshot that can be either a string URL or { url, alt }
const getHeadshotUrl = (headshot?: string | WpImage): string => {
  if (!headshot) return "";
  if (typeof headshot === "string") return headshot;
  return headshot.url || "";
};

export const fetchReviews = async (): Promise<Review[]> => {
  let lastError: unknown = null;

  for (const endpoint of API_CANDIDATES) {
    try {
      const response = await axios.get<WpReviewPost[]>(endpoint);

      return response.data.map((post) => {
        const acf = post.acf ?? ({} as WpReviewPost["acf"]);

        const acfExcerpt = stripHtml(acf.review_excerpt ?? "");
        const wpExcerpt = stripHtml(post.excerpt?.rendered ?? "");
        const fullText = stripHtml(acf.review_text ?? "");

        const excerpt = acfExcerpt || wpExcerpt || makeExcerpt(fullText, 180);

        return {
          id: Number(post.id),
          rating: Number(acf.rating ?? 0),
          author: acf.reviewer_name ?? "",
          quote: fullText,
          excerpt,
          photoUrl: getHeadshotUrl(acf.client_headshot),
          reviewDate: acf.review_date || "",
          role: acf.reviewer_role || "",
          company: acf.reviewer_company || "",
          featured: Boolean(acf.featured),
          projectContext: acf.project_context || "",
        };
      });
    } catch (error: unknown) {
      lastError = error;
      if (axios.isAxiosError(error)) {
        console.error("Error fetching reviews:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: endpoint,
        });
      } else {
        console.error("Unknown error fetching reviews:", error);
      }
    }
  }

  console.error("All review API endpoints failed.", { endpoints: API_CANDIDATES, lastError });
  throw new Error("Failed to fetch reviews.");
};
