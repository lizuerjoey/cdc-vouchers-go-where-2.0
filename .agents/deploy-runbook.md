# Deploy Runbook

Use this runbook with `.agents/deploy.md`.

## Vercel Project Settings

```txt
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: default
Node.js Version: 22.x
```

## Required Before Deploy

```bash
node --version
npm --version
npm install
npm run typecheck
npm run lint
npm run test
npm run build
```

Node must be `v22.x`.

## Environment Variables

Optional for v1 fallback mode:

```txt
OPENAI_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Do not commit `.env.local` or copied env files.

## Preview Smoke Test

- Visit the preview URL.
- Click `Cafes`; confirm cafe cards remain.
- Click `Lash lift`; confirm `Serangoon Lash Studio` appears.
- Search `Katong`; confirm `Katong Sourdough` appears.
- Ask chat: `Find lash lift places that take vouchers`.
- Check mobile viewport.

## Common Vercel Failures

- `Node.js version` error: set Vercel Node.js Version to `22.x`.
- `Module not found`: confirm the file is committed and pushed with correct casing.
- `OPENAI_API_KEY` error: either add the env var or confirm fallback mode is still working.
- Old deployment content: check the Git branch connected to Vercel.
