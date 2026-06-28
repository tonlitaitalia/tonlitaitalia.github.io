PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'seller')),
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  must_reset_password INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TEXT
);

CREATE INDEX idx_users_role_active ON users(role, active);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT,
  ip_hash TEXT
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  company TEXT,
  country TEXT,
  customer_language TEXT NOT NULL DEFAULT 'English',
  communication_channel TEXT NOT NULL CHECK (communication_channel IN ('WhatsApp','Email','Alibaba','Made-in-China','Facebook','Gumtree','LinkedIn','WeChat','Website inquiry','Telephone','Other')),
  customer_type TEXT NOT NULL CHECK (customer_type IN ('Dealer','Rental company','Construction company','Importer','Agricultural contractor','End user','Unknown')),
  product_category TEXT NOT NULL,
  model TEXT,
  assigned_seller_id TEXT REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('New','Active','Waiting for customer','Waiting for internal confirmation','Proposal sent','Negotiation','Won','Lost','Inactive')) DEFAULT 'New',
  sales_stage TEXT NOT NULL DEFAULT 'Connection',
  follow_up_date TEXT,
  manager_approval_status TEXT NOT NULL DEFAULT 'not_required',
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_assigned_seller ON leads(assigned_seller_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_updated ON leads(updated_at DESC);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  author_user_id TEXT REFERENCES users(id),
  entry_type TEXT NOT NULL CHECK (entry_type IN ('Customer message','Seller message','Internal note','AI suggestion')),
  body TEXT NOT NULL,
  customer_language TEXT,
  ai_run_id TEXT,
  is_sent INTEGER NOT NULL DEFAULT 0,
  discarded INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_lead_created ON messages(lead_id, created_at ASC);
CREATE INDEX idx_messages_ai_run ON messages(ai_run_id);

CREATE TABLE coach_runs (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  prompt_version_id TEXT,
  input_message_count INTEGER NOT NULL DEFAULT 0,
  structured_result_json TEXT NOT NULL,
  quota_day TEXT NOT NULL,
  manager_approval_required INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coach_runs_lead_created ON coach_runs(lead_id, created_at DESC);
CREATE INDEX idx_coach_runs_user_day ON coach_runs(user_id, quota_day);

CREATE TABLE daily_ai_usage (
  id TEXT PRIMARY KEY,
  usage_day TEXT NOT NULL,
  user_id TEXT,
  scope TEXT NOT NULL CHECK (scope IN ('user','global')),
  request_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (usage_day, user_id, scope)
);

CREATE INDEX idx_daily_ai_usage_day_scope ON daily_ai_usage(usage_day, scope);

CREATE TABLE conversation_summaries (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL UNIQUE REFERENCES leads(id) ON DELETE CASCADE,
  summary_english TEXT NOT NULL,
  summary_chinese TEXT NOT NULL,
  risk_flags_json TEXT NOT NULL DEFAULT '[]',
  updated_by_run_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_items (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  model TEXT,
  status TEXT NOT NULL CHECK (status IN ('approved','draft','archived','requires_owner_approval')) DEFAULT 'draft',
  approved_by TEXT REFERENCES users(id),
  approved_at TEXT,
  created_by TEXT REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_knowledge_category_status ON knowledge_items(category, status);
CREATE INDEX idx_knowledge_model_status ON knowledge_items(model, status);

CREATE TABLE approval_requests (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  requested_by TEXT NOT NULL REFERENCES users(id),
  approval_type TEXT NOT NULL,
  reason TEXT NOT NULL,
  proposed_reply TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending','approved','rejected','resolved')) DEFAULT 'pending',
  admin_notes TEXT,
  resolved_by TEXT REFERENCES users(id),
  resolved_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_approval_status ON approval_requests(status, created_at DESC);

CREATE TABLE prompt_versions (
  id TEXT PRIMARY KEY,
  version_label TEXT NOT NULL UNIQUE,
  system_prompt TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_actor_created ON audit_log(actor_user_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);

CREATE TABLE application_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  locked INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE global_ai_locks (
  id TEXT PRIMARY KEY,
  locked INTEGER NOT NULL DEFAULT 0,
  reason_english TEXT NOT NULL,
  reason_chinese TEXT NOT NULL,
  quota_day TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT
);

CREATE INDEX idx_global_ai_locks_active ON global_ai_locks(locked, expires_at);

INSERT INTO application_settings (key, value, locked) VALUES
  ('ZERO_BILLING_MODE', 'true', 1),
  ('AI_PROVIDER', 'cloudflare', 1),
  ('MAX_ACTIVE_SELLERS', '5', 1),
  ('SELLER_DAILY_AI_REQUEST_LIMIT', '50', 1),
  ('GLOBAL_DAILY_AI_REQUEST_LIMIT', '250', 1),
  ('ALLOW_PAID_AI_FALLBACK', 'false', 1),
  ('ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR', 'false', 1),
  ('QUOTA_TIMEZONE', 'Asia/Shanghai', 1);

INSERT INTO prompt_versions (id, version_label, system_prompt, active) VALUES
  ('prompt_v1', 'initial-tonlita-sales-coach', 'TONLITA Sales Coach system prompt v1. Use only approved knowledge, consultative methodology, zero hidden chain-of-thought, structured JSON output.', 1);
