# Specialist Contacts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the obsolete central booking phone and Scandagli, then expose each specialist's available phone, email, and Doctolib link.

**Architecture:** Keep specialist contacts as optional flat fields in the existing doctor collection. Render a common conditional contact pattern in cards and profile pages, while global booking entry points lead to the specialists list instead of a central secretary.

**Tech Stack:** Astro 5, TypeScript, Zod content collections, Tailwind CSS, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-04-specialist-contacts-design.md`

## Global Constraints

- Preserve the current doctor slugs and existing Doctolib `link` values.
- Add only optional `phone` and `email` doctor fields; do not introduce a booking backend.
- Publish only patient-facing numbers selected from the supplied spreadsheet; use `3508266621` for Carlotta Coppini.
- Remove every public reference to the central phone `0574 027087` and to the secretary service.
- Do not alter address, opening hours, PEC, analytics, or unrelated content.
- Preserve the untracked `.lighthouseci/` directory.

## Review Focus

- A doctor with phone, email, and Doctolib must show all three valid actions on card and profile.
- A doctor with no phone or email must not render empty or misleading actions.
- A patient-facing phone must produce a normalized `tel:+39...` link while retaining a readable label.
- Scandagli must disappear from generated routes and data without leaving an orphan image.
- No page or structured-data block may retain the retired central phone or secretary booking wording.

---

### Task 1: Specialist contact model and source data

**Files:**

- Modify: `src/content.config.ts`
- Modify: `src/db/data.json`
- Modify: `scripts/check-data.mjs`
- Delete: `public/doctors-images/scandagli.webp`
- Test: `scripts/check-data.mjs`

**Interfaces:**

- Consumes: spreadsheet-selected public phone and email values from the approved spec.
- Produces: `Doctor` data with optional `phone?: string` and `email?: string`; existing `link: string` remains the Doctolib URL.

- [ ] **Step 1: Extend the data validation checks so phone numbers must be Italian mobile numbers and emails must parse when present**

Add assertions to `scripts/check-data.mjs` covering optional fields, absence of Scandagli, and the expected patient-facing selections for Coppini, Cirillo, Marangella, Giannini, Giovannuzzi, and Bortot.

- [ ] **Step 2: Run the data check and verify it fails against the old model**

Run: `npm run check:data`
Expected: FAIL because Scandagli still exists and approved specialist contacts are absent.

- [ ] **Step 3: Add optional contact fields to the content schema and populate approved contacts**

In `src/content.config.ts`, define `phone` as an optional Italian mobile string and `email` as an optional valid email. In `src/db/data.json`, add only published values selected under the spec's rules, remove Scandagli's record, and preserve existing Doctolib links.

- [ ] **Step 4: Delete Scandagli's now-unreferenced image**

Delete `public/doctors-images/scandagli.webp` so the asset validator continues to reject orphan doctor images.

- [ ] **Step 5: Run focused validation**

Run: `npm run check:data && npm run astro -- check`
Expected: PASS with 17 validated doctors and no schema errors.

- [ ] **Step 6: Commit the model and data change**

```bash
git add src/content.config.ts src/db/data.json scripts/check-data.mjs public/doctors-images/scandagli.webp
git commit -m "feat: add specialist booking contacts"
```

### Task 2: Conditional specialist booking actions

**Files:**

- Create: `src/lib/contact.ts`
- Modify: `src/components/Card.astro`
- Modify: `src/pages/[slug].astro`
- Modify: `tests/smoke.spec.ts`

**Interfaces:**

- Consumes: `Doctor.phone`, `Doctor.email`, and `Doctor.link` from Task 1.
- Produces: `phoneHref(phone: string): string`, returning normalized Italian `tel:+39...` URLs; conditional phone, email, and Doctolib actions.

- [ ] **Step 1: Add failing browser assertions for complete and missing contact combinations**

Extend `tests/smoke.spec.ts` to assert that a fully populated specialist exposes phone, email, and Doctolib links; a specialist without a contact omits that action; and the phone `href` uses `tel:+39...`.

- [ ] **Step 2: Run the focused browser test and verify it fails**

Run: `npm run test:e2e -- --grep "contatti specialista"`
Expected: FAIL because cards and profiles still use the central phone.

- [ ] **Step 3: Implement phone normalization and conditional card actions**

Add `phoneHref(phone: string): string` in `src/lib/contact.ts`. Update `Card.astro` to render `TELEFONO`, `EMAIL`, and `PRENOTA ONLINE` only when the corresponding specialist field exists.

- [ ] **Step 4: Implement conditional profile actions and structured data**

Update `[slug].astro` so its copy does not promise unavailable channels, buttons match the doctor's available fields, `telephone` and `email` appear in `Physician` JSON-LD only when present, and `sameAs` remains conditional on Doctolib.

- [ ] **Step 5: Run the focused test and type check**

Run: `npm run test:e2e -- --grep "contatti specialista" && npm run astro -- check`
Expected: PASS.

- [ ] **Step 6: Commit specialist booking UI**

```bash
git add src/lib/contact.ts src/components/Card.astro 'src/pages/[slug].astro' tests/smoke.spec.ts
git commit -m "feat: show specialist booking contacts"
```

### Task 3: Remove obsolete central booking channels

**Files:**

- Modify: `src/config/site.ts`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Contacts.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/lavora-con-noi.astro`
- Modify: `src/data/faqs.ts`
- Modify: `tests/smoke.spec.ts`

