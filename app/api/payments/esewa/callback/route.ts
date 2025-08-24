import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // eSewa redirects here with status fields; best practice per docs is to call Status Check API
  const url = new URL(req.url)
  const transaction_uuid = url.searchParams.get('transaction_uuid')
  const total_amount = url.searchParams.get('total_amount')
  const product_code = url.searchParams.get('product_code') || process.env.ESEWA_PRODUCT_CODE

  const statusUrl = (process.env.ESEWA_STATUS_URL || '') + `?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`
  // For demo, we do not call external URL. In production, fetch and verify response signature if present, then mark order PAID.
  // Redirect to success page
  return NextResponse.redirect(new URL(`/payment/success?provider=esewa&tx=${transaction_uuid}`, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
