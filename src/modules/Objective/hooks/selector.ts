import React from "react";
import { SelectorRef } from "@/modules/Objective/components/selector";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useSelector = <T>(params: {
  item?: T;
  data: SelectorGridItemDefinition[];
  setItem: (value: T | ((oldValue?: T) => T)) => void;
}) => {
  const { data, item, setItem } = params;
  const selectorRef = React.createRef<SelectorRef>();
  const [oldItemRef, setOldItemRef] = React.useState<SelectorGridItemDefinition["ref"]>();

  const choseItem = React.useCallback(
    (item: T) => {
      return setItem((oldItem) => {
        setOldItemRef(data.find((item) => item.id === oldItem)?.ref);
        return item;
      });
    },
    [data, setItem]
  );

  React.useEffect(() => {
    if (oldItemRef?.current) {
      oldItemRef?.current.setIsItemActive(false);
    }
  }, [oldItemRef]);

  React.useEffect(() => {
    if (item && selectorRef.current) {
      selectorRef.current.changeContentVisibilityTo(false);
    }
  }, [item]);

  return {
    item,
    selectorRef,
    choseItem,
    data,
  };
};
