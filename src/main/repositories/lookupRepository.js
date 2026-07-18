import { BaseRepository } from './baseRepository.js';

export class LookupRepository extends BaseRepository {
  constructor(tableName, searchColumns = ['name', 'code']) {
    super(tableName);
    this.searchColumns = searchColumns;
  }

  findPage({ page = 1, pageSize = 25, search = '' } = {}) {
    const offset = (page - 1) * pageSize;
    const whereParts = ['deleted_at IS NULL'];
    const params = {};

    if (search) {
      const searchClause = this.searchColumns.map((column) => `${column} LIKE :search`).join(' OR ');
      whereParts.push(`(${searchClause})`);
      params.search = `%${search}%`;
    }

    const whereClause = whereParts.join(' AND ');
    const rows = this.findAll(whereClause, params);
    return rows.slice(offset, offset + pageSize);
  }
}