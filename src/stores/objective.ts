import { create } from "zustand";
import * as ObjectiveService from "@/services/objective-service";

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
    const newObjectives = await ObjectiveService.getObjectives();
    set((state) => ({ ...state, objectives: newObjectives, loading: false }));
  };

  const newObjective = async (passage: Bible.Passage) => {
    await ObjectiveService.newObjective(passage);
    await fetchObjectives();
  };

  const removeObjective = async (id: number) => {
    await ObjectiveService.removeObjective(id);
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
