import React from "react";
import { create } from "zustand";
import Toast from "react-native-toast-message";
import { router, useNavigation } from "expo-router";
import { useObjectiveStore } from "@/stores/objective";
import { useLocale } from "@/hooks/locale";

interface BaseAddObjectiveStore {
  book?: Bible.Book;
  chapter?: number;
  verseFrom?: number;
  verseTo?: number;
  language?: Bible.Language;
  version?: Bible.Version;
  setBook: (value?: Bible.Book | ((oldValue?: Bible.Book) => Bible.Book)) => void;
  setChapter: (value?: number | ((oldValue?: number) => number)) => void;
  setVerseFrom: (value?: number | ((oldValue?: number) => number)) => void;
  setVerseTo: (value?: number | ((oldValue?: number) => number)) => void;
  setLanguage: (value?: Bible.Language | ((oldValue?: Bible.Language) => Bible.Language)) => void;
  setVersion: (value?: Bible.Version | ((oldValue?: Bible.Version) => Bible.Version)) => void;
}

interface AddObjectiveStore extends BaseAddObjectiveStore {
  canContinue: boolean;
  continueAction: () => void;
}

// a generic setter to be used in values
const genericSetter = <T>(value?: T | ((v?: T) => T), oldValue?: T): T | undefined => {
  if (typeof value !== "function") return value;
  const callableValue = value as (v?: T) => T;
  return callableValue(oldValue);
};

const addObjectiveStore = create<BaseAddObjectiveStore>((set, get) => ({
  setBook: (book) => {
    return set(() => ({
      book: genericSetter<Bible.Book>(book, get()["book"]),
      chapter: undefined,
      verseFrom: undefined,
      verseTo: undefined,
    }));
  },
  setChapter: (chapter) => {
    return set(() => ({
      chapter: genericSetter<number>(chapter, get()["chapter"]),
      verseFrom: undefined,
      verseTo: undefined,
    }));
  },
  setVerseFrom: (verseFrom) => {
    return set(() => ({
      verseFrom: genericSetter<number>(verseFrom, get()["verseFrom"]),
      verseTo: undefined,
    }));
  },
  setVerseTo: (verseTo) => {
    return set(() => ({
      verseTo: genericSetter<number>(verseTo, get()["verseTo"]),
    }));
  },
  setLanguage: (language) => {
    return set(() => ({
      language: genericSetter<Bible.Language>(language, get()["language"]),
      version: undefined,
    }));
  },
  setVersion: (version) => {
    return set(() => ({
      version: genericSetter<Bible.Version>(version, get()["version"]),
    }));
  },
}));

export const useAddObjectiveStore = (): AddObjectiveStore => {
  const { t } = useLocale("objective.stores.add-objective");
  const navigation = useNavigation<any>();
  const store = addObjectiveStore((state) => state);
  const newObjective = useObjectiveStore((state) => state.newObjective);
  const { book, chapter, verseFrom, verseTo, language, version } = store;

  const canContinue = React.useMemo(() => {
    return (
      Boolean(book) &&
      Boolean(chapter) &&
      Boolean(verseFrom) &&
      Boolean(verseTo) &&
      Boolean(language) &&
      Boolean(version)
    );
  }, [book, chapter, verseFrom, verseTo, language, version]);

  const continueAction = async () => {
    try {
      if (!book || !chapter || !verseFrom || !verseTo || !language || !version) {
        throw new Error("Invalid passage configuration");
      }

      const passage: Bible.Passage = { book, chapter, verseFrom, verseTo, version, language };
      const objectiveId = await newObjective(passage);
      navigation.reset({ index: 0, routes: [{ name: "index", key: "/" }] });

      const onPressToast = () => {
        Toast.hide();
        router.push({ pathname: "/view-objective", params: { objectiveId: objectiveId } });
      };

      Toast.show({
        autoHide: true,
        swipeable: true,
        type: "success",
        position: "bottom",
        onPress: onPressToast,
        text1: t("toast.title"),
        text2: t("toast.description"),
      });
    } catch (error) {
      error;
      return router.replace("/");
    }
  };

  return {
    ...store,
    canContinue,
    continueAction,
  };
};
