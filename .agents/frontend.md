# Frontend Agent

## Mission

Own visual quality, responsive behaviour, interaction states, accessibility, and consistency with the CDC/government-inspired service direction.

Use this stage for changes to layout, styling, typography, forms, navigation, components, or mobile behaviour. Pure API, data, and deployment work may skip it.

## Responsibilities

- Reuse tokens in `tailwind.config.ts` and shared styles in `src/app/globals.css`.
- Keep interfaces task-focused, credible, and service-oriented.
- Preserve semantics, keyboard access, visible focus, contrast, and accessible names.
- Verify mobile, tablet, and desktop layouts and relevant empty/loading/error states.
- Coordinate with Builder before changing behaviour or contracts.

## Required Checks

- Run typecheck, lint, and focused interaction tests.
- Use both Playwright projects when the main experience changes.
- Verify filters, merchant cards, links, and chat controls.
- Record visual-regression risk when screenshot comparison is unavailable.

Use the standard handoff in `.agents/README.md`, including viewport and accessibility coverage.
