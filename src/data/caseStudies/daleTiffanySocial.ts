import type { SocialMediaCaseStudy } from '@/types/caseStudy';
import { buildCloudinaryUrl, buildCloudinaryVideoUrl } from '@/utils/cloudinary';

export const daleTiffanySocialCaseStudy: SocialMediaCaseStudy = {
  id: 'dale-tiffany-social',
  slug: 'dale-tiffany-social-media',
  type: 'social-media',
  title: 'Dale Tiffany Social Media',
  heroBackground: '/social-media/dale-tiffany/dt-hero-bg.avif',
  heroBackgroundPosition: 'top center',
  client: 'Dale Tiffany',
  industry: 'Luxury Lighting',
  category: 'Social Media Management',
  description:
    'Strategic cross-platform social media content for a luxury lighting brand, focused on evergreen discovery, search visibility, and long-term brand storytelling across Instagram, Facebook Reels, and TikTok.',
  featuredImage: '/social-media/dale-tiffany/featured.avif',
  hoverImage: '/social-media/dale-tiffany/hover.avif',
  tags: ['Content Creation', 'Instagram', 'Facebook', 'TikTok', 'Product Photography', 'Luxury Brand'],
  platforms: ['facebook', 'instagram', 'linkedin', 'tiktok'],
  skills: [
    'Social Media Management',
    'Content Creation',
    'Caption Writing',
    'Canva',
    'Adobe Creative Tools',
    'Instagram',
    'Facebook',
    'LinkedIn',
    'Short-Form Video Editing',
    'Content Scheduling',
    'Content Calendar Management',
    'Social Media Analytics',
    'Audience Engagement',
    'WordPress',
  ],
  role: 'Social Media Content Strategist',
  strategySummary:
    'Built Dale Tiffany\'s social media presence from the ground up — strategy centered on visual storytelling, product craftsmanship highlights, and brand heritage content to establish initial visibility and grow engagement among design-focused audiences.',
  quickImpact: [
    { label: 'Posts Published', value: '68' },
    { label: 'Total Impressions', value: '2.98K' },
    { label: 'Total Likes', value: '199' },
    { label: 'New Followers', value: '11' },
    { label: 'Total Comments', value: '38' },
  ],
  campaignPeriod: 'Launched March 2026 — ongoing',
  postFrequency: '~15-20 posts per week across all platforms',

  overview: `Dale Tiffany is a premier luxury lighting manufacturer known for its exquisite Tiffany-style lamps and home décor. When BrightPath began working with the brand, Dale Tiffany had no active social media presence — no Facebook, Instagram, LinkedIn, or TikTok content driving discovery or engagement online.

BrightPath built and launched Dale Tiffany's social program from the ground up: establishing brand-aligned profiles across all four platforms, developing a content cadence focused on craftsmanship and timeless design, and producing the original photography, video, and copy that powers every post.

The 30-day reporting period (Apr 20 – May 19, 2026) reflects early-stage growth of the newly active platforms: 68 published posts generated 2.98K total impressions, 199 likes, and 38 comments — adding 11 new followers as the audience builds from zero baseline. Performance reflects a steady drumbeat of evergreen and seasonal content built to drive long-term brand visibility among design-focused audiences.`,

  goals: [
    'Increase brand awareness and reach among interior design enthusiasts',
    'Showcase product craftsmanship through high-quality visual content',
    'Drive meaningful engagement and expand brand discovery among new, design-focused audiences',
    'Generate traffic to retail partner websites',
    'Establish Dale Tiffany as a thought leader in luxury home lighting',
    'Create seasonal campaigns aligned with home decor trends',
  ],

  deliverables: [
    {
      title: 'Content Calendar (Monthly)',
      description: 'Content planning and thematic direction for evergreen and seasonal posts',
    },
    {
      title: 'Product Photography',
      description: 'Professional lifestyle and product shots showcasing lamps in beautifully styled settings.',
    },
    {
      title: 'Video Reels',
      description: 'Engaging short-form video content featuring product reveals, styling tips, and behind-the-scenes.',
    },
    {
      title: 'Story Content',
      description: 'Select story and short-form content supporting product storytelling and brand presence',
    },
    {
      title: 'Community Management',
      description: 'Audience monitoring and engagement during active posting periods',
    },
    {
      title: 'Performance Reports',
      description: 'Performance review and insights focused on reach patterns, discovery behavior, and long-term content visibility across platforms.',
    },
  ],

  process: [
    {
      step: 1,
      title: 'Brand Discovery',
      description: 'Deep dive into Dale Tiffany\'s brand identity, target audience, competitors, and unique selling propositions.',
    },
    {
      step: 2,
      title: 'Content Strategy',
      description: 'Development of content pillars, posting schedule, and campaign themes aligned with business goals.',
    },
    {
      step: 3,
      title: 'Creative Production',
      description: 'Professional photography and video production showcasing products in aspirational settings.',
    },
    {
      step: 4,
      title: 'Content Publishing',
      description: 'Strategic posting with optimized captions, hashtags, and timing for maximum reach.',
    },
    {
      step: 5,
      title: 'Community Engagement',
      description: 'Active monitoring and engagement with followers to build authentic relationships.',
    },
    {
      step: 6,
      title: 'Analysis & Optimization',
      description: 'Regular performance analysis and strategy refinement based on data insights.',
    },
  ],

  metrics: {
    impressions: '2.98K',
    likes: '199',
    followers: '11',
    comments: '38',
    reportingPeriod: 'Apr 20 – May 19, 2026 (30 days)',
  },

  results: [
    'Launched Dale Tiffany\'s social media presence from zero — built brand-aligned profiles on Facebook, Instagram, LinkedIn, and TikTok where the brand previously had none',
    'Published 68 posts during the 30-day reporting period (Apr 20 – May 19, 2026): Facebook 36, Instagram 22, LinkedIn 10',
    'Generated 2.98K total impressions (Facebook 1.53K, Instagram 1.37K, LinkedIn 78) and reached 1.78K accounts across the multi-platform content mix',
    'Instagram Post Reach grew 92.29% month-over-month — the strongest platform performance gain in the period',
    'Drove 199 total likes (Facebook 97, Instagram 92, LinkedIn 10) and 38 comments across published content as the audience builds from zero',
    'Added 11 new followers in 30 days — 6 from LinkedIn and 5 from Facebook — reflecting early-stage audience expansion on professional and community-focused channels',
  ],

  contentSamples: [
    {
      id: 'dt-social-7',
      type: 'image',
      src: '/social-media/dale-tiffany/post-7.avif',
      alt: 'Modern interior with Dale Tiffany floor lamp',
      platform: 'instagram',
    },

    {
      id: 'dt-social-slide-3',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/Slide-3_ecr448', { width: 1200 }),
      alt: 'Dale Tiffany lamp feature post',
      platform: 'instagram',
    },
    {
      id: 'dt-social-slide-4',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/SLIDE-4_txq8bi', { width: 1200 }),
      alt: 'Dale Tiffany lamp feature post',
      platform: 'instagram',
    },
    {
      id: 'dt-social-15',
      type: 'image',
      src: '/social-media/dale-tiffany/post-15.avif',
      alt: 'Modern interior with Dale Tiffany floor lamp',
      platform: 'instagram',
    },
    {
      id: 'dt-social-lit-slide-2',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/Lit-slide-2_mhkdyv', { width: 1200 }),
      alt: 'Lit Dale Tiffany stained glass lamp display',
      platform: 'instagram',
    },
    {
      id: 'dt-social-lit',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/Lit_oushg9', { width: 1200 }),
      alt: 'Lit Dale Tiffany stained glass lamp',
      platform: 'instagram',
    },
    {
      id: 'dt-social-stand-alone',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/STAND-ALONE_nqdmkp', { width: 1200 }),
      alt: 'Stand-alone Dale Tiffany lamp product shot',
      platform: 'facebook',
    },
    {
      id: 'dt-social-slide-3-variant',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/slide_3_go9ruv', { width: 1200 }),
      alt: 'Dale Tiffany product slide',
      platform: 'instagram',
    },
        {
      id: 'dt-social-1',
      type: 'image',
      src: '/social-media/dale-tiffany/post-1.avif',
      alt: 'Tiffany-style lamp in elegant living room setting',
      platform: 'instagram',
    },
    {
      id: 'dt-social-cats',
      type: 'image',
      src: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/CATS__SLIDE_huh4aq', { width: 1200 }),
      alt: 'Cats featured alongside a Dale Tiffany lamp',
      platform: 'instagram',
    },
    {
      id: 'dt-social-video-couple',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Couple-Reel-1_clt2dj'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/couple-thumbnail_bbzibu', { width: 600 }),
      alt: 'Couple lamp reel',
      platform: 'instagram',
    },
    {
      id: 'dt-social-video-egg',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/EGG_ivzwxm'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/egg-thumbnail_wqegdj', { width: 600 }),
      alt: 'Egg-shaped Dale Tiffany lamp reel',
      platform: 'instagram',
    },
    {
      id: 'dt-social-video-grove',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/grove_icf6ol'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/grove-thumbnail_smzgna', { width: 600 }),
      alt: 'Grove collection reel',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-yellow-sconce',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Jeweled_Yellow_Sconce_yzplx2'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/yellow-sconce-thumbnail_gh4cej', { width: 600 }),
      alt: 'Jeweled yellow sconce reel',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-hand-painted',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Hand-Painted_zkmuqa'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/hand-painted-thumbnail_q2dzqu', { width: 600 }),
      alt: 'Hand-painted Dale Tiffany lamp reel',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-arrida-lady',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Arrida_Lady_Lamp_kbde1p'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/arrida-lady-thumbnail_msxxpd', { width: 600 }),
      alt: 'Arrida Lady Lamp reel',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-laguna',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Laguna_Lamp_1_bz741h'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/laguna-thumbnail_frvpe0', { width: 600 }),
      alt: 'Laguna Lamp reel',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-pink-sconce',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Pink-jeweled-sconce_yafo1d'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/slide-4_da0zao', { width: 600 }),
      alt: 'Pink jeweled sconce reel',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-9',
      type: 'video',
      src: '/social-media/dale-tiffany/reel-9.mp4',
      thumbnail: '/social-media/dale-tiffany/reel-9-thumb.avif',
      alt: 'Styling tips video',
      platform: 'tiktok',
    },
    {
      id: 'dt-social-video-fairy',
      type: 'video',
      src: buildCloudinaryVideoUrl('brightpath/portfolio/social-media/dale-tiffany/Fairy_Reel_lybmgs'),
      thumbnail: buildCloudinaryUrl('brightpath/portfolio/social-media/dale-tiffany/fairy-thumbnail_edhhty', { width: 600 }),
      alt: 'Fairy lamp reel',
      platform: 'tiktok',
    },
  ],

  testimonial: {
    quote: 'BrightPath transformed our social media presence completely. The quality of content and engagement we\'re seeing now is beyond what we imagined.',
    author: 'Marketing Director',
    role: 'Dale Tiffany',
  },
};
