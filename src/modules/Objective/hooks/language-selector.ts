import React from "react";
import { useLocale } from "@/hooks/locale";
import versions from "@/models/bible-version";
import { useSelector } from "@/modules/Objective/hooks/selector";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useLanguageSelector = () => {
  const { t } = useLocale("bible.language");
  const { language: chosenLanguage, setLanguage } = useAddObjectiveStore();

  const data = React.useMemo<SelectorGridItemDefinition[]>(() => {
    return Object.keys(versions).map((language) => {
      return {
        id: language,
        key: language,
        label: t(language),
        ref: React.createRef(),
        isActive: language === chosenLanguage,
      };
    });
  }, []);

  return useSelector({ data, setItem: setLanguage, item: chosenLanguage });
};
