import { useState } from 'react';
import { ArrowRight, TrendingUp, Eye, Users, Linkedin } from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import BrightPathGradientTitle from './BrightPathGradientTitle';
import type { SocialMediaCaseStudy } from '@/types/caseStudy';
import TikTokIcon from '../icons/TikTokIcon';

interface SocialMediaCardProps {
  index: number;
  caseStudy: SocialMediaCaseStudy;
  onViewCaseStudy: () => void;
  className?: string;
}

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTokIcon,
  linkedin: Linkedin,
};

export function SocialMediaCard({ index, caseStudy, onViewCaseStudy, className = '' }: SocialMediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPriority = index === 0;

  // Get primary metrics to display
  const displayMetrics = [
    caseStudy.metrics.impressions && { icon: Eye, label: 'Impressions', value: caseStudy.metrics.impressions },
    caseStudy.metrics.reach && { icon: Users, label: 'Reach', value: caseStudy.metrics.reach },
    caseStudy.metrics.growth && { icon: TrendingUp, label: 'Growth', value: caseStudy.metrics.growth },
  ].filter(Boolean).slice(0, 3);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Preview with Hover Effect */}
      <div className="relative overflow-hidden aspect-[4/5]">
        {/* Default Image */}
        <img
          src={caseStudy.featuredImage}
          alt={`${caseStudy.title} - Featured`}
          loading={isPriority ? 'eager' : 'lazy'}
          fetchPriority={isPriority ? 'high' : 'auto'}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'
            }`}
        />

        {/* Hover Image */}
        <img
          src={caseStudy.hoverImage || caseStudy.featuredImage}
          alt={`${caseStudy.title} - Preview`}
          loading="lazy"
          fetchPriority="auto"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3" />
          SOCIAL MEDIA
        </div>

        {/* Platform Icons */}
        <div className="absolute top-3 right-3 flex gap-1">
          {caseStudy.platforms.map((platformRaw) => {
            const platform = platformRaw.trim().toLowerCase();
            const Icon = platformIcons[platform];

            return Icon ? (
              <div
                key={platformRaw}
                className="w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                title={platform}
              >
                <Icon className="w-4 h-4 text-primary" />
              </div>
            ) : null;
          })}

        </div>

        {/* Hover instruction */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to preview
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Client & Industry */}
        <div className="flex items-center gap-2 mb-2">
          <BrightPathGradientTitle
            as="span"
            className="text-xs font-medium text-primary"
            gradientWords={["Social", "Media"]}>Social Media</BrightPathGradientTitle>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{caseStudy.industry}</span>
        </div>

        {/* Title */}
        <BrightPathGradientTitle
          as="h4"
          className="text-xl font-semibold mb-2 font-poppins"
          gradientWords={["Dale", "Tiffany", "Living", "Better", "Life"]}
        >
          {caseStudy.title}
        </BrightPathGradientTitle>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-lato">
          {caseStudy.description}
        </p>

        {/* Key Metrics */}
        <div className="flex items-center gap-4 mb-4">
          {displayMetrics.map((metric) => {
            if (!metric) return null;
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                <span>{metric.value}</span>
              </div>
            );
          })}
        </div>

        {/* Platform Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {caseStudy.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <BrightPathGradientButton
          onClick={onViewCaseStudy}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          View Case Study
          <ArrowRight className="w-4 h-4" />
        </BrightPathGradientButton>
      </div>
    </div>
  );
}
