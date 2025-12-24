// src/components/ui/FlipCard/FlipCard.tsx

import React from 'react';
import './FlipCard.css';
import BrightPathGradientTitle from '@/components/BrightPathGradientTitle';

// Define the type for a single bullet point object
interface BulletPoint {
  text: string;
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
  console.log('FlipCard props received:', { mainHeading, subheading, iconUrl, iconAlt });

  return (
    <div className="flip-card-container w-full max-w-64 h-[22rem] sm:h-[24rem] perspective mx-auto">
      <div className="flip-card relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">

        {/* FRONT SIDE OF CARD */}
        <div className="flip-card-front absolute w-full h-full backface-hidden rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center text-white bg-[linear-gradient(to_right,#243B55,#141E30)] border border-primary shadow-glow-primary">
          {/* Icon */}
          <div className="mb-4 sm:mb-6">
            <img
              src={iconUrl}
              alt={iconAlt}
              className="w-full max-w-[200px] h-20 sm:h-24 object-contain drop-shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center">
            <BrightPathGradientTitle
              as="h3"
              className="text-[18px] font-bold mb-2 text-center leading-tight">
              {mainHeading}
            </BrightPathGradientTitle>
            <p className="text-2xl text-primary text-center text-shadow-md">
              {subheading}
            </p>
            {frontCardDescription && (
              <p className="mt-2 text-sm text-gray-200 text-center text-shadow-md">{frontCardDescription}</p>
            )}
          </div>
        </div>

        {/* BACK SIDE OF CARD */}
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 sm:p-8 flex flex-col justify-center text-[#1A2238] rotate-y-180 shadow-glow-primary">
        <div 
    className="absolute inset-0 z-0 opacity-10"
    style={{ 
      backgroundImage: `url('/images/back-texture-overlay.jpg')`,
      backgroundSize: 'cover' 
    }} 
  />
          <h3 className="text-xl font-bold text-center mb-4 text-[#1A2238] text-shadow-md leading-tight">
            {backCardTitle}
          </h3>
          <ul className="space-y-2 list-disc list-inside text-[#1A2238] relative z-10">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-sm leading-relaxed">{point.text}</li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <button className="bg-[#1A2238] text-primary font-bold py-2 px-6 rounded-md transition-all duration-300 ease-in-out hover:bg-[#222c48] shadow-md">
              {backCardButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;