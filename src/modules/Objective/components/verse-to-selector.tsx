import React from "react";
import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { Selector } from "@/modules/Objective/components/selector";
import { SelectorGrid } from "@/modules/Objective/components/selector-grid";
import { SelectorHeader } from "@/modules/Objective/components/selector-header";
import { useVerseToSelector } from "@/modules/Objective/hooks/verse-to-selector";

export const VerseToSelector = () => {
  const { t } = useLocale("objective.components.verse-to-selector");

  const {
    data,
    isDisabled,
    selectorRef,
    chosenVerseFrom,
    item: chosenVerseTo,
    choseItem: choseVerseTo,
  } = useVerseToSelector();

  const header = React.useMemo(() => {
    const tags = (
      <>
        {chosenVerseTo && <Tag>{String(chosenVerseTo)}</Tag>}
        {chosenVerseFrom && !chosenVerseTo && <Tag color="red">{t("warning")}</Tag>}
      </>
    );

    return <SelectorHeader title={t("title")} tags={tags} />;
  }, [chosenVerseFrom, chosenVerseTo]);

  return (
    <Selector ref={selectorRef} disabled={isDisabled} header={header}>
      <SelectorGrid data={data} choseItem={choseVerseTo} />
    </Selector>
  );
};
