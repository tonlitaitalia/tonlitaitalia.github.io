import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const productionDirs = ["src", "functions"];
const requiredFiles = [
  "wrangler.toml",
  "migrations/0001_initial_schema.sql",
  "migrations/0002_seed_knowledge.sql",
  "functions/api/[[path]].ts",
  "src/shared/policy.ts"
];

const forbiddenProviders = [
  "openai",
  "anthropic",
  "supabase",
  "firebase",
  "vercel ai",
  "google generative",
  "gemini"
];

const forbiddenProductionTerms = [
  "mock authentication",
  "mock database",
  "fake ai",
  "stub auth",
  "dummy password",
  "lorem ipsum"
];

const secretPatterns = [
  /sk-[A-Za-z0-9_-]{20,}/,
  /AIza[A-Za-z0-9_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/
];

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist" || entry === ".wrangler") continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) files.push(...walk(path));
    else files.push(path);
  }
  return files;
}

function read(path) {
  return readFileSync(path, "utf8");
}

const failures = [];
for (const file of requiredFiles) {
  try {
    statSync(join(root, file));
  } catch {
    failures.push(`Missing required file: ${file}`);
  }
}

const productionFiles = productionDirs.flatMap((dir) => walk(join(root, dir))).filter((file) => /\.(ts|tsx|js|jsx|css|html)$/.test(file));
for (const file of productionFiles) {
  const rel = relative(root, file);
  const text = read(file);
  const lower = text.toLowerCase();

  for (const term of forbiddenProviders) {
    if (lower.includes(term)) failures.push(`Forbidden paid provider reference in production code: ${rel} -> ${term}`);
  }

  for (const term of forbiddenProductionTerms) {
    if (lower.includes(term)) failures.push(`Forbidden placeholder production term: ${rel} -> ${term}`);
  }

  for (const pattern of secretPatterns) {
    if (pattern.test(text)) failures.push(`Possible committed secret in: ${rel}`);
  }
}

const policy = read(join(root, "src/shared/policy.ts"));
for (const expected of [
  'ZERO_BILLING_MODE: "true"',
  'AI_PROVIDER: "cloudflare"',
  'ALLOW_PAID_AI_FALLBACK: "false"',
  'ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR: "false"',
  'QUOTA_TIMEZONE: "Asia/Shanghai"'
]) {
  if (!policy.includes(expected)) failures.push(`Missing zero-billing default: ${expected}`);
}

const api = read(join(root, "functions/api/[[path]].ts"));
if (!api.includes("env.AI.run(\"@cf/")) failures.push("Cloudflare Workers AI call was not found in the backend.");
if (!api.includes("HttpOnly")) failures.push("HttpOnly session cookie protection was not found.");
if (!api.includes("SameSite=Lax")) failures.push("SameSite session cookie protection was not found.");
if (!api.includes("WHERE leads.assigned_seller_id = ?")) failures.push("Seller lead isolation query was not found.");

if (failures.length) {
  console.error("Static audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Static audit passed: production source keeps Cloudflare-only AI, zero-billing defaults, session protections and seller isolation.");
