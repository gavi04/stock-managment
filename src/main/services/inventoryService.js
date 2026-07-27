import { AppError } from '../utils/errors.js';
import { validate } from '../utils/validation.js';
import { z } from 'zod';
import { getPrismaClient } from '../db/database.js';

const stockTransactionSchema = z.object({
  transaction_no: z.string().min(1),
  source_type: z.string().min(1),
  source_id: z.coerce.number().int().positive().optional().nullable(),
  transaction_type: z.enum(['purchase', 'sale', 'sale_return', 'purchase_return', 'production_in', 'production_out', 'adjustment_in', 'adjustment_out', 'transfer_in', 'transfer_out', 'opening_balance']),
  product_id: z.coerce.number().int().positive(),
  warehouse_id: z.coerce.number().int().positive(),
  party_id: z.coerce.number().int().positive().optional().nullable(),
  quantity: z.coerce.number(),
  rate: z.coerce.number().default(0),
  amount: z.coerce.number().default(0),
  reference_no: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
});

function startOfDayUtc(dateStr) {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

function endOfDayUtc(dateStr) {
  const start = startOfDayUtc(dateStr);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000);
}

export class InventoryService {
  async recordStockTransaction(payload) {
    const data = validate(stockTransactionSchema, payload);
    const prisma = getPrismaClient();

    return prisma.$transaction(async (tx) => {
      const existing = await tx.stockTransaction.aggregate({
        _sum: { quantity: true },
        where: { productId: data.product_id, warehouseId: data.warehouse_id, deletedAt: null }
      });

      const currentStock = Number(existing._sum.quantity ?? 0);
      const nextStock = currentStock + Number(data.quantity);

      if (nextStock < 0) {
        throw new AppError('Insufficient stock for this operation', 'NEGATIVE_STOCK_BLOCKED', 400);
      }

      await tx.stockTransaction.create({
        data: {
          transactionNo: data.transaction_no,
          sourceType: data.source_type,
          sourceId: data.source_id ?? null,
          transactionType: data.transaction_type,
          productId: data.product_id,
          warehouseId: data.warehouse_id,
          partyId: data.party_id ?? null,
          quantity: data.quantity,
          rate: data.rate,
          amount: data.amount,
          referenceNo: data.reference_no ?? null,
          notes: data.notes ?? null
        }
      });

      return { stockBalance: nextStock };
    });
  }

  async getStockBalance(productId, warehouseId) {
    const prisma = getPrismaClient();
    const result = await prisma.stockTransaction.aggregate({
      _sum: { quantity: true },
      where: { productId: Number(productId), warehouseId: Number(warehouseId), deletedAt: null }
    });

    return Number(result._sum.quantity ?? 0);
  }

  async getDashboardSummary() {
    const prisma = getPrismaClient();
    const today = new Date().toISOString().slice(0, 10);
    const rangeStart = startOfDayUtc(today);
    const rangeEnd = endOfDayUtc(today);

    const [todayIn, todayOut, activeProducts, stockSums] = await Promise.all([
      prisma.stockTransaction.aggregate({
        _sum: { quantity: true },
        where: { deletedAt: null, quantity: { gt: 0 }, createdAt: { gte: rangeStart, lt: rangeEnd } }
      }),
      prisma.stockTransaction.aggregate({
        _sum: { quantity: true },
        where: { deletedAt: null, quantity: { lt: 0 }, createdAt: { gte: rangeStart, lt: rangeEnd } }
      }),
      prisma.product.findMany({
        where: { deletedAt: null, isActive: true },
        select: { id: true, name: true, code: true, minStock: true }
      }),
      prisma.stockTransaction.groupBy({
        by: ['productId'],
        where: { deletedAt: null },
        _sum: { quantity: true }
      })
    ]);

    const stockByProduct = new Map(stockSums.map((row) => [row.productId, Number(row._sum.quantity ?? 0)]));

    const lowStockItems = activeProducts
      .map((product) => ({
        id: product.id,
        name: product.name,
        code: product.code,
        min_stock: product.minStock,
        current_stock: stockByProduct.get(product.id) ?? 0
      }))
      .filter((item) => item.current_stock <= item.min_stock)
      .sort((a, b) => a.current_stock - b.current_stock || a.name.localeCompare(b.name))
      .slice(0, 10);

    return {
      date: today,
      todayStockIn: Number(todayIn._sum.quantity ?? 0),
      todayStockOut: Math.abs(Number(todayOut._sum.quantity ?? 0)),
      lowStockCount: lowStockItems.length,
      lowStockItems
    };
  }

  async getRecentVouchers(limit = 10, type = null) {
    const prisma = getPrismaClient();
    const rows = await prisma.stockTransaction.findMany({
      where: { deletedAt: null, ...(type ? { transactionType: type } : {}) },
      orderBy: { id: 'desc' },
      take: Number(limit),
      include: { party: true, product: true }
    });

    return rows.map((row) => ({
      voucher_no: row.transactionNo,
      type: row.transactionType,
      date: row.createdAt.toISOString(),
      party: row.party?.name ?? '-',
      total: row.amount,
      status: 'posted',
      item: row.product?.name ?? null
    }));
  }

