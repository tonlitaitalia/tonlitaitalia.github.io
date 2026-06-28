# Local Verification On Mac

Status: completed successfully on the owner's Mac on branch `sales-coach-build`.

Keep this file for future checks before Cloudflare deployments.

## Successful Results Already Confirmed

- `pnpm install`: completed successfully.
- `pnpm run check`: completed successfully with no TypeScript errors.
- `pnpm run lint`: completed successfully.
- `pnpm test`: completed with 31 tests passed and 0 failed.
- `pnpm run build`: completed successfully.
- Vite created the production `dist` directory.
- Active branch remained `sales-coach-build`.
- Generated folders such as `dist` and `node_modules` are ignored by Git and do not need to be committed.

## How To Repeat The Check Later

### 1. Open Terminal

Open **Terminal** from Applications, Launchpad or Spotlight.

### 2. Enter The Repository

Copy and paste this command:

```bash
cd "/Users/gianlucamusotti/Documents/Codex/2026-04-25/files-mentioned-by-the-user-catalogo/tonlitaitalia.github.io-updated-20260503"
```

### 3. Confirm The Branch

Run:

```bash
git branch --show-current
```

Expected result:

```text
sales-coach-build
```

If it says `main`, stop and do not continue.

### 4. Enter The Sales Coach Folder

Run:

```bash
cd sales-coach
```

### 5. Install Dependencies

Run:

```bash
pnpm install
```

Success means it finishes without red error messages.

### 6. Run The Checks

Run these one at a time:

```bash
pnpm run check
```

```bash
pnpm run lint
```

```bash
pnpm test
```

```bash
pnpm run build
```

### 7. What Success Looks Like

- `pnpm run check`: no TypeScript errors.
- `pnpm run lint`: no security or source audit errors.
- `pnpm test`: all tests pass. The current expected result is 31 passed and 0 failed.
- `pnpm run build`: production build completes and creates or updates `sales-coach/dist`.

### 8. What To Send If Something Fails

Send:

1. A screenshot of the Terminal error.
2. The command you ran.
3. The last 20 lines of text shown in Terminal.
4. Confirmation that `git branch --show-current` still says `sales-coach-build`.

## Important Warnings

- Do not merge this branch into `main`.
- Do not push changes to `main`.
- Do not configure Cloudflare from `main`.
- The public Tonlita website is separate from this private app and should remain unchanged.
