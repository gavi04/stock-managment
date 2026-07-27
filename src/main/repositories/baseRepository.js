import { getPrismaClient } from '../db/database.js';
import { fromWire, toWire } from '../utils/caseMapper.js';
import { AppError } from '../utils/errors.js';

export class BaseRepository {
  constructor(modelName) {
    this.modelName = modelName;
  }

  get model() {
    return getPrismaClient()[this.modelName];
  }

  // Turns a Prisma unique-constraint violation into a friendly message.
  isUniqueViolation(err) {
    return err?.code === 'P2002' || /unique constraint/i.test(err?.message || '');
  }

  duplicateMessage(err) {
    const target = err?.meta?.target;
    const fields = Array.isArray(target) ? target.join(', ') : typeof target === 'string' ? target : '';
    // meta.target isn't always populated by the driver adapter; fall back to the
    // raw message (e.g. "Unique constraint failed on the fields: (`code`)").
    const hay = `${fields} ${err?.message || ''}`;
    if (/code/i.test(hay)) return this.modelName === 'product' ? 'Item code already exists.' : 'This code already exists.';
    if (/barcode/i.test(hay)) return 'This barcode already exists.';
    if (/name/i.test(hay)) return 'This name already exists.';
    return 'A record with these values already exists (must be unique).';
  }

  async findById(id) {
    const row = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    return toWire(row);
  }

  async findAll(where = {}) {
    const rows = await this.model.findMany({
      where: { deletedAt: null, ...where },
      orderBy: { id: 'desc' }
    });
    return toWire(rows);
  }

  async create(data) {
    try {
      const row = await this.model.create({ data: fromWire(data) });
      return toWire(row);
    } catch (err) {
      if (this.isUniqueViolation(err)) throw new AppError(this.duplicateMessage(err), 'DUPLICATE', 409);
      throw err;
    }
  }

  async update(id, data) {
    const existing = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    if (!existing) return null;

    try {
      const row = await this.model.update({
        where: { id: Number(id) },
        data: fromWire(data)
      });
      return toWire(row);
    } catch (err) {
      if (this.isUniqueViolation(err)) throw new AppError(this.duplicateMessage(err), 'DUPLICATE', 409);
      throw err;
    }
  }

  async softDelete(id) {
    const existing = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    if (!existing) return null;

    const row = await this.model.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() }
    });
    return toWire(row);
  }

  transaction(callback) {
    return getPrismaClient().$transaction(callback);
  }
}
