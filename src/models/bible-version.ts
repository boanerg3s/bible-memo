const languages: Bible.VersionList<{ isFavorite: boolean }> = {
  en: {
    A: { isFavorite: false },
    B: { isFavorite: true },
    C: { isFavorite: false },
  },
  ptbr: {
    ARA: { isFavorite: true },
    ARC: { isFavorite: false },
    NVT: { isFavorite: false },
    ACF: { isFavorite: false },
    AS21: { isFavorite: false },
    JFAA: { isFavorite: false },
    KJA: { isFavorite: false },
    KJF: { isFavorite: false },
    NAA: { isFavorite: false },
    NBV: { isFavorite: false },
    NTLH: { isFavorite: false },
    NVI: { isFavorite: false },
    TB: { isFavorite: false },
  },
};

export default languages;
