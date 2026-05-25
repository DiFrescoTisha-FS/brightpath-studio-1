import { useState } from 'react';
import { ArrowRight, Sparkles, Music, Lock } from 'lucide-react';
import BrightPathGradientButton from '@/components/BrightPathGradientButton';
import BrightPathGradientTitle from './BrightPathGradientTitle';
import { cloudinaryAssets } from '@/data/cloudinaryAssets';

interface BamvsthewrldCardProps {
  onViewCaseStudy?: () => void;
  className?: string;
}

export function BamvsthewrldCard({ onViewCaseStudy, className = '' }: BamvsthewrldCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-card border border-primary/50 dark:shadow-glow-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src={cloudinaryAssets.bamHeroDesktop}
            alt="Bamvsthewrld homepage hero"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={cloudinaryAssets.bamMusicDesktop}
            alt="Bamvsthewrld embedded music player"
            className="w-full h-full object-cover object-top pointer-events-none"
          />
        </div>

        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
          FULL-STACK MERN BUILD
        </div>

        <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Hover to preview
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary">Music / Artist</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Full-Stack MERN App</span>
        </div>

        <BrightPathGradientTitle
          as="h2"
          className="text-xl font-semibold mb-2 font-poppins"
        >
          Bamvsthewrld
        </BrightPathGradientTitle>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-lato">
          Full-stack MERN platform for music artist — immersive 3D, Firebase auth, embedded media, and an interactive audio image map.
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>3D Cosmic UI</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Music className="w-4 h-4 text-primary" />
            <span>Audio Map</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-4 h-4 text-primary" />
            <span>Firebase Auth</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {['React', 'Node', 'Express', 'MongoDB', 'Three.js', 'Firebase'].map((tech) => (
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
