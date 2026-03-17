import axios from "axios";
import type { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
import type { Review, WpReviewPost, WpImage } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const isHtmlResponse = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim().toLowerCase();
  return trimmed.startsWith("<!doctype html") || trimmed.startsWith("<html") || trimmed.includes("<body");
};

const getContentType = (
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders
): string => {
  const contentType = headers?.["content-type"];
  return Array.isArray(contentType) ? contentType.join(", ") : contentType || "";
};

const isNetlifyDevOrigin = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" &&
    window.location.port === "8888"
  );
};

const isProductionOrigin = (): boolean => {
  if (typeof window === "undefined") return import.meta.env.PROD;
  return !["localhost", "127.0.0.1"].includes(window.location.hostname);
};

export const getReviewsEndpoints = (): string[] => {
  const endpoints: string[] = [];

  if (API_BASE_URL) {
    endpoints.push(`${API_BASE_URL.replace(/\/$/, "")}/api/reviews`);
  }

  if (isNetlifyDevOrigin() || isProductionOrigin()) {
    endpoints.push("/api/reviews", "/.netlify/functions/reviews");
  }

  return [...new Set(endpoints)];
};

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
  const endpoints = getReviewsEndpoints();

  if (endpoints.length === 0) {
    const environmentHint =
      "Reviews are served by the Netlify function redirect in production and via `netlify dev` locally. " +
      "Plain `vite`/`vite preview` does not provide `/api/reviews` unless `VITE_API_URL` points to a real backend.";
    console.error("No valid review API endpoint is available for this environment.", {
      apiBaseUrl: API_BASE_URL || null,
      origin: typeof window !== "undefined" ? window.location.origin : null,
      hint: environmentHint,
    });
    throw new Error("No valid review API endpoint is configured.");
  }

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get<WpReviewPost[] | { data?: WpReviewPost[]; reviews?: WpReviewPost[] } | string>(endpoint);

      const contentType = getContentType(response.headers);

      if (contentType.includes("text/html") || isHtmlResponse(response.data)) {
        const preview =
          typeof response.data === "string"
            ? response.data.slice(0, 160)
            : null;
        console.error("Reviews endpoint returned HTML instead of JSON.", {
          url: endpoint,
          contentType,
          preview,
          hint: "Use `netlify dev` for local Netlify Functions, or set `VITE_API_URL` to a backend that serves `/api/reviews`.",
        });
        continue;
      }

      const rawPosts = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data?.reviews)
            ? response.data.reviews
            : null;

      if (!Array.isArray(rawPosts)) {
        console.error("Unexpected reviews response shape.", {
          url: endpoint,
          contentType,
          data: response.data,
        });
        continue;
      }

      return rawPosts.map((post) => {
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

  console.error("All review API endpoints failed.", { endpoints, lastError });
  throw new Error("Failed to fetch reviews.");
};
