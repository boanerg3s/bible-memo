declare namespace App {
  interface Objective {
    id: number;
    progress: number;
    lastSeen: boolean;
    passage: Bible.Passage;
  }
}
