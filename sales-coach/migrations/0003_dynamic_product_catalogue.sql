-- Dynamic product catalogue: administrator-editable and expandable without code changes.
ALTER TABLE leads ADD COLUMN product_choice_type TEXT NOT NULL DEFAULT 'Existing approved product';
ALTER TABLE leads ADD COLUMN product_model_id TEXT;
ALTER TABLE leads ADD COLUMN free_text_category TEXT;
ALTER TABLE leads ADD COLUMN free_text_model TEXT;

CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 100,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES product_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category_id, name)
);

CREATE TABLE IF NOT EXISTS manufacturers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  country TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS factories (
  id TEXT PRIMARY KEY,
  manufacturer_id TEXT REFERENCES manufacturers(id),
  name TEXT NOT NULL,
  country TEXT,
  province TEXT,
  city TEXT,
  address TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_models (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES product_categories(id),
  subcategory_id TEXT REFERENCES product_subcategories(id),
  manufacturer_id TEXT REFERENCES manufacturers(id),
  factory_id TEXT REFERENCES factories(id),
  model_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  active INTEGER NOT NULL DEFAULT 1,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category_id, model_name)
);

CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  model_id TEXT NOT NULL REFERENCES product_models(id),
  variant_name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_engines (
  id TEXT PRIMARY KEY,
  model_id TEXT REFERENCES product_models(id),
  variant_id TEXT REFERENCES product_variants(id),
  engine_name TEXT NOT NULL,
  engine_type TEXT,
  power_value TEXT,
  power_unit TEXT,
  emissions_standard TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_attachments (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_options (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','deleted')),
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_specifications (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  subcategory_id TEXT REFERENCES product_subcategories(id),
  model_id TEXT REFERENCES product_models(id),
  variant_id TEXT REFERENCES product_variants(id),
  field_name TEXT NOT NULL,
  custom_field_key TEXT,
  value TEXT,
  unit TEXT,
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_prices (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  price_label TEXT NOT NULL,
  value TEXT,
  currency TEXT,
  scope TEXT,
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS commercial_conditions (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  condition_type TEXT NOT NULL,
  value TEXT,
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_documents (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  document_type TEXT NOT NULL,
  title TEXT NOT NULL,
  url_or_path TEXT,
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  possible_conflict INTEGER NOT NULL DEFAULT 0,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qualification_questions (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  question_en TEXT NOT NULL,
  question_zh TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 100,
  active INTEGER NOT NULL DEFAULT 1,
  approval_status TEXT NOT NULL DEFAULT 'APPROVED_ADMIN_FACT' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS approved_sales_claims (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  claim_en TEXT NOT NULL,
  claim_zh TEXT NOT NULL,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS known_limitations (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  limitation_en TEXT NOT NULL,
  limitation_zh TEXT NOT NULL,
  approval_status TEXT NOT NULL DEFAULT 'REQUIRES_OWNER_APPROVAL' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  source_dataset TEXT,
  source_document TEXT,
  source_page INTEGER,
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_manager_approval_rules (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES product_categories(id),
  model_id TEXT REFERENCES product_models(id),
  rule_en TEXT NOT NULL,
  rule_zh TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  approval_status TEXT NOT NULL DEFAULT 'APPROVED_ADMIN_FACT' CHECK (approval_status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temporary_product_inputs (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  seller_id TEXT NOT NULL REFERENCES users(id),
  source_type TEXT NOT NULL,
  category_text TEXT,
  model_text TEXT,
  field_name TEXT,
  value TEXT,
  unit TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'UNVERIFIED_SELLER_INPUT' CHECK (status IN ('APPROVED_CATALOGUE_FACT','REQUIRES_OWNER_APPROVAL','CONFLICT_REQUIRES_REVIEW','NOT_AVAILABLE','UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED')),
  admin_review_notes TEXT,
  converted_specification_id TEXT REFERENCES product_specifications(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_product_models_category ON product_models(category_id, status);
CREATE INDEX IF NOT EXISTS idx_product_models_active ON product_models(active, category_id);
CREATE INDEX IF NOT EXISTS idx_product_models_name ON product_models(model_name);
CREATE INDEX IF NOT EXISTS idx_product_specs_model_status ON product_specifications(model_id, approval_status);
CREATE INDEX IF NOT EXISTS idx_product_specs_category_status ON product_specifications(category_id, approval_status);
CREATE INDEX IF NOT EXISTS idx_product_specs_custom_key ON product_specifications(custom_field_key);
CREATE INDEX IF NOT EXISTS idx_product_prices_model_status ON product_prices(model_id, approval_status);
CREATE INDEX IF NOT EXISTS idx_temp_product_inputs_lead ON temporary_product_inputs(lead_id, status);
CREATE INDEX IF NOT EXISTS idx_leads_product_model ON leads(product_model_id);
