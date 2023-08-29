declare namespace Bible {
  interface SuggestedPassage {
    book: Bible.Book;
    chapter: number;
    verseFrom: number;
    verseTo: number;
  }

  interface Passage extends SuggestedPassage {
    language: keyof Bible.VersionList;
    version: Bible.Version;
  }
}
