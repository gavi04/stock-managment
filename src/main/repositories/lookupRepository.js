import { BaseRepository } from './baseRepository.js';
import { toWire } from '../utils/caseMapper.js';

export class LookupRepository extends BaseRepository {
  constructor(modelName, searchColumns = ['name', 'code']) {
    super(modelName);
    this.searchColumns = searchColumns;
  }

  async findPage({ page = 1, pageSize = 25, search = '' } = {}) {
    const where = { deletedAt: null };

    if (!search) {
      const rows = await this.model.findMany({
        where,
        orderBy: { id: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      });
      return toWire(rows);
    }

    // Searching: rank matches so an exact/prefix hit on the primary column (e.g.
    // an HSN code typed in full) floats to the top instead of being buried among
    // substring matches or paged out. We pull a capped pool of prefix and
    // substring candidates, merge/dedupe, then sort by relevance.
    const primary = this.searchColumns[0];
    const pool = pageSize * 4;

    const [prefixRows, containsRows] = await Promise.all([
      this.model.findMany({
        where: { ...where, [primary]: { startsWith: search } },
        orderBy: [{ [primary]: 'asc' }, { id: 'desc' }],
        take: pool
      }),
      this.model.findMany({
        where: { ...where, OR: this.searchColumns.map((column) => ({ [column]: { contains: search } })) },
        orderBy: { id: 'desc' },
        take: pool
      })
    ]);

    const byId = new Map();
    for (const row of [...prefixRows, ...containsRows]) {
      if (!byId.has(row.id)) byId.set(row.id, row);
    }

    const q = String(search).toLowerCase();
    const relevance = (row) => {
      const primaryVal = String(row[primary] ?? '').toLowerCase();
      if (primaryVal === q) return 0; // exact code/name
      if (primaryVal.startsWith(q)) return 1; // code/name starts with query
      for (let i = 1; i < this.searchColumns.length; i += 1) {
        if (String(row[this.searchColumns[i]] ?? '').toLowerCase() === q) return 2; // exact on secondary
      }
      if (primaryVal.includes(q)) return 3; // code/name contains query
      return 4; // matched only on a secondary column (e.g. description)
    };

    const ranked = [...byId.values()]
      .map((row) => ({ row, score: relevance(row) }))
      .sort((a, b) => a.score - b.score || b.row.id - a.row.id)
      .slice(0, pageSize)
      .map((entry) => entry.row);

    return toWire(ranked);
  }
}
