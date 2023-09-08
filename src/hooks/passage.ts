import React from "react";
import { getPassageContent } from "@/services/bible";
import { predictBibleConfig } from "@/modules/Objective/helpers/add-object";

export const usePassageContent = (passage: Bible.Passage | Bible.SuggestedPassage) => {
  const [content, setContent] = React.useState<App.BibleVerse[] | null>();
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPassageContent = React.useCallback(async () => {
    const { language, version } = await predictBibleConfig();

    const content = await getPassageContent({
      book: passage.book,
      chapter: passage.chapter,
      verseFrom: passage.verseFrom,
      verseTo: passage.verseTo,
      language: "language" in passage ? passage.language : language,
      version: "version" in passage ? passage.version : version,
    });

    if (content) setContent(content);
    setIsLoading(false);
  }, [setIsLoading, setContent]);

  return {
    content,
    fetchPassageContent,
    isContentLoading: isLoading,
  };
};

export const useSummarizedPassageContent = (passage: Bible.Passage | Bible.SuggestedPassage) => {
  const { content, ...otherProps } = usePassageContent(passage);

  const transformedContent = React.useMemo(() => {
    const fragments = content?.map(({ text }) => text);
    return fragments?.join(" ");
  }, [content]);

  return {
    content: transformedContent,
    ...otherProps,
  };
};
