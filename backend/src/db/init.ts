import Database from "better-sqlite3";

const db = new Database("learnlog.db");

db.exec(`
CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    term TEXT NOT NULL,
    meaning TEXT NOT NULL,
    example TEXT,
    category TEXT,
    source_name TEXT,
    source_url TEXT,
    created_at TEXT NOT NULL
);
`);