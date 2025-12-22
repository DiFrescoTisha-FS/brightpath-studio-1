import { useState } from 'react';
import { ArrowRight, Smartphone, Users, BarChart3 } from 'lucide-react';
import BrightPathGradientButton from './BrightPathGradientButton';
import BrightPathGradientTitle from './BrightPathGradientTitle';

interface DaleTiffanyCardProps {
  onViewCaseStudy?: () => void;
  className?: string;
}

export function DaleTiffanyCard({ onViewCaseStudy, className = '' }: DaleTiffanyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-card border border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Before/After Image Preview */}
      <div className="relative h-56 overflow-hidden">
        {/* Before Image (shows on hover) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/dale-tiffany/before-home.png"
            alt="Dale Tiffany - Before (Legacy Site)"
            className="w-full h-full object-cover object-top grayscale"
          />
          <div className="absolute top-3 left-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
            BEFORE
          </div>
        </div>

        {/* After Image (default) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="/dale-tiffany/after-home.png"
            alt="Dale Tiffany - After (Modern Site)"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
            AFTER
          </div>
        </div>

        {/* Hover instruction */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to see before
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Client & Industry */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary">E-Commerce + B2B</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Luxury Lighting</span>
        </div>

        {/* Title */}
        <BrightPathGradientTitle 
          className="text-xl font-semibold mb-2 font-poppins"
        >
          Dale Tiffany
        </BrightPathGradientTitle>
          

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-lato">
          Complete digital transformation of a 20-year-old PHP site into a modern React platform with B2B portal and CRM.
        </p>

        {/* Key Features Icons */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Smartphone className="w-4 h-4 text-primary" />
            <span>Responsive</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>B2B Portal</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span>CRM</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['React', 'TypeScript', 'Supabase', 'Tailwind'].map((tech) => (
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
          View Case Study
          <ArrowRight className="w-4 h-4" />
        </BrightPathGradientButton>
      </div>
    </div>
  );
}
