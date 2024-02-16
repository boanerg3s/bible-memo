import { create } from "zustand";
import { getWeekNumber } from "@/helpers/date";
import * as ObjectiveHelper from "@/helpers/objective";

interface ObjectiveStore {
  loading: boolean;
  objectives: App.Objective[];
  objectiveOfTheWeek: App.SuggestedObjective;
  fetchObjectives: () => Promise<App.Objective[]>;
  newObjective: (passage: Bible.Passage) => Promise<number>;
  removeObjective: (id: number) => Promise<void>;
  updateLastSeen: (id: number) => Promise<void>;
  updateScore: (score: number, id: number) => Promise<void>;
}

const WEEKS: App.SuggestedObjective[] = [
  { passage: { book: "GN", chapter: 1, verseFrom: 1, verseTo: 1 } },
  { passage: { book: "GN", chapter: 1, verseFrom: 26, verseTo: 27 } },
  { passage: { book: "GN", chapter: 2, verseFrom: 7, verseTo: 7 } },
  { passage: { book: "GN", chapter: 2, verseFrom: 18, verseTo: 18 } },
  { passage: { book: "GN", chapter: 2, verseFrom: 24, verseTo: 24 } },
  { passage: { book: "GN", chapter: 3, verseFrom: 19, verseTo: 19 } },
  { passage: { book: "GN", chapter: 12, verseFrom: 1, verseTo: 3 } },
  { passage: { book: "GN", chapter: 15, verseFrom: 6, verseTo: 6 } },
  { passage: { book: "GN", chapter: 22, verseFrom: 1, verseTo: 14 } },
  { passage: { book: "GN", chapter: 28, verseFrom: 15, verseTo: 15 } },
  { passage: { book: "GN", chapter: 50, verseFrom: 20, verseTo: 20 } },
  { passage: { book: "EX", chapter: 3, verseFrom: 14, verseTo: 14 } },
  { passage: { book: "EX", chapter: 14, verseFrom: 14, verseTo: 14 } },
  { passage: { book: "EX", chapter: 20, verseFrom: 1, verseTo: 17 } },
  { passage: { book: "EX", chapter: 33, verseFrom: 14, verseTo: 14 } },
  { passage: { book: "LV", chapter: 19, verseFrom: 18, verseTo: 18 } },
  { passage: { book: "NM", chapter: 6, verseFrom: 24, verseTo: 26 } },
  { passage: { book: "DT", chapter: 6, verseFrom: 4, verseTo: 5 } },
  { passage: { book: "DT", chapter: 28, verseFrom: 1, verseTo: 14 } },
  { passage: { book: "JS", chapter: 1, verseFrom: 9, verseTo: 9 } },
  { passage: { book: "JG", chapter: 6, verseFrom: 12, verseTo: 14 } },
  { passage: { book: "RT", chapter: 1, verseFrom: 16, verseTo: 17 } },
  { passage: { book: "1SM", chapter: 16, verseFrom: 7, verseTo: 7 } },
  { passage: { book: "2SM", chapter: 22, verseFrom: 31, verseTo: 31 } },
  { passage: { book: "1KGS", chapter: 3, verseFrom: 5, verseTo: 14 } },
  { passage: { book: "2CH", chapter: 7, verseFrom: 14, verseTo: 14 } },
  { passage: { book: "JOB", chapter: 1, verseFrom: 21, verseTo: 21 } },
  { passage: { book: "PS", chapter: 1, verseFrom: 1, verseTo: 2 } },
  { passage: { book: "PS", chapter: 23, verseFrom: 1, verseTo: 4 } },
  { passage: { book: "PS", chapter: 46, verseFrom: 10, verseTo: 10 } },
  { passage: { book: "PROV", chapter: 3, verseFrom: 5, verseTo: 6 } },
  { passage: { book: "ECC", chapter: 3, verseFrom: 1, verseTo: 8 } },
  { passage: { book: "SONG", chapter: 2, verseFrom: 16, verseTo: 17 } },
  { passage: { book: "ISA", chapter: 7, verseFrom: 14, verseTo: 14 } },
  { passage: { book: "ISA", chapter: 9, verseFrom: 6, verseTo: 7 } },
  { passage: { book: "ISA", chapter: 40, verseFrom: 31, verseTo: 31 } },
  { passage: { book: "JER", chapter: 29, verseFrom: 11, verseTo: 11 } },
  { passage: { book: "EZK", chapter: 36, verseFrom: 26, verseTo: 26 } },
  { passage: { book: "DAN", chapter: 3, verseFrom: 16, verseTo: 18 } },
  { passage: { book: "HOS", chapter: 6, verseFrom: 6, verseTo: 6 } },
  { passage: { book: "JOL", chapter: 2, verseFrom: 28, verseTo: 32 } },
  { passage: { book: "AM", chapter: 5, verseFrom: 24, verseTo: 24 } },
  { passage: { book: "MIC", chapter: 6, verseFrom: 8, verseTo: 8 } },
  { passage: { book: "NAH", chapter: 1, verseFrom: 7, verseTo: 7 } },
  { passage: { book: "HAB", chapter: 2, verseFrom: 4, verseTo: 4 } },
  { passage: { book: "ZEPH", chapter: 3, verseFrom: 17, verseTo: 17 } },
  { passage: { book: "HAG", chapter: 2, verseFrom: 9, verseTo: 9 } },
  { passage: { book: "ZEC", chapter: 4, verseFrom: 6, verseTo: 6 } },
  { passage: { book: "MAL", chapter: 3, verseFrom: 10, verseTo: 10 } },
  { passage: { book: "MT", chapter: 5, verseFrom: 3, verseTo: 12 } },
  { passage: { book: "MT", chapter: 6, verseFrom: 9, verseTo: 13 } },
  { passage: { book: "MT", chapter: 7, verseFrom: 7, verseTo: 8 } },
  { passage: { book: "MT", chapter: 11, verseFrom: 28, verseTo: 30 } },
  { passage: { book: "MT", chapter: 28, verseFrom: 19, verseTo: 20 } },
  { passage: { book: "JN", chapter: 3, verseFrom: 16, verseTo: 16 } },
];

export const useObjectiveStore = create<ObjectiveStore>((set) => {
  const fetchObjectives = async () => {
    set((state) => ({ ...state, loading: true }));
    const newObjectives = await ObjectiveHelper.getObjectives();
    set((state) => ({ ...state, objectives: newObjectives, loading: false }));
    return newObjectives;
  };

  const newObjective = async (passage: Bible.Passage) => {
    const objectives = await fetchObjectives();
    const equivalentObjective = await ObjectiveHelper.getObjectiveByPassage(objectives, passage);
    if (equivalentObjective) return equivalentObjective!.id;

    await ObjectiveHelper.newObjective(passage);

    const newObjectives = await fetchObjectives();
    const newEquivalentObjective = await ObjectiveHelper.getObjectiveByPassage(newObjectives, passage);
    return newEquivalentObjective!.id;
  };

  const removeObjective = async (id: number) => {
    await ObjectiveHelper.removeObjective(id);
    await fetchObjectives();
  };

  const updateLastSeen = async (id: number) => {
    await ObjectiveHelper.updateLastSeen(id);
    await fetchObjectives();
  };

  const updateScore = async (score: number, id: number) => {
    await ObjectiveHelper.updateScore(score, id);
    await fetchObjectives();
  };

  return {
    objectives: [],
    loading: false,
    fetchObjectives,
    newObjective,
    removeObjective,
    updateLastSeen,
    updateScore,
    objectiveOfTheWeek: WEEKS[getWeekNumber(new Date())],
  };
});
