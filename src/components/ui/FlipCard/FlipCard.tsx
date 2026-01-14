// src/components/ui/FlipCard/FlipCard.tsx

import React from 'react';
import './FlipCard.css';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';

// Define the type for a single bullet point object
interface BulletPoint {
  text?: string;
  list_item_text?: string;
  bullet_point?: string;
  bullet_text?: string;
}

interface FlipCardProps {
  mainHeading: string;
  subheading: string;
  backCardTitle: string;
  backCardButtonText: string;
  iconUrl: string;
  iconAlt: string;
  bulletPoints: BulletPoint[];
  frontCardDescription: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  mainHeading,
  subheading,
  backCardTitle,
  backCardButtonText,
  iconUrl,
  iconAlt,
  bulletPoints,
  frontCardDescription,
}) => {
  // Add this line to see the data
  console.log('FlipCard props received:', { mainHeading, subheading, iconUrl, iconAlt, bulletPoints });

  return (
    <div className="flip-card-container w-full mx-auto">

      <div className="flip-card relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">

        {/* FRONT SIDE OF CARD */}
        <div className="flip-card-front absolute w-full h-full backface-hidden rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center text-white bg-[linear-gradient(to_right,#243B55,#141E30)] border border-primary shadow-glow-primary">
          {/* Icon */}
          <div className="mb-1 sm:mb-3">
            <img
              src={iconUrl}
              alt={iconAlt}
              className="w-full max-w-[200px] h-12 object-contain drop-shadow-lg pb-0"
            />
          </div>

          <div className="flex flex-col items-center justify-start">
            <BrightPathGradientTitle
              as="h3"
              className="text-[18px] font-bold mb-1 text-center leading-tight">
              {mainHeading}
            </BrightPathGradientTitle>
            <p className="text-sm uppercase tracking-wide text-primary text-center mb-1 text-shadow-md">
              {subheading}
            </p>
            {frontCardDescription && (
              <p className="mt-2 text-sm text-gray-200 text-center text-shadow-md">{frontCardDescription}</p>
            )}
          </div>
        </div>

        {/* BACK SIDE OF CARD */}
        {/* BACK SIDE OF CARD */}
        <div className="flip-card-back absolute inset-0 backface-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 sm:p-5 flex flex-col justify-start text-[#1A2238] rotate-y-180 shadow-glow-primary overflow-hidden">
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `url('/images/back-texture-overlay.jpg')`,
              backgroundSize: "cover",
            }}
          />

          <h3 className="text-lg font-bold text-center mb-2 text-[#1A2238] text-shadow-md leading-tight relative z-10">
            {backCardTitle}
          </h3>

          <ul className="mt-0 space-y-1 list-disc list-inside text-[#1A2238] text-[12px] leading-snug relative z-10">
            {bulletPoints.slice(0, 2).map((point, index) => {
              const p = point;
              return (
                <li key={index} className="text-[12px] leading-snug text-[#1A2238]">
                  {p.text || p.list_item_text || p.bullet_point || p.bullet_text || ""}
                </li>
              );
            })}
          </ul>

          <p className="text-[11px] opacity-80 mt-1 relative z-10">
            Tap to flip back →
          </p>

          <div className="mt-auto pt-3 relative z-10">
            <button className="w-full bg-[#1A2238] text-primary font-bold py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#222c48] shadow-md">
              {backCardButtonText}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlipCard;