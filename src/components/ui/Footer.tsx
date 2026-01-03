// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import type { Theme } from '@/store/appStore';
import BrightPathGradientTitle from '../BrightPathGradientTitle';

// The Footer component now includes the "Inspired" section content
interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const footerClasses = theme === 'dark' ? 'bg-[#1A2238] text-white' : 'bg-gray-100 text-gray-800';
  const textClasses = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const linkClasses = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black';

  return (
    <footer className={`py-12 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${footerClasses}`}>
      <div className="container mx-auto px-4 text-center">
        {/* === START OF THE NEW CONSOLIDATED SECTION === */}
        <BrightPathGradientTitle
          as="h3"
          className="text-xl font-poppins font-bold mb-2"
          textColor='text-neutral-700 dark:text-gray-200'
          gradientWords={["BrightPath"]}
        >
          BrightPath Web Studio LLC
        </BrightPathGradientTitle>
        
        {/* Lighthouse Image */}
        <div className="my-4 inline-block">
          <img
            src="/images/lighthouse-gift.png" // Update this path to your lighthouse image
            alt="Lighthouse logo"
            className="h-24 w-auto mx-auto rounded-full pb-4 pt-1 border border-primary shadow-glow-primary"
          />
        </div>
        
        {/* Inspired By Text */}
        <BrightPathGradientTitle
          as="p"
          className="font-lato mt-2"
          textColor='text-neutral-700 dark:text-gray-200'
          gradientWords={["Edward", "Almeida"]}
        >
          Inspired by Edward Almeida
        </BrightPathGradientTitle>
        {/* === END OF THE NEW CONSOLIDATED SECTION === */}

        <div className="flex justify-center space-x-4 mt-8">
          <Link to="/terms-of-service" className={`font-lato ${theme === 'dark' ? 'text-shadow-md' : ''} ${linkClasses}`}>
            Terms of Service
          </Link>
          <span className="text-gray-500">|</span>
          <Link to="/privacy-policy" className={`font-lato ${theme === 'dark' ? 'text-shadow-md' : ''} ${linkClasses}`}>
            Privacy Policy
          </Link>
          <span className="text-gray-500">|</span>
          <Link to="/contact" className={`font-lato ${theme === 'dark' ? 'text-shadow-md' : ''} ${linkClasses}`}>
            Contact Us
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          129 Maybin Rd, Zirconia, NC 28790
        </p>
        <p className="mt-1 text-sm text-gray-500">
          contact@brightpathwebstudio.com | (704) 453-3973
        </p>
        <p className="mt-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bright Path Web Studio LLC. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;