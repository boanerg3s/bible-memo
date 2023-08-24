import { I18n, TranslateOptions } from "i18n-js";
import { create } from "zustand";
import { getTranslations } from "@/helpers/i18n";
import * as LanguageHelper from "@/helpers/language";

interface LanguageStore {
  language: App.Language;
  initLocalization: () => Promise<void>;
  fetchLanguagePreference: () => Promise<void>;
  t: (scope: string, options?: TranslateOptions) => string;
  saveLanguagePreference: (language: App.Language) => Promise<void>;
}

export const useLanguageStore = create<LanguageStore>((set) => {
  const defaultLanguage = LanguageHelper.getDefaultUserLanguage();

  const fetchLanguagePreference = async () => {
    const preference = await LanguageHelper.getLanguagePreference();
    set((state) => ({ ...state, language: preference || defaultLanguage }));
  };

  const saveLanguagePreference = async (language: App.Language) => {
    await LanguageHelper.saveLanguagePreference(language);
    await fetchLanguagePreference();
  };

  const initLocalization = async () => {
    const language = await LanguageHelper.getLanguagePreference();
    const translations = getTranslations();

    const i18n = new I18n(translations);
    i18n.locale = language;
    i18n.defaultLocale = "en";
    i18n.enableFallback = true;

    const tProxy = (scope: string, options?: TranslateOptions) => i18n.t(scope, options);
    set(() => ({ t: tProxy }));
  };

  return {
    t: (scope: string) => scope,
    language: defaultLanguage,
    fetchLanguagePreference,
    saveLanguagePreference,
    initLocalization,
  };
});
