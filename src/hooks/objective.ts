import { useObjectiveStore } from "@/stores/objective";

export const useObjective = (objectiveId: number): App.Objective => {
  const { objectives } = useObjectiveStore();
  return objectives.find((objective) => objective.id === objectiveId)!;
};
