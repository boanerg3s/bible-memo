declare namespace Bible {
  interface Passage {
    book: Bible.Book;
    chapter: number;
    verseFrom: number;
    verseTo: number;
    language: keyof Bible.VersionList;
    version: Bible.Version;
  }
}
