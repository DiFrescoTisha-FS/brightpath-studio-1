// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import type { Theme } from '@/store/appStore';
import BrightPathGradientTitle from '../BrightPathGradientTitle';
import { cloudinaryAssets } from '@/data/cloudinaryAssets';
import NewsletterSignup, { NEWSLETTER_ENABLED } from '../NewsletterSignup';
import { BUSINESS } from '@/config/contact';

// The Footer component now includes the "Inspired" section content
interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  // Background and top rule come from the `site-footer` rules in globals.css
  // so the footer sits in the same surface system as the homepage sections.
  // Text colours are unchanged.
  const footerClasses = theme === 'dark' ? 'text-white' : 'text-gray-800';
  // const textClasses = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const linkClasses = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black';
  // Same grey as the links above. The old gray-500 measured 4.0–4.15:1 here,
  // under the 4.5:1 small-text minimum.
  const smallTextClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <footer className={`site-footer ${NEWSLETTER_ENABLED ? 'pb-12' : 'py-12'} ${footerClasses}`}>
      {/* Full-width artwork band behind the signup (`newsletter-band` in
          globals.css): lighthouse artwork as real layers, like the homepage
          sections — the Services artwork, except light mode from 1440px,
          which has its own. The band supplies the top padding the footer
          would otherwise have. */}
      {NEWSLETTER_ENABLED && (
        <div className="newsletter-band">
          <div aria-hidden="true" className="newsletter-band__art" />
          <div aria-hidden="true" className="newsletter-band__veil" />
          <div className="newsletter-band__inner container mx-auto px-4 text-center">
            <NewsletterSignup />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 text-center">
        {/* === START OF THE NEW CONSOLIDATED SECTION === */}
        <BrightPathGradientTitle
          as="h3"
          className="text-xl font-poppins font-bold mb-2 text-muted-foreground"
          textColor='text-neutral-700 dark:text-gray-200'
          gradientWords={["BrightPath"]}
          emphasis="solid"
        >
          {BUSINESS.legalName}
        </BrightPathGradientTitle>
        
        {/* Lighthouse Image */}
        <div className="my-4 inline-block">
          <img
            src={cloudinaryAssets.lighthouseGift}
            alt="Lighthouse logo"
            className="h-24 w-auto mx-auto rounded-full pb-4 pt-1 border border-primary shadow-glow-primary"
          />
        </div>
        
        {/* Inspired By Text */}
        <BrightPathGradientTitle
          as="p"
          className="font-lato mt-2"
          textColor='text-neutral-500 dark:text-gray-200'
          gradientWords={["Edward", "Almeida"]}
          emphasis="solid"
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
        <p className={`mt-1 text-sm ${smallTextClasses}`}>
          <a href={`mailto:${BUSINESS.email}`} className="hover:underline underline-offset-2">{BUSINESS.email}</a>
          {' | '}
          <a href={BUSINESS.phoneHref} className="hover:underline underline-offset-2">{BUSINESS.phoneDisplay}</a>
        </p>
        <p className={`mt-6 text-sm ${smallTextClasses}`}>
          &copy; {new Date().getFullYear()} {BUSINESS.legalName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;