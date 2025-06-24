import Database from 'better-sqlite3';

export const db = new Database('spiral.db');

export function init() {
  db.exec('CREATE TABLE IF NOT EXISTS nodes(id TEXT PRIMARY KEY, data TEXT)');
}
