export const ZERO_BILLING_DEFAULTS = {
  ZERO_BILLING_MODE: "true",
  AI_PROVIDER: "cloudflare",
  MAX_ACTIVE_SELLERS: "5",
  SELLER_DAILY_AI_REQUEST_LIMIT: "50",
  GLOBAL_DAILY_AI_REQUEST_LIMIT: "250",
  ALLOW_PAID_AI_FALLBACK: "false",
  ALLOW_AUTOMATIC_RETRIES_AFTER_QUOTA_ERROR: "false",
  QUOTA_TIMEZONE: "Asia/Shanghai"
} as const;

export const SALES_STAGES = [
  "Connection",
  "Situation discovery",
  "Problem awareness",
  "Consequence awareness",
  "Solution awareness",
  "Product evaluation",
  "Trust verification",
  "Commercial qualification",
  "Proposal",
  "Objection handling",
  "Commitment",
  "Follow-up",
  "Won",
  "Lost or inactive"
] as const;

export const APPROVAL_TRIGGERS = [
  "exclusivity",
  "dealer agreement",
  "warranty exception",
  "discount",
  "free product",
  "free spare part",
  "changed payment terms",
  "refund",
  "penalty",
  "guaranteed delivery date",
  "major customization",
  "unverified certification claim",
  "legal commitment",
  "agency rights",
  "unconfirmed final freight",
  "serious complaint",
  "safety issue",
  "customer threat",
  "dispute"
] as const;

export const REQUIRED_AI_KEYS = [
  "detected_customer_language",
  "language_detection_confidence",
  "original_customer_message",
  "customer_message_english",
  "customer_message_chinese",
  "explicit_customer_facts",
  "probable_customer_intent",
  "interpretation_confidence",
  "evidence_from_conversation",
  "current_sales_stage",
  "customer_communication_style",
  "resistance_level",
  "immediate_customer_request",
  "next_message_objective",
  "should_answer_before_asking",
  "necessary_question_reason",
  "recommended_option_number",
  "response_options",
  "seller_training_chinese",
  "wrong_approach_example",
  "why_wrong_approach_is_unsuitable_chinese",
  "missing_information",
  "next_step_branches_english",
  "next_step_branches_chinese",
  "manager_approval_required",
  "manager_approval_reason",
  "internal_risk_warnings"
] as const;

export type RequiredAiKey = (typeof REQUIRED_AI_KEYS)[number];

export const REQUIRED_RESPONSE_OPTION_KEYS = [
  "option_number",
  "option_label",
  "reply_customer_language",
  "reply_english",
  "reply_chinese",
  "tonality_english",
  "tonality_chinese",
  "best_use_case_english",
  "best_use_case_chinese",
  "why_it_works_english",
  "why_it_works_chinese",
  "risk_english",
  "risk_chinese",
  "likely_customer_reaction"
] as const;

export type RequiredResponseOptionKey = (typeof REQUIRED_RESPONSE_OPTION_KEYS)[number];

export function validateZeroBillingConfig(env: Record<string, string | undefined>) {
  const errors: string[] = [];
  for (const [key, value] of Object.entries(ZERO_BILLING_DEFAULTS)) {
    if ((env[key] ?? value) !== value) errors.push(`${key} must be ${value}`);
  }
  if ((env.AI_PROVIDER ?? "cloudflare") !== "cloudflare") errors.push("Only Cloudflare Workers AI is allowed.");
  if ((env.ALLOW_PAID_AI_FALLBACK ?? "false") !== "false") errors.push("Paid AI fallback is forbidden.");
  return { ok: errors.length === 0, errors };
}

export function emptyAiResult(reasonEnglish: string, reasonChinese: string) {
  const option = {
    option_number: 1,
    option_label: "Safe diagnostic reply",
    reply_customer_language: reasonEnglish,
    reply_english: reasonEnglish,
    reply_chinese: reasonChinese,
    tonality_english: "Calm, neutral and diagnostic.",
    tonality_chinese: "冷静、中立、诊断式。",
    best_use_case_english: "Use when AI coaching cannot be generated safely.",
    best_use_case_chinese: "当无法安全生成 AI 销售建议时使用。",
    why_it_works_english: "It avoids inventing facts and keeps the conversation open.",
    why_it_works_chinese: "它避免编造信息，同时保持对话继续。",
    risk_english: "It may be generic until more approved context is available.",
    risk_chinese: "在获得更多已批准信息前，内容可能比较通用。",
    likely_customer_reaction: "The customer may provide more context or wait for confirmation."
  };
  return {
    detected_customer_language: "English",
    language_detection_confidence: "low",
    original_customer_message: "",
    customer_message_english: "",
    customer_message_chinese: "",
    explicit_customer_facts: [],
    probable_customer_intent: [],
    interpretation_confidence: "low",
    evidence_from_conversation: [],
    current_sales_stage: "Connection",
    customer_communication_style: "Unknown",
    resistance_level: "Unknown",
    immediate_customer_request: "",
    next_message_objective: reasonEnglish,
    should_answer_before_asking: true,
    necessary_question_reason: "Ask only one practical question if needed.",
    recommended_option_number: 1,
    response_options: [option],
    seller_training_chinese: [
      "客户现在真正关心的是获得安全、准确、已确认的信息。",
      "现在推荐保持简短，不要编造技术或商务承诺。",
      "不要立即报价、降价或发送完整目录，除非客户的问题和已批准信息都明确。"
    ],
    wrong_approach_example: "Sending unverified specifications or making a promise without approval.",
    why_wrong_approach_is_unsuitable_chinese: "这种回复会增加售后风险，也可能让客户基于未确认的信息做决定。",
    missing_information: [],
    next_step_branches_english: [],
    next_step_branches_chinese: [],
    manager_approval_required: false,
    manager_approval_reason: "",
    internal_risk_warnings: []
  };
}

export function validateAiResult(value: unknown) {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (!REQUIRED_AI_KEYS.every((key) => key in record)) return false;
  if (typeof record.manager_approval_required !== "boolean") return false;
  const responseOptions = record.response_options;
  if (!Array.isArray(responseOptions)) return false;
  if (responseOptions.length < 1 || responseOptions.length > 3) return false;
  const recommended = Number(record.recommended_option_number);
  if (!Number.isFinite(recommended)) return false;
  return responseOptions.every((option: unknown) => {
    if (!option || typeof option !== "object") return false;
    const optionRecord = option as Record<string, unknown>;
    if (!REQUIRED_RESPONSE_OPTION_KEYS.every((key) => key in optionRecord)) return false;
    return responseOptions.some((candidate: unknown) => {
      if (!candidate || typeof candidate !== "object") return false;
      return (candidate as Record<string, unknown>).option_number === recommended;
    });
  });
}
