export type Role = "admin" | "seller";

export type User = {
  id: string;
  email: string;
  display_name: string;
  role: Role;
};

export type Lead = {
  id: string;
  customer_name: string;
  company?: string;
  country?: string;
  customer_language: string;
  language_override?: string;
  detected_customer_language?: string;
  language_detection_confidence?: string;
  communication_channel: string;
  customer_type: string;
  product_category: string;
  model?: string;
  product_choice_type?: string;
  product_model_id?: string;
  free_text_category?: string;
  free_text_model?: string;
  status: string;
  sales_stage: string;
  unresolved_questions_json?: string;
  promises_json?: string;
  assigned_seller_id?: string;
  seller_name?: string;
  updated_at: string;
};

export type Message = {
  id: string;
  lead_id: string;
  entry_type: "Customer message" | "Seller message" | "Internal note" | "AI suggestion";
  body: string;
  original_language?: string;
  english_translation?: string;
  chinese_translation?: string;
  interpretation_english?: string;
  interpretation_chinese?: string;
  source_attachment_id?: string;
  confirmed_from_attachment?: number;
  message_order?: number;
  is_sent: number;
  discarded: number;
  created_at: string;
};

export type ResponseOption = {
  option_number: number;
  option_label: string;
  reply_customer_language: string;
  reply_english: string;
  reply_chinese: string;
  tonality_english: string;
  tonality_chinese: string;
  best_use_case_english: string;
  best_use_case_chinese: string;
  why_it_works_english: string;
  why_it_works_chinese: string;
  risk_english: string;
  risk_chinese: string;
  likely_customer_reaction: string;
};

export type CoachResult = {
  detected_customer_language: string;
  language_detection_confidence: string;
  original_customer_message: string;
  customer_message_english: string;
  customer_message_chinese: string;
  explicit_customer_facts: string[];
  probable_customer_intent: string[];
  interpretation_confidence: string;
  evidence_from_conversation: string[];
  current_sales_stage: string;
  customer_communication_style: string;
  resistance_level: string;
  immediate_customer_request: string;
  next_message_objective: string;
  should_answer_before_asking: boolean;
  necessary_question_reason: string;
  recommended_option_number: number;
  response_options: ResponseOption[];
  seller_training_chinese: string[];
  wrong_approach_example: string;
  why_wrong_approach_is_unsuitable_chinese: string;
  missing_information: string[];
  next_step_branches_english: string[];
  next_step_branches_chinese: string[];
  manager_approval_required: boolean;
  manager_approval_reason: string;
  internal_risk_warnings: string[];
};

export type LeadAttachment = {
  id: string;
  lead_id: string;
  uploaded_by_user_id: string;
  purpose: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  content_hash: string;
  extracted_text?: string;
  processing_status: string;
  page_count?: number;
  created_at: string;
};

export type AttachmentExtractedMessage = {
  id: string;
  attachment_id: string;
  lead_id: string;
  probable_speaker: "Customer message" | "Seller message" | "Internal note";
  message_order: number;
  original_text: string;
  english_translation?: string;
  chinese_translation?: string;
  detected_language?: string;
  confidence?: string;
  confirmed: number;
  discarded: number;
};

export type AttachmentExtractedFact = {
  id: string;
  attachment_id: string;
  lead_id: string;
  category?: string;
  model?: string;
  field_name: string;
  value: string;
  unit?: string;
  source_page?: number;
  extraction_confidence?: string;
  approval_status: "UNVERIFIED_SELLER_INPUT" | "APPROVED_ADMIN_FACT" | "REJECTED" | "CONFLICT_REQUIRES_REVIEW";
  original_wording?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  active: number;
  sort_order: number;
  approval_status: string;
};

export type ProductModel = {
  id: string;
  category_id?: string;
  category_name?: string;
  model_name: string;
  display_name: string;
  description?: string;
  active: number;
  approval_status: string;
  source_dataset?: string;
  source_document?: string;
  source_page?: number;
};

export type ProductSpecification = {
  id: string;
  category_id?: string;
  model_id?: string;
  category_name?: string;
  model_name?: string;
  field_name: string;
  custom_field_key?: string;
  value: string;
  unit?: string;
  approval_status: string;
  possible_conflict: number;
  internal_notes?: string;
  source_document?: string;
  source_page?: number;
};
