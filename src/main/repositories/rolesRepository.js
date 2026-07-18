import { BaseRepository } from './baseRepository.js';
import { getAll } from '../db/queryRunner.js';

export class RolesRepository extends BaseRepository {
  constructor() {
    super('roles');
  }

  findByCode(code) {
    return getAll('SELECT * FROM roles WHERE code = :code AND deleted_at IS NULL', { code })[0] ?? null;
  }
}