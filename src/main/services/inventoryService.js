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

  getRecentVouchers(limit = 10, type = null) {
    const db = getDatabase();
    let query = `
      SELECT
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
    `;
    
    if (type) {
      query += ` AND st.transaction_type = :type`;
    }
    
    query += ` ORDER BY st.id DESC LIMIT :limit`;
    
    return db.prepare(query).all({ limit, type });
  }

  getItemLedger(productId) {
    const db = getDatabase();
    
    // We calculate a running balance using window function
    // Assuming transactions are strictly ordered by id (or created_at)
    return db.prepare(
      `SELECT
        st.created_at AS date,
        st.transaction_no AS voucher,
        st.transaction_type AS type,
        CASE WHEN st.quantity > 0 THEN st.quantity ELSE 0 END AS qty_in,
        CASE WHEN st.quantity < 0 THEN ABS(st.quantity) ELSE 0 END AS qty_out,
        SUM(st.quantity) OVER (ORDER BY st.id ASC) AS balance
      FROM stock_transactions st
      WHERE st.product_id = :productId AND st.deleted_at IS NULL
      ORDER BY st.id ASC`
    ).all({ productId });
  }

  getDailyStockSummary(filters = {}) {
    const db = getDatabase();
    const { fromDate, toDate, productId, categoryId } = filters;
    
    let baseWhere = `p.deleted_at IS NULL AND p.is_active = 1`;
    const params = {};
    
    if (productId) {
      baseWhere += ` AND p.id = :productId`;
      params.productId = productId;
    }
    if (categoryId) {
      baseWhere += ` AND p.category_id = :categoryId`;
      params.categoryId = categoryId;
    }

    params.fromDate = fromDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    params.toDate = toDate || new Date().toISOString().slice(0, 10);

    const openingQuery = `
      SELECT p.id as product_id, p.name as product_name, COALESCE(SUM(st.quantity), 0) as opening_balance
      FROM products p
      LEFT JOIN stock_transactions st ON st.product_id = p.id AND st.deleted_at IS NULL AND DATE(st.created_at) < :fromDate
      WHERE ${baseWhere}
      GROUP BY p.id
    `;
    
    const openingRows = db.prepare(openingQuery).all(params);
    const openingMap = new Map();
    openingRows.forEach(row => {
      openingMap.set(row.product_id, {
        product_name: row.product_name,
        balance: row.opening_balance
      });
    });

    const dailyQuery = `
      SELECT 
        DATE(st.created_at) as date,
        p.id as product_id,
        p.name as product_name,
        SUM(CASE WHEN st.transaction_type = 'purchase' THEN st.quantity ELSE 0 END) as purchase,
        SUM(CASE WHEN st.transaction_type = 'sale_return' THEN st.quantity ELSE 0 END) as sale_return,
        SUM(CASE WHEN st.transaction_type = 'production_in' THEN st.quantity ELSE 0 END) as production_in,
        SUM(CASE WHEN st.transaction_type = 'sale' THEN ABS(st.quantity) ELSE 0 END) as sale,
        SUM(CASE WHEN st.transaction_type = 'purchase_return' THEN ABS(st.quantity) ELSE 0 END) as purchase_return,
        SUM(CASE WHEN st.transaction_type = 'production_out' THEN ABS(st.quantity) ELSE 0 END) as production_out,
        SUM(CASE WHEN st.quantity > 0 AND st.transaction_type NOT IN ('purchase', 'sale_return', 'production_in') THEN st.quantity ELSE 0 END) as other_in,
        SUM(CASE WHEN st.quantity < 0 AND st.transaction_type NOT IN ('sale', 'purchase_return', 'production_out') THEN ABS(st.quantity) ELSE 0 END) as other_out
      FROM stock_transactions st
      JOIN products p ON p.id = st.product_id
      WHERE ${baseWhere} AND st.deleted_at IS NULL AND DATE(st.created_at) >= :fromDate AND DATE(st.created_at) <= :toDate
      GROUP BY DATE(st.created_at), p.id
      ORDER BY DATE(st.created_at) ASC, p.name ASC
    `;
    
    const dailyRows = db.prepare(dailyQuery).all(params);
    const result = [];
    
    for (const row of dailyRows) {
      const pid = row.product_id;
      const current = openingMap.get(pid) || { product_name: row.product_name, balance: 0 };
      
      const opening = current.balance;
      const total_in = row.purchase + row.sale_return + row.production_in + row.other_in;
      const total_out = row.sale + row.purchase_return + row.production_out + row.other_out;
      const closing = opening + total_in - total_out;
      
      result.push({
        date: row.date,
        product_id: pid,
        item: row.product_name,
        opening,
        purchase: row.purchase,
        sale_return: row.sale_return,
        production_in: row.production_in,
        total_in,
        sale: row.sale,
        purchase_return: row.purchase_return,
        issue: row.production_out,
        total_out,
        closing
      });
      
      openingMap.set(pid, { product_name: row.product_name, balance: closing });
    }
    
    return result;
  }
}