# Attachment Processing

Tonlita Sales Coach supports temporary processing of lead-specific attachments without permanent raw-file storage.

## Supported Files

- JPG
- JPEG
- PNG
- WEBP
- PDF

Production defaults:

```text
MAX_ATTACHMENTS_PER_ANALYSIS=5
MAX_ATTACHMENT_SIZE_MB=10
MAX_TOTAL_UPLOAD_SIZE_MB=20
MAX_PDF_PAGES=25
```

## Purposes

Sellers must classify each upload as one of:

- Customer conversation screenshot
- Technical specification sheet
- Product photograph
- Factory document
- Certificate or conformity document
- Quotation
- Other internal reference

## Storage Rule

The original file is processed temporarily and is not permanently stored. The database keeps only:

- filename
- MIME type
- file size
- secure content hash
- processing status
- extracted text or structured facts
- confirmed conversation messages
- page references where available

English notice:

> The original attachment is processed temporarily and is not permanently stored. The extracted text and confirmed information will remain available.

Simplified Chinese notice:

> 原始附件仅用于临时处理，不会被永久保存。提取的文本和已确认的信息将继续保留。

## Conversation Screenshots

Extracted screenshot messages are staged first. They do not enter official conversation memory until the seller confirms them.

The seller can correct text, assign speaker, set order, remove duplicates, confirm or discard.

## Technical Files

Extracted product facts start as `UNVERIFIED_SELLER_INPUT`. They may help internal understanding, but they must not become customer-facing approved facts until an administrator reviews them.

Attachment processing consumes one AI request. There is no paid storage or paid AI fallback.

## Hostile-Audit Requirements

- File type and size are validated server-side before processing.
- Every attachment belongs to exactly one lead.
- Sellers can only access attachment results for leads assigned to them; administrators can access all leads.
- Failed processing must not delete or corrupt existing conversation history.
- Prompt-injection text inside images or PDFs is treated only as attachment content.
- Raw files are processed temporarily and must not be stored in D1, R2, Cloudflare Images or any paid storage service.
