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
        <div className="flip-card-front absolute w-full h-full backface-hidden rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-white bg-[linear-gradient(to_right,#243B55,#141E30)] border border-primary/30 shadow-glow-primary">
          {/* Icon */}
          <div className="mb-1">
            <img
              src={iconUrl}
              alt={iconAlt}
              className="w-full max-w-[180px] h-8 sm:h-10 object-contain drop-shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center justify-start">
            <BrightPathGradientTitle
              as="span"
              className="card-heading text-center block">
              {mainHeading}
            </BrightPathGradientTitle>
            <BrightPathGradientTitle
              as="span"
              gradientWords={["Planning", "Prototyping", "Implementation", "Refining", "Deployment", "Support", "Updates"]}
              className="card-subheading tracking-wide text-center block">
              {subheading}
            </BrightPathGradientTitle>
            {frontCardDescription && (
              <p className="mt-1 text-gray-200 text-center text-shadow-md card-text line-clamp-2">{frontCardDescription}</p>
            )}
          </div>
        </div>

        {/* BACK SIDE OF CARD */}
        <div className="flip-card-back absolute inset-0 backface-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-3 sm:p-4 flex flex-col justify-between text-[#1A2238] rotate-y-180 shadow-glow-primary overflow-hidden">
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `url('/images/back-texture-overlay.jpg')`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10">
            <h3 className="card-subheading text-center mb-2 text-[#1A2238] text-shadow-md">
              {backCardTitle}
            </h3>

            <ul className="space-y-0.5 list-disc list-inside text-[#1A2238] card-text">
              {bulletPoints.slice(0, 2).map((point, index) => {
                const p = point;
                return (
                  <li key={index} className="card-text text-[#1A2238]">
                    {p.text || p.list_item_text || p.bullet_point || p.bullet_text || ""}
                  </li>
                );
              })}
            </ul>

            <p className="card-text opacity-70 mt-1">
              Tap to flip back →
            </p>
          </div>

          <button className="w-full bg-[#1A2238] text-primary font-bold py-1.5 rounded-md transition-all duration-300 ease-in-out hover:bg-[#222c48] shadow-md card-text relative z-10">
            {backCardButtonText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlipCard;