import React from "react";
import { useObjectiveStore } from "@/stores/objective";
import { evaluateBiblePassage } from "@/helpers/evaluation";
import { useSummarizedPassageContent } from "@/hooks/passage";

export const useEvaluation = (objective: App.Objective) => {
  const { updateScore } = useObjectiveStore();
  const [result, setResult] = React.useState<{ score: number; newScore: number }>();
  const { content, fetchPassageContent, isContentLoading } = useSummarizedPassageContent(objective.passage);

  /** fetch passage content */
  React.useEffect(() => {
    fetchPassageContent();
  }, []);

  /** trigger evaluation flow */
  const evaluate = async (value: string) => {
    const score = evaluateBiblePassage(value, content!);
    const newScore = objective.score + score;
    await updateScore(newScore, objective.id);
    setResult({ score, newScore });
  };

  return {
    result,
    passageContent: content,
    isPassageContentLoading: isContentLoading,
    evaluate: React.useCallback(evaluate, [content, updateScore]),
  };
};
