import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import all namespaces (for the default language, only)
import enTranslate from 'translation/en/translation.json';
import frTranslate from 'translation/fr/translation.json';

export const resources = {
  en: {
    translation: enTranslate
  },
  fr: {
    translation: frTranslate
  }
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
});