import { AppError } from '../utils/errors.js';
import { getDatabase } from '../db/database.js';
import { z } from 'zod';

const purchaseItemSchema = z.object({
  product_id: z.coerce.number().int().positive(),
  hsn: z.string().optional().nullable(),
  pcs: z.coerce.number().optional().nullable(),
  quantity: z.coerce.number().positive(),
  base_rate: z.coerce.number().min(0),
  size_diff: z.coerce.number().default(0),
  net_rate: z.coerce.number().min(0),
  taxable_value: z.coerce.number().min(0),
  gst_rate: z.coerce.number().min(0).default(0),
  gst_amount: z.coerce.number().min(0).default(0),
  amount: z.coerce.number().min(0)
});

const purchaseVoucherSchema = z.object({
  voucher_no: z.string().optional().nullable(),
  invoice_no: z.string().optional().nullable(),
  supplier_id: z.coerce.number().int().positive().optional().nullable(),
  warehouse_id: z.coerce.number().int().positive(),
  purchase_date: z.string().min(10), // YYYY-MM-DD
  batch_no: z.string().optional().nullable(),
  expiry_date: z.string().optional().nullable(),
  vehicle_no: z.string().optional().nullable(),
  bilty_no: z.string().optional().nullable(),
  broker: z.string().optional().nullable(),
  remarks: z.string().optional().nullable(),
  status: z.enum(['posted', 'draft']).default('posted'),
  taxable_value: z.coerce.number().min(0),
  gst_amount: z.coerce.number().min(0),
  total_amount: z.coerce.number().min(0),
  items: z.array(purchaseItemSchema).min(1)
});