  async getItemLedger(productId) {
    const prisma = getPrismaClient();
    const rows = await prisma.stockTransaction.findMany({
      where: { productId: Number(productId), deletedAt: null },
      orderBy: { id: 'asc' }
    });

    let balance = 0;
    return rows.map((row) => {
      const quantity = Number(row.quantity);
      balance += quantity;
      return {
        date: row.createdAt.toISOString(),
        voucher: row.transactionNo,
        type: row.transactionType,
        qty_in: quantity > 0 ? quantity : 0,
        qty_out: quantity < 0 ? Math.abs(quantity) : 0,
        balance
      };
    });
  }

  async getDailyStockSummary(filters = {}) {
    const prisma = getPrismaClient();
    const { fromDate, toDate, productId, categoryId } = filters;

    const productWhere = { deletedAt: null, isActive: true };
    if (productId) productWhere.id = Number(productId);
    if (categoryId) productWhere.categoryId = Number(categoryId);

    const from = fromDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const to = toDate || new Date().toISOString().slice(0, 10);
    const rangeStart = startOfDayUtc(from);
    const rangeEnd = endOfDayUtc(to);

    const products = await prisma.product.findMany({
      where: productWhere,
      select: { id: true, name: true }
    });
    const productIds = products.map((product) => product.id);
    const productNameById = new Map(products.map((product) => [product.id, product.name]));

    if (productIds.length === 0) {
      return [];
    }

    const openingAgg = await prisma.stockTransaction.groupBy({
      by: ['productId'],
      where: { productId: { in: productIds }, deletedAt: null, createdAt: { lt: rangeStart } },
      _sum: { quantity: true }
    });

    const runningBalance = new Map(productIds.map((id) => [id, 0]));
    for (const row of openingAgg) {
      runningBalance.set(row.productId, Number(row._sum.quantity ?? 0));
    }

    const rangeTxns = await prisma.stockTransaction.findMany({
      where: {
        productId: { in: productIds },
        deletedAt: null,
        createdAt: { gte: rangeStart, lt: rangeEnd },
        transactionType: { not: 'opening_balance' }
      },
      select: { productId: true, transactionType: true, quantity: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });

    // Opening-balance movements inside the range are shown in the OPENING column
    // on their date (not counted as a daily inflow), so opening stock is visible.
    const openingTxns = await prisma.stockTransaction.findMany({
      where: {
        productId: { in: productIds },
        deletedAt: null,
        createdAt: { gte: rangeStart, lt: rangeEnd },
        transactionType: 'opening_balance'
      },
      select: { productId: true, quantity: true, createdAt: true }
    });
    const openingByKey = new Map();
    for (const txn of openingTxns) {
      const date = txn.createdAt.toISOString().slice(0, 10);
      const key = `${date}::${txn.productId}`;
      openingByKey.set(key, (openingByKey.get(key) ?? 0) + Number(txn.quantity));
    }

    const buckets = new Map();
    for (const txn of rangeTxns) {
      const date = txn.createdAt.toISOString().slice(0, 10);
      const key = `${date}::${txn.productId}`;
      if (!buckets.has(key)) {
        buckets.set(key, {
          date,
          product_id: txn.productId,
          purchase: 0,
          sale_return: 0,
          production_in: 0,
          sale: 0,
          purchase_return: 0,
          production_out: 0,
          other_in: 0,
          other_out: 0
        });
      }

      const bucket = buckets.get(key);
      const quantity = Number(txn.quantity);
      const type = txn.transactionType;

      if (type === 'purchase') bucket.purchase += quantity;
      else if (type === 'sale_return') bucket.sale_return += quantity;
      else if (type === 'production_in') bucket.production_in += quantity;
      else if (type === 'sale') bucket.sale += Math.abs(quantity);
      else if (type === 'purchase_return') bucket.purchase_return += Math.abs(quantity);
      else if (type === 'production_out') bucket.production_out += Math.abs(quantity);
      else if (quantity > 0) bucket.other_in += quantity;
      else if (quantity < 0) bucket.other_out += Math.abs(quantity);
    }

    // Items that only have an opening balance (no other movement) still get a row.
    for (const key of openingByKey.keys()) {
      if (!buckets.has(key)) {
        const [date, pid] = key.split('::');
        buckets.set(key, {
          date,
          product_id: Number(pid),
          purchase: 0,
          sale_return: 0,
          production_in: 0,
          sale: 0,
          purchase_return: 0,
          production_out: 0,
          other_in: 0,
          other_out: 0
        });
      }
    }

    const sortedBuckets = [...buckets.values()].sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      const nameA = productNameById.get(a.product_id) ?? '';
      const nameB = productNameById.get(b.product_id) ?? '';
      return nameA.localeCompare(nameB);
    });

    const result = [];
    for (const bucket of sortedBuckets) {
      const carried = runningBalance.get(bucket.product_id) ?? 0;
      const opening = carried + (openingByKey.get(`${bucket.date}::${bucket.product_id}`) ?? 0);
      const totalIn = bucket.purchase + bucket.sale_return + bucket.production_in + bucket.other_in;
      const totalOut = bucket.sale + bucket.purchase_return + bucket.production_out + bucket.other_out;
      const closing = opening + totalIn - totalOut;

      result.push({
        date: bucket.date,
        product_id: bucket.product_id,
        item: productNameById.get(bucket.product_id) ?? '',
        opening,
        purchase: bucket.purchase,
        sale_return: bucket.sale_return,
        production_in: bucket.production_in,
        total_in: totalIn,
        sale: bucket.sale,
        purchase_return: bucket.purchase_return,
        issue: bucket.production_out,
        total_out: totalOut,
        closing
      });

      runningBalance.set(bucket.product_id, closing);
    }

    return result;
  }
}
