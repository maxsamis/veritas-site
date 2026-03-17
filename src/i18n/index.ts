import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import it from './locales/it.json'
import fr from './locales/fr.json'
import pl from './locales/pl.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
      it: { translation: it },
      fr: { translation: fr },
      pl: { translation: pl },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'pt', 'it', 'fr', 'pl'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
