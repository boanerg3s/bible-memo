import React from "react";
import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { Selector } from "@/modules/Objective/components/selector";
import { SelectorGrid } from "@/modules/Objective/components/selector-grid";
import { SelectorHeader } from "@/modules/Objective/components/selector-header";
import { useLanguageSelector } from "@/modules/Objective/hooks/language-selector";

export const LanguageSelector = () => {
  const { t } = useLocale("objective.components.language-selector");
  const { data, selectorRef, item: chosenLanguage, choseItem: choseLanguage } = useLanguageSelector();

  const header = React.useMemo(() => {
    const tags = (
      <>
        {chosenLanguage && <Tag>{String(chosenLanguage)}</Tag>}
        {!chosenLanguage && <Tag color="red">{t("warning")}</Tag>}
      </>
    );

    return <SelectorHeader title={t("title")} tags={tags} />;
  }, [chosenLanguage]);

  return (
    <Selector ref={selectorRef} header={header}>
      <SelectorGrid flat numCols={1} data={data} choseItem={choseLanguage} />
    </Selector>
  );
};
