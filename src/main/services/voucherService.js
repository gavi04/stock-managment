import { getPrismaClient } from '../db/database.js';
import { z } from 'zod';

const purchaseItemSchema = z
  .object({
    product_id: z.coerce.number().int().positive(),
    product_name: z.string().optional().nullable(),
    hsn: z.string().optional().nullable(),
    pcs: z.coerce.number().min(0).optional().default(0),
    quantity: z.coerce.number().min(0).optional().default(0),
    base_rate: z.coerce.number().min(0),
    size_diff: z.coerce.number().default(0),
    net_rate: z.coerce.number().min(0),
    taxable_value: z.coerce.number().min(0),
    gst_rate: z.coerce.number().min(0).default(0),
    gst_amount: z.coerce.number().min(0).default(0),
    amount: z.coerce.number().min(0)
  })
  // An item is measured by either pcs or quantity — at least one must be positive.
  .refine((item) => Number(item.pcs) > 0 || Number(item.quantity) > 0, {
    message: 'Each item needs a positive pcs or quantity',
    path: ['quantity']
  });

// Stock movement is driven by whichever basis the item uses (pcs or quantity).
function movementQty(item) {
  return Number(item.quantity) > 0 ? Number(item.quantity) : Number(item.pcs);
}

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
  async getNextPurchaseVoucherNo() {
    const count = (await getPrismaClient().purchase.count()) + 1;
    return `PUR-${String(count).padStart(5, '0')}`;
  }

  async savePurchaseVoucher(payload) {
    const data = purchaseVoucherSchema.parse(payload);
    const prisma = getPrismaClient();

    if (!data.voucher_no) {
      data.voucher_no = await this.getNextPurchaseVoucherNo();
    }

    const purchaseId = await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          voucherNo: data.voucher_no,
          invoiceNo: data.invoice_no,
          supplierId: data.supplier_id,
          warehouseId: data.warehouse_id,
          purchaseDate: data.purchase_date,
          batchNo: data.batch_no,
          expiryDate: data.expiry_date,
          vehicleNo: data.vehicle_no,
          biltyNo: data.bilty_no,
          broker: data.broker,
          remarks: data.remarks,
          status: data.status,
          taxableValue: data.taxable_value,
          gstAmount: data.gst_amount,
          totalAmount: data.total_amount
        }
      });

      for (const item of data.items) {
        await tx.purchaseItem.create({
          data: {
            purchaseId: purchase.id,
            productId: item.product_id,
            productName: item.product_name ?? null,
            hsn: item.hsn,
            pcs: item.pcs,
            quantity: item.quantity,
            baseRate: item.base_rate,
            sizeDiff: item.size_diff,
            netRate: item.net_rate,
            taxableValue: item.taxable_value,
            gstRate: item.gst_rate,
            gstAmount: item.gst_amount,
            amount: item.amount
          }
        });

        // Add positive quantity for purchase (driven by the item's basis).
        await tx.stockTransaction.create({
          data: {
            transactionNo: data.voucher_no, // we use voucher_no to link them
            sourceType: 'purchase',
            sourceId: purchase.id,
            transactionType: 'purchase',
            productId: item.product_id,
            warehouseId: data.warehouse_id,
            partyId: data.supplier_id,
            quantity: movementQty(item),
            rate: item.net_rate,
            amount: item.taxable_value, // storing taxable value as the inventory cost
            referenceNo: data.invoice_no,
            notes: data.remarks
          }
        });
      }

      return purchase.id;
    });

    return { id: purchaseId, voucher_no: data.voucher_no };
  }

  // --- SALES RETURN ---
  async getNextSaleReturnVoucherNo() {
    const count = (await getPrismaClient().saleReturn.count()) + 1;
    return `SR-${String(count).padStart(5, '0')}`;
  }

  async saveSaleReturnVoucher(payload) {
    const prisma = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextSaleReturnVoucherNo();
    const customerId = payload.customer_id ? Number(payload.customer_id) : null;
    const warehouseId = Number(payload.warehouse_id) || 1;

    const srId = await prisma.$transaction(async (tx) => {
      const saleReturn = await tx.saleReturn.create({
        data: {
          voucherNo: payload.voucher_no,
          invoiceNo: payload.invoice_no,
          customerId,
          warehouseId,
          returnDate: payload.return_date,
          batchNo: payload.batch_no,
          expiryDate: payload.expiry_date,
          vehicleNo: payload.vehicle_no,
          biltyNo: payload.bilty_no,
          broker: payload.broker,
          remarks: payload.remarks,
          status: 'posted',
          taxableValue: payload.taxable_value,
          gstAmount: payload.gst_amount,
          totalAmount: payload.total_amount
        }
      });

      for (const item of payload.items) {
        await tx.saleReturnItem.create({
          data: {
            saleReturnId: saleReturn.id,
            productId: Number(item.product_id),
            hsn: item.hsn,
            pcs: Number(item.pcs) || 0,
            quantity: Number(item.quantity) || 0,
            baseRate: Number(item.base_rate) || 0,
            sizeDiff: Number(item.size_diff) || 0,
            netRate: Number(item.net_rate) || 0,
            taxableValue: Number(item.taxable_value) || 0,
            gstRate: Number(item.gst_rate) || 0,
            gstAmount: Number(item.gst_amount) || 0,
            amount: Number(item.amount) || 0
          }
        });

        // Add positive quantity for sale return (inventory comes back)
        await tx.stockTransaction.create({
          data: {
            transactionNo: payload.voucher_no,
            sourceType: 'sale_return',
            sourceId: saleReturn.id,
            transactionType: 'sale_return',
            productId: Number(item.product_id),
            warehouseId,
            partyId: customerId,
            quantity: movementQty(item),
            rate: Number(item.net_rate),
            amount: Number(item.taxable_value),
            referenceNo: payload.invoice_no,
            notes: payload.remarks
          }
        });
      }

      return saleReturn.id;
    });

    return { id: srId, voucher_no: payload.voucher_no };
  }

  // --- SALES ---
  async getNextSaleVoucherNo() {
    const count = (await getPrismaClient().sale.count()) + 1;
    return `SALE-${String(count).padStart(5, '0')}`;
  }

  async saveSaleVoucher(payload) {
    const prisma = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextSaleVoucherNo();
    const customerId = payload.customer_id ? Number(payload.customer_id) : null;
    const warehouseId = Number(payload.warehouse_id) || 1;

    const saleId = await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          voucherNo: payload.voucher_no,
          invoiceNo: payload.invoice_no,
          customerId,
          warehouseId,
          saleDate: payload.sale_date,
          batchNo: payload.batch_no,
          expiryDate: payload.expiry_date,
          vehicleNo: payload.vehicle_no,
          biltyNo: payload.bilty_no,
          broker: payload.broker,
          remarks: payload.remarks,
          status: 'posted',
          taxableValue: payload.taxable_value,
          gstAmount: payload.gst_amount,
          totalAmount: payload.total_amount
        }
      });

      for (const item of payload.items) {
        await tx.saleItem.create({
          data: {
            saleId: sale.id,
            productId: Number(item.product_id),
            hsn: item.hsn,
            pcs: Number(item.pcs) || 0,
            quantity: Number(item.quantity) || 0,
            baseRate: Number(item.base_rate) || 0,
            sizeDiff: Number(item.size_diff) || 0,
            netRate: Number(item.net_rate) || 0,
            taxableValue: Number(item.taxable_value) || 0,
            gstRate: Number(item.gst_rate) || 0,
            gstAmount: Number(item.gst_amount) || 0,
            amount: Number(item.amount) || 0
          }
        });

        // Negative quantity for sale (stock goes out)
        await tx.stockTransaction.create({
          data: {
            transactionNo: payload.voucher_no,
            sourceType: 'sale',
            sourceId: sale.id,
            transactionType: 'sale',
            productId: Number(item.product_id),
            warehouseId,
            partyId: customerId,
            quantity: -Math.abs(movementQty(item)),
            rate: Number(item.net_rate),
            amount: Number(item.taxable_value),
            referenceNo: payload.invoice_no,
            notes: payload.remarks
          }
        });
      }

      return sale.id;
    });

    return { id: saleId, voucher_no: payload.voucher_no };
  }

  // --- PURCHASE RETURN ---
  async getNextPurchaseReturnVoucherNo() {
    const count = (await getPrismaClient().purchaseReturn.count()) + 1;
    return `PR-${String(count).padStart(5, '0')}`;
  }

  async savePurchaseReturnVoucher(payload) {
    const prisma = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextPurchaseReturnVoucherNo();
    const supplierId = payload.supplier_id ? Number(payload.supplier_id) : null;
    const warehouseId = Number(payload.warehouse_id) || 1;

    const prId = await prisma.$transaction(async (tx) => {
      const purchaseReturn = await tx.purchaseReturn.create({
        data: {
          voucherNo: payload.voucher_no,
          invoiceNo: payload.invoice_no,
          supplierId,
          warehouseId,
          returnDate: payload.return_date,
          batchNo: payload.batch_no,
          expiryDate: payload.expiry_date,
          vehicleNo: payload.vehicle_no,
          biltyNo: payload.bilty_no,
          broker: payload.broker,
          remarks: payload.remarks,
          status: 'posted',
          taxableValue: payload.taxable_value,
          gstAmount: payload.gst_amount,
          totalAmount: payload.total_amount
        }
      });

      for (const item of payload.items) {
        await tx.purchaseReturnItem.create({
          data: {
            purchaseReturnId: purchaseReturn.id,
            productId: Number(item.product_id),
            hsn: item.hsn,
            pcs: Number(item.pcs) || 0,
            quantity: Number(item.quantity) || 0,
            baseRate: Number(item.base_rate) || 0,
            sizeDiff: Number(item.size_diff) || 0,
            netRate: Number(item.net_rate) || 0,
            taxableValue: Number(item.taxable_value) || 0,
            gstRate: Number(item.gst_rate) || 0,
            gstAmount: Number(item.gst_amount) || 0,
            amount: Number(item.amount) || 0
          }
        });

        // Negative quantity for purchase return (stock goes back to supplier)
        await tx.stockTransaction.create({
          data: {
            transactionNo: payload.voucher_no,
            sourceType: 'purchase_return',
            sourceId: purchaseReturn.id,
            transactionType: 'purchase_return',
            productId: Number(item.product_id),
            warehouseId,
            partyId: supplierId,
            quantity: -Math.abs(movementQty(item)),
            rate: Number(item.net_rate),
            amount: Number(item.taxable_value),
            referenceNo: payload.invoice_no,
            notes: payload.remarks
          }
        });
      }

      return purchaseReturn.id;
    });

    return { id: prId, voucher_no: payload.voucher_no };
  }

  // --- PRODUCTION ---
  async getNextProductionVoucherNo() {
    const count = (await getPrismaClient().production.count()) + 1;
    return `PROD-${String(count).padStart(5, '0')}`;
  }

  async saveProductionVoucher(payload) {
    const prisma = getPrismaClient();
    if (!payload.voucher_no) payload.voucher_no = await this.getNextProductionVoucherNo();
    const warehouseId = Number(payload.warehouse_id) || 1;

    const prodId = await prisma.$transaction(async (tx) => {
      const production = await tx.production.create({
        data: {
          voucherNo: payload.voucher_no,
          warehouseId,
          productionDate: payload.production_date,
          isRecurring: Boolean(payload.is_recurring),
          status: 'posted',
          remarks: payload.remarks
        }
      });

      for (const item of payload.items) {
        await tx.productionItem.create({
          data: {
            productionId: production.id,
            productId: Number(item.product_id),
            batchNo: item.batch_no,
            issuedQty: Number(item.issued_qty) || 0,
            issuedPcs: Number(item.issued_pcs) || 0,
            productionQty: Number(item.production_qty) || 0,
            productionPcs: Number(item.production_pcs) || 0
          }
        });

        // Move stock by the item's basis: quantity if given, otherwise pcs.
        const issuedMove = Number(item.issued_qty) > 0 ? Number(item.issued_qty) : Number(item.issued_pcs) || 0;
        const producedMove = Number(item.production_qty) > 0 ? Number(item.production_qty) : Number(item.production_pcs) || 0;

        if (issuedMove > 0) {
          // Negative quantity for issued (raw material goes out)
          await tx.stockTransaction.create({
            data: {
              transactionNo: payload.voucher_no,
              sourceType: 'production',
              sourceId: production.id,
              transactionType: 'production_out',
              productId: Number(item.product_id),
              warehouseId,
              quantity: -Math.abs(issuedMove),
              rate: 0,
              amount: 0,
              notes: payload.remarks
            }
          });
        }

        if (producedMove > 0) {
          // Positive quantity for produced (finished goods come in)
          await tx.stockTransaction.create({
            data: {
              transactionNo: payload.voucher_no,
              sourceType: 'production',
              sourceId: production.id,
              transactionType: 'production_in',
              productId: Number(item.product_id),
              warehouseId,
              quantity: Math.abs(producedMove),
              rate: 0,
              amount: 0,
              notes: payload.remarks
            }
          });
        }
      }

      return production.id;
    });

    return { id: prodId, voucher_no: payload.voucher_no };
  }

  async getProductionSettings() {
    const setting = await getPrismaClient().setting.findUnique({ where: { id: 1 } });
    try {
      return JSON.parse(setting?.productionSettingsJson || '{}');
    } catch {
      return {};
    }
  }

  async updateProductionSettings(settingsJson) {
    await getPrismaClient().setting.update({
      where: { id: 1 },
      data: { productionSettingsJson: JSON.stringify(settingsJson) }
    });
    return settingsJson;
  }
}
