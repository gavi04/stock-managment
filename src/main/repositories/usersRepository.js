import { BaseRepository } from './baseRepository.js';
import { getOne } from '../db/queryRunner.js';

export class UsersRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  findByUsername(username) {
    return getOne(
      'SELECT users.*, roles.code as role_code, roles.permissions_json FROM users INNER JOIN roles ON roles.id = users.role_id WHERE users.username = :username AND users.deleted_at IS NULL',
      { username }
    );
  }

  findByUsernameWithPassword(username) {
    return getOne(
      'SELECT users.*, roles.code as role_code, roles.permissions_json FROM users INNER JOIN roles ON roles.id = users.role_id WHERE users.username = :username',
      { username }
    );
  }
}