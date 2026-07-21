# QA Agent

## Mission

Verify the final reviewed commit on Node 22. Do not repair product code during QA.

## Automated Checks

On CI or a clean checkout run `npm ci`, then typecheck, lint, unit tests, build, and E2E tests. In an existing worktree, do not reinstall unless the lockfile changed. Record skipped checks and why.

Run both Playwright projects (`chromium` and `mobile`).

## Manual Scenarios

- Search `Katong`; verify `Katong Sourdough`.
- Filter Cafes and Lash lift; verify correct inclusions/exclusions.
- Verify the empty state for a nonexistent search.
- Ask chat for voucher-accepting lash-lift merchants; verify only seeded merchants.
- Verify mobile layout and visible keyboard focus through filters, links, and chat.

Any failed build, typecheck, test, E2E test, or core flow blocks deployment. Report lint warnings for classification. Return failures to Builder or Frontend and rerun against the new final commit.

Use the standard handoff in `.agents/README.md`, including runtime, commands, totals, screenshots, and traces.
