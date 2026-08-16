// src/components/ui/FlipCard/FlipCard.tsx
import { Link } from 'react-router-dom';
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
        <div className="flip-card-front flip-card-face--front absolute w-full h-full backface-hidden p-3 sm:p-4 flex flex-col items-center justify-center">
          {/* Icon */}
          <div className="mb-1">
            <img
              src={iconUrl}
              /* WordPress often omits alt text for these phase icons, and React
                 drops the attribute entirely when the value is undefined. They
                 sit beside the phase title, so an empty alt is correct. */
              alt={iconAlt ?? ""}
              className="w-full max-w-[180px] h-8 sm:h-10 object-contain drop-shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center justify-start">
            <BrightPathGradientTitle
              as="span"
              emphasis="none"
              textColor="text-foreground"
              className="card-heading text-center block">
              {mainHeading}
            </BrightPathGradientTitle>
            <BrightPathGradientTitle
              as="span"
              textColor="text-foreground"
              gradientWords={["Planning", "Prototyping", "Implementation", "Refining", "Deployment", "Support", "Updates"]}
              emphasis="solid"
              className="card-subheading tracking-wide text-center block">
              {subheading}
            </BrightPathGradientTitle>
            {frontCardDescription && (
              <p className="mt-1 services-body text-center card-text line-clamp-2">{frontCardDescription}</p>
            )}
          </div>
        </div>

        {/* BACK SIDE OF CARD */}
        <div className="flip-card-back flip-card-face--back absolute inset-0 backface-hidden p-3 sm:p-4 flex flex-col justify-between text-[#10192b] rotate-y-180 overflow-hidden">
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `url('/images/back-texture-overlay.jpg')`,
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10">
            <h3 className="card-subheading text-center mb-2 text-[#10192b]">
              {backCardTitle}
            </h3>

            <ul className="space-y-3 list-disc list-inside text-[#10192b] card-text">
              {bulletPoints.slice(0, 3).map((point, index) => {
                const p = point;
                return (
                  <li key={index} className="card-text text-[#10192b]">
                    {p.text || p.list_item_text || p.bullet_point || p.bullet_text || ""}
                  </li>
                );
              })}
            </ul>

            <p className="card-text opacity-70 mt-1">
              Tap to flip back →
            </p>
          </div>
        <Link to="/contact">
          <button className="flip-card-cta w-full mx-0 py-1.5 card-text relative z-10">
            {backCardButtonText}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FlipCard;