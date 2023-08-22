import { getPreference, savePreference } from "@/helpers/preference";

/**
 * Get Language preference data
 * @returns App Language preference
 */
export const getLanguagePreference = async (): Promise<App.Language | null> => {
  const preference = await getPreference("language");
  return preference?.value as App.Language;
};

/**
 * Save Language preference data
 * @param preference app language preference
 */
export const saveLanguagePreference = async (preference: App.Language): Promise<void> => {
  await savePreference("language", preference);
};
