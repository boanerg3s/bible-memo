declare namespace Bible {
  export type EnglishVersion = "A" | "B" | "C";
  export type PortugueseVersion = "ARA" | "ARC" | "NVT";
  export type Version = EnglishVersion | PortugueseVersion;

  export interface VersionList<T = string> {
    en: Record<EnglishVersion, T>;
    pt: Record<PortugueseVersion, T>;
  }
}
