import React from "react";
import books from "@/models/books";
import { useSelector } from "@/modules/Objective/hooks/selector";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useVerseToSelector = () => {
  const { book, chapter: chosenChapter, verseFrom: chosenVerseFrom, verseTo, setVerseTo } = useAddObjectiveStore();
  const chosenBook = React.useMemo(() => (book ? books[book] : undefined), [book]);
  const isDisabled = !Boolean(chosenBook) || !Boolean(chosenChapter) || !Boolean(chosenVerseFrom);

  const data = React.useMemo<SelectorGridItemDefinition[]>(() => {
    if (!chosenBook || !chosenChapter || !chosenVerseFrom) return [];
    const versesQty = chosenBook.versesQtyByChapter[chosenChapter];
    const verses = Array.from({ length: versesQty }, (_, i) => i + 1);
    const keys = verses.filter((verse) => verse >= chosenVerseFrom);

    return keys.map((verse) => ({
      id: String(verse),
      label: String(verse),
      ref: React.createRef(),
      key: `${verse}-${chosenVerseFrom}-${chosenChapter}-${book}`,
    }));
  }, [chosenBook, chosenChapter, chosenVerseFrom]);

  return {
    isDisabled,
    chosenVerseFrom,
    ...useSelector({ data, setItem: setVerseTo, item: verseTo }),
  };
};
