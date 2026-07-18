import Database from 'better-sqlite3';
import path from 'node:path';
import { app } from 'electron';
import { ensureDirectory, logger } from '../utils/logger.js';
import { getSeedStatements, schemaStatements } from './schema.js';

let database;

export function getDatabasePath() {
  const userDataPath = app.getPath('userData');
  ensureDirectory(userDataPath);
  return path.join(userDataPath, 'stockops.db');
}

export function createDatabase() {
  if (!database) {
    database = new Database(getDatabasePath());
    database.pragma('journal_mode = WAL');
    database.pragma('foreign_keys = ON');
  }

  return database;
}

export function initializeDatabase() {
  const db = createDatabase();
  const migration = db.transaction(() => {
    for (const statement of schemaStatements) {
      db.prepare(statement).run();
    }

    for (const statement of getSeedStatements()) {
      db.prepare(statement).run();
    }
  });

  migration();
  logger.info('database initialized', { dbPath: getDatabasePath() });
  return db;
}

export function getDatabase() {
  return createDatabase();
}

export function closeDatabase() {
  if (database) {
    database.close();
    database = undefined;
  }
}