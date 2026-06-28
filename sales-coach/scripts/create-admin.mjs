import { pbkdf2Sync, randomUUID } from "node:crypto";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const displayName = process.env.ADMIN_NAME || "Tonlita Administrator";
const sqlOnly = process.argv.includes("--sql-only");

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script.");
  process.exit(1);
}

const salt = randomUUID();
const hash = pbkdf2Sync(password, salt, 210000, 32, "sha256").toString("hex");
const id = `user_${randomUUID()}`;

const sql = `
INSERT INTO users (id, email, display_name, role, password_hash, password_salt, active, must_reset_password)
VALUES ('${id}', '${email.toLowerCase().replaceAll("'", "''")}', '${displayName.replaceAll("'", "''")}', 'admin', '${hash}', '${salt}', 1, 0);
`;

console.log(sql);
if (!sqlOnly) {
  console.log("Run the SQL above with wrangler d1 execute. Do not commit real passwords.");
}
