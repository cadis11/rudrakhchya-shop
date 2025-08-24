import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n'

export default createMiddleware({
  locales: Array.from(locales),
  defaultLocale
})

export const config = {
  matcher: ['/', '/(en|np)', '/(en|np)/:path*']
}
