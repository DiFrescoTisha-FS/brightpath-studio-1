import { useState } from 'react';
import { ArrowRight, Smartphone, Palette, Gift } from 'lucide-react';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import BrightPathGradientTitle from './BrightPathGradientTitle';

interface AngelCityMassageCardProps {
  onViewCaseStudy?: () => void;
  className?: string;
}

export function AngelCityMassageCard({ onViewCaseStudy, className = '' }: AngelCityMassageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Preview with Hover Swap */}
      <div className="relative h-56 overflow-hidden">
        {/* Default Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="/images/ACM_HOME.png"
            alt="Angel City Massage Website"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Hover Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/images/CaseStudy.png"
            alt="Angel City Massage Case Study"
            className="w-full h-full object-cover object-top pointer-events-none"
          />
        </div>

        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
          WELLNESS
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
          <span className="text-xs font-medium text-primary">Wellness + Service</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Massage Therapy</span>
        </div>

        {/* Title */}
        <BrightPathGradientTitle as="h2"
          className="text-xl font-semibold mb-2 font-poppins"
        >
          Angel City Massage
        </BrightPathGradientTitle>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-lato">
          Designed and optimized a high-performance WordPress platform with custom CSS architecture, responsive layout systems, and SEO-driven structure.
        </p>

        {/* Key Features Icons */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Smartphone className="w-4 h-4 text-primary" />
            <span>Responsive</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Palette className="w-4 h-4 text-primary" />
            <span>UI/UX</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Gift className="w-4 h-4 text-primary" />
            <span>Gift Cards</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['WordPress', 'SEO', 'Analytics', 'Custom Design'].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <BrightPathGradientButton
          onClick={onViewCaseStudy}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          View Project
          <ArrowRight className="w-4 h-4" />
        </BrightPathGradientButton>
      </div>
    </div>
  );
}
