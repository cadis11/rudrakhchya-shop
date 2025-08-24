export const dynamic = 'force-dynamic';
'use client'
import { useTranslations } from 'next-intl'

export default function EnHome() {
  const t = useTranslations('site')
  const featured = [
    { slug: '5-mukhi-12mm', title: '5 Mukhi 12mm', priceNPR: 15000, priceUSD: 120, xray: '/demo/xrays/5mukhi.pdf' },
    { slug: '7-mukhi-14mm', title: '7 Mukhi 14mm', priceNPR: 39000, priceUSD: 299, xray: '/demo/xrays/7mukhi.pdf' },
    { slug: '9-mukhi-13mm', title: '9 Mukhi 13mm', priceNPR: 54000, priceUSD: 410, xray: '/demo/xrays/9mukhi.pdf' }
  ]

  return (
    <main className="container space-y-8">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold">{t('title')}</h1>
          <p className="text-neutral-600">
            Authenticity first: Every bead includes a public X-ray report and an activation ritual video unlocked after purchase.
          </p>
          <div className="flex gap-3">
            <a href="/en/shop" className="btn btn-primary">{t('shopNow')}</a>
          </div>
          <div className="flex gap-3 mt-2">
            <span className="badge">{t('xrayCertified')}</span>
            <span className="badge">{t('activationVideo')}</span>
            <span className="badge">{t('shipsWorldwide')}</span>
          </div>
        </div>
        <div className="card p-4">
          <img src="/demo/hero.jpg" alt="Rudraksha" className="rounded-2xl w-full h-auto" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <a key={p.slug} href={`/en/product/${p.slug}`} className="card p-4 block">
              <div className="aspect-square bg-neutral-100 rounded-xl mb-3"></div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="text-sm text-neutral-500">NPR {p.priceNPR.toLocaleString()} / USD {p.priceUSD}</p>
                </div>
                <div className="text-xs text-emerald-700">X-ray ✓</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
