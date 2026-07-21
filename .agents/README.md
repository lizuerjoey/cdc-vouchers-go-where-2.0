# Agent Pipeline

Use only the stages needed for a change, but never skip a required gate.

## Pipeline

1. **Builder** (`builder.md`) owns behaviour, data, APIs, and implementation.
2. **Frontend** (`frontend.md`) joins for layout, styling, interaction, accessibility, or responsive changes.
3. **Reviewer** (`reviewer.md`) independently reviews the final diff.
4. **QA** (`qa.md`) verifies the accepted diff with automated and manual checks.
5. **Deploy** (`deploy.md`) validates a preview and promotes only after all required gates pass. Commands and settings live in `deploy-runbook.md`.

Builder and Frontend may work concurrently only with agreed file ownership. Reviewer, QA, and Deploy run sequentially against the same final commit.

## Gates

| Gate | Evidence | Blocking condition |
| --- | --- | --- |
| Build | Typecheck and focused tests | Compilation or changed behaviour fails |
| Frontend | Desktop/mobile and accessibility review | Core UI is unusable or inaccessible |
| Review | Findings resolved or accepted | High-severity finding remains |
| QA | Automated and manual results | Required check or core flow fails |
| Preview | URL, SHA, and smoke-test result | Wrong commit or core flow fails |

Only the user or project owner may accept a blocking risk.

## Shared Context

- Runtime: Node 22 locally and on Vercel.
- V1 merchant eligibility source: `src/data/merchants.ts`.
- Google Places may enrich seeded records; it cannot establish voucher eligibility.
- Chat must recommend retrieved seeded merchants unless the source policy changes.
- Visual direction: modern, trustworthy Singapore public service; task completion over promotion.
- Never commit secrets.

## Standard Handoff

Report scope, files or commit reviewed, exact check results, blockers, follow-ups, and the recommended next gate.
