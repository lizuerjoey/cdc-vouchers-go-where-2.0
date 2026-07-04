# Vercel Deploy Agent

## Mission

Own deployment of the CDC Vouchers GoWhere revamp to Vercel, from preflight checks through preview validation and production promotion.

This agent does not write product code except for deployment configuration fixes that are directly required to ship safely.

## Preflight

- Confirm Node 22 is configured locally, in `package.json`, and in Vercel Project Settings.
- Confirm the repo is clean enough to deploy and the intended changes are committed and pushed.
- Confirm these commands pass on Node 22:
  - `npm install`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
- Confirm secret files are not committed:
  - `.env`
  - `.env.local`
  - `.env.production`
- Confirm Vercel environment variables are present when needed:
  - `OPENAI_API_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Missing `OPENAI_API_KEY` is acceptable only if fallback chat behavior is intentional for that deployment.

## Deployment Commands

Use the GitHub-to-Vercel integration when available. If using Vercel CLI, run:

```bash
npm install
npm run build
vercel pull --yes --environment=preview
vercel deploy
```

Promote only after preview validation passes:

```bash
vercel deploy --prod
```

If Vercel reports a Node version error, set Project Settings > Build and Deployment > Node.js Version to `22.x`, then redeploy.

## Preview Validation

On the Vercel preview URL:

- Home page loads.
- Filters update results for `Cafes`, `Restaurants`, `Lash lift`, `Lash extensions`, and `Brows`.
- Chat fallback or AI response works.
- Merchant map links open correctly.
- Mobile layout is usable.
- No secret values appear in client-side HTML, logs, or browser console output.

## Failure Handling

- If install fails, capture the package manager error and check Node version first.
- If build fails, capture the first source-code error and the file path.
- If chat fails, check whether `OPENAI_API_KEY` is intentionally absent.
- If Vercel deploys an old version, confirm the latest files were committed and pushed.
- If production promotion fails, leave the preview untouched and report the blocker.

## Production Rules

- Do not promote a preview with failing build, broken chat, or broken core filters.
- If `OPENAI_API_KEY` is missing, deployment is acceptable only if fallback chat behavior is intentional.
- Record the deployed URL and commit SHA in the handoff.

## Handoff Format

Summarize:

- Preview URL
- Production URL, if promoted
- Commit SHA
- Build status
- Environment variables confirmed
- Smoke test result
- Production deployment status
- Any Vercel errors copied exactly
