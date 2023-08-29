import * as db from "@/services/database";

/**
 * Get all objectives from database
 * @returns a list of objectives
 */
export const getObjectives = async (): Promise<App.Objective[]> => {
  const [results] = await db.execute(`select * from objective order by last_seen desc`);

  return results.rows.map<App.Objective>((result, index) => {
    return {
      id: result.id,
      lastSeen: index === 0,
      progress: result.progress,
      passage: {
        book: result.book,
        language: result.language,
        version: result.version,
        chapter: result.chapter,
        verseFrom: result.verse_from,
        verseTo: result.verse_to,
      },
    };
  });
};

/**
 * Save a new objective into objective table
 * @param passage
 */
export const newObjective = async (passage: Bible.Passage): Promise<void> => {
  const query = `
    insert into objective (progress, book, language, version, chapter, verse_from, verse_to)
    values (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    0,
    passage.book,
    passage.language,
    passage.version,
    passage.chapter,
    passage.verseFrom,
    passage.verseTo,
  ];

  await db.transact(query, params);
};

/**
 * Delete a objective from database
 * @param id
 */
export const removeObjective = async (id: number): Promise<void> => {
  await db.transact(`delete from objective where id = ?;`, [id]);
};

/**
 * Get the equivalent objective given a passage
 * @param objectives
 * @param passage
 * @returns App.Objective or undefined
 */
export const getObjectiveByPassage = async (
  objectives: App.Objective[],
  passage: Bible.Passage
): Promise<App.Objective | undefined> => {
  return objectives.find(
    (objective) =>
      objective.passage.book === passage.book &&
      objective.passage.chapter === Number(passage.chapter) &&
      objective.passage.language === passage.language &&
      objective.passage.verseFrom === Number(passage.verseFrom) &&
      objective.passage.verseTo === Number(passage.verseTo) &&
      objective.passage.version === passage.version
  );
};
