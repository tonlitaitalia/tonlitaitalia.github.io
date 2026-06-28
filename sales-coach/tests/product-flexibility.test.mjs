import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const api = fs.readFileSync(path.join(root, "functions/api/[[path]].ts"), "utf8");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
const schema = fs.readFileSync(path.join(root, "migrations/0003_dynamic_product_catalogue.sql"), "utf8");
const seed = fs.readFileSync(path.join(root, "migrations/0004_seed_initial_catalogue_dataset.sql"), "utf8");

test("seller can create a lead for a product not in the catalogue", () => {
  assert.match(schema, /product_choice_type TEXT NOT NULL DEFAULT 'Existing approved product'/);
  assert.match(schema, /free_text_category TEXT/);
  assert.match(schema, /free_text_model TEXT/);
  assert.match(api, /product_choice_type, product_model_id, free_text_category, free_text_model/);
  assert.match(app, /New or unlisted product/);
  assert.match(app, /Unknown product/);
  assert.match(app, /Other machinery/);
});

test("AI continues coaching unknown products without inventing specifications", () => {
  assert.match(api, /This product is not yet available in the approved Tonlita knowledge base/);
  assert.match(api, /continue qualifying the customer/);
  assert.match(api, /technical and commercial facts must be confirmed/);
  assert.match(api, /Do not invent specs/);
  assert.match(api, /continue with consultative sales coaching/);
});

test("category-level knowledge is retrieved when exact model knowledge is unavailable", () => {
  assert.match(api, /approved_category_facts/);
  assert.match(api, /approved_model_facts/);
  assert.match(api, /Approved category-level knowledge/);
  assert.match(seed, /catfact_spider_core/);
  assert.match(seed, /catfact_exc_core/);
});

test("new categories and custom specifications can be added without a migration", () => {
  assert.match(schema, /CREATE TABLE IF NOT EXISTS product_categories/);
  assert.match(schema, /CREATE TABLE IF NOT EXISTS product_specifications/);
  assert.match(schema, /custom_field_key TEXT/);
  assert.match(api, /path === "\/products\/categories" && method === "POST"/);
  assert.match(api, /path === "\/products\/specifications" && method === "POST"/);
  assert.match(app, /Create category/);
  assert.match(app, /Create custom specification/);
});

test("unverified seller input is stored as internal context only", () => {
  assert.match(schema, /temporary_product_inputs/);
  assert.match(schema, /UNVERIFIED_SELLER_INPUT/);
  assert.match(api, /temporary_product_inputs/);
  assert.match(api, /Unverified seller input is internal context only/);
  assert.match(api, /must not be presented as confirmed Tonlita information/);
});

test("catalogue models are imported as initial data, not hard-coded as the only products", () => {
  const catalogueModelNames = ["YXC300", "YXC400", "YXC500", "YX18", "ME35.10", "V1000"];
  for (const model of catalogueModelNames) {
    assert.match(seed, new RegExp(model.replace(".", "\\.")));
  }
  for (const model of catalogueModelNames) {
    assert.doesNotMatch(api, new RegExp(`if \\([^)]*${model.replace(".", "\\.")}`));
    assert.doesNotMatch(api, new RegExp(`switch \\([^)]*${model.replace(".", "\\.")}`));
  }
  assert.match(seed, /INITIAL_CATALOGUE_DATASET/);
  assert.match(app, /New or unlisted product/);
});

test("unapproved catalogue facts are excluded from customer-facing AI responses", () => {
  assert.match(api, /IN \('APPROVED_CATALOGUE_FACT', 'APPROVED_ADMIN_FACT'\)/);
  assert.match(api, /Use only approved Tonlita knowledge for customer-facing facts/);
  assert.match(seed, /REQUIRES_OWNER_APPROVAL/);
  assert.match(seed, /Legal\/commercial information is not customer-facing until owner approval/);
});

test("initial catalogue dataset includes every extracted product model and page reference", () => {
  const models = [
    ["YXC300", 2],
    ["YXC400", 5],
    ["YXC500", 8],
    ["1000F", 11],
    ["YX10", 13],
    ["YX15", 15],
    ["YX18", 17],
    ["YX20", 19],
    ["YX25", 21],
    ["ME18.9", 23],
    ["ME26.9", 25],
    ["ME35.10", 27],
    ["ME60.9", 29],
    ["T360", 31],
    ["T460", 33],
    ["V800", 35],
    ["V1000", 37]
  ];
  for (const [model, page] of models) {
    assert.match(seed, new RegExp(`'${model.replace(".", "\\.")}'`));
    assert.match(seed, new RegExp(`,${page},'Imported from catalogue page ${page}`));
  }
});
