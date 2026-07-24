const ROLES = [
  { name: 'Admin', code: 'ADMIN', permissionsJson: JSON.stringify(['*']) },
  { name: 'Manager', code: 'MANAGER', permissionsJson: JSON.stringify(['inventory:*', 'masters:*', 'reports:read', 'backup:read']) },
  { name: 'Operator', code: 'OPERATOR', permissionsJson: JSON.stringify(['inventory:write', 'masters:read', 'reports:read']) },
  { name: 'Viewer', code: 'VIEWER', permissionsJson: JSON.stringify(['masters:read', 'inventory:read', 'reports:read']) }
];

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

  await prisma.hsn.upsert({
    where: { code: '0000' },
    update: {},
    create: { code: '0000', description: 'Unclassified' }
  });

  await prisma.unit.upsert({
    where: { code: 'UOM-KG' },
    update: {},
    create: { name: 'Kg', code: 'UOM-KG', symbol: 'kg' }
  });

  await prisma.warehouse.upsert({
    where: { code: 'WH-MAIN' },
    update: {},
    create: { name: 'Main Warehouse', code: 'WH-MAIN', location: 'Head Office', isDefault: true }
  });
}
