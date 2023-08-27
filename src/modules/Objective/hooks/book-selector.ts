import React from "react";
import books from "@/models/books";
import { useLocale } from "@/hooks/locale";
import { useSelector } from "@/modules/Objective/hooks/selector";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { SelectorGridItemDefinition } from "@/modules/Objective/components/selector-grid-item";

export const useBookSelector = () => {
  const { t } = useLocale("bible.abbreviation");
  const { book, setBook } = useAddObjectiveStore();

  const data = React.useMemo<SelectorGridItemDefinition[]>(() => {
    return Object.keys(books).map((book) => ({
      id: book,
      key: book,
      label: t(book),
      ref: React.createRef(),
    }));
  }, [books]);

  return useSelector({ data, setItem: setBook, item: book });
};
