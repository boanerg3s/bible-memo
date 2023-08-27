import React from "react";
import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { Selector } from "@/modules/Objective/components/selector";
import { SelectorGrid } from "@/modules/Objective/components/selector-grid";
import { SelectorHeader } from "@/modules/Objective/components/selector-header";
import { useVerseFromSelector } from "@/modules/Objective/hooks/verse-from-selector";

export const VerseFromSelector = () => {
  const { t } = useLocale("objective.components.verse-from-selector");

  const {
    data,
    isDisabled,
    selectorRef,
    chosenChapter,
    item: chosenVerse,
    choseItem: choseVerse,
  } = useVerseFromSelector();

  const header = React.useMemo(() => {
    const tags = (
      <>
        {chosenVerse && <Tag>{String(chosenVerse)}</Tag>}
        {chosenChapter && !chosenVerse && <Tag color="red">{t("warning")}</Tag>}
      </>
    );

    return <SelectorHeader title={t("title")} tags={tags} />;
  }, [chosenChapter, chosenVerse]);

  return (
    <Selector ref={selectorRef} disabled={isDisabled} header={header}>
      <SelectorGrid data={data} choseItem={choseVerse} />
    </Selector>
  );
};