**Interfaces:**

- Consumes: `/specializzazioni` as the single global booking entry point.
- Produces: global pages with no central phone or secretary-service claims.

- [ ] **Step 1: Add failing regression assertions for retired content**

Extend `tests/smoke.spec.ts` to assert the home and work pages contain no `tel:+390574027087`, no `0574 027087`, and no secretary-booking wording; assert the Contacts section contains the approved paragraph and a link to `/specializzazioni`.

- [ ] **Step 2: Run the regression test and verify it fails**

Run: `npm run test:e2e -- --grep "prenotazione globale"`
Expected: FAIL because central phone links and secretary copy are still rendered.

- [ ] **Step 3: Remove the central phone configuration and structured data**

Delete `SITE.contact.phone` from `src/config/site.ts` and remove clinic `telephone` output from `src/layouts/Layout.astro`.

- [ ] **Step 4: Point global calls to action to specialists**

Replace central-call actions in `Hero.astro` and `Header.astro` with `/specializzazioni` links. Remove the central phone from `Footer.astro` and `lavora-con-noi.astro` without changing PEC, general email, address, or opening hours.

- [ ] **Step 5: Replace Contacts and FAQ booking copy**

In `Contacts.astro`, use a neutral center image and the exact approved paragraph from the spec, linked to `/specializzazioni`; retain the general email only as an information channel. Update `src/data/faqs.ts` so booking guidance directs users to specialist-specific contacts and removes secretary availability claims.

- [ ] **Step 6: Run the focused regression test**

Run: `npm run test:e2e -- --grep "prenotazione globale"`
Expected: PASS.

- [ ] **Step 7: Commit the global content change**

```bash
git add src/config/site.ts src/components/Hero.astro src/components/Header.astro src/components/Contacts.astro src/components/Footer.astro src/layouts/Layout.astro src/pages/lavora-con-noi.astro src/data/faqs.ts tests/smoke.spec.ts
git commit -m "fix: remove retired secretary contacts"
```

### Task 4: Full verification and branch delivery

**Files:**

- Modify if required by verification: files already listed above only.

**Interfaces:**

- Consumes: completed Tasks 1-3.
- Produces: a verified branch ready to push.

- [ ] **Step 1: Search for retired content and orphan references**

Run: `rg -n "0574 027087|\+390574027087|Scandagli|segreteria|SITE\\.contact\\.phone" src public tests scripts`
Expected: no obsolete production references; test-only negative assertions are allowed.

- [ ] **Step 2: Run the repository quality gate**

Run: `npm run check`
Expected: PASS.

- [ ] **Step 3: Run the complete browser suite**

Run: `npm run test:e2e`
Expected: PASS with all smoke, interaction, metadata, contact, and accessibility checks.

- [ ] **Step 4: Inspect the diff and commit any verification-only fixes**

Run: `git diff --check && git status --short`
Expected: no whitespace errors and only the preserved `.lighthouseci/` directory untracked.

- [ ] **Step 5: Push the branch**

Run: `git push -u origin codex/update-specialist-contacts`
Expected: remote branch created successfully.
