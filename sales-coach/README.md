# TONLITA Sales Coach

Private internal sales-coaching application for Tonlita sellers.

This project lives inside `/sales-coach` and is intentionally separate from the public GitHub Pages website in the repository root. The public Italian website remains served from the root files. The sales coach should be deployed as a separate Cloudflare Pages project with `/sales-coach` as the project root.

## What It Does

- Private login for one administrator and up to five active seller accounts.
- Lead and conversation tracking with seller isolation.
- AI sales coaching using Cloudflare Workers AI only.
- English and Simplified Chinese coaching output.
- Customer-facing reply generation in the customer language.
- Approved Tonlita knowledge base, editable by the administrator.
- Manager approval workflow for risky commercial commitments.
- Strict daily AI quota controls and zero-billing protections.

## Zero-Billing Defaults

The application is designed to avoid paid AI fallback:

```text
ZERO_BILLING_MODE=true
AI_PROVIDER=cloudflare
MAX_ACTIVE_SELLERS=5
SELLER_DAILY_AI_REQUEST_LIMIT=50
GLOBAL_DAILY_AI_REQUEST_LIMIT=250
ALLOW_PAID_AI_FALLBACK=false
ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR=false
QUOTA_TIMEZONE=Asia/Shanghai
MAX_ATTACHMENTS_PER_ANALYSIS=5
MAX_ATTACHMENT_SIZE_MB=10
MAX_TOTAL_UPLOAD_SIZE_MB=20
MAX_PDF_PAGES=25
```

Do not add OpenAI, Anthropic, Google, Vercel AI, paid database, paid auth, or paid email providers.

## Local Development

From the repository root:

```bash
cd sales-coach
pnpm install
pnpm run dev
```

For Cloudflare Pages Functions and D1 locally:

```bash
cd sales-coach
pnpm run cf:dev
```

Create a local `.dev.vars` from `.dev.vars.example`. Never commit real secrets.

Before any Cloudflare setup, complete the local verification in `LOCAL_VERIFY_ON_MAC.md`.

## Database Migrations

Create a D1 database in Cloudflare, then apply migrations:

```bash
cd sales-coach
pnpm exec wrangler d1 migrations apply tonlita_sales_coach --local
pnpm exec wrangler d1 migrations apply tonlita_sales_coach --remote
```

Replace the placeholder database ID in `wrangler.toml` inside Cloudflare or your local config before remote deployment.

## Create First Administrator

Generate an SQL insert locally:

```bash
cd sales-coach
ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="replace-with-long-temporary-password" ADMIN_NAME="Tonlita Administrator" pnpm run admin:create -- --sql-only > admin-create.sql
```

Run the generated SQL against the D1 database:

```bash
pnpm exec wrangler d1 execute tonlita_sales_coach --remote --file admin-create.sql
rm admin-create.sql
```

The password should be changed after first login. Do not commit `admin-create.sql`.

## Seller Creation

The administrator creates seller accounts in the Admin area. The app prevents more than five active sellers.

## AI Usage Rules

AI quota is consumed only when an AI action is requested:

- Generate coaching
- Regenerate
- Make shorter
- Make softer
- Make more direct
- Ask a different diagnostic question
- Generate follow-up
- Factory-tour assessment
- AI translation or summary

Saving ordinary customer messages, seller messages, and internal notes does not consume quota.

## Initial Catalogue Dataset And Flexible Products

The attached Tonlita catalogue is imported only as `INITIAL_CATALOGUE_DATASET`.
It is the first approved product dataset, not the complete list of products Tonlita may sell.

The application is designed so the administrator can add, edit, approve, deactivate and delete future product knowledge without changing source code:

- Product categories and subcategories
- Manufacturers and factories
- Models and variants
- Engines, attachments and options
- Common specifications and category-specific specifications
- Custom administrator-defined key-value fields
- Prices and commercial conditions
- Documents, qualification questions, approved claims and known limitations
- Manager-approval rules

Sellers can create leads for:

- Existing approved product
- New or unlisted product
- Unknown product
- Attachment or spare part
- Other machinery

When a product is missing from the approved knowledge base, the app still allows the seller to qualify the customer and request AI coaching. The AI must focus on intended application, working conditions, required capacity, access limits, destination, timing, decision process and concerns about buying from China. It must not invent technical or commercial data.

Sellers may add temporary product information received from a factory, supplier, quotation, customer, technical sheet or telephone call. This is stored as `UNVERIFIED_SELLER_INPUT`. It can be used as internal context, but it must not become a customer-facing approved fact until an administrator approves or corrects it.

Customer-facing AI responses may only use approved knowledge items. Unapproved catalogue facts, seller notes and unknown specifications are excluded from customer-facing claims.

## Deployment

Deploy with Cloudflare Pages:

- Framework preset: Vite
- GitHub repository: `tonlitaitalia/tonlitaitalia.github.io`
- Branch: `sales-coach-build`
- Cloudflare Pages project name: `tonlita-sales-coach`
- Project root: `sales-coach`
- Build command: `pnpm run build`
- Output directory: `dist`
- Functions directory: `functions`
- D1 binding: `DB`
- Workers AI binding: `AI`

Do not deploy this app through GitHub Pages.

## Rollback

Use Cloudflare Pages deployment history to roll back the private app. The public GitHub Pages website is unaffected because the app is in a separate project root.

## Troubleshooting

- Login fails: verify the admin SQL was applied and the account is active.
- AI unavailable: verify the Cloudflare AI binding is configured as `AI`.
- D1 errors: verify migrations were applied to the same database bound as `DB`.
- Quota locked: wait until the next Asia/Shanghai day or inspect `global_ai_locks`.
- Sellers see no leads: verify lead assignment.
