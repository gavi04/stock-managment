import path from 'node:path';
import { app } from 'electron';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../generated/prisma/client';
import { ensureDirectory, logger } from '../utils/logger.js';
import { applyMigrations } from './migrate.js';
import { seedDatabase } from './seed.js';

let prisma;

export function getDatabasePath() {
  const userDataPath = app.getPath('userData');
  ensureDirectory(userDataPath);
  return path.join(userDataPath, 'stockops.db');
}

export function getPrismaClient() {
  if (!prisma) {
    const adapter = new PrismaBetterSqlite3({ url: getDatabasePath() });
    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}

export async function initializeDatabase() {
  const dbPath = getDatabasePath();
  applyMigrations(dbPath);

  const client = getPrismaClient();
  await seedDatabase(client);

  logger.info('database initialized', { dbPath });
  return client;
}

export async function closeDatabase() {
  if (prisma) {
    await prisma.$disconnect();
    prisma = undefined;
  }
}
