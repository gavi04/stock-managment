import { AppError } from '../utils/errors.js';
import { validate } from '../utils/validation.js';
import { z } from 'zod';
import { getDatabase } from '../db/database.js';

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

export class InventoryService {
  recordStockTransaction(payload) {
    const data = validate(stockTransactionSchema, payload);
    const db = getDatabase();

    const existing = db.prepare(
      `SELECT COALESCE(SUM(quantity), 0) AS stock_balance
       FROM stock_transactions
       WHERE product_id = :product_id AND warehouse_id = :warehouse_id AND deleted_at IS NULL`
    ).get({ product_id: data.product_id, warehouse_id: data.warehouse_id });

    const currentStock = Number(existing?.stock_balance ?? 0);
    const nextStock = currentStock + Number(data.quantity);

    if (nextStock < 0) {
      throw new AppError('Insufficient stock for this operation', 'NEGATIVE_STOCK_BLOCKED', 400);
    }

    const transaction = db.transaction(() => {
      db.prepare(
        `INSERT INTO stock_transactions
         (transaction_no, source_type, source_id, transaction_type, product_id, warehouse_id, party_id, quantity, rate, amount, reference_no, notes)
         VALUES
         (:transaction_no, :source_type, :source_id, :transaction_type, :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount, :reference_no, :notes)`
      ).run(data);
    });

    transaction();
    return { stockBalance: nextStock };
  }

  getStockBalance(productId, warehouseId) {
    const db = getDatabase();
    const row = db.prepare(
      `SELECT COALESCE(SUM(quantity), 0) AS stock_balance
       FROM stock_transactions
       WHERE product_id = :product_id AND warehouse_id = :warehouse_id AND deleted_at IS NULL`
    ).get({ product_id: productId, warehouse_id: warehouseId });

    return Number(row?.stock_balance ?? 0);
  }

  getDashboardSummary() {
    const db = getDatabase();
    const today = new Date().toISOString().slice(0, 10);

    const todayIn = db.prepare(
      `SELECT COALESCE(SUM(quantity), 0) AS total
       FROM stock_transactions
       WHERE deleted_at IS NULL AND quantity > 0 AND DATE(created_at) = :today`
    ).get({ today });

    const todayOut = db.prepare(
      `SELECT COALESCE(SUM(ABS(quantity)), 0) AS total
       FROM stock_transactions
       WHERE deleted_at IS NULL AND quantity < 0 AND DATE(created_at) = :today`
    ).get({ today });

    const lowStockItems = db.prepare(
      `SELECT
        p.id,
        p.name,
        p.code,
        p.min_stock,
        COALESCE(SUM(st.quantity), 0) AS current_stock
      FROM products p
      LEFT JOIN stock_transactions st ON st.product_id = p.id AND st.deleted_at IS NULL
      WHERE p.deleted_at IS NULL AND p.is_active = 1
      GROUP BY p.id, p.name, p.code, p.min_stock
      HAVING current_stock <= p.min_stock
      ORDER BY current_stock ASC, p.name ASC
      LIMIT 10`
    ).all();

    return {
      date: today,
      todayStockIn: Number(todayIn?.total ?? 0),
      todayStockOut: Number(todayOut?.total ?? 0),
      lowStockCount: lowStockItems.length,
      lowStockItems
    };
  }

  getRecentVouchers(limit = 10) {
    const db = getDatabase();
    return db.prepare(
      `SELECT
        st.transaction_no AS voucher_no,
        st.transaction_type AS type,
        st.created_at AS date,
        COALESCE(pa.name, '-') AS party,
        st.amount AS total,
        'posted' AS status,
        pr.name AS item
      FROM stock_transactions st
      LEFT JOIN parties pa ON pa.id = st.party_id
      LEFT JOIN products pr ON pr.id = st.product_id
      WHERE st.deleted_at IS NULL
      ORDER BY st.id DESC
      LIMIT :limit`
    ).all({ limit });
  }
}