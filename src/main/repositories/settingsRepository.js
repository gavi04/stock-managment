import { getOne, runQuery } from '../db/queryRunner.js';

export class SettingsRepository {
  get() {
    return getOne('SELECT * FROM settings WHERE id = 1');
  }

  update(payload) {
    runQuery(
      `UPDATE settings
       SET company_name = :company_name,
           allow_duplicate_barcodes = :allow_duplicate_barcodes,
           allow_negative_stock = :allow_negative_stock,
           enable_auto_backup = :enable_auto_backup,
           backup_interval_hours = :backup_interval_hours,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = 1`,
      payload
    );
    return this.get();
  }
}