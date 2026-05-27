import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
const locales = ['en', 'es', 'hi'];

const messageImports = {
  en: () => import('../messages/en.json'),
  es: () => import('../messages/es.json'),
  hi: () => import('../messages/hi.json')
};
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  console.log('getRequestConfig CALLED WITH LOCALE:', locale);
  if (!locale || !locales.includes(locale as any)) {
    console.log('LOCALE NOT IN LIST, DEFAULTING TO en');
    locale = 'en';
  }
 
  try {
    console.log('IMPORTING MESSAGES FOR:', locale);
    const messages = (await messageImports[locale as keyof typeof messageImports]()).default;
    return {
      locale: locale as string,
      messages
    };
  } catch (err) {
    console.error('ERROR IMPORTING MESSAGES:', err);
    notFound();
  }
});
