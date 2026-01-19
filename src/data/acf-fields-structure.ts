/**
 * WordPress ACF Field Structure for Case Studies
 *
 * This file documents the recommended ACF field structure for pulling
 * case study content from WordPress. The structure maps directly to
 * the TypeScript interfaces defined in @/types/caseStudy.ts
 *
 * ACF Field Groups:
 * 1. Case Study Base Fields (applies to all case studies)
 * 2. Social Media Case Study Fields (extends base)
 * 3. Web Project Case Study Fields (extends base)
 */

export const acfFieldStructure = {
  /**
   * Field Group: Case Study Base
   * Post Type: case_study (custom post type)
   * Location: case_study post type
   */
  caseStudyBase: {
    groupName: 'case_study_base',
    fields: [
      {
        name: 'case_study_type',
        label: 'Case Study Type',
        type: 'select',
        choices: {
          web: 'Web Project',
          'social-media': 'Social Media',
        },
        required: true,
        instructions: 'Select the type of case study',
      },
      {
        name: 'client_name',
        label: 'Client Name',
        type: 'text',
        required: true,
      },
      {
        name: 'industry',
        label: 'Industry',
        type: 'text',
        required: true,
        instructions: 'e.g., Luxury Lighting, Wellness & Lifestyle',
      },
      {
        name: 'category',
        label: 'Category',
        type: 'text',
        required: true,
        instructions: 'e.g., Social Media Management, Web Development',
      },
      {
        name: 'short_description',
        label: 'Short Description',
        type: 'textarea',
        required: true,
        maxLength: 200,
        instructions: 'Brief description for cards (max 200 chars)',
      },
      {
        name: 'featured_image',
        label: 'Featured Image',
        type: 'image',
        returnFormat: 'url',
        required: true,
      },
      {
        name: 'hover_image',
        label: 'Hover Image',
        type: 'image',
        returnFormat: 'url',
        required: false,
        instructions: 'Optional image shown on card hover',
      },
      {
        name: 'tags',
        label: 'Tags',
        type: 'repeater',
        subFields: [
          {
            name: 'tag',
            label: 'Tag',
            type: 'text',
          },
        ],
        buttonLabel: 'Add Tag',
      },
      {
        name: 'overview',
        label: 'Overview',
        type: 'wysiwyg',
        required: true,
        instructions: 'Detailed project overview paragraph',
      },
      {
        name: 'goals',
        label: 'Project Goals',
        type: 'repeater',
        subFields: [
          {
            name: 'goal',
            label: 'Goal',
            type: 'text',
          },
        ],
        buttonLabel: 'Add Goal',
        min: 1,
      },
      {
        name: 'deliverables',
        label: 'Deliverables',
        type: 'repeater',
        subFields: [
          {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
          },
          {
            name: 'icon',
            label: 'Icon Name',
            type: 'text',
            instructions: 'Lucide icon name (optional)',
          },
        ],
        buttonLabel: 'Add Deliverable',
      },
      {
        name: 'process_steps',
        label: 'Process Steps',
        type: 'repeater',
        subFields: [
          {
            name: 'step_number',
            label: 'Step Number',
            type: 'number',
            required: true,
          },
          {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true,
          },
        ],
        buttonLabel: 'Add Step',
      },
      {
        name: 'results',
        label: 'Results',
        type: 'repeater',
        subFields: [
          {
            name: 'result',
            label: 'Result',
            type: 'text',
          },
        ],
        buttonLabel: 'Add Result',
      },
      {
        name: 'tech_stack',
        label: 'Tech Stack',
        type: 'repeater',
        subFields: [
          {
            name: 'technology',
            label: 'Technology',
            type: 'text',
          },
        ],
        buttonLabel: 'Add Technology',
        instructions: 'Optional: List technologies used',
      },
      {
        name: 'testimonial',
        label: 'Testimonial',
        type: 'group',
        subFields: [
          {
            name: 'quote',
            label: 'Quote',
            type: 'textarea',
          },
          {
            name: 'author',
            label: 'Author Name',
            type: 'text',
          },
          {
            name: 'role',
            label: 'Author Role/Company',
            type: 'text',
          },
        ],
        instructions: 'Optional client testimonial',
      },
    ],
  },

  /**
   * Field Group: Social Media Fields
   * Conditional: Show when case_study_type == 'social-media'
   */
  socialMediaFields: {
    groupName: 'social_media_fields',
    conditionalLogic: [
      {
        field: 'case_study_type',
        operator: '==',
        value: 'social-media',
      },
    ],
    fields: [
      {
        name: 'platforms',
        label: 'Platforms',
        type: 'checkbox',
        choices: {
          instagram: 'Instagram',
          facebook: 'Facebook',
          tiktok: 'TikTok',
          youtube: 'YouTube',
          linkedin: 'LinkedIn',
          twitter: 'Twitter',
        },
        required: true,
      },
      {
        name: 'campaign_period',
        label: 'Campaign Period',
        type: 'text',
        instructions: 'e.g., "January 2024 - Present", "Q1 2024"',
      },
      {
        name: 'post_frequency',
        label: 'Post Frequency',
        type: 'text',
        instructions: 'e.g., "3-5 posts per week"',
      },
      {
        name: 'metrics',
        label: 'Social Media Metrics',
        type: 'group',
        subFields: [
          {
            name: 'impressions',
            label: 'Impressions',
            type: 'text',
            instructions: 'e.g., "2.5M+"',
          },
          {
            name: 'reach',
            label: 'Reach',
            type: 'text',
            instructions: 'e.g., "850K+"',
          },
          {
            name: 'engagement',
            label: 'Engagement Rate',
            type: 'text',
            instructions: 'e.g., "4.8%"',
          },
          {
            name: 'followers',
            label: 'Followers',
            type: 'text',
            instructions: 'e.g., "45K+"',
          },
          {
            name: 'growth',
            label: 'Growth',
            type: 'text',
            instructions: 'e.g., "+127%"',
          },
          {
            name: 'views',
            label: 'Views',
            type: 'text',
          },
          {
            name: 'likes',
            label: 'Likes',
            type: 'text',
          },
          {
            name: 'shares',
            label: 'Shares',
            type: 'text',
          },
          {
            name: 'comments',
            label: 'Comments',
            type: 'text',
          },
        ],
      },
      {
        name: 'content_samples',
        label: 'Content Samples',
        type: 'repeater',
        subFields: [
          {
            name: 'content_type',
            label: 'Type',
            type: 'select',
            choices: {
              image: 'Image',
              video: 'Video',
            },
            required: true,
          },
          {
            name: 'file',
            label: 'Image/Video File',
            type: 'file',
            returnFormat: 'url',
            mimeTypes: 'jpg,jpeg,png,gif,mp4,webm,mov',
            required: true,
          },
          {
            name: 'thumbnail',
            label: 'Video Thumbnail',
            type: 'image',
            returnFormat: 'url',
            conditionalLogic: [
              {
                field: 'content_type',
                operator: '==',
                value: 'video',
              },
            ],
          },
          {
            name: 'alt_text',
            label: 'Alt Text',
            type: 'text',
            required: true,
          },
          {
            name: 'caption',
            label: 'Caption',
            type: 'text',
          },
          {
            name: 'platform',
            label: 'Platform',
            type: 'select',
            choices: {
              instagram: 'Instagram',
              facebook: 'Facebook',
              tiktok: 'TikTok',
              youtube: 'YouTube',
              linkedin: 'LinkedIn',
              twitter: 'Twitter',
            },
          },
        ],
        buttonLabel: 'Add Content Sample',
      },
    ],
  },

  /**
   * Field Group: Web Project Fields
   * Conditional: Show when case_study_type == 'web'
   */
  webProjectFields: {
    groupName: 'web_project_fields',
    conditionalLogic: [
      {
        field: 'case_study_type',
        operator: '==',
        value: 'web',
      },
    ],
    fields: [
      {
        name: 'live_url',
        label: 'Live Website URL',
        type: 'url',
        instructions: 'URL to the live website',
      },
      {
        name: 'web_metrics',
        label: 'Web Project Metrics',
        type: 'group',
        subFields: [
          {
            name: 'page_speed',
            label: 'Page Speed',
            type: 'text',
            instructions: 'e.g., "95/100"',
          },
          {
            name: 'conversion_rate',
            label: 'Conversion Rate',
            type: 'text',
          },
          {
            name: 'bounce_rate',
            label: 'Bounce Rate',
            type: 'text',
          },
          {
            name: 'load_time',
            label: 'Load Time',
            type: 'text',
          },
          {
            name: 'mobile_score',
            label: 'Mobile Score',
            type: 'text',
          },
          {
            name: 'seo_score',
            label: 'SEO Score',
            type: 'text',
          },
        ],
      },
      {
        name: 'screenshots',
        label: 'Before/After Screenshots',
        type: 'repeater',
        subFields: [
          {
            name: 'label',
            label: 'Screenshot Label',
            type: 'text',
            required: true,
            instructions: 'e.g., "Homepage", "Contact Page"',
          },
          {
            name: 'before_image',
            label: 'Before Image',
            type: 'image',
            returnFormat: 'url',
            instructions: 'Leave empty for new features',
          },
          {
            name: 'after_image',
            label: 'After Image',
            type: 'image',
            returnFormat: 'url',
            required: true,
          },
        ],
        buttonLabel: 'Add Screenshot',
      },
    ],
  },
};

