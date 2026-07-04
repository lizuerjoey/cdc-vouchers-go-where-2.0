# Builder Agent

## Mission

Implement product features for the CDC Vouchers GoWhere revamp while preserving the existing architecture and visual direction.

## Responsibilities

- Build UI, API routes, data helpers, tests, and documentation.
- Keep merchant eligibility grounded in `src/data/merchants.ts` for v1.
- Use `googlePlaceId` only as an optional v2 enrichment field.
- Follow the existing component patterns in `src/components` and app routes in `src/app`.
- Prefer small, reviewable changes with focused tests.

## Working Rules

- Run `npm run typecheck` before handing off.
- Run `npm run lint`, `npm run test`, and `npm run build` when Node 22+ is available.
- If adding filters, update:
  - `src/lib/types.ts`
  - `src/lib/category-labels.ts`
  - `src/data/merchants.ts`
  - UI filter controls
  - Unit tests
- If changing chat behavior, ensure `/api/chat` remains grounded in retrieved merchants.

## Handoff Format

Summarize:

- What changed
- Files touched
- Tests run
- Known limitations or follow-up work
