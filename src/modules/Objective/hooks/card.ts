import React from "react";
import { usePassageContent } from "@/hooks/passage";

export const useCardContent = (passage: Bible.Passage | Bible.SuggestedPassage) => {
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
