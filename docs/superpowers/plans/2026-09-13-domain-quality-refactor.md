# Domain and Quality Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the doctors catalogue explicit, unit tested, build verified, performance-budgeted, and easier to review.

**Architecture:** A shared doctor-domain module defines closed values and the per-record schema. A separate pure catalogue validator owns cross-record and filesystem invariants; Astro, CLI checks, unit tests, components, and CI consume those contracts without recreating rules.

**Tech Stack:** Astro 5, TypeScript, Zod through `astro/zod`, Vitest, Playwright, Lighthouse CI, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-13-domain-quality-refactor-design.md`

## Global Constraints

- Keep Astro static generation and all existing public doctor URLs.
- Keep Doctolib as the booking system of record; do not add appointment scheduling.
- Use Node.js 22, double quotes, semicolons, and 2-space indentation.
- Preserve unrelated user changes already present in `README.md`, `CONVERSION_TRACKING.md`, and `docs/`.
- Enforce a 500 KiB maximum for each doctor image.

---

### Task 1: Shared doctor domain and booking union

**Files:**

- Create: `src/domain/doctor.ts`
- Modify: `src/content.config.ts`
- Modify: `src/db/data.json`
- Modify: `src/components/Card.astro`
- Modify: `src/pages/[slug].astro`
- Test: `tests/unit/doctor-schema.test.ts`

**Interfaces:**

- Produces: `SPECIALIZATIONS`, `Specialization`, `DoctorBooking`, and `doctorSchema`.
- Consumes: existing JSON records and Astro content collection generation.

- [x] Add Vitest and a `test:unit` script.
- [x] Write schema tests that reject unknown specializations and malformed booking variants and accept `phone` and valid `external` bookings.
- [x] Run `npm run test:unit` and verify the tests fail because the domain module does not exist.
- [x] Implement the constants, union, and schema in `src/domain/doctor.ts` and import the schema from `src/content.config.ts`.
- [x] Migrate every `link` value to the matching `booking` object and update both rendering consumers with exhaustive booking branches.
- [x] Run `npm run test:unit` and `npm run astro -- check` and verify both pass.

### Task 2: Pure catalogue validation and generated-route contract

**Files:**

- Create: `src/domain/doctor-catalog.ts`
- Create: `tests/unit/doctor-catalog.test.ts`
- Modify: `scripts/check-data.mjs`
- Create: `scripts/check-routes.mjs`
- Modify: `package.json`

**Interfaces:**

- Produces: `findCatalogErrors(doctors, options): string[]` and the `check:routes` command.
- Consumes: `Doctor`, the doctors JSON file, `public/doctors-images`, and generated `dist/*.html` files.

- [x] Write tests covering duplicate `id`, `slug`, and `order`, mismatched `id`/`slug`, missing and orphan images, and the image-size limit.
- [x] Run the focused tests and verify failure because `findCatalogErrors` is absent.
- [x] Implement `findCatalogErrors` as a deterministic pure function whose filesystem facts are injected through options.
- [x] Reduce `check-data.mjs` to loading JSON/filesystem metadata, parsing records through `doctorSchema`, and reporting `findCatalogErrors` output.
- [x] Add `check-routes.mjs` to assert `dist/<slug>.html` exists for every doctor and wire it after the build in `npm run check`.
- [x] Run unit, data, build, link, and route checks and verify they pass.

### Task 3: Performance budgets

**Files:**

- Create: `lighthouserc.cjs`
- Modify: `package.json`
- Modify: `.github/workflows/quality.yml`
- Modify: `docs/development.md`

**Interfaces:**

- Produces: `npm run check:bundle`, `npm run test:performance`, and CI
  performance assertions.
- Consumes: the Astro preview server and the three representative public routes.

- [x] Add `@lhci/cli`, a 100 KiB first-party bundle check, and the documented Lighthouse assertions for scores, LCP, CLS, total bytes, and 500 KiB total JavaScript bytes including third parties.
- [x] Configure Lighthouse CI to build, start `astro preview`, collect the three representative URLs, and keep reports as CI artifacts.
- [x] Run the performance command; optimize oversized doctor assets until the data and performance budgets pass.
- [x] Document local execution and explain that Lighthouse results are lab measurements, not field Core Web Vitals.

### Task 4: Review and architecture governance

**Files:**

- Create: `.github/pull_request_template.md`
- Create: `docs/adr/0001-explicit-doctor-metadata.md`
- Create: `docs/adr/0002-external-booking-boundary.md`
- Modify: `docs/architecture.md`
- Modify: `docs/content-management.md`
- Modify: `README.md`

**Interfaces:**

- Produces: reviewer checklist and durable records for the executable architectural decisions.
- Consumes: the completed domain, test, and performance commands.

- [x] Add the PR template with motivation, scope, decisions, verification, performance, screenshots, and deployment-risk sections.
- [x] Record the explicit-metadata and external-booking decisions, including alternatives and consequences.
- [x] Update architecture, content-management, and README documentation to match the executable model and commands.
- [x] Run the full formatting check and repair any documentation formatting failures.

### Task 5: Final verification and delivery

**Files:**

- Modify only files that fail an existing check.

**Interfaces:**

- Consumes: all commands and files produced by Tasks 1-4.
- Produces: one reviewable branch pushed to `origin/dev-refactor`.

- [x] Run `npm test` and `npm run test:performance` from a clean build.
- [x] Inspect `git diff --check`, `git status`, and the complete diff for accidental or unrelated changes.
- [x] Commit the coherent refactor with an imperative `feat:` message.
- [x] Push `dev-refactor` to `origin` and confirm the upstream tracking branch.
