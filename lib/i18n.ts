export const locales = ['en', 'np'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
