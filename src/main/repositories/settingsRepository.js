import { getPrismaClient } from '../db/database.js';
import { fromWire, toWire } from '../utils/caseMapper.js';

export class SettingsRepository {
  async get() {
    const row = await getPrismaClient().setting.findUnique({ where: { id: 1 } });
    return toWire(row);
  }

  async update(payload) {
    const data = fromWire(payload);
    await getPrismaClient().setting.update({
      where: { id: 1 },
      data: {
        companyName: data.companyName,
        allowDuplicateBarcodes: data.allowDuplicateBarcodes,
        allowNegativeStock: data.allowNegativeStock,
        enableAutoBackup: data.enableAutoBackup,
        backupIntervalHours: data.backupIntervalHours
      }
    });
    return this.get();
  }
}
