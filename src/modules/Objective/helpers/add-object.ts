import versions from "@/models/bible-version";
import { getLanguagePreference } from "@/helpers/language";

/**
 * Try to predict the language and version to be used by users
 * @returns language and version
 */
export const predictBibleConfig = async () => {
  const language = await getLanguagePreference();
  const languageVersions: Record<string, { isFavorite: boolean }> = versions[language];
  const languageVersionsKeys = Object.keys(languageVersions);
  const favoriteVersion = languageVersionsKeys.find((key: any) => languageVersions[key].isFavorite);

  return { language, version: favoriteVersion as Bible.Version };
};
