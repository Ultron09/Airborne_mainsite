import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
const locales = ['en', 'es', 'hi'];

const messageImports = {
  en: () => import('../messages/en.json'),
  es: () => import('../messages/es.json'),
  hi: () => import('../messages/hi.json')
};
 
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();
 
  try {
    const messages = (await messageImports[locale as keyof typeof messageImports]()).default;
    return {
      locale: locale as string,
      messages
    };
  } catch (err) {
    notFound();
  }
});
