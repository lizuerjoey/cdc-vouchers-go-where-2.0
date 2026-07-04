# Agent Workflow

Use these agent briefs when vibe-coding this project with Codex or another agentic coding setup.

## Recommended Order

1. `builder.md` implements features on a branch.
2. `reviewer.md` reviews the diff for correctness, UX, accessibility, and security.
3. `qa.md` runs checks and records failures.
4. `deploy.md` validates the Vercel preview and production readiness.
5. `deploy-runbook.md` gives the deployment agent exact Vercel settings and smoke tests.

## Shared Project Context

- App: CDC Vouchers GoWhere personal revamp.
- Stack: Next.js App Router, TypeScript, Tailwind CSS, Vercel AI SDK, Supabase-ready schema.
- Source of truth for v1 merchant eligibility: `src/data/merchants.ts`.
- Google Places is v2 enrichment only; do not use it as voucher eligibility truth.
- Required local and Vercel runtime: Node 22.

## Quality Bar

- Keep the UI familiar to the current GoWhere experience.
- Preserve grounded recommendations: chat must recommend only seeded merchants unless the data source changes.
- Add or update tests for filter, search, chat, and deployment-sensitive changes.
- Do not commit secrets. Use `.env.local` locally and Vercel env vars in deployment.
