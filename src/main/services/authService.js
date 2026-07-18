import bcrypt from 'bcryptjs';
import { AppError } from '../utils/errors.js';
import { validate } from '../utils/validation.js';
import { UsersRepository } from '../repositories/usersRepository.js';
import { RolesRepository } from '../repositories/rolesRepository.js';
import { getOne } from '../db/queryRunner.js';
import { z } from 'zod';

const usersRepository = new UsersRepository();
const rolesRepository = new RolesRepository();
const PRIMARY_ROLE_CODE = 'ADMIN';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export class AuthService {
  needsBootstrap() {
    const row = getOne('SELECT COUNT(*) AS count FROM users WHERE deleted_at IS NULL');
    return Number(row?.count ?? 0) === 0;
  }

  async login(input) {
    const data = validate(loginSchema, input);
    const user = usersRepository.findByUsernameWithPassword(data.username);

    if (!user || !bcrypt.compareSync(data.password, user.password_hash)) {
      throw new AppError('Invalid username or password', 'AUTH_INVALID_CREDENTIALS', 401);
    }

    return {
      id: user.id,
      fullName: user.full_name,
      username: user.username,
      role: {
        id: user.role_id,
        code: user.role_code,
        permissions: JSON.parse(user.permissions_json || '[]')
      }
    };
  }

  async createUser(input) {
    if (!this.needsBootstrap()) {
      throw new AppError('Single-user mode is enabled. Account already initialized.', 'SINGLE_USER_LOCKED', 403);
    }

    const role = rolesRepository.findByCode(PRIMARY_ROLE_CODE);
    if (!role) {
      throw new AppError('Role not found', 'ROLE_NOT_FOUND', 404);
    }

    const passwordHash = bcrypt.hashSync(input.password, 12);
    return usersRepository.create(['full_name', 'username', 'password_hash', 'role_id', 'status'], {
      full_name: input.fullName,
      username: input.username,
      password_hash: passwordHash,
      role_id: role.id,
      status: input.status ?? 'active'
    });
  }
}