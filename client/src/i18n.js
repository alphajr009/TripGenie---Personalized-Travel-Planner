import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector) // Add language detection
  .use(initReactI18next) // Add React integration
  .init({
    debug: true,
    lng: 'en',
    resources: {
      en: {
        translation: {
          // English translations
        },
      },
      fr: {
        translation: {
          // French translations
        },
      },
      hi: {
        translation: {
          // Hindi translations
        },
      },
    },
  });

export default i18n;
