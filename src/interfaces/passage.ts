interface BasePassage {
  book: Bible.Book;
  chapter: number;
  verseFrom: number;
  verseTo: number;
}

interface PortuguesePassage {
  language: "PTBR";
  version: Bible.PortugueseVersion;
}

interface EnglishPassage {
  language: "EN";
  version: Bible.EnglishVersion;
}

declare namespace Bible {
  type Passage = (BasePassage & PortuguesePassage) | (BasePassage & EnglishPassage);
}
