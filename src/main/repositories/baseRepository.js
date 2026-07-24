import { getPrismaClient } from '../db/database.js';
import { fromWire, toWire } from '../utils/caseMapper.js';

export class BaseRepository {
  constructor(modelName) {
    this.modelName = modelName;
  }

  get model() {
    return getPrismaClient()[this.modelName];
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
    const row = await this.model.create({ data: fromWire(data) });
    return toWire(row);
  }

  async update(id, data) {
    const existing = await this.model.findFirst({ where: { id: Number(id), deletedAt: null } });
    if (!existing) return null;

    const row = await this.model.update({
      where: { id: Number(id) },
      data: fromWire(data)
    });
    return toWire(row);
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
