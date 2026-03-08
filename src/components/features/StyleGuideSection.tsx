// src/components/StyleGuideSection.tsx
import React from "react";

/**
 * StyleGuideSection Component
 * Combines the Brand Color Palette and Typography System (Sections 2 & 3).
 */
const StyleGuideSection: React.FC = () => {
  return (
    <section
      className="bg-white dark:bg-[#0B1229] flex flex-col items-center justify-center px-6 py-16 md:py-24 transition-colors duration-300"
      id="style-guide"
    >
      <div className="max-w-7xl mx-auto text-center mt-6 md:mt-12">
        {/* -------------------- Section 2: Brand Color Palette -------------------- */}
        <p className="text-sm uppercase tracking-widest mb-12 md:mb-24 text-blue-500 dark:text-blue-400 font-lato">
          Style & Imagery
        </p>

        {/* Color Swatches */}
        <div className="flex flex-wrap justify-center items-end gap-x-12 md:gap-x-16 gap-y-10 mb-20">
          {/* Color 1: Staggered UP (using -translate-y) */}
          <div className="flex flex-col items-center transform -translate-y-10 md:-translate-y-16">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl mb-6 transition-transform hover:scale-110 duration-300 overflow-hidden">
              <img
                src="/images/acm-color-1.png"
                alt="#CCCCFF swatch"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm font-semibold">
              #CCCCFF
            </p>
          </div>

          {/* Color 2: Staggered DOWN (Default position, no vertical translation) */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl mb-6 transition-transform hover:scale-110 duration-300 overflow-hidden">
              <img
                src="/images/acm-color-7.png"
                alt="#6C91C2 swatch"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm font-semibold">
              #6C91C2
            </p>
          </div>

          {/* Color 3: Staggered UP */}
          <div className="flex flex-col items-center transform -translate-y-10 md:-translate-y-16">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full shadow-2xl mb-6 transition-transform hover:scale-110 duration-300 overflow-hidden">
              <img
                src="/images/acm-color-6.png"
                alt="#0D335E swatch"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm font-semibold">
              #0D335E
            </p>
          </div>

          {/* Color 4: Staggered DOWN */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl mb-6 transition-transform hover:scale-110 duration-300 overflow-hidden">
              <img
                src="/images/acm-color-4.png"
                alt="#5A4F7C swatch"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm font-semibold">
              #5A4F7C
            </p>
          </div>

          {/* Color 5: Staggered UP */}
          <div className="flex flex-col items-center transform -translate-y-10 md:-translate-y-16">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl mb-6 transition-transform hover:scale-110 duration-300 overflow-hidden">
              <img
                src="/images/acm-color-2.png"
                alt="#E5D9F2 swatch"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-mono text-sm font-semibold">
              #E5D9F2
            </p>
          </div>
        </div>

        {/* -------------------- Section 3: Typography Showcase (Image-Based) -------------------- */}

        {/* Image Container for Style Tile */}
        <div className="max-w-2xl mx-auto w-full mb-12 md:mb-20 mt-16 md:mt-40">
          <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl transition-colors duration-300 border border-gray-200 dark:border-gray-700">
            <img
              // 💡 Use your image file path here
              src="/images/style-tile.png"
              alt="WordPress Typography Style Tile Snapshot"
              // Ensure the image scales responsively and retains clarity
              className="w-full h-auto object-contain rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleGuideSection;
