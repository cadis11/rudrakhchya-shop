import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function computeHmacSha256(data: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex')
}

/**
 * Minimal IPN signature verification based on Verifone docs (HMAC over concatenated field lengths+values).
 * For brevity, we accept as valid when no secret is configured (dev).
 */
export async function POST(req: NextRequest) {
  const bodyText = await req.text()
  const contentType = req.headers.get('content-type') || ''
  let payload: any = {}
  if (contentType.includes('application/json')) {
    payload = JSON.parse(bodyText)
  } else {
    // x-www-form-urlencoded
    payload = Object.fromEntries(new URLSearchParams(bodyText))
  }

  const secret = process.env.TWOCHECKOUT_IPN_SECRET || ''
  if (secret) {
    // Build HMAC source string by prepending each field's length then the value, in the order received
    let src = ''
    for (const [k, v] of Object.entries(payload)) {
      if (k === 'HASH') continue
      const val = (v ?? '').toString()
      src += (val ? Buffer.byteLength(val).toString() + val : '0')
    }
    const expected = computeHmacSha256(src, secret)
    const received = (payload.HASH || payload.hash || '').toString().toLowerCase()
    if (expected !== received) {
      return NextResponse.json({ ok: false, reason: 'invalid signature' }, { status: 400 })
    }
  }

  // TODO: map ORDERSTATUS=COMPLETE to Order.status=PAID, store refs
  return NextResponse.json({ ok: true })
}
