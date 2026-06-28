# Deployment Checklist

Deployment target: separate Cloudflare Pages project for `/sales-coach`.

Do not deploy this app through GitHub Pages and do not merge into `main`.

## Local Verification

- [x] Confirm branch is `sales-coach-build`.
- [x] Confirm public website root files are unchanged.
- [x] Run `pnpm install`.
- [x] Run `pnpm run check`.
- [x] Run `pnpm run lint`.
- [x] Run `pnpm test`.
- [x] Run `pnpm run build`.
- [x] Confirm Vite created `dist`.
- [x] Confirm generated `dist`, `node_modules`, local secrets and temporary SQL files are ignored by `/sales-coach/.gitignore`.

Confirmed owner Mac result: `pnpm install`, `pnpm run check`, `pnpm run lint`, `pnpm test` and `pnpm run build` all passed. Tests passed: 31. Failed: 0.

## Cloudflare Project Settings

- [ ] Cloudflare account remains on Workers Free.
- [ ] Project type is Cloudflare Pages.
- [ ] GitHub repository is `tonlitaitalia/tonlitaitalia.github.io`.
- [ ] Branch is `sales-coach-build`.
- [ ] Project name is `tonlita-sales-coach`.
- [ ] Project root directory is `sales-coach`.
- [ ] Build command is `pnpm run build`.
- [ ] Build output directory is `dist`.
- [ ] Node.js environment variable is `NODE_VERSION=20`.

## Cloudflare Bindings

- [ ] D1 database created with name `tonlita_sales_coach`.
- [ ] D1 binding exists with variable name `DB`.
- [ ] Workers AI binding exists with variable name `AI`.
- [ ] No R2 binding exists.
- [ ] No paid AI provider binding exists.

## Environment Variables

- [ ] `ZERO_BILLING_MODE=true`
- [ ] `AI_PROVIDER=cloudflare`
- [ ] `MAX_ACTIVE_SELLERS=5`
- [ ] `SELLER_DAILY_AI_REQUEST_LIMIT=50`
- [ ] `GLOBAL_DAILY_AI_REQUEST_LIMIT=250`
- [ ] `ALLOW_PAID_AI_FALLBACK=false`
- [ ] `ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR=false`
- [ ] `QUOTA_TIMEZONE=Asia/Shanghai`
- [ ] `SESSION_TTL_SECONDS=28800`
- [ ] `MAX_ATTACHMENTS_PER_ANALYSIS=5`
- [ ] `MAX_ATTACHMENT_SIZE_MB=10`
- [ ] `MAX_TOTAL_UPLOAD_SIZE_MB=20`
- [ ] `MAX_PDF_PAGES=25`
- [ ] `NODE_VERSION=20`

## Secrets

- [ ] `COOKIE_SECRET` generated with `openssl rand -hex 32`.
- [ ] `COOKIE_SECRET` added as a Cloudflare secret, not committed to Git.

## Database Setup

- [ ] `wrangler.toml` database ID placeholder replaced locally with the actual Cloudflare D1 database ID before migration.
- [ ] Migrations applied remotely in order:
  - [ ] `0001_initial_schema.sql`
  - [ ] `0002_seed_knowledge.sql`
  - [ ] `0003_dynamic_product_catalogue.sql`
  - [ ] `0004_seed_initial_catalogue_dataset.sql`
  - [ ] `0005_final_coaching_memory_attachments.sql`
- [ ] Initial administrator account created.
- [ ] Temporary admin password stored safely and changed after first login.

## First Production Test

- [ ] Open the Cloudflare Pages URL.
- [ ] Log in as administrator.
- [ ] Create one seller.
- [ ] Create a lead assigned to that seller.
- [ ] Save a customer message.
- [ ] Confirm ordinary message saving does not consume AI quota.
- [ ] Generate one coaching result.
- [ ] Confirm seller usage increments by 1.
- [ ] Confirm team usage increments by 1.
- [ ] Confirm seller cannot access another seller's lead.
- [ ] Confirm admin can access all leads.
- [ ] Confirm global limit is shown as 250.
- [ ] Confirm seller limit is shown as 50.

## Future Deployments

- [ ] Push future changes only to `sales-coach-build`.
- [ ] Confirm Cloudflare automatically starts a new deployment.
- [ ] Confirm the deployment status is successful.
- [ ] Do not push this private app to `main`.

## Rollback

- Use Cloudflare Pages deployment history for `/sales-coach`.
- Select the last known good deployment.
- Click rollback.
- Do not roll back GitHub Pages root unless the public website was changed separately.
