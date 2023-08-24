declare namespace App {
  export interface Locale {
    bible: {
      abbreviation: Record<Bible.Book, string>;
      label: Record<Bible.Book, string>;
    };
  }
}
