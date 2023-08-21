import * as SQLite from "expo-sqlite";

/**
 * Get the SQLite Connection
 * @returns a valid database connection
 */
const getConnection = () => {
  return SQLite.openDatabase("database.db");
};

/**
 * Transact a mutation SQL query
 * @param query any create, update, delete sql query
 * @param params params to be attached to the query
 * @returns
 */
export const transact = (query: string, params?: number[] | string[]) => {
  return new Promise((res, rej) => {
    const conn = getConnection();
    const cb: SQLite.SQLTransactionCallback = (tx) => tx.executeSql(query, params);
    conn.transaction(cb, rej, () => res(true));
  });
};

/**
 * Execute a SQL query
 * @param query any create, update, delete sql query
 * @param params params to be attached to the query
 * @returns
 */
export const execute = (query: string, params?: number[] | string[]): Promise<SQLite.ResultSet[]> => {
  return new Promise((res, rej) => {
    const conn = getConnection();

    const callback: SQLite.SQLiteCallback = (error, result) => {
      if (error) return rej(error);
      res(result as any);
    };

    conn.exec([{ args: params || [], sql: query }], true, callback);
  });
};

/**
 * Create all app tables if they don't exists
 * @returns void
 */
export const initializeDatabase = async () => {
  await execute("PRAGMA foreign_keys = ON;");

  await transact(`
    CREATE TABLE IF NOT EXISTS objective (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      progress INTEGER,
      last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
      book TEXT NOT NULL,
      language TEXT NOT NULL,
      version TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      verse_from INTEGER NOT NULL,
      verse_to INTEGER NOT NULL
    );
  `);
};
