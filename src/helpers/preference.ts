import * as db from "@/services/database-service";

/**
 * Get a single preference by its id
 * @returns a preference row
 */
export const getPreference = async (id: App.Preference["id"]): Promise<App.Preference | null> => {
  const [results] = await db.execute(`select * from preference where id = ?;`, [id]);

  if (results.rows) {
    const result = results.rows[0];
    return result as App.Preference;
  }

  return null;
};

/**
 * Save a preference value
 * @param id preference id
 * @param value stringfied json
 */
export const savePreference = async (id: App.Preference["id"], value: string): Promise<void> => {
  const query = `replace into preference (id, value) values (?, ?);`;
  await db.transact(query, [id, value]);
};

/**
 * Delete a objective from database
 * @param id
 */
export const removePreference = async (id: App.Preference["id"]): Promise<void> => {
  await db.transact(`delete from preference where id = ?;`, [id]);
};
