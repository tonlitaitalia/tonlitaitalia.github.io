# Initial Catalogue Import Report

Source document: `Catalogo Macchine Compatte da Cantiere – Selezione 2026-7.pdf`

Internal dataset label: `INITIAL_CATALOGUE_DATASET`

The catalogue is only the first approved source loaded into the Tonlita Sales Coach knowledge base. It is not a complete list of every product Tonlita may sell. Administrators can add future construction, agricultural, forestry, lifting and industrial machinery categories and models without source-code changes.

## Extracted Models

| Model | Category | Source pages |
| --- | --- | --- |
| YXC300 | Mini gru cingolata / spider crane | 2 technical sheet, 3 dimensions/load diagram, 4 photo |
| YXC400 | Mini gru cingolata / spider crane | 5 technical sheet, 6 dimensions/load diagram, 7 photo |
| YXC500 | Mini gru cingolata / spider crane | 8 technical sheet, 9 dimensions/load diagram, 10 photo |
| 1000F | Trincia radiocomandata | 11 technical sheet, 12 photos/control details |
| YX10 | Mini escavatore cingolato | 13 technical sheet, 14 photos |
| YX15 | Mini escavatore cingolato | 15 technical sheet, 16 photos |
| YX18 | Mini escavatore cingolato | 17 technical sheet, 18 photos |
| YX20 | Mini escavatore cingolato | 19 technical sheet, 20 photos |
| YX25 | Mini escavatore cingolato | 21 technical sheet, 22 photos |
| ME18.9 | Mini escavatore cingolato | 23 technical sheet, 24 photos |
| ME26.9 | Mini escavatore cingolato | 25 technical sheet, 26 photos |
| ME35.10 | Mini escavatore cingolato | 27 technical sheet, 28 photos |
| ME60.9 | Mini escavatore cingolato | 29 technical sheet, 30 photo |
| T360 | Mini pala cingolata | 31 technical sheet, 32 photos |
| T460 | Mini pala cingolata | 33 technical sheet, 34 photos |
| V800 | Mini pala cingolata | 35 technical sheet, 36 photos |
| V1000 | Mini pala cingolata | 37 technical sheet, 38 photos |

Pages 39 and 40 contain closing support/contact material, not model-specific technical sheets.

## Data Status Rules Used

- Clearly identified technical values from model sheets are stored as `APPROVED_CATALOGUE_FACT`.
- Ambiguous, incomplete or commercially sensitive values are stored as `REQUIRES_OWNER_APPROVAL` or `NOT_AVAILABLE`.
- The source document and exact PDF page are stored on each seeded record whenever available.
- Values are preserved as they appear in the catalogue. Unusual values are not silently corrected.

## Owner Approval Required

The following information requires explicit owner/admin approval before it can be used as customer-facing fact:

- CE conformity or any certification promise.
- Stage V conformity or emissions compliance claims.
- Warranty policy.
- Prices and price scope.
- Delivery time, production time and availability.
- Shipping cost, customs cost, landed cost and final freight.
- Spare-parts delivery time.
- Factory identity, exclusivity and manufacturer commitments.
- Any legal or commercial guarantee.

## Suspicious Or Ambiguous Items

- `1000F` is treated as a remote-controlled tracked mower/trincia based on the catalogue context; its broader Tonlita product taxonomy should be reviewed by the owner.
- `V1000` operating weight was not seeded as an approved fact where the source was unclear in extraction; it remains for owner review if needed.
- Page 39 support statements are useful commercial context, but are not automatically approved as formal legal commitments.

## Dynamic Catalogue Requirements

The application must support future products that are not present in this PDF:

- Administrators can create categories, subcategories, manufacturers, factories, models, variants, engines, attachments, options, specifications, prices, commercial conditions, documents, qualification questions, approved claims, limitations and approval rules.
- Sellers can create leads for existing approved products, new/unlisted products, unknown products, attachments/spare parts and other machinery.
- Sellers can add temporary product information as `UNVERIFIED_SELLER_INPUT`.
- The AI may use unverified seller input only as internal context, never as confirmed customer-facing fact.
- Unknown product inquiries must still receive useful consultative sales coaching without invented specifications.
