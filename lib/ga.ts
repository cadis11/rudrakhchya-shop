export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

export function gtag() {
  if (!GA4_ID) return ''
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}');
  `
}

export function sendEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return
  // @ts-ignore
  window.gtag?.('event', name, params)
}
