# Payment Setup Notes (Sandbox)

## eSewa (ePay v2)
- **Form URL (UAT)**: `https://rc-epay.esewa.com.np/api/epay/main/v2/form`
- **Status Check (UAT)**: `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount={AMOUNT}&transaction_uuid={UUID}`
- **Signature**: Base64(HMAC_SHA256(secret, `total_amount=...,transaction_uuid=...,product_code=...`))

Flow:
1. Server builds signed payload (see `/api/payments/esewa/init`).
2. Redirect user agent to form URL (POST).
3. On success/failure redirect, call Status Check API and mark order **PAID** if `status=COMPLETE`.

Docs: eSewa Developer Portal (Epay v2).

## Khalti (KPG‑2)
- **Initiate**: `POST {base}/epayment/initiate/` with `Authorization: key <SECRET>`
- **Return URL**: receives `pidx` and `status`
- **Lookup**: `POST {base}/epayment/lookup/` with `pidx`

Treat **Completed** as success; any other status as non‑success.

## 2Checkout / Verifone
- Prefer **ConvertPlus (hosted)** or **InLine** checkout.
- **IPN**: configure to `/api/payments/2co/ipn` and verify HMAC‑SHA signature (SHA‑2). Map COMPLETE → **PAID**.

Notes:
- Return‑URL signatures and Buy‑Link signatures vary by flow. Start with hosted links; add signature verification as you go.
- Use sandbox/test creds from your Verifone Merchant Control Panel.
