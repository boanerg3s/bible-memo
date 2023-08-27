declare namespace App {
  export interface Locale {
    bible: {
      version: Bible.VersionList;
      language: Record<Bible.Language, string>;
      abbreviation: Record<Bible.Book, string>;
      label: Record<Bible.Book, string>;
    };
  }
}
