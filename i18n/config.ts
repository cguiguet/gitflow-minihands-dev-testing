import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '../locales/en.json';
import de from '../locales/de.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
const supportedLanguages = ['en', 'de'];
const fallbackLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: fallbackLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
