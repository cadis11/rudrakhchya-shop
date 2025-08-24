import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const base = process.env.KHALTI_BASE_URL || 'https://dev.khalti.com/api/v2'
  const secret = process.env.KHALTI_SECRET_KEY || ''
  const body = await req.json()

  // In production: POST to `${base}/epayment/initiate/` with Authorization: key <secret>
  // For demo, return the shape expected so the frontend can redirect to payment_url
  return NextResponse.json({
    pidx: 'DEMO',
    payment_url: 'https://test-pay.khalti.com/?pidx=DEMO'
  })
}
