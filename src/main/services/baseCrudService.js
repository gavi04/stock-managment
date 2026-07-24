import { AppError } from '../utils/errors.js';
import { validate } from '../utils/validation.js';

export class BaseCrudService {
  constructor(repository, entityName, createSchema, updateSchema) {
    this.repository = repository;
    this.entityName = entityName;
    this.createSchema = createSchema;
    this.updateSchema = updateSchema;
  }

  list(filters = {}) {
    return this.repository.findPage(filters);
  }

  async get(id) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new AppError(`${this.entityName} not found`, 'ENTITY_NOT_FOUND', 404);
    }

    return entity;
  }

  create(payload) {
    const data = validate(this.createSchema, payload);
    return this.repository.create(data);
  }

  async update(id, payload) {
    const data = validate(this.updateSchema, payload);
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new AppError(`${this.entityName} not found`, 'ENTITY_NOT_FOUND', 404);
    }

    return updated;
  }

  remove(id) {
    return this.repository.softDelete(id);
  }
}
