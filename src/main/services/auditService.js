import { AuditLogsRepository } from '../repositories/auditLogsRepository.js';

const auditLogsRepository = new AuditLogsRepository();

export class AuditService {
  log(entry) {
    return auditLogsRepository.createLog({
      actor_user_id: entry.actorUserId ?? null,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId ?? null,
      payload_json: JSON.stringify(entry.payload ?? {}),
      ip_address: entry.ipAddress ?? null,
      user_agent: entry.userAgent ?? null
    });
  }

  recent(limit = 100) {
    return auditLogsRepository.recent(limit);
  }
}