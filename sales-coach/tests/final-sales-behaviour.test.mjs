import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const api = fs.readFileSync(path.join(root, "functions/api/[[path]].ts"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const policy = fs.readFileSync(path.join(root, "src/shared/policy.ts"), "utf8");
const memoryMigration = fs.readFileSync(path.join(root, "migrations/0005_final_coaching_memory_attachments.sql"), "utf8");

test("multilingual coaching handles customer language, translations and override", () => {
  assert.match(api, /Detect the customer's actual language/);
  assert.match(api, /Respect manual language override/);
  assert.match(api, /German customer -> reply in German/);
  assert.match(api, /Spanish customer -> reply in Spanish/);
  assert.match(api, /default the customer-facing draft to English/);
  assert.match(policy, /customer_message_english/);
  assert.match(policy, /customer_message_chinese/);
  assert.match(app, /Manual language override/);
  assert.match(app, /Low confidence language detection/);
});

test("coach result requires two-or-three response option workflow and Chinese training", () => {
  assert.match(api, /Generate 2 or 3 genuinely different response options/);
  assert.match(api, /RECOMMENDED OPTION/);
  assert.match(policy, /response_options/);
  assert.match(policy, /seller_training_chinese/);
  assert.match(policy, /why_wrong_approach_is_unsuitable_chinese/);
  assert.match(app, /Select option/);
  assert.match(app, /Copy customer-language reply/);
  assert.match(app, /Copy Chinese/);
  assert.match(app, /Why not to use the wrong approach/);
});

test("customer patience rules answer direct requests before one practical question", () => {
  assert.match(api, /Answer first, question second/);
  assert.match(api, /Normally ask no more than one principal question/);
  assert.match(api, /Every question must have an obvious practical purpose/);
  assert.match(api, /Do not use consequence questions unless/);
  assert.match(api, /Do not ask for information already present/);
  assert.match(policy, /should_answer_before_asking/);
  assert.match(policy, /necessary_question_reason/);
});

test("persistent memory separates leads and treats AI suggestions as unsent until marked", () => {
  assert.match(api, /conversationMemoryForLead/);
  assert.match(api, /recent_confirmed_messages/);
  assert.match(api, /confirmed_seller_messages/);
  assert.match(api, /internal_notes/);
  assert.match(memoryMigration, /unresolved_questions_json/);
  assert.match(memoryMigration, /promises_json/);
  assert.match(memoryMigration, /selected_option_json/);
  assert.match(memoryMigration, /marked_sent_message_id/);
  assert.match(api, /entry_type, body, ai_run_id\) VALUES \(\?, \?, \?, 'AI suggestion'/);
  assert.match(api, /entry_type, body, is_sent\) VALUES \(\?, \?, \?, 'Seller message', \?, 1\)/);
});

test("attachment workflow is temporary, quota-counted and confirmation based", () => {
  assert.match(api, /MAX_ATTACHMENTS_PER_ANALYSIS/);
  assert.match(api, /MAX_ATTACHMENT_SIZE_MB/);
  assert.match(api, /MAX_TOTAL_UPLOAD_SIZE_MB/);
  assert.match(api, /SUPPORTED_ATTACHMENT_TYPES/);
  assert.match(api, /consumeQuota\(env, user\)/);
  assert.match(api, /processed_temporarily_raw_deleted_manual_extraction_required/);
  assert.match(api, /attachment_extracted_messages/);
  assert.match(api, /confirm-messages/);
  assert.match(api, /UNVERIFIED_SELLER_INPUT/);
  assert.doesNotMatch(api, /R2Bucket|Cloudflare Images|openai|anthropic|paid fallback/i);
  assert.match(app, /Original attachment is processed temporarily/);
  assert.match(app, /Confirm staged messages/);
});

test("unknown and future products remain coachable without invented facts", () => {
  assert.match(api, /Unknown products must still receive useful coaching/);
  assert.match(api, /Do not invent specs/);
  assert.match(api, /If exact model information is unavailable, use approved category-level knowledge/);
  assert.match(api, /If category knowledge is unavailable/);
  assert.match(api, /This product is not yet available in the approved Tonlita knowledge base/);
  assert.match(app, /New or unlisted product/);
  assert.match(app, /Request product approval/);
});
