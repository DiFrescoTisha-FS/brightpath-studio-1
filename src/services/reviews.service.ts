import axios from "axios";
import type { Review, WpReviewPost, WpImage } from "@/types";

/**
 * API Base URL Configuration:
 * - In production (Netlify): Uses relative paths which get redirected via netlify.toml
 * - In development: Falls back to localhost:3002 for the local Express server
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:3002");

const API_REVIEWS_PATH = "/api/reviews";
const FULL_API_URL = `${API_BASE_URL}${API_REVIEWS_PATH}`;

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
  try {
    const response = await axios.get<WpReviewPost[]>(FULL_API_URL);

    return response.data.map((post) => {
      const acf = post.acf ?? ({} as WpReviewPost["acf"]);

      // 1) Prefer ACF short excerpt
      const acfExcerpt = stripHtml(acf.review_excerpt ?? "");

      // 2) WP excerpt as backup (often empty)
      const wpExcerpt = stripHtml(post.excerpt?.rendered ?? "");

      // 3) Full review text (ACF)
      const fullText = stripHtml(acf.review_text ?? "");

      const excerpt = acfExcerpt || wpExcerpt || makeExcerpt(fullText, 180);

      return {
        id: Number(post.id),
        rating: Number(acf.rating ?? 0),
        author: acf.reviewer_name ?? "",
        quote: fullText,
        excerpt,

        // ✅ fixed
        photoUrl: getHeadshotUrl(acf.client_headshot),

        reviewDate: acf.review_date || "",

        // optional extras (safe)
        role: acf.reviewer_role || "",
        company: acf.reviewer_company || "",
        featured: Boolean(acf.featured),
        projectContext: acf.project_context || "",
      };
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews.");
  }
};