/**
 * Example WordPress REST API endpoint structure
 * for fetching case studies
 */
export const wpApiEndpoints = {
  // Get all case studies
  allCaseStudies: '/wp-json/wp/v2/case_study',

  // Get single case study by slug
  singleCaseStudy: '/wp-json/wp/v2/case_study?slug={slug}',

  // Get case studies by type
  byType: '/wp-json/wp/v2/case_study?meta_key=case_study_type&meta_value={type}',

  // Custom endpoint for formatted case study data
  formatted: '/wp-json/brightpath/v1/case-studies',
};

/**
 * WordPress REST API Response Types
 */
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

interface WPTestimonial {
  quote?: string;
  author?: string;
  role?: string;
}

interface WPSocialMetrics {
  impressions?: string;
  reach?: string;
  engagement?: string;
  followers?: string;
  growth?: string;
  views?: string;
  likes?: string;
  shares?: string;
  comments?: string;
}

interface WPWebMetrics {
  page_speed?: string;
  conversion_rate?: string;
  bounce_rate?: string;
  load_time?: string;
  mobile_score?: string;
  seo_score?: string;
}

interface WPContentSample {
  content_type: 'image' | 'video';
  file: string;
  thumbnail?: string;
  alt_text: string;
  caption?: string;
  platform?: string;
}

