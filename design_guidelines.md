# IronCrest Sales - Design Guidelines

## Design Approach
**Reference-Based B2B Professional**: Drawing from Stripe's clarity, Linear's precision, and Salesforce's authority. Clean, data-driven aesthetic with strategic visual hierarchy that commands trust.

## Typography System
**Primary Font**: Inter (Google Fonts) - modern, professional, excellent readability
- **Hero Headlines**: 3.5rem (56px) font-bold, tracking-tight, leading-tight
- **Section Headers**: 2.5rem (40px) font-bold
- **Subheadings**: 1.5rem (24px) font-semibold
- **Body Large**: 1.125rem (18px) font-normal, leading-relaxed
- **Body**: 1rem (16px) font-normal, leading-normal
- **Small/Stats**: 0.875rem (14px) font-medium, uppercase tracking-wide

**Font Weights**: 400 (normal), 600 (semibold), 700 (bold)

## Layout System
**Spacing Units**: Tailwind primitives of 4, 8, 12, 16, 24 (p-4, gap-8, py-12, mb-16, py-24)
**Section Padding**: py-20 (desktop), py-12 (mobile)
**Container**: max-w-7xl mx-auto px-6
**Grid System**: 12-column base, 3-column feature grids, 2-column content splits

## Component Library

### Navigation
Fixed header with max-w-7xl container, py-4, flex justify-between. Logo left, navigation links (gap-8), CTA button right. Minimal, always visible.

### Hero Section
Full-width with background image (professional office/handshake/team meeting), overlay with navy tint (opacity-60). Content max-w-4xl, centered. Large headline, supporting paragraph (max-w-2xl), dual CTA buttons (primary gold background with backdrop-blur-md, secondary white outline). Height: 90vh on desktop, natural on mobile.

### Stats Bar
Immediately below hero. 4-column grid on desktop (grid-cols-4), single column mobile. Each stat: large number (4rem bold), small label below. Navy background, white text, py-16.

### Services Section
3-column grid (lg:grid-cols-3). Each card: white background, p-8, subtle border, icon top (64px, gold accent), title, description. Hover: slight shadow lift.

### Case Studies / Results
2-column alternating layout. Left: large image (600x400), Right: content (client name, challenge, solution, results with metrics). Swap sides per item. py-24 between items.

### Team Section
4-column grid of team cards (lg:grid-cols-4, md:grid-cols-2). Square headshot, name, title, brief bio. Charcoal text on light gray background cards.

### Testimonials
Large centered quotes, 2-column grid (md:grid-cols-2), each with quote text (1.25rem italic), client photo (rounded-full, 80px), name/company below.

### CTA Section
Full-width navy background, centered content, large heading, supporting text, prominent gold CTA button with backdrop-blur-md. py-24.

### Footer
Dark navy background (even darker than primary), 4-column grid with company info, services, resources, contact. Bottom bar with copyright, social icons. py-16.

## Images Specifications

**Hero Image**: Professional corporate setting - modern office conference room or executive handshake. High-quality, aspirational, diverse team. 1920x1080 minimum. Position: center, cover.

**Case Study Images**: Client logos, project screenshots, data visualizations. 600x400 aspect ratio, professional photography style.

**Team Photos**: Professional headshots, consistent lighting/background. Square format, 400x400, neutral backgrounds.

**Service Icons**: Use Heroicons (via CDN) - ChartBarIcon, UserGroupIcon, PresentationChartLineIcon, etc. 64px size, gold stroke.

## Page Sections (In Order)
1. Navigation (fixed)
2. Hero with background image + blurred button backgrounds
3. Stats Bar (4 metrics)
4. Services Grid (6 services, 3 columns)
5. About Section (2-column: text + team image)
6. Case Studies (3 alternating layouts)
7. Testimonials (4 quotes, 2x2 grid)
8. Team Grid (8 members, 4 columns)
9. Final CTA
10. Footer

**Button Treatment on Images**: All buttons over hero image use `backdrop-blur-md bg-[color]/90` - gold for primary (#C9A24D/90), white outline for secondary.