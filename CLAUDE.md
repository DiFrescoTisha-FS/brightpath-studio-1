# BrightPath Web Studio - Project Context

## Project Overview
Portfolio website for Tisha Di Fresco / BrightPath Web Studio LLC. Built with React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion for animations
- **CMS Integration**: WordPress REST API for some content (flip cards on Services page)
- **Hosting**: Netlify
- **Images**: Cloudinary for optimized delivery
- **Analytics**: GA4

## Key Design Patterns
- **Theme**: Light/dark mode via `useAppStore` (Zustand)
- **Responsive**: Mobile-first, breakpoints at `md` (768px) and `lg` (1024px)
- **Typography**: Poppins for headings, Lato for body, Open Sans occasionally
- **Colors**: Primary gold (#F2C94C), midnight blue (#1A2238), BrightPath blue
- **Text on mobile**: 14px (`text-sm`) for paragraphs, `leading-normal` for tighter line spacing

## Important Files
- `src/pages/AboutPage.tsx` - Hero with scroll-based grayscale (desktop only), Timeline, Skills, Values, CTA
- `src/pages/HomePage.tsx` - Hero injected via Vite plugin for LCP optimization
- `src/components/ClarityHero.tsx` - Class manifest for static hero (must sync with vite.config.ts)
- `vite.config.ts` - Contains static hero HTML injection
- `src/pages/ServicesPage.tsx` - Services, process flip cards, pricing
- `src/pages/PortfolioDemoPage.tsx` - Portfolio grid with case study views
- `src/pages/ContactPage.tsx` - Contact form with Google Apps Script integration + honeypot spam protection

## iOS Safari Considerations
- `background-attachment: fixed` doesn't work on iOS - use `md:bg-fixed` instead
- Timeline line/dot hidden on mobile (`hidden md:block`)

## Recent Session Work (May 30, 2026)

### About Page Enhancements
- Fixed horizontal overflow on mobile (`overflow-x-hidden`)
- Scroll-based grayscale-to-color hero transition (desktop only via `isMobile` state)
- Mobile shows full color hero immediately
- Fixed "Di Fresco" line break with `whitespace-nowrap`
- Name color changed to gold (`text-primary`) with text shadows for visibility
- Responsive text sizes throughout (14px on mobile)
- Hidden timeline line/dot on mobile
- Added **Skills & Expertise** section (tag cloud of technologies)
- Added **Why Work With Me** section (4 value cards: Vision-Driven, Clear Communication, True Collaboration, Craft & Quality)

### Homepage
- Fixed hero button widths on mobile (removed `w-full`, kept `min-w-[220px]`)

### Portfolio Page
- Increased card spacing on mobile (`gap-10 md:gap-8`)

### Previous Work (May 28, 2026)
- Contact form Google Workspace integration (Apps Script + honeypot)
- Responsive theme-aware backgrounds on Contact and Portfolio pages
- iOS Safari `bg-fixed` fix across all pages
- Services page semi-transparent sections for parallax effect
- AweStruck case study content corrections

## Commit History (Recent)
- `4a539aa` - Add more spacing between portfolio cards on mobile
- `7bdde08` - Add Skills & Values sections to About page
- `3d9c66a` - Add text shadows to About hero section
- `edc5ad2` - Fix About hero showing grayscale on mobile initial load
- `c74814a` - Fix homepage hero buttons width on mobile
- `2d5e428` - About page mobile fixes + scroll grayscale effect
