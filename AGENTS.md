# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro 5 site for a medical center. Route files live in `src/pages/` and map directly to URLs, including dynamic pages like `src/pages/[slug].astro`. Shared layout code is in `src/layouts/`, and UI lives in `.astro` components under `src/components/`, with small framework-free scripts for interactions. Static content and media live in `public/`, while imported images live in `src/images/`. Doctor and specialization data is stored in `src/db/data.json` and validated through the content collection in `src/content.config.ts`. Reusable helpers live in `src/lib/`, and centralized site data lives in `src/config/` and `src/data/`.

## Build, Test, and Development Commands
- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Astro dev server on `localhost:4321`.
- `npm run build`: run `astro check` and then create the production build in `dist/`.
- `npm run preview`: serve the production build locally for a final check.
- `npm run astro -- check`: run type and Astro diagnostics without building.
- `npm run check`: run linting, formatting, data validation, build, and internal-link checks.
- `npm run test:e2e`: run the Playwright smoke and accessibility tests.

## Coding Style & Naming Conventions
Use TypeScript where possible and keep the existing style: double quotes, semicolons, and 2-space indentation in most files. Keep reusable Astro components in PascalCase (`Layout.astro`, `Header.astro`); use route-oriented lowercase names for page files when they define URLs (`index.astro`, `specializzazioni.astro`). Prefer the `@/*` path alias for imports from `src/`. Keep Tailwind utility usage close to the component markup, and centralize shared tokens in `tailwind.config.mjs`.

## Testing Guidelines
Treat `npm run check` as the minimum verification step. For UI, navigation, SEO, or content changes, also run `npm run test:e2e`; it verifies key routes, responsive interactions, metadata, and serious accessibility violations. Manually inspect analytics-sensitive changes such as consent handling, call buttons, and tracking snippets.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commits such as `fix gtm`, `add doctor and fix style`, and `feat: update gtag for telephone call`. Follow that pattern: keep commits focused, use present-tense summaries, and prefer prefixes like `feat:` or `fix:` when helpful. PRs should include a short description, affected pages/components, manual verification notes, and screenshots for visible UI changes.

## Security & Configuration Tips
Analytics and third-party scripts are configured in `src/components/Analytics.astro` and included by the main layout and 404 page. Treat tracking IDs, consent handling, external embeds, and canonical URL changes as production-sensitive edits and verify them carefully before merging.
