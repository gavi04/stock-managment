import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/errors.js';
import { validate } from '../utils/validation.js';
import { UsersRepository } from '../repositories/usersRepository.js';
import { RolesRepository } from '../repositories/rolesRepository.js';
import { getPrismaClient } from '../db/database.js';
import { z } from 'zod';

const usersRepository = new UsersRepository();
const rolesRepository = new RolesRepository();
const PRIMARY_ROLE_CODE = 'ADMIN';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

const resetSchema = z.object({
  username: z.string().min(1),
  recoveryCode: z.string().min(1),
  newPassword: z.string().min(8)
});

// Human-friendly one-time code, e.g. ABCD-EFGH-JKLM-NPQR. 16 chars from a
// 32-symbol alphabet (~80 bits) — ambiguous characters (0/O/1/I) are excluded so
// it can be written down and typed back without confusion.
const RECOVERY_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateRecoveryCode() {
  const bytes = crypto.randomBytes(16);
  let out = '';
  for (let i = 0; i < 16; i += 1) {
    out += RECOVERY_ALPHABET[bytes[i] % RECOVERY_ALPHABET.length];
    if (i % 4 === 3 && i < 15) out += '-';
  }
  return out;
}

// Canonical form used for hashing/comparison: upper-case, no dashes or spaces, so
// the user can type the code with or without the display dashes and in any case.
function normalizeRecoveryCode(code) {
  return String(code || '').toUpperCase().replace(/[\s-]+/g, '');
}

export class AuthService {
  async needsBootstrap() {
    const count = await getPrismaClient().user.count({ where: { deletedAt: null } });
    return count === 0;
  }

  async login(input) {
    const data = validate(loginSchema, input);
    const user = await usersRepository.findByUsernameWithPassword(data.username);

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
    if (!(await this.needsBootstrap())) {
      throw new AppError('Single-user mode is enabled. Account already initialized.', 'SINGLE_USER_LOCKED', 403);
    }

    const role = await rolesRepository.findByCode(PRIMARY_ROLE_CODE);
    if (!role) {
      throw new AppError('Role not found', 'ROLE_NOT_FOUND', 404);
    }

    const passwordHash = bcrypt.hashSync(input.password, 12);
    const recoveryCode = generateRecoveryCode();
    const user = await usersRepository.create({
      full_name: input.fullName,
      username: input.username,
      password_hash: passwordHash,
      recovery_code_hash: bcrypt.hashSync(normalizeRecoveryCode(recoveryCode), 12),
      role_id: role.id,
      status: input.status ?? 'active'
    });

    // The plaintext code is returned exactly once so the UI can show it; only its
    // hash is stored, so it can never be read back.
    return { user, recoveryCode };
  }

  // Offline "forgot password": the user proves ownership with the recovery code
  // shown at setup, sets a new password, and receives a fresh recovery code (the
  // old one is consumed).
  async resetPassword(input) {
    const data = validate(resetSchema, input);
    const user = await usersRepository.findByUsernameWithPassword(data.username);

    if (!user) {
      throw new AppError('Invalid username or recovery code', 'AUTH_INVALID_RECOVERY', 401);
    }
    if (!user.recovery_code_hash) {
      throw new AppError(
        'This account has no recovery code set, so the password cannot be reset here.',
        'AUTH_NO_RECOVERY',
        400
      );
    }
    if (!bcrypt.compareSync(normalizeRecoveryCode(data.recoveryCode), user.recovery_code_hash)) {
      throw new AppError('Invalid username or recovery code', 'AUTH_INVALID_RECOVERY', 401);
    }

    const recoveryCode = generateRecoveryCode();
    await usersRepository.update(user.id, {
      password_hash: bcrypt.hashSync(data.newPassword, 12),
      recovery_code_hash: bcrypt.hashSync(recoveryCode, 12)
    });

    return { recoveryCode };
  }
}
