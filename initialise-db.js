import Database from "better-sqlite3";

const db = new Database("sqlite.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

const createTableStatements = [
  `CREATE TABLE IF NOT EXISTS events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	url TEXT,
	);`,
  `CREATE TABLE IF NOT EXISTS djs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  ra_url TEXT NULL,
  soundcloud_url TEXT NULL,
  )`,
  `CREATE TABLE IF NOT EXISTS mixes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  uploader_url TEXT NULL,
  full_mp3_url TEXT NULL,
  fulL_mp3_duration TEXT NULL,
  preview_mp3_url TEXT NULL,
  preview_mp3_duration TEXT NULL,
  dj_id INTEGER NOT NULL,
  FOREIGN KEY (dj_id) REFERENCES djs(id)
  )`,
];

createTableStatements.forEach((statement) => {
  db.exec(statement);
});

db.close();
