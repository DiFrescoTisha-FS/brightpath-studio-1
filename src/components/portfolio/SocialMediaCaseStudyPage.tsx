import { useState, type ElementType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  TrendingUp,
  Eye,
  Users,
  Heart,
  MessageCircle,
  Target,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  Instagram,
  Facebook,
  Youtube,
  Linkedin
} from 'lucide-react';
import TikTokIcon from '../icons/TikTokIcon';
import BrightPathGradientTitle from './BrightPathGradientTitle';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import { VideoCarousel } from '@/components/portfolio/VideoCarousel';
import type { SocialMediaCaseStudy, ContentSample } from '@/types/caseStudy';

interface SocialMediaCaseStudyPageProps {
  caseStudy: SocialMediaCaseStudy;
  onBack?: () => void;
  theme?: 'light' | 'dark';
}

const platformIcons: Record<string, ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: TikTokIcon,
};

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  twitter: 'Twitter',
};

const metricIcons: Record<string, ElementType> = {
  impressions: Eye,
  accountsReached: Users,
  nonFollowerReach: TrendingUp,
  reach: Users,
  engagement: Heart,
  followers: Users,
  growth: TrendingUp,
  views: Eye,
  likes: Heart,
  shares: TikTokIcon,
  comments: MessageCircle,
  profileVisits: Users,
  linkTaps: TikTokIcon,
};

const metricLabels: Record<string, string> = {
  impressions: 'Impressions',
  accountsReached: 'Accounts Reached',
  nonFollowerReach: 'Non-Follower Reach',
  reach: 'Reach',
  engagement: 'Engagement',
  followers: 'Followers',
  growth: 'Growth',
  views: 'Views',
  likes: 'Likes',
  shares: 'Shares',
  comments: 'Comments',
  profileVisits: 'Profile Visits',
  linkTaps: 'Link Taps',
};

