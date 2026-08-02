import { AppError } from '../utils/errors.js';
import { productionFormulasRepository } from '../repositories/catalogRepositories.js';

// A production formula stores its issued/produced lines as a JSON string on the
// row (`lines_json`). This service exposes them to the UI as a `lines` array.
function deserialize(row) {
  if (!row) return row;
  let lines = [];
  try {
    lines = JSON.parse(row.lines_json || '[]');
  } catch {
    lines = [];
  }
  return { ...row, lines };
}

function normalizeLines(lines) {
  return (Array.isArray(lines) ? lines : [])
    .filter((l) => l && l.product_id)
    .map((l) => ({
      product_id: Number(l.product_id),
      kind: l.kind === 'produce' ? 'produce' : 'issue',
      quantity: Number(l.quantity) || 0,
      pcs: Number(l.pcs) || 0
    }));
}

class ProductionFormulaService {
  constructor(repository) {
    this.repository = repository;
  }

  async list(filters = {}) {
    const rows = await this.repository.findPage(filters);
    return rows.map(deserialize);
  }

  async get(id) {
    const row = await this.repository.findById(id);
    if (!row) throw new AppError('Formula not found', 'ENTITY_NOT_FOUND', 404);
    return deserialize(row);
  }

  buildData(payload) {
    const lines = normalizeLines(payload.lines);
    return { name: String(payload.name || '').trim(), lines_json: JSON.stringify(lines) };
  }

  async create(payload) {
    if (!String(payload.name || '').trim()) {
      throw new AppError('Formula name is required', 'VALIDATION_ERROR', 400);
    }
    const data = this.buildData(payload);
    data.code = payload.code
      ? String(payload.code).trim()
      : `FRM-${Date.now().toString().slice(-6)}`;
    return deserialize(await this.repository.create(data));
  }

  async update(id, payload) {
    const data = this.buildData(payload);
    if (payload.code) data.code = String(payload.code).trim();
    const updated = await this.repository.update(id, data);
    if (!updated) throw new AppError('Formula not found', 'ENTITY_NOT_FOUND', 404);
    return deserialize(updated);
  }

  remove(id) {
    return this.repository.softDelete(id);
  }
}

export const productionFormulaService = new ProductionFormulaService(productionFormulasRepository);
