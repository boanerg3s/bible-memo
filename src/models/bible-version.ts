const languages: Bible.VersionList<{ isFavorite: boolean }> = {
  en: {
    A: { isFavorite: false },
    B: { isFavorite: true },
    C: { isFavorite: false },
  },
  ptbr: {
    ARA: { isFavorite: false },
    ARC: { isFavorite: false },
    NVT: { isFavorite: true },
  },
};

export default languages;
