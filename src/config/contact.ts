// Official public contact details for BrightPath Web Studio, confirmed by the
// owner on Oct 19, 2026. Use these everywhere the site shows contact info.
// index.html's JSON-LD can't import this file — keep it in sync by hand.
export const BUSINESS = {
  legalName: 'BrightPath Web Studio, LLC',
  email: 'contact@brightpathwebstudio.org',
  phoneDisplay: '(828) 388-5743',
  phoneHref: 'tel:+18283885743',
  websiteUrl: 'https://brightpathwebstudio.org',
  websiteDisplay: 'brightpathwebstudio.org',
  location: 'North Carolina, United States',
  // Official business pages (launched Nov 2026). Shown in the footer and on the
  // Contact page; also listed as `sameAs` in index.html's JSON-LD (kept in sync
  // by hand). The About page's GitHub/LinkedIn links are Tisha's personal
  // profiles and deliberately stay separate.
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61596895259377',
    linkedin: 'https://www.linkedin.com/company/111891574/',
  },
} as const;

// Shared by the footer and the Contact page so the two stay in step. Plain
// links only: no embeds, widgets or tracking pixels, so nothing loads from
// Facebook or LinkedIn until a visitor clicks.
export const SOCIAL_LINKS = [
  { network: 'Facebook', href: BUSINESS.social.facebook },
  { network: 'LinkedIn', href: BUSINESS.social.linkedin },
] as const;
