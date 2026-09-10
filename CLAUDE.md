# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based medical center website for "Centro Medico Agliana" built with Astro components and Tailwind CSS. The site showcases medical specialists and their services, with a focus on SEO, accessibility, performance, and analytics integration.

## Tech Stack

- **Framework**: Astro 5.x with framework-free client scripts
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Astro's built-in build system
- **Analytics**: Google Analytics 4 and Google Tag Manager
- **Testing**: ESLint, Prettier, Astro Check, and Playwright

## Development Commands

```bash
# Development server (localhost:4321)
npm run dev

# Build with type checking
npm run build

# Preview production build
npm run preview

# Type checking only
astro check

# Full static checks and build
npm run check

# Browser smoke and accessibility tests
npm run test:e2e
```

## Architecture

### File Structure
- `src/pages/`: File-based routing (index.astro, specializations pages)
- `src/components/`: Astro components and framework-free client interactions
- `src/layouts/`: Layout components (Layout.astro is the main layout)
- `src/db/data.json`: Static data for doctors and specializations
- `src/config/`: Centralized site and contact configuration
- `src/data/`: Shared static content
- `src/lib/`: Utility functions
- `src/styles/`: Global CSS and Tailwind configuration

### Key Components
- **Header.astro**: Header with native dialog-based mobile navigation
- **Layout.astro**: Main layout with SEO meta tags, analytics scripts, and cookie consent
- **CarouselWrapper.astro**: Accessible image carousel with a small client script
- **DoctorsGrid.astro**: Doctor cards and specialization filtering without hydration

### Data Management
- Doctor profiles and specializations stored in `src/db/data.json`
- Doctor data validated by the Astro content collection and project checks
- External booking integration via Doctolib links

### Styling System
- Custom Tailwind config with medical center brand colors (primary: #2e9370, secondary: #000c64)
- Typography: DM Sans (sans-serif) and Bebas Neue (serif/display)
- Responsive design with custom breakpoints

### SEO & Analytics
- Dynamic page titles and meta descriptions based on routes
- Canonical URLs and Open Graph tags
- Google Analytics 4 and GTM integration
- Cookie consent via Iubenda
- Sitemap generation via @astrojs/sitemap

## Path Aliases

Use `@/*` to reference `src/*` files (configured in tsconfig.json).

## Integration Notes

- Interactive components use native browser APIs and do not require framework hydration
- Images are stored in `src/images/` and `public/` directories
- Font loading via Fontsource packages
- External booking system integration (Doctolib)
