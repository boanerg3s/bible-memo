declare namespace Bible {
  export type Language = keyof Bible.VersionList;
}

declare namespace App {
  export type Language = keyof Bible.VersionList;
  export type LocaleDefinition<T = App.Locale> = Record<App.Language, T>;
  export interface Locale {}
}
