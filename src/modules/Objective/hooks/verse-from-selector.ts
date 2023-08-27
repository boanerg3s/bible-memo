import React from "react";
import books from "@/models/books";
import { useSelector } from "@/modules/Objective/hooks/selector";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useVerseFromSelector = () => {
  const { book, chapter: chosenChapter, verseFrom, setVerseFrom } = useAddObjectiveStore();
  const chosenBook = React.useMemo(() => (book ? books[book] : undefined), [book]);
  const isDisabled = !Boolean(chosenBook) || !Boolean(chosenChapter);

  const data = React.useMemo<SelectorGridItemDefinition[]>(() => {
    if (!chosenBook || !chosenChapter) return [];
    const versesQty = chosenBook.versesQtyByChapter[chosenChapter];
    const keys = Array.from({ length: versesQty }, (_, i) => i + 1);

    return keys.map((verse) => ({
      id: String(verse),
      label: String(verse),
      ref: React.createRef(),
      key: `${verse}-${chosenChapter}-${book}`,
    }));
  }, [chosenBook, chosenChapter]);

  return {
    isDisabled,
    chosenChapter,
    ...useSelector({ data, setItem: setVerseFrom, item: verseFrom }),
  };
};
