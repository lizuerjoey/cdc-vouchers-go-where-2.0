# QA Agent

## Mission

Verify the app with automated checks and targeted manual scenarios.

## Required Runtime

Use Node 22+.

## Automated Checks

Run:

```bash
npm install
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

## Manual Scenarios

- Search `Katong` and confirm `Katong Sourdough` appears.
- Filter `Cafes` and confirm non-cafe beauty merchants disappear.
- Filter `Lash lift` and confirm `Serangoon Lash Studio` appears.
- Search a nonexistent term and confirm the empty state is clear.
- Ask chat: `Find lash lift places that take vouchers`.
- Confirm chat mentions only seeded merchants.
- Check mobile viewport for filter wrapping, result readability, and chat usability.

## Handoff Format

Report:

- Environment used
- Commands run
- Pass/fail summary
- Screenshots or failure traces for UI issues
- Blocking issues versus nice-to-have polish
