import { getAll, getOne, runQuery, runTransaction } from '../db/queryRunner.js';

export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  findById(id) {
    return getOne(`SELECT * FROM ${this.tableName} WHERE id = :id AND deleted_at IS NULL`, { id });
  }

  findAll(whereClause = 'deleted_at IS NULL', params = {}) {
    return getAll(`SELECT * FROM ${this.tableName} WHERE ${whereClause} ORDER BY id DESC`, params);
  }

  create(columns, data) {
    const placeholders = columns.map((column) => `:${column}`).join(', ');
    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    const result = runQuery(sql, data);
    return this.findById(result.lastInsertRowid);
  }

  update(id, columns, data) {
    const assignments = columns.map((column) => `${column} = :${column}`).join(', ');
    runQuery(
      `UPDATE ${this.tableName} SET ${assignments}, updated_at = CURRENT_TIMESTAMP WHERE id = :id AND deleted_at IS NULL`,
      { ...data, id }
    );
    return this.findById(id);
  }

  softDelete(id) {
    return runQuery(
      `UPDATE ${this.tableName} SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = :id AND deleted_at IS NULL`,
      { id }
    );
  }

  transaction(callback) {
    return runTransaction(callback);
  }
}