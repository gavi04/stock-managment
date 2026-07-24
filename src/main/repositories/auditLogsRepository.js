import { BaseRepository } from './baseRepository.js';
import { fromWire, toWire } from '../utils/caseMapper.js';

export class AuditLogsRepository extends BaseRepository {
  constructor() {
    super('auditLog');
  }

  async createLog(payload) {
    const row = await this.model.create({ data: fromWire(payload) });
    return toWire(row);
  }

  async recent(limit = 100) {
    const rows = await this.model.findMany({
      orderBy: { id: 'desc' },
      take: Number(limit)
    });
    return toWire(rows);
  }
}
