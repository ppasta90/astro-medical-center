# Domain and Quality Refactor Design

## Goal

Make the doctors catalogue explicit, testable, and measurable without adding an
application server or changing the public URLs of the static site.

## Scope

The refactor covers four connected concerns:

1. replace stringly typed booking availability with an explicit union;
2. validate specializations against one shared catalogue;
3. add fast unit and build-contract tests alongside the existing browser tests;
4. enforce repeatable performance and pull-request quality gates.

The site remains statically generated with Astro. Doctolib remains the booking
system of record; no local appointment or overlap algorithm will be introduced.

## Domain model

`src/domain/doctor.ts` owns the closed specialization catalogue, the booking
discriminated union, and the Zod schema for one doctor. Astro's content
collection imports that schema, while consumers continue deriving `Doctor` from
`CollectionEntry<"doctors">`.

The booking contract is:

```ts
type DoctorBooking = { kind: "external"; url: string } | { kind: "phone" };
```

External booking URLs must use HTTPS.

This replaces the empty-string sentinel currently stored in `link`. Existing
slugs, professional titles, and honorifics remain editorial fields: gender is
not inferred and a slug is never generated from a person's name.

## Validation and tests

Vitest supplies fast tests for pure domain code. Catalogue-wide invariants live
in `src/domain/doctor-catalog.ts`, returning actionable validation errors for
duplicate identifiers, ordering values, routes, missing images, and orphan
images. The command-line data check becomes a thin adapter around that module.

A build-contract check verifies that every doctor slug has a generated HTML
file and that no two doctors claim the same route. Playwright remains
responsible for real-browser navigation, interactions, metadata, and
accessibility.

## Performance

Lighthouse CI runs against the built site and records homepage,
specializations, and one representative doctor page. Initial budgets are:

- performance score at least 0.90;
- accessibility and SEO scores at least 0.95;
- largest contentful paint at most 2,500 ms;
- cumulative layout shift at most 0.10;
- total transferred bytes at most 1,500 KiB;
- first-party generated JavaScript at most 100 KiB;
- total JavaScript transferred, including consent and analytics vendors, at
  most 500 KiB.

Because large editorial images are an observable risk, the data check also
rejects any doctor image over 500 KiB. Existing images must be optimized to
meet the budget rather than exempted.

## CI and pull requests

CI exposes separate static-quality, unit, browser, and Lighthouse jobs so a
reviewer can identify the failed contract directly. A pull-request template
requires motivation, scope, technical decisions, verification, performance
impact, screenshots for visible changes, and deployment risks.

Short ADRs record why doctor metadata is explicit and why booking remains an
external boundary. These documents describe current executable constraints and
must not duplicate operational instructions already maintained elsewhere.

## Compatibility and migration

All existing public doctor URLs remain unchanged. Each JSON record migrates
from `link` to `booking`; an empty link becomes `{ "kind": "phone" }`, while a
URL becomes `{ "kind": "external", "url": "..." }`. Components render the
same call-to-action behavior using exhaustive branching.

## Completion criteria

- all catalogue records satisfy the shared schema and invariants;
- every doctor produces one static route;
- unit, build-contract, Playwright, and Lighthouse checks pass locally and in
  CI;
- no component reads the legacy `link` field;
- documentation describes the new model and verification commands.
