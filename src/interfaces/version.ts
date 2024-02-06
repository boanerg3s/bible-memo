declare namespace Bible {
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

  export type Version = BrazilianPortugueseVersion;

  export interface VersionList<T = string> {
    ptbr: Record<BrazilianPortugueseVersion, T>;
  }
}
