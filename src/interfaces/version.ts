declare namespace Bible {
  export type EnglishVersion = "A" | "B" | "C";
  export type BrazilianPortugueseVersion = "ARA" | "ARC" | "NVT";
  export type Version = EnglishVersion | BrazilianPortugueseVersion;

  export interface VersionList<T = string> {
    en: Record<EnglishVersion, T>;
    ptbr: Record<BrazilianPortugueseVersion, T>;
  }
}
