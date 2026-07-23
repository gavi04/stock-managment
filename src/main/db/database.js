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
  
  // Safe migration for development
  try {
    const hasData = db.prepare(`SELECT COUNT(*) as c FROM purchases`).get().c > 0;
    if (!hasData) {
      db.exec(`DROP TABLE IF EXISTS purchase_items; DROP TABLE IF EXISTS purchases;`);
    }

    const hasProdData = db.prepare(`SELECT COUNT(*) as c FROM production`).get().c > 0;
    if (!hasProdData) {
      db.exec(`DROP TABLE IF EXISTS production_items; DROP TABLE IF EXISTS production;`);
    }

    const hasSaleData = db.prepare(`SELECT COUNT(*) as c FROM sales`).get().c > 0;
    if (!hasSaleData) {
      db.exec(`DROP TABLE IF EXISTS sale_items; DROP TABLE IF EXISTS sales;`);
    }
  } catch (e) {}

  const migration = db.transaction(() => {
    for (const statement of schemaStatements) {
      db.prepare(statement).run();
    }

    for (const statement of getSeedStatements()) {
      db.prepare(statement).run();
    }
  });

  migration();

  // Add new columns to parties if they don't exist
  const addColumn = (table, column, def) => {
    const cols = db.pragma(`table_info(${table})`);
    if (!cols.find(c => c.name === column)) {
      try { db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`).run(); } catch(e) {}
    }
  };
  addColumn('parties', 'mobile', 'TEXT');
  addColumn('parties', 'city', 'TEXT');
  addColumn('parties', 'district', 'TEXT');
  addColumn('parties', 'state', 'TEXT');
  addColumn('parties', 'pin_code', 'TEXT');
  addColumn('parties', 'gstin', 'TEXT');
  addColumn('settings', 'production_settings_json', 'TEXT DEFAULT "{}"');

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