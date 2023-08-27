const languages: Bible.VersionList<{ isFavorite: boolean }> = {
  en: {
    A: { isFavorite: false },
    B: { isFavorite: true },
    C: { isFavorite: false },
  },
  pt: {
    ARA: { isFavorite: false },
    ARC: { isFavorite: false },
    NVT: { isFavorite: true },
  },
};

export default languages;
