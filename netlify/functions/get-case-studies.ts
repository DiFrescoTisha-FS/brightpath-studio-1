import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://darkslategray-leopard-413935.hostingersite.com';
const CACHE_TTL = 300; // 5 minutes cache

// In-memory cache for serverless function
let cache: {
  data: unknown;
  timestamp: number;
} | null = null;

interface WPTag {
  tag: string;
}

interface WPGoal {
  goal: string;
}

interface WPDeliverable {
  title: string;
  description: string;
  icon?: string;
}

interface WPProcessStep {
  step_number: number;
  title: string;
  description: string;
}

interface WPResult {
  result: string;
}

interface WPTechnology {
  technology: string;
}

interface WPContentSample {
  content_type: 'image' | 'video';
  file: string;
  thumbnail?: string;
  alt_text: string;
  caption?: string;
  platform?: string;
}

interface WPCaseStudyACF {
  case_study_type: 'web' | 'social-media';
  client_name: string;
  industry: string;
  category: string;
  short_description: string;
  featured_image: string;
  hover_image?: string;
  tags?: WPTag[];
  overview: string;
  goals?: WPGoal[];
  deliverables?: WPDeliverable[];
  process_steps?: WPProcessStep[];
  results?: WPResult[];
  tech_stack?: WPTechnology[];
  testimonial?: {
    quote?: string;
    author?: string;
    role?: string;
  };
  // Social Media specific
  platforms?: string[];
  campaign_period?: string;
  post_frequency?: string;
  metrics?: {
    impressions?: string;
    accounts_reached?: string;
    non_follower_reach?: string;
    reporting_period?: string;
    reach?: string;
    engagement?: string;
    followers?: string;
    growth?: string;
    views?: string;
    likes?: string;
    shares?: string;
    comments?: string;
    profile_visits?: string;
    link_taps?: string;
  };
  content_samples?: WPContentSample[];
}

interface WPCaseStudyResponse {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: WPCaseStudyACF;
}

// Transform WordPress data to match React types
function transformWPCaseStudy(wpData: WPCaseStudyResponse) {
  const baseFields = {
    id: wpData.id.toString(),
    slug: wpData.slug,
    type: wpData.acf.case_study_type,
    title: wpData.title.rendered,
    client: wpData.acf.client_name,
    industry: wpData.acf.industry,
    category: wpData.acf.category,
    description: wpData.acf.short_description,
    featuredImage: wpData.acf.featured_image,
    hoverImage: wpData.acf.hover_image,
    tags: wpData.acf.tags?.map((t) => t.tag) || [],
    overview: wpData.acf.overview,
    goals: wpData.acf.goals?.map((g) => g.goal) || [],
    deliverables:
      wpData.acf.deliverables?.map((d) => ({
        title: d.title,
        description: d.description,
        icon: d.icon,
      })) || [],
    process:
      wpData.acf.process_steps?.map((s) => ({
        step: s.step_number,
        title: s.title,
        description: s.description,
      })) || [],
    results: wpData.acf.results?.map((r) => r.result) || [],
    techStack: wpData.acf.tech_stack?.map((t) => t.technology) || [],
    testimonial: wpData.acf.testimonial?.quote
      ? {
          quote: wpData.acf.testimonial.quote,
          author: wpData.acf.testimonial.author || '',
          role: wpData.acf.testimonial.role || '',
        }
      : undefined,
  };

  if (wpData.acf.case_study_type === 'social-media') {
    return {
      ...baseFields,
      platforms: wpData.acf.platforms || [],
      campaignPeriod: wpData.acf.campaign_period,
      postFrequency: wpData.acf.post_frequency,
      metrics: {
        impressions: wpData.acf.metrics?.impressions,
        accountsReached: wpData.acf.metrics?.accounts_reached,
        nonFollowerReach: wpData.acf.metrics?.non_follower_reach,
        reportingPeriod: wpData.acf.metrics?.reporting_period,
        reach: wpData.acf.metrics?.reach,
        engagement: wpData.acf.metrics?.engagement,
        followers: wpData.acf.metrics?.followers,
        growth: wpData.acf.metrics?.growth,
        views: wpData.acf.metrics?.views,
        likes: wpData.acf.metrics?.likes,
        shares: wpData.acf.metrics?.shares,
        comments: wpData.acf.metrics?.comments,
        profileVisits: wpData.acf.metrics?.profile_visits,
        linkTaps: wpData.acf.metrics?.link_taps,
      },
      contentSamples:
        wpData.acf.content_samples?.map((c) => ({
          id: `${wpData.id}-${c.alt_text}`.replace(/\s+/g, '-').toLowerCase(),
          type: c.content_type,
          src: c.file,
          thumbnail: c.thumbnail,
          alt: c.alt_text,
          caption: c.caption,
          platform: c.platform,
        })) || [],
    };
  }

  return baseFields;
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`,
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check in-memory cache
    const now = Date.now();
    if (cache && now - cache.timestamp < CACHE_TTL * 1000) {
      return {
        statusCode: 200,
        headers: { ...headers, 'X-Cache': 'HIT' },
        body: JSON.stringify(cache.data),
      };
    }

    // Parse query parameters
    const type = event.queryStringParameters?.type; // 'web' | 'social-media'
    const slug = event.queryStringParameters?.slug;

    // Build WordPress API URL
    let apiUrl = `${WORDPRESS_URL}/wp-json/wp/v2/case_study?_embed&per_page=100`;

    if (slug) {
      apiUrl = `${WORDPRESS_URL}/wp-json/wp/v2/case_study?slug=${encodeURIComponent(slug)}&_embed`;
    }

    // Fetch from WordPress
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}: ${response.statusText}`);
    }

    const wpData: WPCaseStudyResponse[] = await response.json();

    // Transform data
    let transformedData = wpData.map(transformWPCaseStudy);

    // Filter by type if specified
    if (type && !slug) {
      transformedData = transformedData.filter((cs) => cs.type === type);
    }

    // Update cache
    cache = {
      data: transformedData,
      timestamp: now,
    };

    return {
      statusCode: 200,
      headers: { ...headers, 'X-Cache': 'MISS' },
      body: JSON.stringify(transformedData),
    };
  } catch (error) {
    console.error('Error fetching case studies:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch case studies',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };
