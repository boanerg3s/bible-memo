declare namespace Bible {
  export type Language = "en" | "pt";
}

declare namespace App {
  export type Language = "en" | "pt";
  export type LocaleDefinition<T = App.Locale> = Record<App.Language, T>;
  export interface Locale {}
}
