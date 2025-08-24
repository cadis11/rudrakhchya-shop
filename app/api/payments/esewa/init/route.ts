import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.json()
  const { total_amount, transaction_uuid, product_code } = body
  // Build signature base "total_amount=... ,transaction_uuid=... ,product_code=..."
  const signed_fields = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
  const hmac = crypto.createHmac('sha256', process.env.ESEWA_SECRET || '')
  const signature = hmac.update(signed_fields).digest('base64')
  const formUrl = process.env.ESEWA_FORM_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'

  return NextResponse.json({
    formUrl,
    payload: {
      amount: total_amount,
      tax_amount: 0,
      total_amount,
      transaction_uuid,
      product_code,
      success_url: process.env.ESEWA_SUCCESS_RETURN_URL,
      failure_url: process.env.ESEWA_FAILURE_RETURN_URL,
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature
    }
  })
}
