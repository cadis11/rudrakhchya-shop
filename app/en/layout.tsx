import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '@/messages/en.json'
import { GA4_ID, gtag } from '@/lib/ga'
import '../globals.css'
import Script from 'next/script'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const locale = 'en'
  return (
    <html lang={locale}>
      <head>
        {GA4_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtag() }} />
          </>
        )}
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages as any}>
          <div className="container py-6">
            <header className="flex items-center justify-between">
              <a href="/en" className="text-xl font-semibold">Rudrakhchya</a>
              <nav className="flex gap-4 text-sm">
                <a href="/en/shop">Shop</a>
                <a href="/en/learn">Learn</a>
                <a href="/en/blog">Blog</a>
                <a href="/en/certificates-activation">Certificates</a>
              </nav>
              <div className="flex items-center gap-3">
                <a className="underline" href="/np">नेपाली</a>
                <a className="btn btn-primary" href="https://wa.me/" target="_blank">WhatsApp</a>
              </div>
            </header>
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
