# TONLITA Sales Coach Architecture Plan

## Repository Boundary

The existing public Italian Tonlita website is a static GitHub Pages site served from the repository root:

- `index.html`
- `styles.css`
- `app.js`
- `assets/`
- `valutazione-mini-gru/`

The new private internal application is isolated inside:

- `sales-coach/`

This folder contains its own Vite, React, TypeScript, Tailwind CSS and Cloudflare Pages configuration. It is designed to be deployed as a separate Cloudflare Pages project with `sales-coach` as the build root. It does not replace, rename, move or modify the public website files at the repository root.

## Branch Safety

Development must remain on `sales-coach-build`.

Do not merge, rebase or push changes to `main` from this work. The public GitHub Pages site remains unaffected unless this branch is intentionally merged later by the owner.

## Publishing Model

Public website:

- Host: GitHub Pages
- Source: repository root on the public website branch
- Runtime: static HTML, CSS and JavaScript

Private Sales Coach:

- Host: Cloudflare Pages
- Source: same GitHub repository, branch `sales-coach-build`
- Project root: `sales-coach`
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Cloudflare Pages Functions
- Database: Cloudflare D1
- AI: Cloudflare Workers AI only
- Authentication: server-side sessions with HttpOnly cookies

## Why `/sales-coach` Will Not Interfere

The existing website does not import or reference files from `sales-coach/`. The new application has its own `package.json`, build config, Cloudflare functions and D1 migrations under the folder. GitHub Pages will continue to serve the root static site unless the repository owner changes GitHub Pages settings.

For Cloudflare, the Pages project must be configured with:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `sales-coach`

## Security Model

The Sales Coach is private and has no public registration.

Users:

- exactly one administrator account;
- up to five active seller accounts.

Controls:

- password hashing with PBKDF2;
- server-side sessions stored in D1;
- HttpOnly cookies;
- Secure cookies in production;
- SameSite=Lax;
- account activation/deactivation;
- role-based authorization;
- seller lead isolation;
- audit logs;
- prompt-injection protection;
- no secrets in frontend code.

## Zero-Billing Model

Production defaults:

```text
ZERO_BILLING_MODE=true
AI_PROVIDER=cloudflare
MAX_ACTIVE_SELLERS=5
SELLER_DAILY_AI_REQUEST_LIMIT=50
GLOBAL_DAILY_AI_REQUEST_LIMIT=250
ALLOW_PAID_AI_FALLBACK=false
ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR=false
QUOTA_TIMEZONE=Asia/Shanghai
```

Only Cloudflare Workers AI is allowed. Paid AI providers are rejected by configuration validation. Quota is checked server-side using the Asia/Shanghai day and recorded in D1.

When quota is exhausted or Cloudflare AI is unavailable, existing conversations remain accessible and ordinary messages can still be saved. New AI calls are stopped.

## Database Source Of Truth

Cloudflare D1 stores:

- users;
- sessions;
- leads;
- messages;
- coach runs;
- quota usage;
- summaries;
- knowledge base items;
- approval requests;
- prompt versions;
- audit logs;
- settings;
- global AI locks.

## AI Safety

Customer messages are untrusted input. They are included as conversation content only and cannot override system instructions.

The AI must use only approved Tonlita knowledge base records. Unknown product specifications, certifications, delivery times, discounts, warranty exceptions or shipping prices must be flagged for internal confirmation instead of invented.

## Manual Cloudflare Steps

The owner must create:

1. A Cloudflare Pages project pointing to this repository and branch.
2. A D1 database.
3. Bindings:
   - `DB`
   - `AI`
4. Environment variables listed in `sales-coach/.dev.vars.example`.
5. Run D1 migrations.
6. Run the admin creation script.

The repository must not contain real secrets, passwords, database IDs or API tokens.
