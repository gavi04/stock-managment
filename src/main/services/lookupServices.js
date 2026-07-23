import { z } from 'zod';
import { BaseCrudService } from './baseCrudService.js';
import { categoriesRepository, partiesRepository, productsRepository, unitsRepository, warehousesRepository } from '../repositories/catalogRepositories.js';

const commonCreateSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional().nullable()
});

const commonUpdateSchema = commonCreateSchema.partial();

const partyCreateSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional().nullable(),
  type: z.enum(['customer', 'supplier', 'both']).default('customer'),
  phone: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal('')),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  pin_code: z.string().optional().nullable(),
  gstin: z.string().optional().nullable()
});

const partyUpdateSchema = partyCreateSchema.partial();

class PartyService extends BaseCrudService {
  getNextCode() {
    return `PTY-${Date.now().toString().slice(-6)}`;
  }

  create(payload) {
    if (!payload.code) {
      payload.code = this.getNextCode();
    }
    return super.create(payload);
  }
}

const warehouseCreateSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  location: z.string().optional().nullable(),
  is_default: z.coerce.number().int().min(0).max(1).optional().default(0)
});

const warehouseUpdateSchema = warehouseCreateSchema.partial();

const productCreateSchema = z.object({
  category_id: z.coerce.number().int().positive().optional().nullable(),
  unit_id: z.coerce.number().int().positive().optional().nullable(),
  name: z.string().min(1),
  code: z.string().min(1),
  barcode: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
  is_active: z.coerce.number().int().min(0).max(1).optional().default(1),
  track_batch: z.coerce.number().int().min(0).max(1).optional().default(0),
  track_serial: z.coerce.number().int().min(0).max(1).optional().default(0),
  min_stock: z.coerce.number().default(0)
});

const productUpdateSchema = productCreateSchema.partial();

export const categoryService = new BaseCrudService(categoriesRepository, 'Category', commonCreateSchema, commonUpdateSchema);
export const unitService = new BaseCrudService(unitsRepository, 'Unit', commonCreateSchema, commonUpdateSchema);
export const partyService = new PartyService(partiesRepository, 'Party', partyCreateSchema, partyUpdateSchema);
export const warehouseService = new BaseCrudService(warehousesRepository, 'Warehouse', warehouseCreateSchema, warehouseUpdateSchema);
export const productService = new BaseCrudService(productsRepository, 'Product', productCreateSchema, productUpdateSchema);