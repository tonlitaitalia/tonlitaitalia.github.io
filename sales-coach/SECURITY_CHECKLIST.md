# Security Checklist

Local verification status: passed on the owner's Mac.

## Implemented And Verified Locally

- [x] No public registration.
- [x] Passwords are hashed server-side with PBKDF2 and per-user salt.
- [x] Sessions use opaque tokens stored as hashes in D1.
- [x] Cookies are HttpOnly, SameSite=Lax, and Secure in HTTPS.
- [x] Disabled users cannot authenticate or use existing sessions.
- [x] Seller users can only access assigned leads.
- [x] Administrator can access all leads and users.
- [x] Backend route authorization is enforced for protected data.
- [x] Frontend checks are not the only security control.
- [x] Customer messages are treated as untrusted text.
- [x] Uploaded text and extracted file content are treated as untrusted content.
- [x] AI system instructions explicitly block prompt injection.
- [x] AI calls are server-side only.
- [x] No AI credentials are exposed to the frontend.
- [x] Safe generic server errors are returned to clients.
- [x] Audit logs record login, account, lead, message, AI and approval actions.
- [x] Manager approval categories are represented in the app.
- [x] Approved knowledge is separated from draft, temporary and unapproved knowledge.
- [x] Non-admin product specification browsing returns only approved customer-facing facts.
- [x] Attachment records are lead-owned and use seller/admin access checks.
- [x] Raw attachment files are processed temporarily and are not designed to be permanently stored in D1.
- [x] Logout clears cookies with the same production Secure-cookie behavior used at login.
- [x] Prompt-injection attempts in customer messages or uploaded files cannot override system rules.
- [x] `pnpm run check` passed with no TypeScript errors.
- [x] `pnpm run lint` passed.
- [x] `pnpm test` passed with 31 tests and 0 failures.
- [x] `pnpm run build` passed and produced `dist`.

## Cloudflare Production Security Steps

- [ ] Set a strong `COOKIE_SECRET` in Cloudflare, generated with `openssl rand -hex 32`.
- [ ] Create only one administrator account.
- [ ] Rotate or replace temporary administrator passwords after first login.
- [ ] Create no more than five active seller accounts.
- [ ] Confirm `DB` is bound to the correct production D1 database.
- [ ] Confirm `AI` is the only AI binding.
- [ ] Confirm no R2 bucket or paid storage binding exists.
- [ ] Confirm Cloudflare Pages project is deployed from `sales-coach-build`.
- [ ] Confirm project root is `sales-coach`, not repository root.
- [ ] Review audit logs after first production test.

## Public Website Protection

- [x] The private app is contained in `/sales-coach`.
- [x] The existing public GitHub Pages website remains in the repository root.
- [x] Cloudflare Pages must use `sales-coach` as project root.
- [x] Cloudflare output directory is `dist`, inside `/sales-coach`.
- [x] The public GitHub Pages website is not replaced by the sales-coach build.
