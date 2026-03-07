# BrightPath Web Studio — Site Updates

**Date:** March 7, 2026

---

## Summary

Added three new sections to improve the portfolio's professional presentation and communicate the value of website modernization and performance optimization work.

---

## Part 1: Homepage — "How I Help Businesses" Section

**File Modified:** `src/pages/HomePage.tsx`

### Changes

- Renamed section from "Our Services" to "How I Help Businesses"
- Updated section ID from `journey` to `services`
- Added intro paragraph below the heading
- Replaced icons (now using `RefreshCcw`, `Zap`, `Code` from lucide-react)
- Updated all three service cards with new content
- Improved heading hierarchy (`h5` → `h3` for card titles)
- Added `aria-hidden="true"` to decorative icons for accessibility

### New Content

**Section Title:** How I Help Businesses
**Intro:** Transforming outdated websites into modern, high-performing digital experiences.

| Service | Description |
|---------|-------------|
| Website Modernization | Updating outdated websites with modern responsive layouts, improved accessibility, and enhanced user experience. |
| Performance Optimization | Improving site speed, Lighthouse scores, and Core Web Vitals through asset optimization and layout restructuring. |
| Custom Front-End Development | Building polished web experiences with responsive layouts, custom styling, and performance-focused implementation. |

---

## Part 2: Case Study — "Project Snapshot" Section

**File Created:** `src/components/features/ProjectSnapshot.tsx`
**File Modified:** `src/components/features/AngelCityMassageCaseStudy.tsx`

### Component Features

- 4-column metadata grid (responsive: 2-col on tablet, 1-col on mobile)
- Key achievements list with checkmark icons
- Theme-aware styling (light/dark mode)
- Placed directly after the case study header

### Content

| Field | Value |
|-------|-------|
| Client | Angel City Massage |
| Project Type | Website Modernization & Performance Optimization |
| Platform | WordPress + Divi |
| My Role | Front-End Developer & Performance Optimization |

**Key Achievements:**
- Modernized a 20-year-old website originally built before responsive design
- Rebuilt layouts for desktop, tablet, and mobile responsiveness
- Improved Lighthouse performance from 62 → 99
- Reduced cumulative layout shift (CLS) by restructuring the hero section
- Optimized asset loading and JavaScript execution

---

## Part 3: Case Study — "Performance Improvements" Section

**File Created:** `src/components/features/PerformanceResults.tsx`
**File Modified:** `src/components/features/AngelCityMassageCaseStudy.tsx`

### Component Features

- Large score comparison display (62 → 99)
- "Before" score in muted gray, "After" score in primary gold
- TrendingUp icon with "Lighthouse Performance" label
- Screenshot display area (side-by-side on desktop, stacked on mobile)
- Theme-aware styling with glow effects in dark mode
- Placed after Project Snapshot section

### Screenshot Configuration

The component expects a Lighthouse screenshot at:
```
/public/images/lighthouse-score.png
```

To use a different image, update the `screenshotSrc` prop in `AngelCityMassageCaseStudy.tsx`.

---

## Files Changed

| File | Action |
|------|--------|
| `src/pages/HomePage.tsx` | Modified |
| `src/components/features/ProjectSnapshot.tsx` | Created |
| `src/components/features/PerformanceResults.tsx` | Created |
| `src/components/features/AngelCityMassageCaseStudy.tsx` | Modified |

---

## Notes

- All new components follow existing design patterns and use the established color palette
- Components are fully responsive and support light/dark theme
- No external dependencies were added — uses existing lucide-react icons
- All changes maintain consistency with the existing site design
