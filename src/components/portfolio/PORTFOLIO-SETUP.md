# Dale Tiffany Portfolio Components

## Moving to BrightPath Website

Copy the entire `/src/components/portfolio/` folder to your BrightPath project.

### Required Dependencies
These components use icons from `lucide-react`. Ensure it's installed:
```bash
npm install lucide-react
```

### Required Images

Place these images in your BrightPath `public/dale-tiffany/` folder:

#### Before Screenshots (from old PHP site)
- `before-home.png` - Old homepage
- `before-retailer.png` - Old "Find a Retailer" page
- `before-about.png` - Old about page
- `before-contact.png` - Old contact page
- `before-catalog.png` - Old catalog login (broken)

#### After Screenshots (from new React site)
- `after-home.png` - New homepage
- `after-portal.png` - New B2B retailer portal
- `after-about.png` - New about page
- `after-contact.png` - New contact page
- `after-crm.png` - New CRM dashboard

### Usage

```tsx
import { DaleTiffanyCard, DaleTiffanyCaseStudy } from '@/components/portfolio';

// Card for portfolio grid
<DaleTiffanyCard onViewCaseStudy={() => navigate('/portfolio/dale-tiffany')} />

// Full case study page
<DaleTiffanyCaseStudy onBack={() => navigate('/portfolio')} />
```

### Features

**DaleTiffanyCard:**
- Hover effect shows before/after preview
- Tech stack pills
- Feature icons (Responsive, B2B Portal, CRM)
- Click to view full case study

**DaleTiffanyCaseStudy:**
- Interactive before/after slider comparison
- Multiple screenshot tabs (Homepage, Portal, About, Contact, CRM)
- Challenge vs Solution comparison
- Feature breakdown cards
- Tech stack display
- CTA section

### Customization

Both components use your BrightPath Tailwind theme variables:
- `--primary` (gold)
- `--foreground` / `--background`
- `--muted` / `--muted-foreground`
- `--destructive` (for "before" badges)
- `font-poppins` / `font-lato`

They support dark/light mode automatically.
