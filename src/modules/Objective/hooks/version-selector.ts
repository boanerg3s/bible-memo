import React from "react";
import { useLocale } from "@/hooks/locale";
import versions from "@/models/bible-version";
import { useSelector } from "@/modules/Objective/hooks/selector";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useVersionSelector = () => {
  const { t } = useLocale("bible.version");
  const { language, version: chosenVersion, setVersion } = useAddObjectiveStore();

  const data = React.useMemo<SelectorGridItemDefinition[]>(() => {
    return Object.keys(versions[language!]).map((version) => {
      return {
        id: version,
        key: version,
        ref: React.createRef(),
        isActive: version === chosenVersion,
        label: `(${version}) ${t(`${language}.${version}`)}`,
      };
    });
  }, [language]);

  return useSelector({ data, setItem: setVersion, item: chosenVersion });
};