export function SocialMediaCaseStudyPage({ caseStudy, onBack, theme = 'dark' }: SocialMediaCaseStudyPageProps) {
  const pageBg = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-neutral-900';
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<ContentSample | null>(null);

  const images = caseStudy.contentSamples.filter((c) => c.type === 'image');
  const videos = caseStudy.contentSamples.filter((c) => c.type === 'video');

  const metricsArray = Object.entries(caseStudy.metrics)
    .filter(([key, value]) => value && key !== 'reportingPeriod')
    .map(([key, value]) => ({
      key,
      value,
      icon: metricIcons[key] || TrendingUp,
      label: metricLabels[key] || key.charAt(0).toUpperCase() + key.slice(1),
    }));

  const primaryMetrics = metricsArray.slice(0, 3);
  const reportingPeriod = caseStudy.metrics.reportingPeriod;
  const formattedPlatforms = caseStudy.platforms
    .map((platform) => platformLabels[platform] || platform)
    .join(' • ');

  const openLightbox = (content: ContentSample) => {
    setLightboxContent(content);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxContent(null);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`min-h-screen ${pageBg}`}>
      {onBack && (
        <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </button>
          </div>
        </div>
      )}

      <section
        className="relative overflow-hidden min-h-[70vh] lg:min-h-[80vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24"
        style={
          caseStudy.heroBackground
            ? {
              backgroundImage: `url(${caseStudy.heroBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: caseStudy.heroBackgroundPosition || 'center',
              backgroundRepeat: 'no-repeat',
            }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-background/95"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-6 border border-white/10">
                <TrendingUp className="w-4 h-4" />
                Social Media Content
              </div>

              <BrightPathGradientTitle
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins"
              >
                {caseStudy.title}
              </BrightPathGradientTitle>

              <p className="text-white/90 font-lato max-w-2xl mx-auto">
                {caseStudy.description}
              </p>

              <div className="flex justify-center gap-3 mt-6 flex-wrap">
                {caseStudy.platforms.map((platform) => {
                  const Icon = platformIcons[platform];

                  return (
                    <div
                      key={platform}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full text-white"
                    >
                      {Icon ? <Icon className="w-4 h-4 text-primary" /> : null}
                      <span className="text-sm capitalize">{platform}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {primaryMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.key} className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <div className="text-3xl font-bold text-primary">{metric.value}</div>
                      </div>
                      <div className="text-sm text-white/75">{metric.label}</div>
                    </div>
                  );
                })}
              </div>

              {reportingPeriod && (
                <p className="text-sm text-white/70 mt-4">
                  Reporting period: {reportingPeriod}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {(caseStudy.quickImpact?.length || caseStudy.role || caseStudy.campaignPeriod || caseStudy.strategySummary) && (
        <section className="py-16 bg-gradient-to-b from-muted/40 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-primary/30 bg-card/90 backdrop-blur-sm shadow-2xl p-6 md:p-10">
              <div className="text-center mb-10">
                <p className="text-sm uppercase tracking-[0.2em] text-primary/80 mb-3">Quick Impact</p>
                <BrightPathGradientTitle
                  as="h2"
                  className="font-bold text-3xl md:text-4xl mb-3 font-poppins"
                  gradientWords={['Impact', 'Strategy']}
                >
                  Case Study Snapshot
                </BrightPathGradientTitle>
                <p className="text-muted-foreground font-lato text-sm md:text-base">
                  A fast recruiter-ready view of the strategy, scope, and measurable results behind this campaign.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/70 mb-2">Role</p>
                  <p className="text-lg font-semibold font-poppins">{caseStudy.role || 'Social Media Content Strategist'}</p>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/70 mb-2">Platforms</p>
                  <p className="text-sm md:text-base font-lato leading-relaxed">{formattedPlatforms}</p>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/70 mb-2">Campaign Period</p>
                  <p className="text-lg font-semibold font-poppins">{caseStudy.campaignPeriod || 'Ongoing'}</p>
                </div>
              </div>

              {caseStudy.quickImpact && caseStudy.quickImpact.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-center text-primary/75 mb-5">
                    Impact Snapshot
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {caseStudy.quickImpact.map((item) => (
                      <div
                        key={`${item.label}-${item.value}`}
                        className="rounded-2xl border border-primary/30 bg-background/70 p-5 text-center dark:shadow-glow-primary"
                      >
                        <BrightPathGradientTitle
                          className="text-3xl font-bold mb-2 font-poppins"
                        >
                          {item.value}
                        </BrightPathGradientTitle>
                        <p className="text-sm text-muted-foreground font-lato">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.strategySummary && (
                <div className="rounded-2xl border border-primary/30 bg-primary/10 px-6 py-5 text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/75 mb-2">Strategy</p>
                  <p className="text-base md:text-lg leading-relaxed text-foreground font-lato">
                    {caseStudy.strategySummary}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-bold text-center mb-8 font-poppins"
              gradientWords={['Overview']}
            >
              Project Overview
            </BrightPathGradientTitle>
            <p className="text-muted-foreground text-center font-lato leading-relaxed whitespace-pre-line">
              {caseStudy.overview}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BrightPathGradientTitle
              as="h2"
              className="font-bold text-center mb-8 font-poppins"
              gradientWords={['Goals']}
            >
              Project Goals
            </BrightPathGradientTitle>
            <div className="grid md:grid-cols-2 gap-4">
              {caseStudy.goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary"
                >
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground font-lato">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center mb-8 font-poppins"
            gradientWords={['Deliverables']}
          >
            Key Deliverables
          </BrightPathGradientTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseStudy.deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary hover:shadow-lg transition-shadow"
              >
                <BrightPathGradientTitle
                  as="h3"
                  className="text-lg font-semibold mb-2 font-poppins"
                  gradientWords={["Calendar", "Photography", "Reels", "Story", "Strategy", "Educational", "Video", "Promotion", "Community", "Performance"]}
                >
                  {deliverable.title}
                </BrightPathGradientTitle>
                <p className="text-sm text-muted-foreground font-lato">
                  {deliverable.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {caseStudy.skills && caseStudy.skills.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <BrightPathGradientTitle
                as="h2"
                className="font-bold text-center mb-8 font-poppins"
                gradientWords={['Skills', 'Tools']}
              >
                Core Skills & Tools
              </BrightPathGradientTitle>
              <div className="flex flex-wrap justify-center gap-3">
                {caseStudy.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 rounded-full bg-card border border-primary/50 dark:shadow-glow-primary text-sm font-lato text-muted-foreground"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center mb-12 font-poppins"
            gradientWords={['Process']}
          >
            Our Process
          </BrightPathGradientTitle>

          <p className="text-white/90 font-lato max-w-2xl mx-auto text-center mt-[-30px] mb-14">Process reflects both active publishing phases and post-publishing analysis, including long-tail content performance and cross-platform discovery.</p>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

              {caseStudy.process.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative flex items-start gap-6 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center text-sm font-bold -translate-x-1/2 z-10">
                    {step.step}
                  </div>

                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                      }`}
                  >
                    <BrightPathGradientTitle
                      as="h3"
                      textColor="text-secondary dark:text-slate-300"
                      className="text-lg font-semibold mb-2 font-poppins"
                      gradientWords={["Brand", "Strategy", "Publishing", "Community", "Optimization", "Voice", "Pillars", "Impact", "Production"]}
                    >
                      {step.title}
                    </BrightPathGradientTitle>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-center mb-8 font-poppins"
            gradientWords={['Results']}
          >
            Results & Metrics
          </BrightPathGradientTitle>
          <p className="text-sm text-muted-foreground font-lato text-center max-w-3xl mx-auto -mt-4 mb-10">
            Metrics shown represent a snapshot of organic performance across platforms and are intended to highlight discovery patterns rather than total campaign volume.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {metricsArray.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.key}
                  className="p-4 rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary text-center"
                >
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <BrightPathGradientTitle as="span" className="text-2xl font-bold text-foreground">{metric.value}</BrightPathGradientTitle>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {caseStudy.results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/50 dark:shadow-glow-primary"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground font-lato">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BrightPathGradientTitle
              as="h2"
              className="font-bold text-center mb-8 font-poppins"
              gradientWords={['Samples']}
            >
              Content Samples
            </BrightPathGradientTitle>

            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-lg overflow-hidden border border-primary/50 dark:shadow-glow-primary mb-4">
                <img
                  src={images[activeImageIndex].src}
                  alt={images[activeImageIndex].alt}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openLightbox(images[activeImageIndex])}
                />

                {images[activeImageIndex].platform && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full flex items-center gap-1.5">
                    {(() => {
                      const Icon = platformIcons[images[activeImageIndex].platform!];
                      return Icon ? <Icon className="w-4 h-4 text-primary" /> : null;
                    })()}
                    <span className="text-sm capitalize">{images[activeImageIndex].platform}</span>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {images[activeImageIndex].caption && (
                  <div className="absolute bottom-4 left-4 right-4 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg">
                    <p className="text-sm text-center">{images[activeImageIndex].caption}</p>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === activeImageIndex
                          ? 'border-primary scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 mb-8">
            <BrightPathGradientTitle
              as="h2"
              className="font-bold text-center font-poppins"
              gradientWords={['Reels']}
            >
              Video Reels
            </BrightPathGradientTitle>
          </div>

          <div className="w-full overflow-hidden">
            <div className="container mx-auto px-4">
              <VideoCarousel
                videos={videos}
                onVideoClick={openLightbox}
                platformIcons={platformIcons}
              />
            </div>
          </div>
        </section>
      )}

      {caseStudy.testimonial && (
        <section className="py-16 px-4 transition-colors duration-300 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#050B14] dark:via-[#081426] dark:to-[#0B1E33]">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <BrightPathGradientTitle
                as="h2"
                className="font-bold mb-8"
                gradientWords={['Client']}
              >
                What Our Client Says
              </BrightPathGradientTitle>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 relative">
                <div className="absolute top-4 left-4 text-5xl text-primary/20 font-serif">"</div>
                <div className="absolute bottom-4 right-4 text-5xl text-primary/20 font-serif">"</div>

                <blockquote className="text-base sm:text-lg md:text-xl text-muted-foreground italic leading-relaxed mb-8 relative z-10 font-lato">
                  {caseStudy.testimonial.quote}
                </blockquote>

                <div className="flex flex-col items-center">
                  <BrightPathGradientTitle as="h3" className="font-bold text-xl mb-1">
                    {caseStudy.testimonial.author}
                  </BrightPathGradientTitle>
                  <div className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</div>
                  <div className="flex gap-1 mt-3" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <BrightPathGradientTitle
            as="h2"
            className="font-bold text-foreground mb-4 font-poppins"
            gradientWords={['Social', 'Media', 'Presence']}
          >
            Ready to Elevate Your Social Media Presence?
          </BrightPathGradientTitle>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-lato">
            Let's discuss how we can create engaging content that grows your audience and builds your brand.
          </p>
          <Link to="/contact">
            <BrightPathGradientButton className="px-8 py-3 text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
              Get in Touch
            </BrightPathGradientButton>
          </Link>
        </div>
      </section>

      {lightboxOpen && lightboxContent && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/40 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxContent.type === 'image' ? (
              <img
                src={lightboxContent.src}
                alt={lightboxContent.alt}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={lightboxContent.src}
                controls
                autoPlay
                className="max-w-full max-h-[90vh]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
