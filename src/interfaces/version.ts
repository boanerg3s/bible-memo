declare namespace Bible {
  export type EnglishVersion = "A" | "B" | "C";

  export type BrazilianPortugueseVersion =
    | "ACF"
    | "ARA"
    | "ARC"
    | "AS21"
    | "JFAA"
    | "KJA"
    | "KJF"
    | "NAA"
    | "NBV"
    | "NTLH"
    | "NVI"
    | "NVT"
    | "TB";

  export type Version = EnglishVersion | BrazilianPortugueseVersion;

  export interface VersionList<T = string> {
    en: Record<EnglishVersion, T>;
    ptbr: Record<BrazilianPortugueseVersion, T>;
  }
}
