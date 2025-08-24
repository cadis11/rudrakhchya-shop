import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Read pidx and confirm via lookup API
  const url = new URL(req.url)
  const pidx = url.searchParams.get('pidx')
  // In production: POST to {base}/epayment/lookup/ with Authorization header.
  return NextResponse.redirect(new URL(`/payment/success?provider=khalti&pidx=${pidx}`, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
