import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import vi from "./vi/translation.json";

export const translationsJson = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
  
};

export const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: translationsJson,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
