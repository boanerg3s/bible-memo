import React from "react";
import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { Selector } from "@/modules/Objective/components/selector";
import { useBookSelector } from "@/modules/Objective/hooks/book-selector";
import { SelectorGrid } from "@/modules/Objective/components/selector-grid";
import { SelectorHeader } from "@/modules/Objective/components/selector-header";

export const BookSelector = () => {
  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("objective.components.book-selector");
  const { data, selectorRef, choseItem: choseBook, item: chosenBook } = useBookSelector();

  const header = React.useMemo(() => {
    const tags = (
      <>
        {chosenBook && <Tag>{tBible(chosenBook)}</Tag>}
        {!chosenBook && <Tag color="red">{t("warning")}</Tag>}
      </>
    );

    return <SelectorHeader title={t("title")} tags={tags} />;
  }, [chosenBook]);

  return (
    <Selector ref={selectorRef} disabled={false} header={header}>
      <SelectorGrid data={data} choseItem={choseBook} />
    </Selector>
  );
};
