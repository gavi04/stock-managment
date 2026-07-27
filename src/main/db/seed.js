import uomData from './data/uom.json';
import hsnData from './data/hsn.json';
import { logger } from '../utils/logger.js';

const ROLES = [
  { name: 'Admin', code: 'ADMIN', permissionsJson: JSON.stringify(['*']) },
  { name: 'Manager', code: 'MANAGER', permissionsJson: JSON.stringify(['inventory:*', 'masters:*', 'reports:read', 'backup:read']) },
  { name: 'Operator', code: 'OPERATOR', permissionsJson: JSON.stringify(['inventory:write', 'masters:read', 'reports:read']) },
  { name: 'Viewer', code: 'VIEWER', permissionsJson: JSON.stringify(['masters:read', 'inventory:read', 'reports:read']) }
];

// Insert any rows (keyed by `code`) that aren't already present, in batches to
// stay within SQLite's parameter limit. Idempotent without needing
// skipDuplicates (which the Prisma SQLite adapter doesn't support).
async function seedMissingByCode(model, rows, size = 500) {
  if ((await model.count()) >= rows.length) return; // already fully seeded
  const existing = new Set((await model.findMany({ select: { code: true } })).map((r) => r.code));
  const missing = rows.filter((r) => !existing.has(r.code));
  for (let i = 0; i < missing.length; i += size) {
    await model.createMany({ data: missing.slice(i, i + size) });
  }
}

export async function seedDatabase(prisma) {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: role
    });
  }

  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: 'StockOps',
      allowDuplicateBarcodes: false,
      allowNegativeStock: false,
      enableAutoBackup: true,
      backupIntervalHours: 24
    }
  });

  // Groups are modelled as categories.
  const GROUPS = [
    { name: 'Raw Material', code: 'CAT-RAW', description: 'Raw material group' },
    { name: 'Work in Progress', code: 'CAT-WIP', description: 'Work in progress group' },
    { name: 'Finished Goods', code: 'CAT-FG', description: 'Finished goods group' }
  ];
  for (const group of GROUPS) {
    await prisma.category.upsert({
      where: { code: group.code },
      update: {},
      create: group
    });
  }

  await prisma.warehouse.upsert({
    where: { code: 'WH-MAIN' },
    update: {},
    create: { name: 'Main Warehouse', code: 'WH-MAIN', location: 'Head Office', isDefault: true }
  });

  // Units (UOM, 45) and HSN codes (~21k) from the provided masters. Guarded so
  // a data hiccup can't stop the app from starting.
  try {
    await seedMissingByCode(prisma.unit, uomData);
    await seedMissingByCode(prisma.hsn, hsnData);
  } catch (err) {
    logger.error('reference-data seed failed', { message: err?.message });
  }
}
