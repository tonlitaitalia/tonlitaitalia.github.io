# Cloudflare First Setup For TONLITA Sales Coach

This guide is for the private internal app in `/sales-coach`.

Do not use this guide for the existing public Tonlita website.

**Keep the Cloudflare account on Workers Free. Do not subscribe to Workers Paid. Do not configure paid AI providers. The application is designed to stop when free quotas are exhausted.**

## Exact Values

Use these exact values:

```text
GitHub repository: tonlitaitalia/tonlitaitalia.github.io
Repository URL: https://github.com/tonlitaitalia/tonlitaitalia.github.io
Branch to deploy: sales-coach-build
Cloudflare Pages project name: tonlita-sales-coach
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

The app uses this Cloudflare config file:

```text
sales-coach/wrangler.toml
```

There is no `wrangler.jsonc` file in this project.

## Before You Start

The following local checks have already passed on the owner's Mac:

```text
pnpm install
pnpm run check
pnpm run lint
pnpm test
pnpm run build
```

Current confirmed test result:

```text
31 tests passed
0 failed
```

## Step 1 - Open Cloudflare

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com).
2. Log in to the Tonlita Cloudflare account.
3. Make sure the account remains on Workers Free.
4. Do not upgrade to Workers Paid.

## Step 2 - Create The D1 Database

1. In Cloudflare, open **Workers & Pages**.
2. Click **D1 SQL Database**.
3. Click **Create database**.
4. Database name:

```text
tonlita_sales_coach
```

5. Click **Create**.
6. Copy the generated **Database ID**. You will need it locally for migrations.

## Step 3 - Add The D1 Database ID Locally

On the Mac, open Terminal and run:

```bash
cd "/Users/gianlucamusotti/Documents/Codex/2026-04-25/files-mentioned-by-the-user-catalogo/tonlitaitalia.github.io-updated-20260503/sales-coach"
```

Open this file:

```text
wrangler.toml
```

Find:

```text
database_id = "REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID"
```

Replace the placeholder with the real D1 Database ID copied from Cloudflare.

The database ID is not a password, but do not share screenshots of it publicly.

## Step 4 - Log In To Wrangler

From Terminal, still inside `/sales-coach`, run:

```bash
pnpm exec wrangler login
```

Cloudflare will open a browser window.

1. Approve the login.
2. Return to Terminal after login completes.

## Step 5 - Apply D1 Migrations

Run this command:

```bash
pnpm exec wrangler d1 migrations apply tonlita_sales_coach --remote
```

Wrangler applies migrations from this folder:

```text
sales-coach/migrations
```

The migration order is:

```text
0001_initial_schema.sql
0002_seed_knowledge.sql
0003_dynamic_product_catalogue.sql
0004_seed_initial_catalogue_dataset.sql
0005_final_coaching_memory_attachments.sql
```

If Wrangler asks for confirmation, type:

```text
y
```

and press Enter.

## Step 6 - Create The Cloudflare Pages Project

1. In Cloudflare, open **Workers & Pages**.
2. Click **Create application**.
3. Select **Pages**.
4. Click **Connect to Git**.
5. Select GitHub.
6. Choose this repository:

```text
tonlitaitalia/tonlitaitalia.github.io
```

7. Select this branch:

```text
sales-coach-build
```

8. Project name:

```text
tonlita-sales-coach
```

9. In build settings, use:

```text
Framework preset: Vite
Build command: pnpm run build
Build output directory: dist
Root directory: sales-coach
```

If Cloudflare shows **Advanced build settings**, add:

```text
NODE_VERSION=20
```

Do not deploy yet if the bindings and environment variables have not been added. If Cloudflare forces a first deploy, it may fail until bindings are configured. That is acceptable; configure the next steps and redeploy.

## Step 7 - Add Environment Variables

Open the new Cloudflare Pages project:

```text
tonlita-sales-coach
```

Go to:

```text
Settings > Environment variables
```

Add these production variables:

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

Use the same values for Preview unless you intentionally create a separate test database.

## Step 8 - Add The Cookie Secret

On the Mac, open Terminal and run:

```bash
openssl rand -hex 32
```

Copy the generated value.

In Cloudflare Pages:

1. Go to **Settings > Environment variables**.
2. Add a variable named:

```text
COOKIE_SECRET
```

3. Paste the generated value.
4. Mark it as secret if Cloudflare offers that option.

Never commit `COOKIE_SECRET` to Git.

## Step 9 - Add The D1 Binding

In the Cloudflare Pages project:

1. Go to **Settings > Functions**.
2. Find **D1 database bindings**.
3. Click **Add binding**.
4. Variable name:

```text
DB
```

5. Database:

```text
tonlita_sales_coach
```

6. Save.

## Step 10 - Add The Workers AI Binding

In the Cloudflare Pages project:

1. Go to **Settings > Functions**.
2. Find **Workers AI bindings**.
3. Click **Add binding**.
4. Variable name:

```text
AI
```

5. Save.

Do not add OpenAI, Anthropic, Google, Gemini or any other AI provider.

## Step 11 - Confirm No Paid Services Are Added

Before deploying, confirm:

- No R2 bucket binding exists.
- No Cloudflare Images binding exists.
- No OpenAI key exists.
- No Anthropic key exists.
- No Google or Gemini key exists.
- Workers account remains on Free.
- The only AI binding is `AI`.
- The only database binding is `DB`.

## Step 12 - Create The Initial Administrator

On the Mac, open Terminal and run:

```bash
cd "/Users/gianlucamusotti/Documents/Codex/2026-04-25/files-mentioned-by-the-user-catalogo/tonlitaitalia.github.io-updated-20260503/sales-coach"
```

Generate the admin SQL:

```bash
ADMIN_EMAIL="gianluca.musotti@tonlita.com" ADMIN_PASSWORD="CHANGE_THIS_LONG_TEMPORARY_PASSWORD" ADMIN_NAME="Gianluca Musotti" pnpm run admin:create -- --sql-only > admin-create.sql
```

Replace `CHANGE_THIS_LONG_TEMPORARY_PASSWORD` with a strong temporary password.

Run the SQL against the remote D1 database:

```bash
pnpm exec wrangler d1 execute tonlita_sales_coach --remote --file admin-create.sql
```

Delete the temporary SQL file:

```bash
rm admin-create.sql
```

Do not commit `admin-create.sql`.

## Step 13 - First Deployment

In Cloudflare Pages:

1. Open project `tonlita-sales-coach`.
2. Go to **Deployments**.
3. Click **Retry deployment** or **Create deployment** if the first deploy failed before bindings were ready.
4. Wait until deployment status is **Success**.
5. Open the provided Cloudflare Pages URL.

## Step 14 - Login And Database Test

Open the private app URL.

1. Log in with the administrator email and temporary password.
2. Confirm the Admin area opens.
3. Create one seller account.
4. Create a test lead assigned to that seller.
5. Add one customer message.
6. Save it.
7. Confirm saving a normal message does not consume AI quota.
8. Generate one AI coaching result.
9. Confirm seller usage changes from `0 / 50` to `1 / 50`.
10. Confirm team usage changes from `0 / 250` to `1 / 250`.

## Step 15 - Create The Five Sellers

In the Admin area:

1. Open user management.
2. Create seller account 1.
3. Create seller account 2.
4. Create seller account 3.
5. Create seller account 4.
6. Create seller account 5.

The application is configured with:

```text
MAX_ACTIVE_SELLERS=5
```

If a sixth seller is needed, deactivate an old seller first.

Seller daily AI limit:

```text
50 AI requests per seller per Asia/Shanghai day
```

Team daily AI limit:

```text
250 AI requests per Asia/Shanghai day
```

## Step 16 - Verify Automatic Deployments

After the first successful deployment:

1. Push future sales-coach changes to branch `sales-coach-build`.
2. Open Cloudflare Pages project `tonlita-sales-coach`.
3. Go to **Deployments**.
4. Confirm a new deployment starts automatically.
5. Confirm it finishes with **Success**.

Do not push this private app to `main`.

## Step 17 - Rollback

If a future deployment has a problem:

1. Open Cloudflare Pages project `tonlita-sales-coach`.
2. Go to **Deployments**.
3. Find the last known good deployment.
4. Click it.
5. Click **Rollback to this deployment**.
6. Confirm.

This rollback affects only the private Cloudflare Pages app. It does not change the public GitHub Pages website.

## Troubleshooting

### Login Fails

Check:

- The D1 binding is named `DB`.
- Migrations were applied.
- Admin SQL was executed.
- The admin account is active.
- `COOKIE_SECRET` exists in Cloudflare environment variables.

### AI Coaching Fails

Check:

- Workers AI binding is named `AI`.
- `AI_PROVIDER=cloudflare`.
- `ZERO_BILLING_MODE=true`.
- The Cloudflare free AI quota has not been exhausted.

If quota is exhausted, the app should stop new AI calls and keep existing conversations available.

### Database Errors

Check:

- D1 database name is `tonlita_sales_coach`.
- D1 binding name is `DB`.
- Migrations were applied with:

```bash
pnpm exec wrangler d1 migrations apply tonlita_sales_coach --remote
```

### Build Fails In Cloudflare

Check:

- Root directory is `sales-coach`.
- Build command is `pnpm run build`.
- Output directory is `dist`.
- `NODE_VERSION=20` is set.
- Branch is `sales-coach-build`.

## Final Reminder

**Keep the Cloudflare account on Workers Free. Do not subscribe to Workers Paid. Do not configure paid AI providers. The application is designed to stop when free quotas are exhausted.**
