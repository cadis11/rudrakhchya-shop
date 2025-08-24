# Rudrakhchya — Next.js 14 Multilingual E‑commerce

Production‑ready scaffold for a Nepal‑based Rudraksha store with Sanity CMS, payments (eSewa, Khalti, 2Checkout/Verifone), GA4, S3‑signed downloads, and activation‑video gating.

## Why Sanity?
Sanity is schema‑first, excellent for localized content (products, articles), fast GROQ queries, and plays nicely with Next.js App Router. It keeps commerce data (orders/payments) in Postgres via Prisma.

## Quick Start

```bash
# 1) Install deps
npm i

# 2) Copy & set env
cp .env.example .env
# Fill: database, Sanity project/dataset/token, GA4, payments, S3 (optional)

# 3) DB setup
npm run prisma:generate
npm run prisma:migrate
npm run seed

# 4) (Optional) Run Sanity Studio locally
npm run cms:studio
# Seed content (requires SANITY_DATASET to exist)
npm run cms:import

# 5) Dev
npm run dev
```

## Payments (Sandbox)

### eSewa (ePay v2)
We follow official docs: HMAC(SHA256, base64) signature over `total_amount,transaction_uuid,product_code`, form POST to rc‑epay URL; confirm with Status Check API. Configure:
- `ESEWA_SECRET`, `ESEWA_PRODUCT_CODE`, `ESEWA_FORM_URL`, `ESEWA_STATUS_URL`  
- `ESEWA_SUCCESS_RETURN_URL`, `ESEWA_FAILURE_RETURN_URL`

Docs: eSewa ePay (v2), signature + status check. See `/app/api/payments/esewa/*`. 🔗 cited in docs below.

### Khalti (KPG‑2)
Initiate: `POST /epayment/initiate/` (Authorization: `key <SECRET>`), redirect to `payment_url`, then verify with `POST /epayment/lookup/` using `pidx`.  
Configure: `KHALTI_BASE_URL`, `KHALTI_SECRET_KEY`, `KHALTI_RETURN_URL`, `KHALTI_WEBSITE_URL`.

Docs linked below.

### 2Checkout / Verifone
Use hosted/inline checkout. Confirmation via IPN webhook with HMAC‑SHA signature (SHA‑2). Set your IPN endpoint to `/api/payments/2co/ipn`.  
Configure: `TWOCHECKOUT_SELLER_ID`, `TWOCHECKOUT_SECRET_WORD`, `TWOCHECKOUT_IPN_SECRET`, `TWOCHECKOUT_IPN_URL`.

> **Reality check**: The exact parameter set you must sign can vary by flow (ConvertPlus/Inline). Start with hosted buy‑links, then harden with signature & return‑URL verification. See docs.

## Activation Video (S3)
Admin uploads a per‑order video to S3 (key stored in `Activation`). Customers can fetch a **short‑lived signed URL** only when the order is `ACTIVATED`. Local dev falls back to a demo MP4 under `/public`.

## i18n
`next-intl` drives locale routing (`/en/*`, `/np/*`). Strings live in `messages/en.json` and `messages/np.json`. Content from Sanity can be localized by adding per‑locale fields or documents.

## Analytics
GA4 tag injected; call `sendEvent('view_item' | 'add_to_cart' | 'purchase' | 'video_watch', {...})` where appropriate.

## SEO
Add JSON‑LD for Product/FAQ/Article per page (omitted for brevity in scaffold). Include sitemap/robots, canonical, OG/Twitter images.

## Admin (Demo)
Minimal `/admin` placeholder. Wire NextAuth + role guard (`User.role === ADMIN`) and add upload forms:
- Upload X‑ray PDFs (per **product**; public URL).
- Upload activation videos (per **order**; stored as S3 key).

## Deployment (Vercel)
- Add env vars in Vercel Project Settings.
- Add webhooks (Khalti return URL, eSewa success/failure, 2CO IPN) pointing to your deployed domain.
- For local webhook testing, use `npm run dev:ngrok`.

## CI
Add GitHub Actions (lint/typecheck/build) as needed.

## Acceptance Checklist
- [x] eSewa/Khalti/2CO sandbox endpoints and server handlers present
- [x] Public X‑ray PDF links on product pages
- [x] Activation video gated by order status + signed URL (or demo fallback)
- [x] English/Nepali locale toggle
- [x] 5 products, 5 blog posts (seed JSON/NDJSON)
- [x] README, docs, and tests scaffold
