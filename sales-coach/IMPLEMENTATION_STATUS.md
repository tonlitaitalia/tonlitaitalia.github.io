# TONLITA Sales Coach Implementation Status

Last updated: 2026-06-28

Branch: `sales-coach-build`

Deployment status: local verification passed. Cloudflare setup has not been performed.

## Current State

- The app is isolated in `/sales-coach`.
- The existing public GitHub Pages website remains in the repository root.
- The public website is not deployed from `/sales-coach`.
- The sales-coach app is intended for a separate Cloudflare Pages project.
- Cloudflare Workers AI is the only configured AI provider.
- No paid AI fallback is configured.
- No Cloudflare R2 or paid storage service is required.

## Local Verification Passed On The Owner's Mac

The owner completed local verification successfully on the `sales-coach-build` branch.

Actual results:

- `pnpm install`: completed successfully.
- `pnpm run check`: completed successfully with no TypeScript errors.
- `pnpm run lint`: completed successfully.
- `pnpm test`: completed with 31 tests passed and 0 failed.
- `pnpm run build`: completed successfully.
- Vite created the production `dist` directory.
- Active branch remained `sales-coach-build`.

This replaces the earlier Codex-environment network blocker notes. The earlier blocker was caused by this environment being unable to reach `registry.npmjs.org`; it was not a source-code failure.

## Verification Repeated In This Workspace

The same source-level checks were repeated after the documentation and configuration review:

- `pnpm run lint`: passed.
- `pnpm run check`: passed.
- `pnpm test`: passed with 31 tests passed and 0 failed.
- `pnpm run build`: passed and produced `sales-coach/dist`.

Build output remains ignored by Git through `/sales-coach/.gitignore`; Cloudflare Pages will recreate `dist` during deployment.

## Completed Implementation

- Created root `ARCHITECTURE_PLAN.md`.
- Created `/sales-coach/AGENTS.md`.
- Scaffolded React, TypeScript, Vite and Tailwind app in `/sales-coach`.
- Added Cloudflare Pages Functions backend under `/sales-coach/functions`.
- Added Cloudflare D1 migrations.
- Added server-side authentication, secure password hashing and HttpOnly sessions.
- Added administrator and seller roles.
- Enforced seller lead isolation in backend routes.
- Added active seller limit support for five seller accounts.
- Added leads, conversations, messages, AI suggestions and mark-as-sent workflow.
- Added multilingual coaching behavior with customer-language replies, English translation and Simplified Chinese coaching.
- Added dynamic product knowledge and unknown-product handling.
- Imported the attached Tonlita catalogue as `INITIAL_CATALOGUE_DATASET`.
- Added attachment-processing records and temporary raw-file policy.
- Added AI quota limits and global lock behavior.
- Added zero-billing policy checks.
- Added static production audit.
- Added tests covering quota, seller isolation, structured output, unknown products, prompt injection, attachment handling and multilingual coaching behavior.

## Initial Catalogue Dataset

Extracted model/page coverage from `Catalogo Macchine Compatte da Cantiere – Selezione 2026-7.pdf`:

- `YXC300`: page 2 technical sheet, page 3 dimensions/load data, page 4 photo.
- `YXC400`: page 5 technical sheet, page 6 dimensions/load data, page 7 photo.
- `YXC500`: page 8 technical sheet, page 9 dimensions/load data, page 10 photo.
- `1000F`: page 11 technical sheet, page 12 photo/control material.
- `YX10`: page 13 technical sheet, page 14 photos.
- `YX15`: page 15 technical sheet, page 16 photos.
- `YX18`: page 17 technical sheet, page 18 photos.
- `YX20`: page 19 technical sheet, page 20 photos.
- `YX25`: page 21 technical sheet, page 22 photos.
- `ME18.9`: page 23 technical sheet, page 24 photos.
- `ME26.9`: page 25 technical sheet, page 26 photos.
- `ME35.10`: page 27 technical sheet, page 28 photos.
- `ME60.9`: page 29 technical sheet, page 30 photo.
- `T360`: page 31 technical sheet, page 32 photos.
- `T460`: page 33 technical sheet, page 34 photos.
- `V800`: page 35 technical sheet, page 36 photos.
- `V1000`: page 37 technical sheet, page 38 photos.

