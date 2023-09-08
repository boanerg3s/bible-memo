declare namespace App {
  interface Objective {
    id: number;
    score: number;
    lastSeen: boolean;
    passage: Bible.Passage;
  }

  interface SuggestedObjective {
    passage: Bible.SuggestedPassage;
  }
}
