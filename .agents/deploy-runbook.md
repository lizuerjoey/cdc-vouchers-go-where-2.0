# Deploy Runbook

Use with `.agents/deploy.md`.

## Vercel Settings

```txt
Framework Preset: Next.js
Install Command: npm ci
Build Command: npm run build
Output Directory: default
Node.js Version: 22.x
```

Before deployment, confirm Node 22 and that `npm ci`, typecheck, lint, unit tests, build, and E2E tests passed on the deployment SHA.

## CLI Fallback

Prefer GitHub integration. Otherwise use `npx vercel pull --yes --environment=preview` and `npx vercel deploy`; after validation, promote with `npx vercel deploy --prod`.

Optional fallback-mode variables are `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never commit local environment files.

## Preview Smoke Test

- Verify the preview SHA.
- Load home, test Cafes, Lash lift, and Katong search.
- Test grounded chat, map links, and mobile layout.
- Check browser console and client output for errors or secrets.

For failures, verify Node version first, file casing for missing modules, environment intent for chat, and the connected branch for stale content.
