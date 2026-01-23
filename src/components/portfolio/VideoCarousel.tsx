import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContentSample } from '@/types/caseStudy';

interface VideoCarouselProps {
  videos: ContentSample[];
  onVideoClick: (video: ContentSample) => void;
  platformIcons: Record<string, React.ElementType>;
}

export function VideoCarousel({ videos, onVideoClick, platformIcons }: VideoCarouselProps) {
//   const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.7;
      const newPosition = direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });

      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        onScroll={updateScrollButtons}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {videos.map((video, index) => (
          <motion.button
            key={video.id}
            onClick={() => onVideoClick(video)}
            className="relative flex-shrink-0 w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-lg overflow-hidden border border-primary/50 dark:shadow-glow-primary group snap-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={video.thumbnail || video.src}
              alt={video.alt}
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5 drop-shadow-sm" />
              </div>
            </div>

            {video.platform && (
              <div className="absolute top-3 left-3 px-2.5 py-1.5 bg-background/80 backdrop-blur-sm rounded-full flex items-center gap-1.5">
                {(() => {
                  const Icon = platformIcons[video.platform];
                  return Icon ? <Icon className="w-3.5 h-3.5 text-primary" /> : null;
                })()}
                <span className="text-xs capitalize font-medium">{video.platform}</span>
              </div>
            )}

            {video.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white line-clamp-2">{video.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-primary/50 items-center justify-center hover:bg-background hover:scale-110 transition-all shadow-lg z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-primary/50 items-center justify-center hover:bg-background hover:scale-110 transition-all shadow-lg z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
