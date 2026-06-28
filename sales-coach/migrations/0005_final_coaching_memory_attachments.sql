PRAGMA foreign_keys = ON;

ALTER TABLE leads ADD COLUMN language_override TEXT;
ALTER TABLE leads ADD COLUMN detected_customer_language TEXT;
ALTER TABLE leads ADD COLUMN language_detection_confidence TEXT;
ALTER TABLE leads ADD COLUMN unresolved_questions_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE leads ADD COLUMN promises_json TEXT NOT NULL DEFAULT '[]';

ALTER TABLE messages ADD COLUMN original_language TEXT;
ALTER TABLE messages ADD COLUMN english_translation TEXT;
ALTER TABLE messages ADD COLUMN chinese_translation TEXT;
ALTER TABLE messages ADD COLUMN interpretation_english TEXT;
ALTER TABLE messages ADD COLUMN interpretation_chinese TEXT;
ALTER TABLE messages ADD COLUMN source_attachment_id TEXT;
ALTER TABLE messages ADD COLUMN confirmed_from_attachment INTEGER NOT NULL DEFAULT 0;
ALTER TABLE messages ADD COLUMN message_order INTEGER;

ALTER TABLE coach_runs ADD COLUMN recommended_option_number INTEGER;
ALTER TABLE coach_runs ADD COLUMN selected_option_number INTEGER;
ALTER TABLE coach_runs ADD COLUMN selected_option_json TEXT;
ALTER TABLE coach_runs ADD COLUMN edited_final_reply TEXT;
ALTER TABLE coach_runs ADD COLUMN marked_sent_message_id TEXT;
ALTER TABLE coach_runs ADD COLUMN marked_sent_at TEXT;

CREATE TABLE IF NOT EXISTS lead_attachments (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  uploaded_by_user_id TEXT NOT NULL REFERENCES users(id),
  purpose TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  content_hash TEXT NOT NULL,
  extracted_text TEXT,
  processing_status TEXT NOT NULL DEFAULT 'metadata_saved_manual_extraction_required',
  page_count INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lead_attachments_lead_created ON lead_attachments(lead_id, created_at DESC);

CREATE TABLE IF NOT EXISTS attachment_extracted_messages (
  id TEXT PRIMARY KEY,
  attachment_id TEXT NOT NULL REFERENCES lead_attachments(id) ON DELETE CASCADE,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  probable_speaker TEXT NOT NULL CHECK (probable_speaker IN ('Customer message','Seller message','Internal note')),
  message_order INTEGER NOT NULL DEFAULT 0,
  original_text TEXT NOT NULL,
  english_translation TEXT,
  chinese_translation TEXT,
  detected_language TEXT,
  confidence TEXT,
  confirmed INTEGER NOT NULL DEFAULT 0,
  discarded INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_attachment_messages_attachment ON attachment_extracted_messages(attachment_id, confirmed, discarded);
CREATE INDEX IF NOT EXISTS idx_attachment_messages_lead ON attachment_extracted_messages(lead_id, message_order);

CREATE TABLE IF NOT EXISTS attachment_extracted_facts (
  id TEXT PRIMARY KEY,
  attachment_id TEXT NOT NULL REFERENCES lead_attachments(id) ON DELETE CASCADE,
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  category TEXT,
  manufacturer TEXT,
  factory TEXT,
  model TEXT,
  variant TEXT,
  field_name TEXT NOT NULL,
  value TEXT NOT NULL,
  unit TEXT,
  source_page INTEGER,
  original_wording TEXT,
  extraction_confidence TEXT,
  approval_status TEXT NOT NULL DEFAULT 'UNVERIFIED_SELLER_INPUT' CHECK (approval_status IN ('UNVERIFIED_SELLER_INPUT','APPROVED_ADMIN_FACT','REJECTED','CONFLICT_REQUIRES_REVIEW')),
  linked_model_id TEXT REFERENCES product_models(id),
  corrected_value TEXT,
  admin_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_attachment_facts_lead_status ON attachment_extracted_facts(lead_id, approval_status);
CREATE INDEX IF NOT EXISTS idx_attachment_facts_attachment ON attachment_extracted_facts(attachment_id);
