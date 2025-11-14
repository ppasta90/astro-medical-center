# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based medical center website for "Centro Medico Agliana" built with React components and Tailwind CSS. The site showcases medical specialists and their services, with a focus on SEO and analytics integration.

## Tech Stack

- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Nanostores for client-side state
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Astro's built-in build system
- **Analytics**: Google Analytics 4 and Google Tag Manager

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
```

## Architecture

### File Structure
- `src/pages/`: File-based routing (index.astro, specializations pages)
- `src/components/`: Mixed Astro (.astro) and React (.tsx) components
- `src/layouts/`: Layout components (Layout.astro is the main layout)
- `src/stores/`: Nanostores for client state (e.g., drawer menu state)
- `src/db/data.json`: Static data for doctors and specializations
- `src/lib/`: Utility functions
- `src/styles/`: Global CSS and Tailwind configuration

### Key Components
- **Header.tsx**: React component with mobile drawer navigation using react-modern-drawer
- **Layout.astro**: Main layout with SEO meta tags, analytics scripts, and cookie consent
- **CarouselWrapper.astro**: Image carousel using Embla Carousel
- Component pattern: Mix of `.astro` files for static content and `.tsx` files for interactive features

### Data Management
- Doctor profiles and specializations stored in `src/db/data.json`
- Client state managed with nanostores (lightweight alternative to Redux)
- External booking integration via Doctolib links

### Styling System
- Custom Tailwind config with medical center brand colors (primary: #2e9370, secondary: #000c64)
- Typography: DM Sans (sans-serif) and Bebas Neue (serif/display)
- Responsive design with custom breakpoints
- Radix UI components with custom Tailwind styling

### SEO & Analytics
- Dynamic page titles and meta descriptions based on routes
- Canonical URLs and Open Graph tags
- Google Analytics 4 and GTM integration
- Cookie consent via Iubenda
- Sitemap generation via @astrojs/sitemap

## Path Aliases

Use `@/*` to reference `src/*` files (configured in tsconfig.json).

## Integration Notes

- React components require `client:load` directive in Astro files for hydration
- Images stored in `src/images/` and `public/` directories
- Font loading via Fontsource packages
- External booking system integration (Doctolib)