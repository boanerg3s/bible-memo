import React from "react";
import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { Selector } from "@/modules/Objective/components/selector";
import { SelectorGrid } from "@/modules/Objective/components/selector-grid";
import { useChapterSelector } from "@/modules/Objective/hooks/chapter-selector";
import { SelectorHeader } from "@/modules/Objective/components/selector-header";

export const ChapterSelector = () => {
  const { t } = useLocale("objective.components.chapter-selector");

  const {
    data,
    isDisabled,
    chosenBook,
    selectorRef,
    item: chosenChapter,
    choseItem: choseChapter,
  } = useChapterSelector();

  const header = React.useMemo(() => {
    const tags = (
      <>
        {chosenChapter && <Tag>{String(chosenChapter)}</Tag>}
        {chosenBook && !chosenChapter && <Tag color="red">{t("warning")}</Tag>}
      </>
    );

    return <SelectorHeader title={t("title")} tags={tags} />;
  }, [chosenChapter, chosenBook]);

  return (
    <Selector ref={selectorRef} disabled={isDisabled} header={header}>
      <SelectorGrid data={data} choseItem={choseChapter} />
    </Selector>
  );
};
