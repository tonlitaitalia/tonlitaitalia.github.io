# Zero-Billing Checklist

**Keep the Cloudflare account on Workers Free. Do not subscribe to Workers Paid. Do not configure paid AI providers. The application is designed to stop when free quotas are exhausted.**

Local verification status: passed on the owner's Mac.

## Required Production Values

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
```

## Hard Rules

The application must never:

- Use OpenAI, Anthropic, Google, Gemini, Vercel AI or any paid AI fallback.
- Store paid AI API keys.
- Retry automatically after quota exhaustion.
- Switch AI provider automatically.
- Allow a user interface switch to disable zero-billing mode.
- Make AI calls from browser code.
- Use Cloudflare R2 or Cloudflare Images for attachment storage.

## Quota Behavior

- Each seller: maximum 50 AI requests per Asia/Shanghai day.
- Whole team including administrator: maximum 250 AI requests per Asia/Shanghai day.
- Ordinary message saving does not consume quota.
- Every AI rewrite or analysis action consumes quota.
- Attachment analysis consumes quota.
- Browser time changes cannot reset quota.
- Global lock activates when quota is exhausted.
- Conversations remain readable during AI lock.
- Quota reservation checks the user limit before consuming global quota.
- If the global quota is hit after a user reservation, the user reservation is rolled back and a global AI lock is activated.

## Local Verification Completed

- [x] `pnpm run check` passed.
- [x] `pnpm run lint` passed.
- [x] `pnpm test` passed with 31 tests and 0 failures.
- [x] `pnpm run build` passed.
- [x] Vite created `dist`.
- [x] Source audit confirms Cloudflare-only AI in production source.
- [x] Source audit confirms no paid fallback provider in production source.

## Manual Production Check

1. Open the Admin dashboard.
2. Confirm team usage shows `0 / 250` at the start of the day.
3. Trigger one AI request.
4. Confirm seller usage increments by 1.
5. Confirm global usage increments by 1.
6. Save an ordinary customer message.
7. Confirm no AI quota is consumed.
8. If quota is exhausted, confirm new AI calls stop and existing conversations remain available.

## Cloudflare Account Warning

Use Workers Free only. Do not enable Workers Paid. Do not add OpenAI, Anthropic, Google, Gemini or other paid AI providers. Do not add R2 storage. This app is designed to stop safely when free Cloudflare AI quota is exhausted.
