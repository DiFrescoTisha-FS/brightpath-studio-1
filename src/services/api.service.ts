// src/services/api.service.ts

import axios from 'axios';

// API Base URL Configuration:
// Uses relative paths which get redirected via netlify.toml (works with both netlify dev and production)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Distinguishes *why* a data fetch failed, so the UI can say something useful
 * instead of one catch-all message.
 *
 * `dev-proxy` is the common one in local work: the `/api/*` → Netlify function
 * redirects in netlify.toml only apply under `netlify dev` (:8888) or in
 * production. On the bare Vite server (:5173) `/api/phases` falls through to
 * the SPA catch-all and returns index.html with a 200, which used to be
 * reported as a generic load failure.
 */
export type ApiFailureKind = 'dev-proxy' | 'network' | 'server' | 'shape';

export class ApiError extends Error {
  kind: ApiFailureKind;
  detail?: string;

  constructor(kind: ApiFailureKind, message: string, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.detail = detail;
  }
}

const REQUEST_TIMEOUT_MS = 10_000;

/** Fetches the Our Process flip-card phases. Always resolves to an array or throws an ApiError. */
export const getFlipCardPhases = async () => {
  let response;

  try {
    response = await axios.get(`${API_BASE_URL}/api/phases`, {
      timeout: REQUEST_TIMEOUT_MS,
      // Take the body as-is so an HTML fallback can be detected rather than
      // silently parsed into something array-like.
      responseType: 'json',
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new ApiError(
          'server',
          `The phases endpoint returned ${error.response.status}.`,
          typeof error.response.data === 'string' ? error.response.data.slice(0, 200) : undefined,
        );
      }
      throw new ApiError('network', 'Could not reach the phases endpoint.', error.message);
    }
    throw new ApiError('network', 'Could not reach the phases endpoint.');
  }

  const contentType = String(response.headers?.['content-type'] ?? '');
  const data = response.data;

  // The SPA fallback answers with HTML and a 200. Detect it explicitly.
  const looksLikeHtml =
    contentType.includes('text/html') ||
    (typeof data === 'string' && data.trimStart().startsWith('<'));

  if (looksLikeHtml) {
    throw new ApiError(
      'dev-proxy',
      '/api/phases returned HTML instead of JSON — the API redirects are not active.',
      'Run the site with `netlify dev` (http://localhost:8888) rather than `npm run dev`, which does not apply the /api/* redirects from netlify.toml.',
    );
  }

  if (!Array.isArray(data)) {
    throw new ApiError(
      'shape',
      'The phases endpoint returned JSON, but not the expected array.',
      typeof data === 'object' && data !== null ? Object.keys(data).join(', ') : String(data).slice(0, 120),
    );
  }

  return data;
};
