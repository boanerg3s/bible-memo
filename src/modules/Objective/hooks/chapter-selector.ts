import React from "react";
import books from "@/models/books";
import { useSelector } from "@/modules/Objective/hooks/selector";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useChapterSelector = () => {
  const { book, chapter, setChapter } = useAddObjectiveStore();
  const chosenBook = React.useMemo(() => (book ? books[book] : undefined), [book]);
  const isDisabled = !Boolean(chosenBook);

  const data = React.useMemo<SelectorGridItemDefinition[]>(() => {
    if (!chosenBook) return [];

    return Object.keys(chosenBook.versesQtyByChapter).map((chapter) => ({
      id: chapter,
      label: chapter,
      ref: React.createRef(),
      key: `${chapter}-${book}`,
    }));
  }, [chosenBook]);

  return {
    isDisabled,
    chosenBook,
    ...useSelector({ data, setItem: setChapter, item: chapter }),
  };
};
