import { getTranslations } from "@/helpers/i18n";
import * as Localization from "expo-localization";
import { getPreference, savePreference } from "@/helpers/preference";

/**
 * Returns the default user language
 * @returns App.Language
 */
export const getDefaultUserLanguage = (): App.Language => {
  const translations = getTranslations();
  const locales = Localization.getLocales();
  const defaultBaseLocale = locales[0].languageCode as any;
  const defaultLocale = locales[0].languageTag.replace("-", "").toLowerCase() as any;
  const availableLocales = Object.keys(translations) as App.Language[];

  const locale = availableLocales.includes(defaultLocale) ? defaultLocale : null;
  const baseLocale = availableLocales.includes(defaultBaseLocale) ? defaultBaseLocale : null;
  return locale || baseLocale || "en";
};

/**
 * Get Language preference data
 * @returns App Language preference
 */
export const getLanguagePreference = async (): Promise<App.Language> => {
  const preference = await getPreference("language");
  const preferenceValue = preference?.value as App.Language;
  return preferenceValue || getDefaultUserLanguage();
};

/**
 * Save Language preference data
 * @param preference app language preference
 */
export const saveLanguagePreference = async (preference: App.Language): Promise<void> => {
  await savePreference("language", preference);
};
