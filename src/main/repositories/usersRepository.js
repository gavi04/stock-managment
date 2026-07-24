import { BaseRepository } from './baseRepository.js';
import { toWire } from '../utils/caseMapper.js';

function flattenWithRole(row) {
  if (!row) return null;
  const { role, ...user } = row;
  const wire = toWire(user);
  wire.role_code = role.code;
  wire.permissions_json = role.permissionsJson;
  return wire;
}

export class UsersRepository extends BaseRepository {
  constructor() {
    super('user');
  }

  async findByUsername(username) {
    const row = await this.model.findFirst({
      where: { username, deletedAt: null },
      include: { role: true }
    });
    return flattenWithRole(row);
  }

  async findByUsernameWithPassword(username) {
    const row = await this.model.findFirst({
      where: { username },
      include: { role: true }
    });
    return flattenWithRole(row);
  }
}
