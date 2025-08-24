'use client'
import { useTranslations } from 'next-intl'

export default function NpHome() {
  const t = useTranslations('site')
  const featured = [
    { slug: '5-mukhi-12mm', title: '५ मुखी १२mm', priceNPR: 15000, priceUSD: 120, xray: '/demo/xrays/5mukhi.pdf' },
    { slug: '7-mukhi-14mm', title: '७ मुखी १४mm', priceNPR: 39000, priceUSD: 299, xray: '/demo/xrays/7mukhi.pdf' },
    { slug: '9-mukhi-13mm', title: '९ मुखी १३mm', priceNPR: 54000, priceUSD: 410, xray: '/demo/xrays/9mukhi.pdf' }
  ]

  return (
    <main className="container space-y-8">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold">{t('title')}</h1>
          <p className="text-neutral-600">
            प्रामाणिकता पहिलो: प्रत्येक मोतीमा सार्वजनिक X-ray रिपोर्ट हुन्छ, र किनिसकेपछि अनलॉक हुने Activation भिडियो।
          </p>
          <div className="flex gap-3">
            <a href="/np/shop" className="btn btn-primary">{t('shopNow')}</a>
          </div>
        </div>
        <div className="card p-4">
          <img src="/demo/hero.jpg" alt="Rudraksha" className="rounded-2xl w-full h-auto" />
        </div>
      </section>
    </main>
  )
}
