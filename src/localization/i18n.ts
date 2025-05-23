import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language if key is missing
  interpolation: { escapeValue: false },
});

export default i18n;