export class VoucherService {
  getNextPurchaseVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM purchases`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `PUR-${String(count).padStart(5, '0')}`;
  }

  savePurchaseVoucher(payload) {
    const data = purchaseVoucherSchema.parse(payload);
    const db = getDatabase();

    if (!data.voucher_no) {
      data.voucher_no = this.getNextPurchaseVoucherNo();
    }

    const transaction = db.transaction(() => {
      // 1. Insert into purchases
      const purchaseResult = db.prepare(
        `INSERT INTO purchases (
          voucher_no, invoice_no, supplier_id, warehouse_id, purchase_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :supplier_id, :warehouse_id, :purchase_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: data.voucher_no,
        invoice_no: data.invoice_no,
        supplier_id: data.supplier_id,
        warehouse_id: data.warehouse_id,
        purchase_date: data.purchase_date,
        batch_no: data.batch_no,
        expiry_date: data.expiry_date,
        vehicle_no: data.vehicle_no,
        bilty_no: data.bilty_no,
        broker: data.broker,
        remarks: data.remarks,
        status: data.status,
        taxable_value: data.taxable_value,
        gst_amount: data.gst_amount,
        total_amount: data.total_amount
      });

      const purchaseId = purchaseResult.lastInsertRowid;

      // 2. Insert items and write to stock_transactions
      const insertItemStmt = db.prepare(
        `INSERT INTO purchase_items (
          purchase_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :purchase_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );

      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'purchase', :source_id, 'purchase',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );

      for (const item of data.items) {
        insertItemStmt.run({
          purchase_id: purchaseId,
          product_id: item.product_id,
          hsn: item.hsn,
          pcs: item.pcs,
          quantity: item.quantity,
          base_rate: item.base_rate,
          size_diff: item.size_diff,
          net_rate: item.net_rate,
          taxable_value: item.taxable_value,
          gst_rate: item.gst_rate,
          gst_amount: item.gst_amount,
          amount: item.amount
        });

        // Add positive quantity for purchase
        insertStockStmt.run({
          transaction_no: data.voucher_no, // we use voucher_no to link them
          source_id: purchaseId,
          product_id: item.product_id,
          warehouse_id: data.warehouse_id,
          party_id: data.supplier_id,
          quantity: item.quantity,
          rate: item.net_rate,
          amount: item.taxable_value, // storing taxable value as the inventory cost
          reference_no: data.invoice_no,
          notes: data.remarks
        });
      }

      return purchaseId;
    });

    const purchaseId = transaction();
    return { id: purchaseId, voucher_no: data.voucher_no };
  }

  // --- SALES RETURN ---
  getNextSaleReturnVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM sale_returns`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `SR-${String(count).padStart(5, '0')}`;
  }

  saveSaleReturnVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextSaleReturnVoucherNo();

    const transaction = db.transaction(() => {
      const srResult = db.prepare(
        `INSERT INTO sale_returns (
          voucher_no, invoice_no, customer_id, warehouse_id, return_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :customer_id, :warehouse_id, :return_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: payload.voucher_no, invoice_no: payload.invoice_no,
        customer_id: payload.customer_id, warehouse_id: payload.warehouse_id || 1,
        return_date: payload.return_date, batch_no: payload.batch_no,
        expiry_date: payload.expiry_date, vehicle_no: payload.vehicle_no,
        bilty_no: payload.bilty_no, broker: payload.broker,
        remarks: payload.remarks, status: 'posted',
        taxable_value: payload.taxable_value, gst_amount: payload.gst_amount,
        total_amount: payload.total_amount
      });

      const srId = srResult.lastInsertRowid;

      const insertItemStmt = db.prepare(
        `INSERT INTO sale_return_items (
          sale_return_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :sale_return_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );

      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'sale_return', :source_id, 'sale_return',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );

      for (const item of payload.items) {
        insertItemStmt.run({
          sale_return_id: srId, product_id: item.product_id, hsn: item.hsn,
          pcs: item.pcs, quantity: item.quantity, base_rate: item.base_rate,
          size_diff: item.size_diff, net_rate: item.net_rate,
          taxable_value: item.taxable_value, gst_rate: item.gst_rate,
          gst_amount: item.gst_amount, amount: item.amount
        });

        // Add positive quantity for sale return (inventory comes back)
        insertStockStmt.run({
          transaction_no: payload.voucher_no, source_id: srId, product_id: item.product_id,
          warehouse_id: payload.warehouse_id || 1, party_id: payload.customer_id,
          quantity: Number(item.quantity), rate: Number(item.net_rate),
          amount: Number(item.taxable_value), reference_no: payload.invoice_no,
          notes: payload.remarks
        });
      }
      return srId;
    });

    const srId = transaction();
    return { id: srId, voucher_no: payload.voucher_no };
  }

  // --- SALES ---
  getNextSaleVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM sales`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `SALE-${String(count).padStart(5, '0')}`;
  }

  saveSaleVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextSaleVoucherNo();

    const transaction = db.transaction(() => {
      const saleResult = db.prepare(
        `INSERT INTO sales (
          voucher_no, invoice_no, customer_id, warehouse_id, sale_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :customer_id, :warehouse_id, :sale_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: payload.voucher_no, invoice_no: payload.invoice_no,
        customer_id: payload.customer_id, warehouse_id: payload.warehouse_id || 1,
        sale_date: payload.sale_date, batch_no: payload.batch_no,
        expiry_date: payload.expiry_date, vehicle_no: payload.vehicle_no,
        bilty_no: payload.bilty_no, broker: payload.broker,
        remarks: payload.remarks, status: 'posted',
        taxable_value: payload.taxable_value, gst_amount: payload.gst_amount,
        total_amount: payload.total_amount
      });

      const saleId = saleResult.lastInsertRowid;

      const insertItemStmt = db.prepare(
        `INSERT INTO sale_items (
          sale_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :sale_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );

      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'sale', :source_id, 'sale',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );

      for (const item of payload.items) {
        insertItemStmt.run({
          sale_id: saleId, product_id: item.product_id, hsn: item.hsn,
          pcs: item.pcs, quantity: item.quantity, base_rate: item.base_rate,
          size_diff: item.size_diff, net_rate: item.net_rate,
          taxable_value: item.taxable_value, gst_rate: item.gst_rate,
          gst_amount: item.gst_amount, amount: item.amount
        });

        // Negative quantity for sale (stock goes out)
        insertStockStmt.run({
          transaction_no: payload.voucher_no, source_id: saleId, product_id: item.product_id,
          warehouse_id: payload.warehouse_id || 1, party_id: payload.customer_id,
          quantity: -Math.abs(Number(item.quantity)), rate: Number(item.net_rate),
          amount: Number(item.taxable_value), reference_no: payload.invoice_no,
          notes: payload.remarks
        });
      }
      return saleId;
    });

    const saleId = transaction();
    return { id: saleId, voucher_no: payload.voucher_no };
  }

  // --- PURCHASE RETURN ---
  getNextPurchaseReturnVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM purchase_returns`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `PR-${String(count).padStart(5, '0')}`;
  }

  savePurchaseReturnVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextPurchaseReturnVoucherNo();

    const transaction = db.transaction(() => {
      const prResult = db.prepare(
        `INSERT INTO purchase_returns (
          voucher_no, invoice_no, supplier_id, warehouse_id, return_date,
          batch_no, expiry_date, vehicle_no, bilty_no, broker, remarks,
          status, taxable_value, gst_amount, total_amount
        ) VALUES (
          :voucher_no, :invoice_no, :supplier_id, :warehouse_id, :return_date,
          :batch_no, :expiry_date, :vehicle_no, :bilty_no, :broker, :remarks,
          :status, :taxable_value, :gst_amount, :total_amount
        )`
      ).run({
        voucher_no: payload.voucher_no, invoice_no: payload.invoice_no,
        supplier_id: payload.supplier_id, warehouse_id: payload.warehouse_id || 1,
        return_date: payload.return_date, batch_no: payload.batch_no,
        expiry_date: payload.expiry_date, vehicle_no: payload.vehicle_no,
        bilty_no: payload.bilty_no, broker: payload.broker,
        remarks: payload.remarks, status: 'posted',
        taxable_value: payload.taxable_value, gst_amount: payload.gst_amount,
        total_amount: payload.total_amount
      });

      const prId = prResult.lastInsertRowid;

      const insertItemStmt = db.prepare(
        `INSERT INTO purchase_return_items (
          purchase_return_id, product_id, hsn, pcs, quantity, base_rate, size_diff,
          net_rate, taxable_value, gst_rate, gst_amount, amount
        ) VALUES (
          :purchase_return_id, :product_id, :hsn, :pcs, :quantity, :base_rate, :size_diff,
          :net_rate, :taxable_value, :gst_rate, :gst_amount, :amount
        )`
      );

      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, party_id, quantity, rate, amount,
          reference_no, notes
        ) VALUES (
          :transaction_no, 'purchase_return', :source_id, 'purchase_return',
          :product_id, :warehouse_id, :party_id, :quantity, :rate, :amount,
          :reference_no, :notes
        )`
      );

      for (const item of payload.items) {
        insertItemStmt.run({
          purchase_return_id: prId, product_id: item.product_id, hsn: item.hsn,
          pcs: item.pcs, quantity: item.quantity, base_rate: item.base_rate,
          size_diff: item.size_diff, net_rate: item.net_rate,
          taxable_value: item.taxable_value, gst_rate: item.gst_rate,
          gst_amount: item.gst_amount, amount: item.amount
        });

        // Negative quantity for purchase return (stock goes back to supplier)
        insertStockStmt.run({
          transaction_no: payload.voucher_no, source_id: prId, product_id: item.product_id,
          warehouse_id: payload.warehouse_id || 1, party_id: payload.supplier_id,
          quantity: -Math.abs(Number(item.quantity)), rate: Number(item.net_rate),
          amount: Number(item.taxable_value), reference_no: payload.invoice_no,
          notes: payload.remarks
        });
      }
      return prId;
    });

    const prId = transaction();
    return { id: prId, voucher_no: payload.voucher_no };
  }

  // --- PRODUCTION ---
  getNextProductionVoucherNo() {
    const db = getDatabase();
    const row = db.prepare(`SELECT COUNT(*) as count FROM production`).get();
    const count = Number(row?.count ?? 0) + 1;
    return `PROD-${String(count).padStart(5, '0')}`;
  }

  saveProductionVoucher(payload) {
    const db = getDatabase();
    if (!payload.voucher_no) payload.voucher_no = this.getNextProductionVoucherNo();

    const transaction = db.transaction(() => {
      const prodResult = db.prepare(
        `INSERT INTO production (
          voucher_no, warehouse_id, production_date, is_recurring, status, remarks
        ) VALUES (
          :voucher_no, :warehouse_id, :production_date, :is_recurring, :status, :remarks
        )`
      ).run({
        voucher_no: payload.voucher_no, warehouse_id: payload.warehouse_id || 1,
        production_date: payload.production_date, is_recurring: payload.is_recurring ? 1 : 0,
        status: 'posted', remarks: payload.remarks
      });

      const prodId = prodResult.lastInsertRowid;

      const insertItemStmt = db.prepare(
        `INSERT INTO production_items (
          production_id, product_id, batch_no, issued_qty, issued_pcs,
          production_qty, production_pcs
        ) VALUES (
          :production_id, :product_id, :batch_no, :issued_qty, :issued_pcs,
          :production_qty, :production_pcs
        )`
      );

      const insertStockStmt = db.prepare(
        `INSERT INTO stock_transactions (
          transaction_no, source_type, source_id, transaction_type,
          product_id, warehouse_id, quantity, rate, amount, notes
        ) VALUES (
          :transaction_no, 'production', :source_id, :transaction_type,
          :product_id, :warehouse_id, :quantity, 0, 0, :notes
        )`
      );

      for (const item of payload.items) {
        insertItemStmt.run({
          production_id: prodId, product_id: item.product_id, batch_no: item.batch_no,
          issued_qty: item.issued_qty, issued_pcs: item.issued_pcs,
          production_qty: item.production_qty, production_pcs: item.production_pcs
        });

        if (Number(item.issued_qty) > 0) {
          // Negative quantity for issued (raw material goes out)
          insertStockStmt.run({
            transaction_no: payload.voucher_no, source_id: prodId, transaction_type: 'production_out',
            product_id: item.product_id, warehouse_id: payload.warehouse_id || 1,
            quantity: -Math.abs(Number(item.issued_qty)), notes: payload.remarks
          });
        }

        if (Number(item.production_qty) > 0) {
          // Positive quantity for produced (finished goods come in)
          insertStockStmt.run({
            transaction_no: payload.voucher_no, source_id: prodId, transaction_type: 'production_in',
            product_id: item.product_id, warehouse_id: payload.warehouse_id || 1,
            quantity: Math.abs(Number(item.production_qty)), notes: payload.remarks
          });
        }
      }
      return prodId;
    });

    const prodId = transaction();
    return { id: prodId, voucher_no: payload.voucher_no };
  }

  getProductionSettings() {
    const db = getDatabase();
    const row = db.prepare(`SELECT production_settings_json FROM settings WHERE id = 1`).get();
    try {
      return JSON.parse(row?.production_settings_json || '{}');
    } catch {
      return {};
    }
  }

  updateProductionSettings(settingsJson) {
    const db = getDatabase();
    db.prepare(`UPDATE settings SET production_settings_json = ? WHERE id = 1`).run(JSON.stringify(settingsJson));
    return settingsJson;
  }
}
