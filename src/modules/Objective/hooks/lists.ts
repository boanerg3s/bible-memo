import { useObjectiveStore } from "@/stores/objective";

export const useObjectiveList = (): App.Objective[] => {
  const { objectives, objectiveOfTheWeek } = useObjectiveStore();

  // non repeated objectives only
  return objectives.filter(
    ({ passage }) =>
      passage.book !== objectiveOfTheWeek.passage.book ||
      passage.chapter !== objectiveOfTheWeek.passage.chapter ||
      passage.verseFrom !== objectiveOfTheWeek.passage.verseFrom ||
      passage.verseTo !== objectiveOfTheWeek.passage.verseTo
  );
};

export const useSuggestedObjective = (): App.SuggestedObjective | App.Objective => {
  const { objectives, objectiveOfTheWeek } = useObjectiveStore();

  const equivalentObjective = objectives.find(
    ({ passage }) =>
      passage.book === objectiveOfTheWeek.passage.book &&
      passage.chapter === objectiveOfTheWeek.passage.chapter &&
      passage.verseFrom === objectiveOfTheWeek.passage.verseFrom &&
      passage.verseTo === objectiveOfTheWeek.passage.verseTo
  );

  return equivalentObjective || objectiveOfTheWeek;
};
