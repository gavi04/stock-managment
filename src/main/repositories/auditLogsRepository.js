import { BaseRepository } from './baseRepository.js';
import { getAll, runQuery } from '../db/queryRunner.js';

export class AuditLogsRepository extends BaseRepository {
  constructor() {
    super('audit_logs');
  }

  createLog(payload) {
    return runQuery(
      `INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, payload_json, ip_address, user_agent)
       VALUES (:actor_user_id, :action, :entity_type, :entity_id, :payload_json, :ip_address, :user_agent)`,
      payload
    );
  }

  recent(limit = 100) {
    return getAll('SELECT * FROM audit_logs ORDER BY id DESC LIMIT :limit', { limit });
  }
}