interface WPScreenshot {
  label: string;
  before_image?: string;
  after_image: string;
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
  testimonial?: WPTestimonial;
  // Social Media specific
  platforms?: string[];
  campaign_period?: string;
  post_frequency?: string;
  metrics?: WPSocialMetrics;
  content_samples?: WPContentSample[];
  // Web Project specific
  live_url?: string;
  web_metrics?: WPWebMetrics;
  screenshots?: WPScreenshot[];
}

interface WPCaseStudyResponse {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: WPCaseStudyACF;
}

/**
 * Example fetch function for WordPress integration
 */
export const fetchCaseStudiesFromWP = async (baseUrl: string): Promise<WPCaseStudyResponse[]> => {
  const response = await fetch(`${baseUrl}/wp-json/brightpath/v1/case-studies`);
  const data = await response.json();
  return data;
};

/**
 * Example data transformation from WordPress ACF to React types
 */
export const transformWPCaseStudy = (wpData: WPCaseStudyResponse) => {
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
    tags: wpData.acf.tags?.map((t: WPTag) => t.tag) || [],
    overview: wpData.acf.overview,
    goals: wpData.acf.goals?.map((g: WPGoal) => g.goal) || [],
    deliverables: wpData.acf.deliverables?.map((d: WPDeliverable) => ({
      title: d.title,
      description: d.description,
      icon: d.icon,
    })) || [],
    process: wpData.acf.process_steps?.map((s: WPProcessStep) => ({
      step: s.step_number,
      title: s.title,
      description: s.description,
    })) || [],
    results: wpData.acf.results?.map((r: WPResult) => r.result) || [],
    techStack: wpData.acf.tech_stack?.map((t: WPTechnology) => t.technology) || [],
    testimonial: wpData.acf.testimonial?.quote ? {
      quote: wpData.acf.testimonial.quote,
      author: wpData.acf.testimonial.author,
      role: wpData.acf.testimonial.role,
    } : undefined,
  };

  if (wpData.acf.case_study_type === 'social-media') {
    return {
      ...baseFields,
      platforms: wpData.acf.platforms || [],
      campaignPeriod: wpData.acf.campaign_period,
      postFrequency: wpData.acf.post_frequency,
      metrics: {
        impressions: wpData.acf.metrics?.impressions,
        reach: wpData.acf.metrics?.reach,
        engagement: wpData.acf.metrics?.engagement,
        followers: wpData.acf.metrics?.followers,
        growth: wpData.acf.metrics?.growth,
        views: wpData.acf.metrics?.views,
        likes: wpData.acf.metrics?.likes,
        shares: wpData.acf.metrics?.shares,
        comments: wpData.acf.metrics?.comments,
      },
      contentSamples: wpData.acf.content_samples?.map((c: WPContentSample) => ({
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

  // Web project
  return {
    ...baseFields,
    liveUrl: wpData.acf.live_url,
    metrics: {
      pageSpeed: wpData.acf.web_metrics?.page_speed,
      conversionRate: wpData.acf.web_metrics?.conversion_rate,
      bounceRate: wpData.acf.web_metrics?.bounce_rate,
      loadTime: wpData.acf.web_metrics?.load_time,
      mobileScore: wpData.acf.web_metrics?.mobile_score,
      seoScore: wpData.acf.web_metrics?.seo_score,
    },
    screenshots: wpData.acf.screenshots?.map((s: WPScreenshot) => ({
      before: s.before_image || null,
      after: s.after_image,
      label: s.label,
    })) || [],
  };
};
