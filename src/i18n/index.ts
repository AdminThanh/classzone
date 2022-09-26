import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './langs/en';
import translationVI from './langs/vi';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('locale') || 'vi',
  resources,
  fallbackLng: 'en',
});

export default i18n;
