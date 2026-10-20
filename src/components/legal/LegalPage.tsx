import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '@/config/contact';
import { legalLinkClass } from './legalStyles';

/**
 * Layout for the Privacy Policy and Terms of Service. Sits on the approved
 * theme grounds (cream #FAF6EF / near-black #0A0F18, the same values as
 * `.services-page`) with links in the theme's single gold. This replaced the
 * old grey `bg-stone` slab, which put white body text on #9CA5AF in dark mode.
 */
export const LegalPage = ({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: ReactNode }) => (
  <div className="bg-[#faf6ef] text-[#1a2238] dark:bg-[#0a0f18] dark:text-[#f5f0e8] py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto font-lato text-sm md:text-base leading-normal md:leading-relaxed">
      <h1 className="text-4xl font-poppins font-bold text-center mb-4">{title}</h1>
      <p className="text-center text-sm opacity-80 mb-12">
        Last Updated: <strong>{lastUpdated}</strong>
      </p>
      {children}
    </div>
  </div>
);

export const ExternalLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className={legalLinkClass} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export const EmailLink = () => (
  <a href={`mailto:${BUSINESS.email}`} className={legalLinkClass}>{BUSINESS.email}</a>
);

export const PhoneLink = () => (
  <a href={BUSINESS.phoneHref} className={legalLinkClass}>{BUSINESS.phoneDisplay}</a>
);

export const WebsiteLink = () => (
  <a href={BUSINESS.websiteUrl} className={legalLinkClass}>{BUSINESS.websiteDisplay}</a>
);

/** The closing "Contact Us" block both legal pages end with. */
export const LegalContactBlock = () => (
  <>
    <address className="not-italic mt-4 space-y-1">
      <p><strong>{BUSINESS.legalName}</strong></p>
      <p>Email: <EmailLink /></p>
      <p>Phone: <PhoneLink /></p>
      <p>{BUSINESS.location}</p>
    </address>
    <p className="mt-8">
      Prefer a form? You can also reach us through our <Link to="/contact" className={legalLinkClass}>contact page</Link>.
    </p>
  </>
);
