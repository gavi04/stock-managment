import { BaseRepository } from './baseRepository.js';
import { toWire } from '../utils/caseMapper.js';

export class LookupRepository extends BaseRepository {
  constructor(modelName, searchColumns = ['name', 'code']) {
    super(modelName);
    this.searchColumns = searchColumns;
  }

  async findPage({ page = 1, pageSize = 25, search = '' } = {}) {
    const where = { deletedAt: null };

    if (search) {
      where.OR = this.searchColumns.map((column) => ({ [column]: { contains: search } }));
    }

    const rows = await this.model.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    });

    return toWire(rows);
  }
}
