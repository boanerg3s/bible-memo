import React from "react";
import { useObjective } from "@/hooks/objective";
import { useLocalSearchParams } from "expo-router";
import { FullPageLoading } from "@/components/full-page-loading";
import { useEvaluation } from "@/modules/Evaluation/hooks/evaluate";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { SimpleError } from "@/modules/Error/containers/simple-error";
import { EvaluationResult } from "@/modules/Evaluation/containers/evaluation-result";
import { EvaluationCapture } from "@/modules/Evaluation/containers/evaluation-capture";

const EvaluatePage = () => {
  const params = useLocalSearchParams();
  const objective = useObjective(Number(params.objectiveId));
  const { passageContent, isPassageContentLoading, evaluate, result } = useEvaluation(objective);

  // loading content
  if (isPassageContentLoading) {
    return <FullPageLoading />;
  }

  // if passage content is not found
  if (!passageContent || passageContent === "") {
    return <SimpleError />;
  }

  // if result exists
  if (result !== undefined && result !== null) {
    return <EvaluationResult score={result.score} />;
  }

  // passage audio capture screen
  return <EvaluationCapture onListen={evaluate} />;
};

export const Evaluate = WithHeaderNavigation(EvaluatePage);
