import { useState, useEffect, useCallback } from 'react';
import type { CaseStudy, SocialMediaCaseStudy } from '@/types/caseStudy';

// Import static fallback data
import {
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
} from '@/data/caseStudies';

interface UseCaseStudiesOptions {
  type?: 'web' | 'social-media';
  slug?: string;
  useStaticFallback?: boolean;
}

interface UseCaseStudiesReturn {
  data: CaseStudy[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const API_URL = '/api/case-studies';

// Static fallback data
const staticCaseStudies: SocialMediaCaseStudy[] = [
  daleTiffanySocialCaseStudy,
  livingBetterLifeSocialCaseStudy,
];

export function useCaseStudies(options: UseCaseStudiesOptions = {}): UseCaseStudiesReturn {
  const { type, slug, useStaticFallback = true } = options;
  const [data, setData] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaseStudies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query string
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (slug) params.append('slug', slug);

      const queryString = params.toString();
      const url = queryString ? `${API_URL}?${queryString}` : API_URL;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch case studies: ${response.statusText}`);
      }

      const caseStudies = await response.json();
      setData(caseStudies);
    } catch (err) {
      console.error('Error fetching case studies:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));

      // Use static fallback if enabled
      if (useStaticFallback) {
        console.log('Using static fallback data');
        let fallbackData: CaseStudy[] = staticCaseStudies;

        if (type) {
          fallbackData = fallbackData.filter((cs) => cs.type === type);
        }

        if (slug) {
          fallbackData = fallbackData.filter((cs) => cs.slug === slug);
        }

        setData(fallbackData);
      }
    } finally {
      setIsLoading(false);
    }
  }, [type, slug, useStaticFallback]);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  return { data, isLoading, error, refetch: fetchCaseStudies };
}

// Convenience hook for social media case studies only
export function useSocialMediaCaseStudies() {
  return useCaseStudies({ type: 'social-media' });
}

// Convenience hook for a single case study by slug
export function useCaseStudy(slug: string) {
  const { data, isLoading, error, refetch } = useCaseStudies({ slug });
  return {
    data: data[0] || null,
    isLoading,
    error,
    refetch,
  };
}
