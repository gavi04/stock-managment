import { z } from 'zod';
import { BaseCrudService } from './baseCrudService.js';
import { buildItemCode } from '../../shared/itemCode.js';
import {
  categoriesRepository,
  hsnRepository,
  partiesRepository,
  productsRepository,
  unitsRepository,
  warehousesRepository
} from '../repositories/catalogRepositories.js';

// Robust boolean coercion: treats 0, '0', 'false', '', false as false; everything else truthy.
const boolish = z.preprocess((value) => {
  if (value === false || value === 0 || value === '0' || value === 'false' || value === '' || value == null) {
    return false;
  }
  return Boolean(value);
}, z.boolean());

const commonCreateSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional().nullable()
});

const commonUpdateSchema = commonCreateSchema.partial();

// HSN master: code + optional description.
const hsnCreateSchema = z.object({
  code: z.string().min(1),
  description: z.string().optional().nullable()
});

const hsnUpdateSchema = hsnCreateSchema.partial();

// Unit (UOM) master: name + optional symbol; code auto-generated from the name.
const unitCreateSchema = z.object({
  name: z.string().min(1),
  symbol: z.string().optional().nullable(),
  code: z.string().optional().nullable()
});

const unitUpdateSchema = unitCreateSchema.partial();

class UnitService extends BaseCrudService {
  create(payload) {
    if (!payload.code) {
      const slug = String(payload.name || '')
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      payload.code = slug ? `UOM-${slug}` : `UOM-${Date.now().toString().slice(-6)}`;
    }
    return super.create(payload);
  }
}

const partyCreateSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  pin_code: z.string().optional().nullable(),
  gstin: z
    .string()
    .regex(/^[0-9A-Z]{15}$/, 'GST No. must be 15 uppercase letters/digits')
    .optional()
    .nullable()
    .or(z.literal(''))
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
  is_default: boolish.optional().default(false)
});

const warehouseUpdateSchema = warehouseCreateSchema.partial();

const productCreateSchema = z.object({
  category_id: z.coerce.number().int().positive().optional().nullable(),
  unit_id: z.coerce.number().int().positive().optional().nullable(),
  name: z.string().min(1),
  code: z.string().min(1),
  hsn: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  length: z.string().optional().nullable(),
  gst_rate: z.coerce.number().min(0).optional().default(0),
  sale_rate: z.coerce.number().min(0).optional().default(0),
  purchase_rate: z.coerce.number().min(0).optional().default(0),
  size_diff: z.coerce.number().optional().default(0),
  batch_no: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  opening_stock_date: z.string().optional().nullable(),
  unit_basis: z.enum(['quantity', 'pcs']).optional().default('quantity'),
  isi_mark: boolish.optional().default(false),
  is_active: boolish.optional().default(true),
  min_stock: z.coerce.number().min(0).optional().default(0)
});

const productUpdateSchema = productCreateSchema.partial();

class ProductService extends BaseCrudService {
  create(payload) {
    if (!payload.code) {
      payload.code = buildItemCode(payload.name, payload.size, payload.length) || `ITM-${Date.now().toString().slice(-6)}`;
    }
    return super.create(payload);
  }
}

export const categoryService = new BaseCrudService(categoriesRepository, 'Category', commonCreateSchema, commonUpdateSchema);
export const unitService = new UnitService(unitsRepository, 'Unit', unitCreateSchema, unitUpdateSchema);
export const hsnService = new BaseCrudService(hsnRepository, 'HSN', hsnCreateSchema, hsnUpdateSchema);
export const partyService = new PartyService(partiesRepository, 'Party', partyCreateSchema, partyUpdateSchema);
export const warehouseService = new BaseCrudService(warehousesRepository, 'Warehouse', warehouseCreateSchema, warehouseUpdateSchema);
export const productService = new ProductService(productsRepository, 'Product', productCreateSchema, productUpdateSchema);
