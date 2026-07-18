import fs from 'node:fs';
import path from 'node:path';
import { app } from 'electron';
import { getDatabasePath } from '../db/database.js';
import { ensureDirectory } from '../utils/logger.js';

export class BackupService {
  getBackupDir() {
    const backupDir = path.join(app.getPath('userData'), 'backups');
    ensureDirectory(backupDir);
    return backupDir;
  }

  createBackup() {
    const source = getDatabasePath();
    const backupName = `stockops-${new Date().toISOString().replace(/[:.]/g, '-')}.db`;
    const target = path.join(this.getBackupDir(), backupName);
    fs.copyFileSync(source, target);
    return { path: target };
  }

  restoreBackup(backupPath) {
    const target = getDatabasePath();
    fs.copyFileSync(backupPath, target);
    return { path: target };
  }
}