Approval-required information:

- CE conformity, Stage V conformity, warranty, prices, delivery time, availability and shipping costs are not automatically approved only because a product appears in the catalogue.
- Incomplete, ambiguous or inconsistent values are preserved as source facts and can be marked `REQUIRES_OWNER_APPROVAL` or `CONFLICT_REQUIRES_REVIEW`.

## Configuration Consistency Review

Reviewed actual project configuration:

- GitHub repository: `https://github.com/tonlitaitalia/tonlitaitalia.github.io.git`
- Branch for Cloudflare Pages: `sales-coach-build`
- Cloudflare Pages project name: `tonlita-sales-coach`
- Project root: `sales-coach`
- Build command: `pnpm run build`
- Build output directory: `dist`
- Package manager: `pnpm@11.9.0`
- Cloudflare config file: `sales-coach/wrangler.toml`
- Compatibility date: `2026-06-24`
- D1 database name: `tonlita_sales_coach`
- D1 binding name: `DB`
- Workers AI binding name: `AI`
- AI model call: Cloudflare Workers AI only, using `env.AI.run("@cf/meta/llama-3.1-8b-instruct", ...)`.

Inconsistencies found and fixed:

- `CLOUDFLARE_FIRST_SETUP.md` previously used the wrong build command `npm run build`; it now uses `pnpm run build`.
- `.dev.vars.example` contained an unused admin bootstrap variable; it now documents the actual `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_NAME` script variables.
- `wrangler.toml` now includes the same attachment limit defaults used by the backend.
- `scripts/create-admin.mjs` now supports `--sql-only`, matching the deployment guide's safer command flow.
- `/sales-coach/.gitignore` now prevents generated build output, dependencies, local secrets and temporary admin SQL files from being committed.

## Cloudflare Values To Use

Use these values during manual Cloudflare setup:

```text
Repository: https://github.com/tonlitaitalia/tonlitaitalia.github.io
Branch: sales-coach-build
Project name: tonlita-sales-coach
Project root directory: sales-coach
Build command: pnpm run build
Build output directory: dist
Node.js version: 20
Package manager: pnpm@11.9.0
D1 database name: tonlita_sales_coach
D1 binding name: DB
Workers AI binding name: AI
Compatibility date: 2026-06-24
```

Required environment variables:

```text
ZERO_BILLING_MODE=true
AI_PROVIDER=cloudflare
MAX_ACTIVE_SELLERS=5
SELLER_DAILY_AI_REQUEST_LIMIT=50
GLOBAL_DAILY_AI_REQUEST_LIMIT=250
ALLOW_PAID_AI_FALLBACK=false
ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR=false
QUOTA_TIMEZONE=Asia/Shanghai
SESSION_TTL_SECONDS=28800
MAX_ATTACHMENTS_PER_ANALYSIS=5
MAX_ATTACHMENT_SIZE_MB=10
MAX_TOTAL_UPLOAD_SIZE_MB=20
MAX_PDF_PAGES=25
NODE_VERSION=20
```

Required secret:

```text
COOKIE_SECRET
```

Generate it locally with:

```bash
openssl rand -hex 32
```

## Still Required Manually

- Create the Cloudflare Pages project.
- Create the Cloudflare D1 database.
- Add the `DB` D1 binding.
- Add the `AI` Workers AI binding.
- Add the environment variables and `COOKIE_SECRET`.
- Apply the five D1 migrations remotely.
- Create the initial administrator account.
- Log in and create up to five sellers.
- Run the first production login, database and AI quota test.

Do not merge into `main` and do not configure Cloudflare until the owner is ready to deploy this separate private application.
