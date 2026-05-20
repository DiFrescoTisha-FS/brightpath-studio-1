// src/components/InspiredSection.tsx

import React from "react";
import type { Theme } from '@/store/appStore';
import { cloudinaryAssets } from '@/data/cloudinaryAssets';

// Define the component's props to accept the 'theme' variable
interface InspiredSectionProps {
  theme: Theme;
}

// Update the component's signature to accept the props
const InspiredSection: React.FC<InspiredSectionProps> = ({ theme }) => {
  const sectionClasses = theme === 'dark' ? 'bg-[#1A2238] text-white' : 'bg-white text-slate-800';
  const textClasses = theme === 'dark' ? 'text-white' : 'text-slate-800';

  return (
    <div className={`py-8 text-center border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${sectionClasses}`}>
      <div className="container mx-auto px-4">
        <h3 className={`text-xl font-poppins font-bold ${textClasses} mb-4`}>
          Bright Path Web Studio LLC
        </h3>
        
        {/* Lighthouse Image */}
        <div className="my-4 inline-block">
          <img
            src={cloudinaryAssets.lighthouseGift}
            alt="Lighthouse logo"
            className="h-24 w-auto mx-auto"
          />
        </div>
        
        {/* Inspired By Text */}
        <p className={`font-lato ${textClasses} mt-4`}>
          Inspired by Edward Almeida
        </p>
      </div>
    </div>
  );
};

export default InspiredSection;