import { create } from "zustand";
import * as ObjectiveHelper from "@/helpers/objective";

interface ObjectiveStore {
  loading: boolean;
  objectives: App.Objective[];
  fetchObjectives: () => Promise<void>;
  newObjective: (passage: Bible.Passage) => Promise<void>;
  removeObjective: (id: number) => Promise<void>;
}

export const useObjectiveStore = create<ObjectiveStore>((set) => {
  const fetchObjectives = async () => {
    set((state) => ({ ...state, loading: true }));
    const newObjectives = await ObjectiveHelper.getObjectives();
    set((state) => ({ ...state, objectives: newObjectives, loading: false }));
  };

  const newObjective = async (passage: Bible.Passage) => {
    await ObjectiveHelper.newObjective(passage);
    await fetchObjectives();
  };

  const removeObjective = async (id: number) => {
    await ObjectiveHelper.removeObjective(id);
    await fetchObjectives();
  };

  return {
    objectives: [],
    loading: false,
    fetchObjectives,
    newObjective,
    removeObjective,
  };
});
