import { BaseRepository } from './baseRepository.js';
import { toWire } from '../utils/caseMapper.js';

export class RolesRepository extends BaseRepository {
  constructor() {
    super('role');
  }

  async findByCode(code) {
    const row = await this.model.findFirst({ where: { code, deletedAt: null } });
    return toWire(row);
  }
}
