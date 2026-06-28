# Database Migrations

The D1 database must be created empty, then migrations must be applied in filename order.

## Current Migration Order

1. `0001_initial_schema.sql`
2. `0002_seed_knowledge.sql`
3. `0003_dynamic_product_catalogue.sql`
4. `0004_seed_initial_catalogue_dataset.sql`
5. `0005_final_coaching_memory_attachments.sql`

## What The Migrations Cover

- Users, server-side sessions, roles and account status.
- Leads, seller assignment and lead status.
- Conversation messages, AI suggestions and mark-as-sent workflow.
- Daily AI usage, per-user quota, global quota and AI lock records.
- Knowledge items, product categories, models, custom specifications and approval status.
- Approval requests and audit logs.
- Persistent conversation summaries and unresolved memory fields.
- Attachment metadata, extracted messages, staged confirmation and extracted product facts.

## Audit Notes

- The public GitHub Pages website does not use these migrations.
- `/sales-coach` must be deployed as a separate Cloudflare Pages project.
- Old migrations were not rewritten during the hostile audit. Source-code fixes were made without changing the published migration history.
- If a production database already exists later, use a new corrective migration instead of editing an applied migration.

## Apply Locally

From `/sales-coach`:

```bash
pnpm exec wrangler d1 migrations apply tonlita_sales_coach --local
```

## Apply Remotely

Only after local verification passes and Cloudflare is intentionally configured:

```bash
pnpm exec wrangler d1 migrations apply tonlita_sales_coach --remote
```

Do not run remote migrations until `pnpm run build` succeeds locally.
