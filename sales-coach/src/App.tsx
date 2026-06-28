import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AlertTriangle, Bot, Check, Clipboard, FileText, Globe2, Languages, Lock, Plus, Send, ShieldCheck, Upload, UserCog } from "lucide-react";
import { api, postJson } from "./api";
import { t, type Locale } from "./shared/i18n";
import type { CoachResult, Lead, LeadAttachment, Message, ProductCategory, ProductModel, ProductSpecification, ResponseOption, User } from "./types";

type MeResponse = { ok: true; user: User | null };
type LeadsResponse = { ok: true; leads: Lead[] };
type MessagesResponse = { ok: true; messages: Message[] };
type CoachResponse = { ok: true; result: CoachResult; runId?: string; suggestionId?: string; quota?: any };
type UsageResponse = { ok: true; own: number; ownLimit: number; global: number; globalLimit: number; day: string; lock?: any };
type AttachmentsResponse = { ok: true; attachments: LeadAttachment[]; notice: { english: string; chinese: string } };
type AdminUser = User & { active: number; created_at: string; last_login_at?: string };
type KnowledgeItem = { id: string; category: string; title: string; content: string; model?: string; status: string };
type ProductCategoriesResponse = { ok: true; categories: ProductCategory[] };
type ProductModelsResponse = { ok: true; models: ProductModel[] };
type ProductSpecsResponse = { ok: true; specifications: ProductSpecification[] };

const productChoices = [
  "Existing approved product",
  "New or unlisted product",
  "Unknown product",
  "Attachment or spare part",
  "Other machinery"
];

const approvalStatuses = [
  "APPROVED_CATALOGUE_FACT",
  "REQUIRES_OWNER_APPROVAL",
  "CONFLICT_REQUIRES_REVIEW",
  "NOT_AVAILABLE",
  "UNVERIFIED_SELLER_INPUT",
  "APPROVED_ADMIN_FACT",
  "REJECTED"
];

const attachmentPurposes = [
  "Customer conversation screenshot",
  "Technical specification sheet",
  "Product photograph",
  "Factory document",
  "Certificate or conformity document",
  "Quotation",
  "Other internal reference"
];

function copyText(value: string) {
  if (!value) return;
  if (navigator.clipboard) void navigator.clipboard.writeText(value);
}

function useAsync<T>(factory: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    factory()
      .then((value) => !cancelled && setData(value))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, deps);
  return { data, error, loading, setData };
}

function Login({ onLogin, locale }: { onLogin: (user: User) => void; locale: Locale }) {
  const copy = t[locale];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const result = await postJson<{ ok: true; user: User }>("/auth/login", { email, password });
      onLogin(result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <main className="technical-bg flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="panel w-full max-w-md p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tonlita-red text-2xl font-black text-white">T</div>
          <div>
            <p className="label">Private internal tool</p>
            <h1 className="font-display text-4xl font-black">TONLITA Sales Coach</h1>
          </div>
        </div>
        <label className="label">{copy.email}</label>
        <input className="field mb-4 mt-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label className="label">{copy.password}</label>
        <input className="field mb-6 mt-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <button className="button-primary w-full" type="submit">
          {copy.login}
        </button>
      </form>
    </main>
  );
}

function QuotaBar({ refreshKey }: { refreshKey: number }) {
  const usage = useAsync<UsageResponse>(() => api("/usage"), [refreshKey]);
  const data = usage.data;
  if (!data) return <div className="stat-card animate-pulse">Loading quota...</div>;
  const percent = Math.min(100, Math.round((data.own / data.ownLimit) * 100));
  return (
    <section className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="label">AI quota / 今日额度</p>
        <p className="text-sm font-black">
          {data.own}/{data.ownLimit} seller · {data.global}/{data.globalLimit} team
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-tonlita-red" style={{ width: `${percent}%` }} />
      </div>
      {data.lock && (
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">
          {data.lock.reason_english}
          <br />
          {data.lock.reason_chinese}
        </p>
      )}
      <p className="mt-2 text-xs text-slate-500">Reset day: {data.day} Asia/Shanghai</p>
    </section>
  );
}

function NewLeadForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const categories = useAsync<ProductCategoriesResponse>(() => (open ? api("/products/categories") : Promise.resolve({ ok: true, categories: [] })), [open]);
  const models = useAsync<ProductModelsResponse>(() => (open ? api("/products/models") : Promise.resolve({ ok: true, models: [] })), [open]);
  const [form, setForm] = useState({
    customer_name: "",
    company: "",
    country: "",
    customer_language: "English",
    communication_channel: "WhatsApp",
    customer_type: "Unknown",
    product_category: "Spider crane",
    model: "",
    product_choice_type: "Existing approved product",
    product_model_id: "",
    free_text_category: "",
    free_text_model: ""
  });

  async function createLead(event: FormEvent) {
    event.preventDefault();
    const selectedModel = models.data?.models.find((item) => item.id === form.product_model_id);
    await postJson("/leads", {
      ...form,
      product_category: selectedModel?.category_name || form.free_text_category || form.product_category,
      model: selectedModel?.model_name || form.free_text_model || form.model
    });
    setOpen(false);
    setForm({ ...form, customer_name: "", company: "", model: "", free_text_model: "", free_text_category: "" });
    onCreated();
  }

  const existingProduct = form.product_choice_type === "Existing approved product";

  if (!open) {
    return (
      <button className="button-primary flex w-full items-center justify-center gap-2" onClick={() => setOpen(true)}>
        <Plus size={18} /> New lead
      </button>
    );
  }

  return (
    <form onSubmit={createLead} className="panel space-y-3 p-4">
      <input className="field" placeholder="Customer name or identifier" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} required />
      <input className="field" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <input className="field" placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <select className="field" value={form.communication_channel} onChange={(e) => setForm({ ...form, communication_channel: e.target.value })}>
          {["WhatsApp", "Email", "Alibaba", "Made-in-China", "Facebook", "Gumtree", "LinkedIn", "WeChat", "Website inquiry", "Telephone", "Other"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="field" value={form.customer_type} onChange={(e) => setForm({ ...form, customer_type: e.target.value })}>
          {["Dealer", "Rental company", "Construction company", "Importer", "Agricultural contractor", "End user", "Unknown"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <select className="field" value={form.product_choice_type} onChange={(e) => setForm({ ...form, product_choice_type: e.target.value, product_model_id: "" })}>
        {productChoices.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      {existingProduct ? (
        <select className="field" value={form.product_model_id} onChange={(e) => setForm({ ...form, product_model_id: e.target.value })}>
          <option value="">Select approved model, or leave unknown</option>
          {models.data?.models.map((item) => (
            <option key={item.id} value={item.id}>
              {item.model_name} · {item.category_name || "No category"}
            </option>
          ))}
        </select>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input className="field" placeholder="Free-text category" value={form.free_text_category} onChange={(e) => setForm({ ...form, free_text_category: e.target.value })} />
          <input className="field" placeholder="Free-text model, if known" value={form.free_text_model} onChange={(e) => setForm({ ...form, free_text_model: e.target.value })} />
        </div>
      )}
      {!existingProduct && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
          This product is not yet available in the approved Tonlita knowledge base. You can still qualify the customer, but technical and commercial facts must be confirmed internally before replying.
          <br />
          该产品目前尚未录入 Tonlita 已批准的知识库。您可以继续了解客户需求，但技术或商务信息必须先进行内部确认。
        </p>
      )}
      {existingProduct && !models.loading && !models.data?.models.length && (
        <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">No approved models loaded yet. You can use an unlisted or unknown product instead.</p>
      )}
      {!existingProduct && categories.data?.categories.length ? (
        <select className="field" value={form.product_category} onChange={(e) => setForm({ ...form, product_category: e.target.value })}>
          <option value="">Optional approved category fallback</option>
          {categories.data.categories.map((item) => (
            <option key={item.id} value={item.display_name}>{item.display_name}</option>
          ))}
        </select>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        <button className="button-dark" type="submit">Create</button>
        <button className="button-ghost" type="button" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </form>
  );
}

function LeadsPanel({ selectedId, onSelect, refreshKey, onRefresh }: { selectedId?: string; onSelect: (lead: Lead) => void; refreshKey: number; onRefresh: () => void }) {
  const [search, setSearch] = useState("");
  const { data, loading } = useAsync<LeadsResponse>(() => api("/leads"), [refreshKey]);
  const leads = useMemo(() => {
    const q = search.toLowerCase();
    return (data?.leads ?? []).filter((lead) => [lead.customer_name, lead.company, lead.country, lead.model, lead.free_text_model, lead.free_text_category].join(" ").toLowerCase().includes(q));
  }, [data, search]);

  return (
    <aside className="space-y-4">
      <NewLeadForm onCreated={onRefresh} />
      <input className="field" placeholder="Search leads" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="panel overflow-hidden">
        <div className="border-b border-slate-200 p-4">
          <p className="label">Leads</p>
          <h2 className="text-2xl font-black">{loading ? "Loading..." : `${leads.length} conversations`}</h2>
        </div>
        <div className="max-h-[68vh] overflow-auto">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => onSelect(lead)}
              className={`block w-full border-b border-slate-100 p-4 text-left transition hover:bg-red-50 ${selectedId === lead.id ? "bg-red-50" : "bg-white"}`}
            >
              <p className="font-black">{lead.customer_name}</p>
              <p className="text-sm text-slate-500">{lead.company || lead.country || "No company"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold">{lead.status}</span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700">{lead.sales_stage}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function MessageComposer({ leadId, onSaved }: { leadId: string; onSaved: () => void }) {
  const [entryType, setEntryType] = useState("Customer message");
  const [body, setBody] = useState("");
  async function save() {
    if (!body.trim()) return;
    await postJson(`/leads/${leadId}/messages`, { entry_type: entryType, body });
    setBody("");
    onSaved();
  }
  return (
    <div className="panel p-4">
      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[220px_1fr]">
        <select className="field" value={entryType} onChange={(e) => setEntryType(e.target.value)}>
          <option>Customer message</option>
          <option>Seller message</option>
          <option>Internal note</option>
        </select>
        <button className="button-dark flex items-center justify-center gap-2" onClick={save}>
          <Send size={18} /> Save message
        </button>
      </div>
      <textarea className="field min-h-28" placeholder="Paste the latest customer message, seller reply or internal note..." value={body} onChange={(e) => setBody(e.target.value)} />
    </div>
  );
}

function Conversation({ lead, refreshKey, onRefresh }: { lead: Lead | null; refreshKey: number; onRefresh: () => void }) {
  const messages = useAsync<MessagesResponse>(() => (lead ? api(`/leads/${lead.id}/messages`) : Promise.resolve({ ok: true, messages: [] })), [lead?.id, refreshKey]);
  if (!lead) return <section className="panel flex min-h-[60vh] items-center justify-center p-8 text-center text-slate-500">Select or create a lead to start coaching.</section>;
  const displayedCategory = lead.free_text_category || lead.product_category || "Unknown product category";
  const displayedModel = lead.free_text_model || lead.model || "Unknown";
  const isUnlisted = lead.product_choice_type && lead.product_choice_type !== "Existing approved product";
  return (
    <section className="space-y-4">
      <div className="panel p-5">
        <p className="label">{displayedCategory}</p>
        <h1 className="font-display text-4xl font-black">{lead.customer_name}</h1>
        <p className="mt-2 text-slate-600">
          {lead.company || "No company"} · {lead.country || "No country"} · {lead.communication_channel}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="stat-card"><p className="label">Model</p><p className="font-black">{displayedModel}</p></div>
          <div className="stat-card"><p className="label">Type</p><p className="font-black">{lead.customer_type}</p></div>
          <div className="stat-card"><p className="label">Stage</p><p className="font-black">{lead.sales_stage}</p></div>
          <div className="stat-card"><p className="label">Language</p><p className="font-black">{lead.language_override || lead.detected_customer_language || lead.customer_language}</p></div>
        </div>
        {isUnlisted && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
            This is an unlisted or unknown product. Continue qualifying the customer, but confirm technical and commercial facts before communicating them.
            <br />
            这是未录入或未知产品。可以继续了解客户需求，但回复技术或商务信息前必须先确认。
          </p>
        )}
      </div>
      <ProductReviewTools lead={lead} />
      <AttachmentPanel lead={lead} onRefresh={onRefresh} />
      <div className="panel max-h-[50vh] overflow-auto p-4">
        {messages.data?.messages.map((message) => {
          const isAi = message.entry_type === "AI suggestion";
          const color = message.entry_type === "Customer message" ? "border-blue-100 bg-blue-50" : message.entry_type === "Seller message" ? "border-green-100 bg-green-50" : isAi ? "border-red-100 bg-red-50" : "border-slate-200 bg-slate-50";
          return (
            <article key={message.id} className={`message-card mb-3 ${color}`}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="label">{message.entry_type}</p>
                <time className="text-xs text-slate-500">{new Date(message.created_at).toLocaleString()}</time>
              </div>
              <pre className="whitespace-pre-wrap font-sans">{isAi ? "AI suggestion saved. See coaching panel for latest generated result." : message.body}</pre>
              {!isAi && (message.english_translation || message.chinese_translation || message.interpretation_chinese) && (
                <div className="mt-3 grid gap-2 text-sm">
                  {message.english_translation && <InfoBlock title="English translation" value={message.english_translation} />}
                  {message.chinese_translation && <InfoBlock title="中文翻译" value={message.chinese_translation} />}
                  {message.interpretation_chinese && <InfoBlock title="销售理解" value={message.interpretation_chinese} />}
                </div>
              )}
            </article>
          );
        })}
      </div>
      <MessageComposer leadId={lead.id} onSaved={onRefresh} />
    </section>
  );
}

function ProductReviewTools({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");
  const [temporary, setTemporary] = useState({ source_type: "factory", field_name: "", value: "", unit: "", notes: "" });

  async function saveTemporary(event: FormEvent) {
    event.preventDefault();
    setSaved("");
    setError("");
    try {
      await postJson(`/leads/${lead.id}/temporary-product-input`, temporary);
      setTemporary({ source_type: "factory", field_name: "", value: "", unit: "", notes: "" });
      setSaved("Saved as UNVERIFIED_SELLER_INPUT. 已保存为未验证销售输入。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save temporary product information");
    }
  }

  async function requestApproval() {
    setSaved("");
    setError("");
    try {
      await postJson(`/leads/${lead.id}/request-product-approval`, {
        reason: `Please review product information for ${lead.free_text_model || lead.model || "unknown model"}.`,
        proposed_reply: "I need to confirm the exact technical and commercial details internally before replying with verified information."
      });
      setSaved("Product approval requested. 已申请产品审核。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to request approval");
    }
  }

  return (
    <section className="panel p-4">
      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(!open)}>
        <span>
          <p className="label">Temporary product information</p>
          <h3 className="font-black">Request product approval / 申请产品审核</h3>
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black">{open ? "Close" : "Open"}</span>
      </button>
      {open && (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
          <form onSubmit={saveTemporary} className="grid gap-3">
            <select className="field" value={temporary.source_type} onChange={(e) => setTemporary({ ...temporary, source_type: e.target.value })}>
              {["factory", "supplier", "technical sheet", "quotation", "customer", "telephone call"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <div className="grid gap-3 sm:grid-cols-3">
              <input className="field" placeholder="Field name" value={temporary.field_name} onChange={(e) => setTemporary({ ...temporary, field_name: e.target.value })} required />
              <input className="field" placeholder="Value" value={temporary.value} onChange={(e) => setTemporary({ ...temporary, value: e.target.value })} required />
              <input className="field" placeholder="Unit" value={temporary.unit} onChange={(e) => setTemporary({ ...temporary, unit: e.target.value })} />
            </div>
            <textarea className="field min-h-20" placeholder="Internal notes, source details or conflict" value={temporary.notes} onChange={(e) => setTemporary({ ...temporary, notes: e.target.value })} />
            <button className="button-ghost" type="submit">Save temporary information</button>
          </form>
          <button className="button-primary self-start" onClick={requestApproval}>Request approval</button>
          {saved && <p className="rounded-xl bg-green-50 p-3 text-sm font-bold text-green-700 lg:col-span-2">{saved}</p>}
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 lg:col-span-2">{error}</p>}
        </div>
      )}
    </section>
  );
}

function AttachmentPanel({ lead, onRefresh }: { lead: Lead; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<LeadAttachment[]>([]);
  const [notice, setNotice] = useState<{ english: string; chinese: string } | null>(null);
  const [purpose, setPurpose] = useState(attachmentPurposes[0]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [fact, setFact] = useState({ field_name: "", value: "", unit: "", model: "", category: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const temporaryAttachmentNotice = notice ?? {
    english: "Original attachment is processed temporarily and is not permanently stored. The extracted text and confirmed information remain available.",
    chinese: "原始附件仅用于临时处理，不会被永久保存。提取的文本和已确认的信息将继续保留。"
  };

  async function loadAttachments() {
    const response = await api<AttachmentsResponse>(`/leads/${lead.id}/attachments`);
    setAttachments(response.attachments);
    setNotice(response.notice);
    setSelectedId((current) => current || response.attachments[0]?.id || "");
  }

  useEffect(() => {
    if (open) void loadAttachments();
  }, [open, lead.id]);

  async function uploadFiles(event: FormEvent) {
    event.preventDefault();
    if (!files?.length) return;
    setStatus("");
    setError("");
    const formData = new FormData();
    formData.append("purpose", purpose);
    Array.from(files).forEach((file) => formData.append("files", file));
    try {
      const response = await api<AttachmentsResponse>(`/leads/${lead.id}/attachments`, { method: "POST", body: formData });
      setAttachments(response.attachments);
      setNotice(response.notice);
      setSelectedId(response.attachments[0]?.id || "");
      setFiles(null);
      setStatus("Attachment processed temporarily. Raw file is not permanently stored. 附件已临时处理，原始文件不会永久保存。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Attachment upload failed");
    }
  }

  async function saveExtractedMessage(event: FormEvent) {
    event.preventDefault();
    if (!selectedId || !messageText.trim()) return;
    setStatus("");
    setError("");
    try {
      await postJson(`/attachments/${selectedId}/extracted-messages`, {
        messages: [
          {
            probable_speaker: "Customer message",
            message_order: 1,
            original_text: messageText,
            detected_language: lead.language_override || lead.detected_customer_language || lead.customer_language || "unknown",
            confidence: "manual confirmation required"
          }
        ]
      });
      setStatus("Extracted message saved for confirmation. 请确认后才会进入正式对话记忆。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save extracted message");
    }
  }

  async function confirmExtractedMessages() {
    if (!selectedId) return;
    setStatus("");
    setError("");
    try {
      await postJson(`/attachments/${selectedId}/confirm-messages`, {});
      setMessageText("");
      setStatus("Confirmed extracted messages are now part of the conversation memory. 已确认消息已进入对话记忆。");
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to confirm extracted messages");
    }
  }

  async function saveExtractedFact(event: FormEvent) {
    event.preventDefault();
    if (!selectedId || !fact.field_name || !fact.value) return;
    setStatus("");
    setError("");
    try {
      await postJson(`/attachments/${selectedId}/extracted-facts`, {
        facts: [
          {
            ...fact,
            original_wording: `${fact.field_name}: ${fact.value} ${fact.unit}`.trim(),
            extraction_confidence: "manual seller entry"
          }
        ]
      });
      setFact({ field_name: "", value: "", unit: "", model: "", category: "" });
      setStatus("Technical fact saved as UNVERIFIED_SELLER_INPUT. 技术信息已保存为未验证销售输入。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save extracted fact");
    }
  }

  return (
    <section className="panel p-4">
      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(!open)}>
        <span>
          <p className="label">Attachments and extraction</p>
          <h3 className="font-black">Screenshots, product sheets and temporary references</h3>
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black">{open ? "Close" : "Open"}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-4">
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
            {temporaryAttachmentNotice.english}
            <br />
            {temporaryAttachmentNotice.chinese}
          </p>
          <form onSubmit={uploadFiles} className="grid gap-3 lg:grid-cols-[220px_1fr_auto]">
            <select className="field" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              {attachmentPurposes.map((item) => <option key={item}>{item}</option>)}
            </select>
            <input className="field" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" onChange={(e) => setFiles(e.target.files)} />
            <button className="button-primary flex items-center justify-center gap-2" type="submit"><Upload size={16} /> Upload</button>
          </form>
          {attachments.length > 0 && (
            <select className="field" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {attachments.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.filename} · {item.purpose} · {Math.round(item.size_bytes / 1024)} KB
                </option>
              ))}
            </select>
          )}
          {selectedId && (
            <div className="grid gap-4 xl:grid-cols-2">
              <form onSubmit={saveExtractedMessage} className="rounded-2xl border border-slate-200 p-4">
                <h4 className="mb-3 flex items-center gap-2 font-black"><Languages size={18} /> Conversation screenshot text</h4>
                <textarea className="field min-h-32" placeholder="Paste or correct extracted customer message text before confirmation..." value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <button className="button-ghost" type="submit">Save for confirmation</button>
                  <button className="button-primary" type="button" onClick={confirmExtractedMessages}>Confirm staged messages</button>
                </div>
              </form>
              <form onSubmit={saveExtractedFact} className="rounded-2xl border border-slate-200 p-4">
                <h4 className="mb-3 flex items-center gap-2 font-black"><FileText size={18} /> Technical file fact</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input className="field" placeholder="Category" value={fact.category} onChange={(e) => setFact({ ...fact, category: e.target.value })} />
                  <input className="field" placeholder="Model" value={fact.model} onChange={(e) => setFact({ ...fact, model: e.target.value })} />
                  <input className="field" placeholder="Field name" value={fact.field_name} onChange={(e) => setFact({ ...fact, field_name: e.target.value })} required />
                  <input className="field" placeholder="Unit" value={fact.unit} onChange={(e) => setFact({ ...fact, unit: e.target.value })} />
                </div>
                <input className="field mt-2" placeholder="Original value" value={fact.value} onChange={(e) => setFact({ ...fact, value: e.target.value })} required />
                <button className="button-ghost mt-3 w-full" type="submit">Save unverified fact</button>
              </form>
            </div>
          )}
          {status && <p className="rounded-xl bg-green-50 p-3 text-sm font-bold text-green-700">{status}</p>}
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        </div>
      )}
    </section>
  );
}

function CoachPanel({ lead, onQuotaChange }: { lead: Lead | null; onQuotaChange: () => void }) {
  const [result, setResult] = useState<CoachResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [edited, setEdited] = useState("");
  const [lastSuggestionId, setLastSuggestionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<ResponseOption | null>(null);
  const [languageOverride, setLanguageOverride] = useState("");

  useEffect(() => {
    setResult(null);
    setEdited("");
    setLastSuggestionId(null);
    setSelectedOption(null);
    setLanguageOverride(lead?.language_override || "");
  }, [lead?.id, lead?.language_override]);

  async function coach(action: string) {
    if (!lead) return;
    setLoading(true);
    setError("");
    try {
      const response = await postJson<CoachResponse>(`/leads/${lead.id}/coach`, { action, language_override: languageOverride });
      const recommended =
        response.result.response_options.find((option) => option.option_number === response.result.recommended_option_number) ??
        response.result.response_options[0] ??
        null;
      setResult(response.result);
      setSelectedOption(recommended);
      setEdited(recommended?.reply_customer_language ?? "");
      setLastSuggestionId(response.suggestionId ?? null);
      onQuotaChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI failed");
    } finally {
      setLoading(false);
    }
  }

  function selectOption(option: ResponseOption) {
    setSelectedOption(option);
    setEdited(option.reply_customer_language);
  }

  async function markAsSent() {
    if (!lastSuggestionId || !edited.trim()) return;
    await postJson(`/messages/${lastSuggestionId}/mark-sent`, {
      final_body: edited,
      selected_option_number: selectedOption?.option_number,
      selected_option_json: selectedOption
    });
    setLastSuggestionId(null);
  }

  return (
    <aside className="space-y-4">
      <div className="panel p-5">
        <div className="mb-4 flex items-center gap-3">
          <Bot className="text-tonlita-red" />
          <div>
            <p className="label">Sales coaching</p>
            <h2 className="text-2xl font-black">Next best reply</h2>
          </div>
        </div>
        {error && <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        <label className="label">Manual language override</label>
        <input
          className="field mb-3 mt-2"
          placeholder="Optional: German, Spanish, Italian, French..."
          value={languageOverride}
          onChange={(e) => setLanguageOverride(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-2">
          <button disabled={!lead || loading} className="button-primary" onClick={() => coach("generate coaching")}>Generate coaching</button>
          <div className="grid grid-cols-2 gap-2">
            <button disabled={!lead || loading} className="button-ghost" onClick={() => coach("make softer")}>Softer</button>
            <button disabled={!lead || loading} className="button-ghost" onClick={() => coach("make more direct")}>More direct</button>
            <button disabled={!lead || loading} className="button-ghost" onClick={() => coach("make shorter")}>Shorter</button>
            <button disabled={!lead || loading} className="button-ghost" onClick={() => coach("ask a different diagnostic question")}>Different question</button>
          </div>
          <button disabled={!lead || loading} className="button-ghost" onClick={() => coach("regenerate all options")}>Regenerate all options</button>
          <button disabled={!lead || loading} className="button-dark" onClick={() => coach("factory-tour assessment")}>Factory-tour assessment</button>
        </div>
      </div>

      {result && (
        <div className="panel space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="stat-card"><p className="label">Stage</p><p className="font-black">{result.current_sales_stage}</p></div>
            <div className="stat-card"><p className="label">Resistance</p><p className="font-black">{result.resistance_level}</p></div>
            <div className="stat-card"><p className="label">Language</p><p className="font-black">{result.detected_customer_language}</p></div>
            <div className="stat-card"><p className="label">Confidence</p><p className="font-black">{result.language_detection_confidence}</p></div>
          </div>
          {result.language_detection_confidence.toLowerCase().includes("low") && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
              Low confidence language detection: customer-facing draft defaults safely to English unless the seller overrides the language.
              <br />
              语言识别置信度较低：除非销售手动选择语言，否则客户回复默认使用英文。
            </p>
          )}
          {result.manager_approval_required && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
              <div className="mb-2 flex items-center gap-2 font-black"><AlertTriangle size={18} /> Manager approval required</div>
              <p>{result.manager_approval_reason}</p>
            </div>
          )}
          <InfoBlock title="Original customer message" value={result.original_customer_message} />
          <InfoBlock title="English translation" value={result.customer_message_english} />
          <InfoBlock title="中文翻译" value={result.customer_message_chinese} />
          <InfoBlock title="Immediate request" value={result.immediate_customer_request} />
          <InfoBlock title="Objective" value={result.next_message_objective} />
          <InfoBlock title="Necessary question reason" value={result.necessary_question_reason} />
          <ListBlock title="Explicit customer facts" items={result.explicit_customer_facts} />
          <ListBlock title="Probable customer intent" items={result.probable_customer_intent} />

          <section className="space-y-3">
            <p className="label">Response options</p>
            {result.response_options.map((option) => {
              const recommended = option.option_number === result.recommended_option_number;
              const selected = selectedOption?.option_number === option.option_number;
              return (
                <article key={option.option_number} className={`rounded-2xl border p-4 ${selected ? "border-tonlita-red bg-red-50" : "border-slate-200 bg-white"}`}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="label">Option {option.option_number}</p>
                      <h4 className="font-black">{option.option_label}</h4>
                    </div>
                    {recommended && <span className="rounded-full bg-tonlita-red px-3 py-1 text-xs font-black text-white">RECOMMENDED OPTION</span>}
                  </div>
                  <p className="whitespace-pre-wrap text-sm font-bold leading-relaxed text-slate-900">{option.reply_customer_language}</p>
                  <div className="mt-3 grid gap-2">
                    <InfoBlock title="English" value={option.reply_english} />
                    <InfoBlock title="中文" value={option.reply_chinese} />
                    <InfoBlock title="Tonality" value={`${option.tonality_english}\n\n${option.tonality_chinese}`} />
                    <InfoBlock title="When to use" value={`${option.best_use_case_english}\n\n${option.best_use_case_chinese}`} />
                    <InfoBlock title="Why it works" value={`${option.why_it_works_english}\n\n${option.why_it_works_chinese}`} />
                    <InfoBlock title="Risk and likely reaction" value={`${option.risk_english}\n\n${option.risk_chinese}\n\nLikely reaction: ${option.likely_customer_reaction}`} />
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    <button className="button-primary" onClick={() => selectOption(option)}>Select option</button>
                    <button className="button-ghost" onClick={() => copyText(option.reply_customer_language)}>Copy customer-language reply</button>
                    <button className="button-ghost" onClick={() => copyText(option.reply_chinese)}>Copy Chinese</button>
                  </div>
                </article>
              );
            })}
          </section>

          <section>
            <p className="label">Reply in customer language</p>
            <textarea className="field mt-2 min-h-40" value={edited} onChange={(e) => setEdited(e.target.value)} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="button-ghost flex items-center justify-center gap-2" onClick={() => copyText(edited)}><Clipboard size={16} /> Copy edited</button>
              <button className="button-primary flex items-center justify-center gap-2" onClick={markAsSent}><Check size={16} /> Mark as sent</button>
            </div>
          </section>
          <ListBlock title="Seller training / 销售训练" items={result.seller_training_chinese} />
          <InfoBlock title="Wrong approach example" value={result.wrong_approach_example} />
          <InfoBlock title="Why not to use the wrong approach / 为什么不建议错误的回复方式" value={result.why_wrong_approach_is_unsuitable_chinese} />
          <ListBlock title="Missing information" items={result.missing_information} />
          <ListBlock title="Next-step branches" items={[...result.next_step_branches_english, ...result.next_step_branches_chinese]} />
          <ListBlock title="Risk warnings" items={result.internal_risk_warnings} />
        </div>
      )}
    </aside>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="label">{title}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{value || "None"}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="label">{title}</p>
      <ul className="mt-2 space-y-2 text-sm text-slate-700">
        {(items?.length ? items : ["None"]).map((item, index) => <li key={index}>• {item}</li>)}
      </ul>
    </section>
  );
}

function AdminStrip({ user }: { user: User }) {
  if (user.role !== "admin") return null;
  return (
    <section className="panel grid gap-3 p-4 md:grid-cols-3">
      <div className="flex items-center gap-3"><UserCog className="text-tonlita-red" /><div><p className="label">Admin</p><p className="font-black">User and knowledge tools enabled</p></div></div>
      <div className="flex items-center gap-3"><ShieldCheck className="text-tonlita-red" /><div><p className="label">Seller limit</p><p className="font-black">Max 5 active sellers</p></div></div>
      <div className="flex items-center gap-3"><Lock className="text-tonlita-red" /><div><p className="label">Zero billing</p><p className="font-black">Cloudflare AI only</p></div></div>
    </section>
  );
}

function ProductAdminPanel({ open, refresh, onRefresh }: { open: boolean; refresh: number; onRefresh: () => void }) {
  const categories = useAsync<ProductCategoriesResponse>(() => (open ? api("/products/categories") : Promise.resolve({ ok: true, categories: [] })), [open, refresh]);
  const models = useAsync<ProductModelsResponse>(() => (open ? api("/products/models") : Promise.resolve({ ok: true, models: [] })), [open, refresh]);
  const specs = useAsync<ProductSpecsResponse>(() => (open ? api("/products/specifications") : Promise.resolve({ ok: true, specifications: [] })), [open, refresh]);
  const [categoryForm, setCategoryForm] = useState({ name: "", display_name: "", description: "" });
  const [modelForm, setModelForm] = useState({ category_id: "", model_name: "", display_name: "", description: "", approval_status: "REQUIRES_OWNER_APPROVAL" });
  const [specForm, setSpecForm] = useState({
    category_id: "",
    model_id: "",
    field_name: "",
    custom_field_key: "",
    value: "",
    unit: "",
    approval_status: "REQUIRES_OWNER_APPROVAL",
    internal_notes: ""
  });
  const [message, setMessage] = useState("");

  async function createCategory(event: FormEvent) {
    event.preventDefault();
    await postJson("/products/categories", {
      ...categoryForm,
      name: categoryForm.name || categoryForm.display_name,
      display_name: categoryForm.display_name || categoryForm.name,
      approval_status: "APPROVED_ADMIN_FACT"
    });
    setCategoryForm({ name: "", display_name: "", description: "" });
    setMessage("Product category created. 新产品类别已创建。");
    onRefresh();
  }

  async function createModel(event: FormEvent) {
    event.preventDefault();
    await postJson("/products/models", {
      ...modelForm,
      display_name: modelForm.display_name || modelForm.model_name
    });
    setModelForm({ category_id: "", model_name: "", display_name: "", description: "", approval_status: "REQUIRES_OWNER_APPROVAL" });
    setMessage("Product model created. 新产品型号已创建。");
    onRefresh();
  }

  async function createSpec(event: FormEvent) {
    event.preventDefault();
    await postJson("/products/specifications", specForm);
    setSpecForm({ category_id: "", model_id: "", field_name: "", custom_field_key: "", value: "", unit: "", approval_status: "REQUIRES_OWNER_APPROVAL", internal_notes: "" });
    setMessage("Custom specification saved. 自定义规格已保存。");
    onRefresh();
  }

  async function approveSpec(item: ProductSpecification) {
    await api(`/products/specifications/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ approval_status: "APPROVED_ADMIN_FACT" })
    });
    onRefresh();
  }

  async function rejectSpec(item: ProductSpecification) {
    await api(`/products/specifications/${item.id}`, { method: "DELETE" });
    onRefresh();
  }

  return (
    <div className="xl:col-span-2">
      <h3 className="mb-3 font-black">Dynamic product management</h3>
      <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-800">
        The catalogue is only the INITIAL_CATALOGUE_DATASET. Add new categories, unlisted models and custom fields here without changing source code.
        <br />
        目录只是初始数据集。管理员可在此添加新类别、新型号和自定义字段，无需开发人员修改代码。
      </p>
      {message && <p className="mb-4 rounded-xl bg-green-50 p-3 text-sm font-bold text-green-700">{message}</p>}
      <div className="grid gap-5 xl:grid-cols-3">
        <form onSubmit={createCategory} className="rounded-2xl border border-slate-200 p-4">
          <h4 className="mb-3 font-black">Create category</h4>
          <input className="field mb-2" placeholder="Internal name" value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} required />
          <input className="field mb-2" placeholder="Display name" value={categoryForm.display_name} onChange={(e) => setCategoryForm({ ...categoryForm, display_name: e.target.value })} />
          <textarea className="field mb-3 min-h-20" placeholder="Description" value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} />
          <button className="button-primary w-full">Create category</button>
        </form>

        <form onSubmit={createModel} className="rounded-2xl border border-slate-200 p-4">
          <h4 className="mb-3 font-black">Create model</h4>
          <select className="field mb-2" value={modelForm.category_id} onChange={(e) => setModelForm({ ...modelForm, category_id: e.target.value })}>
            <option value="">No category yet / unlisted</option>
            {categories.data?.categories.map((item) => <option key={item.id} value={item.id}>{item.display_name}</option>)}
          </select>
          <input className="field mb-2" placeholder="Model name" value={modelForm.model_name} onChange={(e) => setModelForm({ ...modelForm, model_name: e.target.value })} required />
          <input className="field mb-2" placeholder="Display name" value={modelForm.display_name} onChange={(e) => setModelForm({ ...modelForm, display_name: e.target.value })} />
          <select className="field mb-2" value={modelForm.approval_status} onChange={(e) => setModelForm({ ...modelForm, approval_status: e.target.value })}>
            {approvalStatuses.map((item) => <option key={item}>{item}</option>)}
          </select>
          <textarea className="field mb-3 min-h-20" placeholder="Description" value={modelForm.description} onChange={(e) => setModelForm({ ...modelForm, description: e.target.value })} />
          <button className="button-primary w-full">Create model</button>
        </form>

        <form onSubmit={createSpec} className="rounded-2xl border border-slate-200 p-4">
          <h4 className="mb-3 font-black">Create custom specification</h4>
          <select className="field mb-2" value={specForm.category_id} onChange={(e) => setSpecForm({ ...specForm, category_id: e.target.value })}>
            <option value="">No category-level fact</option>
            {categories.data?.categories.map((item) => <option key={item.id} value={item.id}>{item.display_name}</option>)}
          </select>
          <select className="field mb-2" value={specForm.model_id} onChange={(e) => setSpecForm({ ...specForm, model_id: e.target.value })}>
            <option value="">Category-level or unlisted fact</option>
            {models.data?.models.map((item) => <option key={item.id} value={item.id}>{item.model_name}</option>)}
          </select>
          <input className="field mb-2" placeholder="Field name" value={specForm.field_name} onChange={(e) => setSpecForm({ ...specForm, field_name: e.target.value })} required />
          <input className="field mb-2" placeholder="Custom key, optional" value={specForm.custom_field_key} onChange={(e) => setSpecForm({ ...specForm, custom_field_key: e.target.value })} />
          <div className="mb-2 grid grid-cols-[1fr_100px] gap-2">
            <input className="field" placeholder="Value" value={specForm.value} onChange={(e) => setSpecForm({ ...specForm, value: e.target.value })} required />
            <input className="field" placeholder="Unit" value={specForm.unit} onChange={(e) => setSpecForm({ ...specForm, unit: e.target.value })} />
          </div>
          <select className="field mb-2" value={specForm.approval_status} onChange={(e) => setSpecForm({ ...specForm, approval_status: e.target.value })}>
            {approvalStatuses.map((item) => <option key={item}>{item}</option>)}
          </select>
          <textarea className="field mb-3 min-h-20" placeholder="Internal notes" value={specForm.internal_notes} onChange={(e) => setSpecForm({ ...specForm, internal_notes: e.target.value })} />
          <button className="button-primary w-full">Save specification</button>
        </form>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 p-4">
          <h4 className="mb-3 font-black">Active models</h4>
          <div className="max-h-72 overflow-auto">
            {models.data?.models.map((item) => (
              <div key={item.id} className="mb-2 rounded-xl bg-slate-50 p-3">
                <p className="font-black">{item.model_name}</p>
                <p className="text-sm text-slate-500">{item.category_name || "No category"} · {item.approval_status}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 p-4">
          <h4 className="mb-3 font-black">Recent specifications</h4>
          <div className="max-h-72 overflow-auto">
            {specs.data?.specifications.slice(0, 20).map((item) => (
              <div key={item.id} className="mb-2 rounded-xl bg-slate-50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-black">{item.model_name || item.category_name || "General"} · {item.field_name}</p>
                    <p className="text-sm text-slate-500">{item.value} {item.unit || ""} · {item.approval_status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="button-ghost" onClick={() => approveSpec(item)}>Approve</button>
                    <button className="button-ghost" onClick={() => rejectSpec(item)}>Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminPanel({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [newUser, setNewUser] = useState({ email: "", display_name: "", role: "seller", password: "" });
  const [resetPasswords, setResetPasswords] = useState<Record<string, string>>({});
  const [adminError, setAdminError] = useState("");
  const users = useAsync<{ ok: true; users: AdminUser[] }>(() => (open ? api("/admin/users") : Promise.resolve({ ok: true, users: [] })), [open, refresh]);
  const knowledge = useAsync<{ ok: true; items: KnowledgeItem[] }>(() => (open ? api("/knowledge") : Promise.resolve({ ok: true, items: [] })), [open, refresh]);

  if (user.role !== "admin") return null;

  async function createUser(event: FormEvent) {
    event.preventDefault();
    setAdminError("");
    await postJson("/admin/users", newUser);
    setNewUser({ email: "", display_name: "", role: "seller", password: "" });
    setRefresh((v) => v + 1);
  }

  async function toggleUser(target: AdminUser) {
    setAdminError("");
    try {
      await api(`/admin/users/${target.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !target.active })
      });
      setRefresh((v) => v + 1);
    } catch (err) {
      setAdminError(err instanceof Error ? err.message : "Unable to update user");
    }
  }

  async function resetPassword(target: AdminUser) {
    setAdminError("");
    try {
      await postJson(`/admin/users/${target.id}/reset-password`, { password: resetPasswords[target.id] });
      setResetPasswords({ ...resetPasswords, [target.id]: "" });
      setRefresh((v) => v + 1);
    } catch (err) {
      setAdminError(err instanceof Error ? err.message : "Unable to reset password");
    }
  }

  return (
    <section className="panel p-5">
      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(!open)}>
        <span>
          <p className="label">Administrator console</p>
          <h2 className="text-2xl font-black">Sellers, knowledge base and controls</h2>
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black">{open ? "Close" : "Open"}</span>
      </button>
      {open && (
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ProductAdminPanel open={open} refresh={refresh} onRefresh={() => setRefresh((v) => v + 1)} />
          <div>
            <h3 className="mb-3 font-black">Create seller/admin</h3>
            {adminError && <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{adminError}</p>}
            <form onSubmit={createUser} className="grid gap-3">
              <input className="field" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
              <input className="field" placeholder="Display name" value={newUser.display_name} onChange={(e) => setNewUser({ ...newUser, display_name: e.target.value })} required />
              <select className="field" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="seller">Seller</option>
                <option value="admin">Administrator</option>
              </select>
              <input className="field" placeholder="Temporary password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
              <button className="button-primary">Create account</button>
            </form>
            <div className="mt-5 space-y-2">
              {users.data?.users.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black">{item.display_name}</p>
                      <p className="text-sm text-slate-500">{item.email} · {item.role}</p>
                    </div>
                    <button className={item.active ? "button-ghost" : "button-dark"} onClick={() => toggleUser(item)}>
                      {item.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      className="field"
                      placeholder="New temporary password, min 12 chars"
                      type="password"
                      value={resetPasswords[item.id] ?? ""}
                      onChange={(e) => setResetPasswords({ ...resetPasswords, [item.id]: e.target.value })}
                    />
                    <button className="button-ghost" onClick={() => resetPassword(item)}>Reset password</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-black">Knowledge base</h3>
            <div className="max-h-[520px] space-y-3 overflow-auto">
              {knowledge.data?.items.map((item) => (
                <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-black text-red-700">{item.status}</span>
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-black">{item.category}</span>
                    {item.model && <span className="rounded-full bg-white px-2 py-1 text-xs font-black">{item.model}</span>}
                  </div>
                  <h4 className="mt-3 font-black">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [user, setUser] = useState<User | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [quotaKey, setQuotaKey] = useState(0);

  useEffect(() => {
    api<MeResponse>("/auth/me").then((res) => setUser(res.user)).catch(() => setUser(null));
  }, []);

  async function logout() {
    await postJson("/auth/logout", {});
    setUser(null);
  }

  if (!user) return <Login locale={locale} onLogin={setUser} />;

  return (
    <main className="technical-bg min-h-screen p-4 lg:p-6">
      <header className="mx-auto mb-6 flex max-w-[1800px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tonlita-red text-2xl font-black text-white">T</div>
          <div>
            <p className="label">Private internal tool</p>
            <h1 className="font-display text-4xl font-black">TONLITA Sales Coach</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="button-ghost flex items-center gap-2" onClick={() => setLocale(locale === "en" ? "zh" : "en")}><Globe2 size={16} /> {locale === "en" ? "中文" : "English"}</button>
          <button className="button-dark" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1800px] gap-6">
        <AdminStrip user={user} />
        <AdminPanel user={user} />
        <QuotaBar refreshKey={quotaKey} />
        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)_430px]">
          <LeadsPanel
            selectedId={selectedLead?.id}
            refreshKey={refreshKey}
            onRefresh={() => setRefreshKey((v) => v + 1)}
            onSelect={(lead) => setSelectedLead(lead)}
          />
          <Conversation lead={selectedLead} refreshKey={refreshKey} onRefresh={() => setRefreshKey((v) => v + 1)} />
          <CoachPanel lead={selectedLead} onQuotaChange={() => setQuotaKey((v) => v + 1)} />
        </div>
      </div>
    </main>
  );
}
