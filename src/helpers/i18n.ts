import _ from "lodash";
import HomeTranslations from "@/modules/Home/i18n";
import BibleTranslations from "@/modules/Bible/i18n";
import ErrorTranslations from "@/modules/Error/i18n";
import ScoreTranslations from "@/modules/Score/i18n";
import WelcomeTranslations from "@/modules/Welcome/i18n";
import TrainingTranslations from "@/modules/Training/i18n";
import ObjectiveTranslations from "@/modules/Objective/i18n";
import EvaluationTranslations from "@/modules/Evaluation/i18n";
import NotificationTranslations from "@/modules/Notification/i18n";
import ConfigurationTranslations from "@/modules/Configuration/i18n";
type TranslationsTable = { [e in keyof App.Locale]: App.LocaleDefinition<App.Locale[e]> };

const translations: TranslationsTable = {
  welcome: WelcomeTranslations,
  objective: ObjectiveTranslations,
  bible: BibleTranslations,
  home: HomeTranslations,
  training: TrainingTranslations,
  error: ErrorTranslations,
  evaluation: EvaluationTranslations,
  score: ScoreTranslations,
  notification: NotificationTranslations,
  configuration: ConfigurationTranslations,
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
