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

  get(id) {
    const entity = this.repository.findById(id);
    if (!entity) {
      throw new AppError(`${this.entityName} not found`, 'ENTITY_NOT_FOUND', 404);
    }

    return entity;
  }

  create(payload) {
    const data = validate(this.createSchema, payload);
    return this.repository.create(Object.keys(data), data);
  }

  update(id, payload) {
    const data = validate(this.updateSchema, payload);
    const updated = this.repository.update(id, Object.keys(data), data);
    if (!updated) {
      throw new AppError(`${this.entityName} not found`, 'ENTITY_NOT_FOUND', 404);
    }

    return updated;
  }

  remove(id) {
    return this.repository.softDelete(id);
  }
}