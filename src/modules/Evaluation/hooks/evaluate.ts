import React from "react";
import { useObjectiveStore } from "@/stores/objective";
import { evaluateBiblePassage } from "@/helpers/evaluation";
import { useSummarizedPassageContent } from "@/hooks/passage";

export const useEvaluation = (objective: App.Objective) => {
  const { updateScore } = useObjectiveStore();
  const [result, setResult] = React.useState<{ score: number }>();
  const { content, fetchPassageContent, isContentLoading } = useSummarizedPassageContent(objective.passage);

  /** fetch passage content */
  React.useEffect(() => {
    fetchPassageContent();
  }, []);

  /** trigger evaluation flow */
  const evaluate = async (value: string) => {
    const score = evaluateBiblePassage(value, content!);
    await updateScore(score, objective.id);
    setResult({ score });
  };

  return {
    result,
    passageContent: content,
    isPassageContentLoading: isContentLoading,
    evaluate: React.useCallback(evaluate, [content, updateScore]),
  };
};
