import { create } from "zustand";
import * as LanguageHelper from "@/helpers/language";

interface LanguageStore {
  language: App.Language;
  fetchLanguagePreference: () => Promise<void>;
  saveLanguagePreference: (language: App.Language) => Promise<void>;
}

export const useLanguageStore = create<LanguageStore>((set) => {
  const defaultLanguage: App.Language = "EN";

  const fetchLanguagePreference = async () => {
    const preference = await LanguageHelper.getLanguagePreference();
    set((state) => ({ ...state, language: preference || defaultLanguage }));
  };

  const saveLanguagePreference = async (language: App.Language) => {
    await LanguageHelper.saveLanguagePreference(language);
    await fetchLanguagePreference();
  };

  return {
    language: defaultLanguage,
    fetchLanguagePreference,
    saveLanguagePreference,
  };
});
