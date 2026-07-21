# CDC Vouchers GoWhere 2.0

A modern, government-inspired merchant discovery prototype with sharper CDC voucher filters and grounded AI recommendations.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS and lucide-react icons
- Seeded v1 merchant data in `src/data/merchants.ts`
- AI recommendation route using Vercel AI SDK, with a local fallback when `OPENAI_API_KEY` is absent
- Supabase-ready schema in `supabase/schema.sql`, including optional `google_place_id` for v2 Places enrichment

## Run locally

This project targets Node 22 for the current Next.js and Vercel AI SDK lines.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill values as needed.

- `OPENAI_API_KEY`: enables AI-generated recommendations
- `CHAT_PASSWORD`: protects the recommendation chat. Defaults to `cdc-vouchers` locally when unset.
- `NEXT_PUBLIC_SUPABASE_URL`: optional v1 placeholder for Supabase integration
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: optional v1 placeholder for Supabase integration

The app works with seeded data even when these values are empty.

## Scripts

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

## Google Places Strategy

V1 does not use Google Places as the merchant source of truth because Google cannot verify CDC voucher eligibility. V2 should enrich already-seeded merchants by matching `google_place_id` and caching fields such as opening hours, photos, ratings, and business status.

## Agent Workflow

The gated delivery pipeline is documented in `.agents/README.md`.

- Builder agent: `.agents/builder.md`
- Frontend agent: `.agents/frontend.md`
- Reviewer agent: `.agents/reviewer.md`
- QA agent: `.agents/qa.md`
- Deploy agent: `.agents/deploy.md`
- Deploy runbook: `.agents/deploy-runbook.md`

The normal order is **Builder -> Frontend for UI changes -> Reviewer -> QA -> Deploy**. Reviewer, QA, and Deploy evaluate the same final commit. Failed core checks or unresolved high-severity findings block deployment.

Use `npm ci` on CI and clean checkouts for reproducible installs. Existing development worktrees can retain installed dependencies unless `package-lock.json` changes.

### How to use the pipeline

Choose the smallest pipeline that safely covers the work:

- Logic, API, or data change: Builder -> Reviewer -> QA.
- Layout, styling, or interaction change: Builder -> Frontend -> Reviewer -> QA.
- Production release: complete the relevant implementation stages, then Reviewer -> QA -> Deploy.
- Documentation-only change: Builder -> Reviewer; run relevant formatting or link checks.

When asking an agent to work, name the brief and describe the outcome:

```text
Act as the Builder agent in .agents/builder.md.
Add a district filter and prepare the standard handoff.
```

For a frontend change, continue with an independent frontend pass:

```text
Act as the Frontend agent in .agents/frontend.md.
Review the completed district-filter changes on mobile and desktop,
fix user-facing issues within scope, and prepare the standard handoff.
```

Then ask Reviewer and QA to evaluate the same final commit or diff. Give each stage the previous handoff and require the standard handoff format from `.agents/README.md`.

Do not proceed when the current agent reports a blocker. Return implementation problems to Builder or Frontend, resolve them, and rerun Reviewer or QA against the updated commit. Deploy only the commit SHA approved by both Reviewer and QA.

The Deploy agent decides whether a release is safe to proceed. The deploy runbook supplies the exact Vercel settings, commands, and smoke tests used to carry it out.
