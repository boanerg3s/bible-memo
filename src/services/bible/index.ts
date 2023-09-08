import axios from "axios";

export const getPassageContent = async (passage: Bible.Passage): Promise<App.BibleVerse[] | null> => {
  try {
    const host = "https://boanerg3s.github.io/json-bible";
    const language = passage.language.toUpperCase();
    const version = passage.version.toUpperCase();
    const book = passage.book.toUpperCase();
    const endpoint = `${host}/${language}/${version}/${book}/${passage.chapter}.json`;
    const { data } = await axios.get<App.BibleVerse[]>(endpoint);
    return data.filter(({ number }) => number >= passage.verseFrom && number <= passage.verseTo);
  } catch (err) {
    console.log(err);
    return null;
  }
};
