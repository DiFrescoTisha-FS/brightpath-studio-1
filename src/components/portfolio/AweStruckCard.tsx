import { useState } from 'react';
import { ArrowRight, Zap, Layers, Code } from 'lucide-react';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import BrightPathGradientTitle from './BrightPathGradientTitle';

interface AweStruckCardProps {
  onViewCaseStudy?: () => void;
  className?: string;
}

export function AweStruckCard({ onViewCaseStudy, className = '' }: AweStruckCardProps) {
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
            src="/images/case-studies/awestruck/card-hero.png"
            alt="AweStruck Intelligence homepage"
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
            src="/images/case-studies/awestruck/card-hover.png"
            alt="AweStruck Intelligence case study preview"
            className="w-full h-full object-cover object-top pointer-events-none"
          />
        </div>

        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
          CUSTOM REACT BUILD
        </div>

        <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to preview
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary">Education + Faith</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Biblical SEL Curriculum</span>
        </div>

        <BrightPathGradientTitle
          as="h2"
          className="text-xl font-semibold mb-2 font-poppins"
        >
          AweStruck Intelligence
        </BrightPathGradientTitle>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-lato">
          Custom React + TypeScript build with a performance-first architecture — Lighthouse mobile 26 → 100.
        </p>

        {/* Key Features Icons */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span>Lighthouse 100</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers className="w-4 h-4 text-primary" />
            <span>Interactive UI</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Code className="w-4 h-4 text-primary" />
            <span>Custom Build</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion'].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

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
