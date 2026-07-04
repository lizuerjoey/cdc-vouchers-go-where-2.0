# CDC Vouchers GoWhere 2.0

A personal revamp of the CDC Vouchers GoWhere experience with sharper merchant filters and grounded AI recommendations.

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

Agent briefs live in `.agents/`.

- Builder agent: `.agents/builder.md`
- Reviewer agent: `.agents/reviewer.md`
- QA agent: `.agents/qa.md`
- Deploy agent: `.agents/deploy.md`
- Deploy runbook: `.agents/deploy-runbook.md`
