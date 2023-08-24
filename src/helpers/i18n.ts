import _ from "lodash";
import WelcomeTranslations from "@/modules/Welcome/i18n";
import BibleTranslations from "@/modules/Bible/i18n";
type TranslationsTable = { [e in keyof App.Locale]: App.LocaleDefinition<App.Locale[e]> };

const translations: TranslationsTable = {
  welcome: WelcomeTranslations,
  bible: BibleTranslations,
};

export const getTranslations = (): Record<App.Language, App.Locale> => {
  const modules = Object.keys(translations) as unknown as (keyof App.Locale)[];

  const mappedModules = modules.flatMap((moduleKey) => {
    const moduleData = translations[moduleKey];
    const moduleLanguagesKeys = Object.keys(moduleData) as App.Language[];
    return moduleLanguagesKeys.map((language) => ({ [language]: { [moduleKey]: moduleData[language] } }));
  });

  return _.merge({}, ...mappedModules) as unknown as Record<App.Language, App.Locale>;
};
