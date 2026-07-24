import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { app } from 'electron';
import { logger } from '../utils/logger.js';

function getMigrationsDir() {
  return path.join(app.getAppPath(), 'prisma', 'migrations');
}

function listMigrationFolders(migrationsDir) {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }

  return fs
    .readdirSync(migrationsDir)
    .filter((name) => fs.statSync(path.join(migrationsDir, name)).isDirectory())
    .sort();
}

/**
 * Applies Prisma-generated migration.sql files directly against the runtime
 * database file, tracking progress in a `_prisma_migrations` table. This
 * stands in for `prisma migrate deploy`, which cannot be invoked from inside
 * a packaged Electron app.
 */
export function applyMigrations(dbPath) {
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  try {
    db.exec(`CREATE TABLE IF NOT EXISTS _prisma_migrations (
      id TEXT PRIMARY KEY,
      migration_name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    const applied = new Set(
      db.prepare('SELECT migration_name FROM _prisma_migrations').all().map((row) => row.migration_name)
    );

    const migrationsDir = getMigrationsDir();
    const pending = listMigrationFolders(migrationsDir).filter((name) => !applied.has(name));

    for (const folder of pending) {
      const sqlPath = path.join(migrationsDir, folder, 'migration.sql');
      if (!fs.existsSync(sqlPath)) continue;

      const sql = fs.readFileSync(sqlPath, 'utf8');
      const apply = db.transaction(() => {
        db.exec(sql);
        db.prepare('INSERT INTO _prisma_migrations (id, migration_name) VALUES (?, ?)').run(
          `${folder}-${Date.now()}`,
          folder
        );
      });

      apply();
      logger.info('applied migration', { folder });
    }
  } finally {
    db.close();
  }
}
