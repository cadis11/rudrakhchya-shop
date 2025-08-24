import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const supported = ['en', 'np'] as const;
  const finalLocale = (supported as readonly string[]).includes(locale) ? locale : 'en';
  const messages = (await import(`../messages/${finalLocale}.json`)).default;
  return {locale: finalLocale, messages};
});
