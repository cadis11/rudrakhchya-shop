# Admin Guide (Demo)

## Roles
- `ADMIN`: Can upload X‑ray PDFs (per **product**) and activation videos (per **order**), update order status, and resend emails.
- `CUSTOMER`: Can view public X‑ray PDF and, after activation, fetch a private link to the video.

## Workflow
1. Product created in **Sanity**. Include `xray_pdf_url` (public) and stock.
2. Customer places order → `PENDING_PAYMENT`.
3. On sandbox payment success (webhook/return validation) → set order `PAID`.
4. Perform activation ritual. Upload video to S3. Create `Activation` row with `s3VideoKey`.
5. Set order `ACTIVATED`. Email customer (Nodemailer) with link to order page.
6. Customer clicks **Get Private Link** → server issues short‑lived signed URL.
7. After delivery, set order `COMPLETED`.

## Tips
- Keep PDFs public but watermarked.
- Videos private; never expose S3 bucket or keys in the client.
- Use GA4 event `video_watch` when user opens the signed URL page.
