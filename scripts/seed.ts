import { PrismaClient, Role, OrderStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create demo admin and customer
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rudrakhchya.local' },
    update: {},
    create: { email: 'admin@rudrakhchya.local', name: 'Admin', role: Role.ADMIN, password: 'admin' }
  })
  const customer = await prisma.user.upsert({
    where: { email: 'buyer@rudrakhchchya.local' },
    update: {},
    create: { email: 'buyer@rudrakhchchya.local', name: 'Buyer', role: Role.CUSTOMER, password: 'buyer' }
  })

  // Create a demo order in PAID state to showcase activation flow
  const order = await prisma.order.create({
    data: {
      status: OrderStatus.PAID,
      currency: 'NPR',
      total: 150000,
      userId: customer.id,
      items: {
        create: [
          { productId: 'seed-5mukhi-1', title: '5 Mukhi Rudraksha 12mm', price: 150000, qty: 1, snapshot: { slug: '5-mukhi-12mm' } }
        ]
      },
      payment: {
        create: { provider: 'sandbox', status: 'Completed', ref: 'DEMO123' }
      }
    }
  })
  console.log('Seeded users and order', { admin, customer, order })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
