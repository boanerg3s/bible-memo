import React from "react";
import { Tag } from "@/components/tag";
import { useLocale } from "@/hooks/locale";
import { Selector } from "@/modules/Objective/components/selector";
import { SelectorGrid } from "@/modules/Objective/components/selector-grid";
import { SelectorHeader } from "@/modules/Objective/components/selector-header";
import { useVersionSelector } from "@/modules/Objective/hooks/version-selector";

export const VersionSelector = () => {
  const { t } = useLocale("objective.components.version-selector");
  const { data, selectorRef, item: chosenVersion, choseItem: choseVersion } = useVersionSelector();

  const header = React.useMemo(() => {
    const tags = (
      <>
        {chosenVersion && <Tag>{String(chosenVersion)}</Tag>}
        {!chosenVersion && <Tag color="red">{t("warning")}</Tag>}
      </>
    );

    return <SelectorHeader title={t("title")} tags={tags} />;
  }, [chosenVersion]);

  return (
    <Selector ref={selectorRef} header={header}>
      <SelectorGrid flat numCols={1} data={data} choseItem={choseVersion} />
    </Selector>
  );
};
