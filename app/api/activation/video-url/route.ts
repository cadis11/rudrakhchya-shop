import { NextRequest, NextResponse } from 'next/server'
import { getSignedGetUrl, bucketName } from '@/lib/s3'

// Lazy-load Prisma so Vercel build doesn’t choke on Client generation/caching
let prisma: any
let OrderStatus: any
async function getPrisma() {
  if (!prisma) {
    const mod = await import('@prisma/client')
    OrderStatus = mod.OrderStatus
    prisma = new mod.PrismaClient()
  }
  return { prisma, OrderStatus }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const orderId = url.searchParams.get('orderId')
  if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 })

  const { prisma, OrderStatus } = await getPrisma()

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { activation: true }
  })
  if (!order) return NextResponse.json({ error: 'not found' }, { status: 404 })

  if (order.status !== OrderStatus.ACTIVATED || !order.activation) {
    return NextResponse.json({ error: 'not activated' }, { status: 403 })
  }

  if (!bucketName()) {
    // Demo fallback if S3 not configured
    return NextResponse.json({ url: '/demo/activation/sample.mp4?demo=1' })
  }
  const urlSigned = await getSignedGetUrl(order.activation.s3VideoKey, 900)
  return NextResponse.json({ url: urlSigned })
}
