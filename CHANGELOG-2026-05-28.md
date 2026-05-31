# BrightPath Web Studio — Site Updates

**Date:** May 28, 2026

---

## Summary

Contact form integration with Google Workspace (Sheet + email notifications with honeypot spam protection), responsive theme-aware background images on Contact and Portfolio pages, iOS Safari background fix across all pages, Services page parallax polish, and AweStruck case study copy corrections.

---

## Part 1: Contact Form — Google Workspace Integration

The contact form now submits directly to Google Workspace via Google Apps Script.

### How it works

1. User submits form → POST to Google Apps Script endpoint
2. Apps Script logs submission to a Google Sheet (with timestamp)
3. Apps Script sends email notification to Google Workspace inbox
4. Form shows success state

### Technical details

- **Removed** Axios dependency — now uses native `fetch` API
- **CORS workaround**: `mode: 'no-cors'` + `Content-Type: 'text/plain'` to avoid preflight issues with Google Apps Script
- **Endpoint**: Google Apps Script web app deployed with "Anyone" access

### Spam protection

Added honeypot field for bot detection:

- Hidden "website" input field positioned offscreen (`-left-[9999px]`)
- `aria-hidden="true"`, `tabIndex={-1}`, `autoComplete="off"`
- If filled (by bots), form silently fakes success without submitting
- Zero UX impact for real users

### Files changed

| File | Change |
|------|--------|
| `src/pages/ContactPage.tsx` | Google Apps Script integration, honeypot spam protection |

---

## Part 2: Responsive Background Images

### Contact Page

Added theme-aware, responsive background images from Cloudinary:

| Theme | Device | Asset |
|-------|--------|-------|
| Light | Desktop | `09733844-51EB-4FED-9D45-96D27F6B5721_h0pgqv` |
| Light | Mobile | `DD66B962-520A-4DB7-B601-AF7B05C10EA4_x49gkb` |
| Dark | Desktop | `39D0F6A1-1E44-47D3-AF62-76DA60A068D2_vrt9t4` |
| Dark | Mobile | `775767A6-F757-46B8-BEDB-07E2CAFAE02A_tzca8a` |

### Portfolio Page

Added theme-aware, responsive background images:

| Theme | Device | Asset |
|-------|--------|-------|
| Light | Desktop | `773F3E3F-CEF6-4DA0-BB15-AC025AEAA336_qhyuw3` |
| Light | Mobile | `E163A136-43C0-4F7A-A3BC-D9F60A029A6E_nonghd` |
| Dark | Desktop | `A8DC3DBB-E83E-4F6D-8BE0-EB82145DF29A_cyrlwi` |
| Dark | Mobile | `786F78DB-EC9D-478E-9F21-52905E7BEB81_rsel8f` |

### Implementation pattern

Both pages use the same pattern:
- Inline `<style>` tag with media queries for responsive image switching
- CSS class (`.contact-page-bg`, `.portfolio-page-bg`) applied to wrapper div
- Breakpoint at 768px (md)

### Files changed

| File | Change |
|------|--------|
| `src/pages/ContactPage.tsx` | Responsive theme-aware backgrounds |
| `src/pages/PortfolioDemoPage.tsx` | Responsive theme-aware backgrounds |

---

## Part 3: iOS Safari Background Fix

`background-attachment: fixed` doesn't work on iOS Safari. Changed all instances of `bg-fixed` to `md:bg-fixed` so parallax only applies on desktop (768px+) while mobile gets normal scrolling backgrounds.

### Files changed

| File | Section |
|------|---------|
| `src/pages/ContactPage.tsx` | Main background |
| `src/pages/ServicesPage.tsx` | Wrapper, Hero, Process, CTA sections |
| `src/pages/AboutPage.tsx` | Timeline section |
| `src/components/features/MultiPageFlowSection.tsx` | Section background |

---

## Part 4: Services Page Polish

### Semi-transparent sections

Made solid-background sections 90% opaque (`/90` modifier) so the lighthouse parallax background peeks through:

- "What I Build" section
- "What's Included" section
- "Tech Stack" section
- "Maintenance" section

Wrapped entire page in parallax background container.

### "What's Included" card fixes

- **Title color**: `text-foreground` → `text-primary` (dark blue)
- **Title size**: Added `text-sm` to reduce font size
- **Padding**: Added `pr-8` for breathing room on right side
- **Grid gap**: Added `lg:gap-8` to match "What I Build" section

### Files changed

| File | Change |
|------|--------|
| `src/pages/ServicesPage.tsx` | Semi-transparent sections, card styling, iOS bg-fixed fix |

---

## Part 5: Contact Page Form Polish

### Input text color

Fixed input text color that was too pale:
- Added `inputText: 'text-gray-900'` to themeClasses
- Updated placeholder to `text-gray-500`
- Applied to all form fields (name, email, message)

### Equal column heights

Made left and right columns equal height:
- Grid: Added `items-stretch`
- Left column: Changed `space-y-8` to `flex flex-col gap-8`
- "Get In Touch" card: Added `flex-1` to expand and fill space

### Files changed

| File | Change |
|------|--------|
| `src/pages/ContactPage.tsx` | Input text color, equal column heights |

---

## Part 6: AweStruck Case Study — Copy Corrections

Fixed inaccurate statements in the case study content:

### Overview
- ~~"load fast on low-end mobile devices"~~
- → "perform well despite heavy use of scroll animations throughout the homepage"

### Goals
- ~~"Hit production-grade performance on mobile (the primary audience device)"~~
- → "Hit production-grade performance despite heavy scroll animations throughout the homepage"

### Challenge (paragraph 1)
- ~~"Robin had a fully-developed Biblical SEL curriculum"~~
- → "Robin had the first domain of her Biblical SEL curriculum — Josiah's Journey — ready to share"

### Challenge (paragraph 2)
- ~~"The audience is mostly on mobile devices, often low-end"~~
- → "The primary audience is homeschool moms browsing on laptops and desktops, but the animation-heavy homepage pushed performance to its limits"

### Files changed

| File | Change |
|------|--------|
| `src/data/caseStudies/awestruckIntelligence.ts` | Audience, curriculum status, performance reasoning |

---

## Files Changed (Summary)

| File | Changes |
|------|---------|
| `src/pages/ContactPage.tsx` | Google Workspace integration, honeypot, backgrounds, input styling, column heights |
| `src/pages/ServicesPage.tsx` | Semi-transparent sections, card fixes, iOS bg-fixed |
| `src/pages/PortfolioDemoPage.tsx` | Responsive theme-aware backgrounds |
| `src/pages/AboutPage.tsx` | iOS bg-fixed fix |
| `src/components/features/MultiPageFlowSection.tsx` | iOS bg-fixed fix |
| `src/data/caseStudies/awestruckIntelligence.ts` | Copy corrections |
| `CHANGELOG-2026-05-28.md` | This file |

---

## Google Apps Script Setup Reference

For future reference, the contact form uses this Google Apps Script pattern:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Log to sheet
  sheet.appendRow([new Date(), data.fullName, data.email, data.message]);

  // Send email notification
  MailApp.sendEmail({
    to: 'your-email@domain.com',
    subject: `New Contact Form: ${data.fullName}`,
    body: `Name: ${data.fullName}\nEmail: ${data.email}\nMessage: ${data.message}`
  });

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy as Web App with "Execute as: Me" and "Who has access: Anyone".
