import ExcelJS from 'exceljs';
import { buildItemCode } from '../../shared/itemCode.js';
import { categoryService, partyService, productService, unitService } from './lookupServices.js';
import { categoriesRepository, unitsRepository } from '../repositories/catalogRepositories.js';
import { InventoryService } from './inventoryService.js';

const inventoryService = new InventoryService();

// Header aliases (normalised: upper-case, no dots, single-spaced) -> field name.
const STOCK_ALIASES = {
  'STOCK NAME': 'name',
  GROUP: 'group',
  'HSN CODE': 'hsn',
  UOM: 'uom',
  SIZE: 'size',
  LENGTH: 'length',
  'GST RATE': 'gst_rate',
  'SALE RATE': 'sale_rate',
  'PURCHASE RATE': 'purchase_rate',
  'SIZE DIFFERENCE': 'size_diff',
  'BATCH NO': 'batch_no',
  'OPENING STOCK QTY': 'opening_qty',
  'OPENING STOCK DATE': 'opening_date',
  'ITEM CODE': 'code'
};

const PARTY_ALIASES = {
  'GST NO': 'gstin',
  'PARTY NAME': 'name',
  'PARTY CODE': 'code',
  ADDRESS: 'address',
  CITY: 'city',
  DISTRICT: 'district',
  STATE: 'state',
  'PIN CODE': 'pin_code',
  'MOBILE NUMBER': 'mobile'
};

function normHeader(value) {
  return String(value ?? '')
    .toUpperCase()
    .replace(/\./g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Raw cell value, unwrapping exceljs's richtext/formula/hyperlink wrappers.
function cellValue(row, col) {
  const value = row.getCell(col).value;
  if (value == null) return '';
  if (value instanceof Date) return value;
  if (typeof value === 'object') {
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text).join('');
    if ('result' in value) return value.result ?? '';
    if ('text' in value) return value.text ?? '';
    return '';
  }
  return value;
}

function asText(value) {
  if (value instanceof Date) return toDdmmyyyy(value);
  return String(value ?? '').trim();
}

function asNumber(value) {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function toDdmmyyyy(value) {
  if (value instanceof Date) {
    const dd = String(value.getDate()).padStart(2, '0');
    const mm = String(value.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${value.getFullYear()}`;
  }
  return String(value ?? '').trim();
}

function slug(value) {
  return String(value ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 20);
}

function cleanErr(err) {
  return String(err?.message || 'Failed')
    .replace(/^Error invoking remote method '[^']*':\s*/, '')
    .replace(/^AppError:\s*/, '');
}

// Map header row -> { field: columnIndex }.
function buildHeaderMap(sheet, aliases) {
  const map = {};
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell, col) => {
    const field = aliases[normHeader(cellValue(headerRow, col))];
    if (field) map[field] = col;
  });
  return map;
}

function findSheet(workbook, keyword) {
  return workbook.worksheets.find((ws) => normHeader(ws.name).includes(keyword));
}

export class ImportService {
  async importWorkbook(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const stock = await this.importStock(findSheet(workbook, 'STOCK'));
    const party = await this.importParties(findSheet(workbook, 'PARTY'));

    return { stock, party };
  }

  async importStock(sheet) {
    const result = { created: 0, skipped: 0, errors: [] };
    if (!sheet) {
      result.errors.push({ row: 0, message: 'No "STOCK ITEM" sheet found.' });
      return result;
    }

    const map = buildHeaderMap(sheet, STOCK_ALIASES);
    if (map.name == null) {
      result.errors.push({ row: 1, message: 'Could not find a "STOCK NAME" column.' });
      return result;
    }

    // find-or-create caches for Group (category) and UOM (unit), keyed by name.
    const categories = await categoriesRepository.findAll();
    const catByName = new Map(categories.map((c) => [String(c.name).trim().toLowerCase(), c.id]));
    const units = await unitsRepository.findAll();
    const unitByName = new Map(units.map((u) => [String(u.name).trim().toLowerCase(), u.id]));

    const val = (row, field) => (map[field] != null ? cellValue(row, map[field]) : '');

    for (let r = 2; r <= sheet.rowCount; r += 1) {
      const row = sheet.getRow(r);
      const name = asText(val(row, 'name'));
      if (!name) continue; // blank template row

      try {
        const categoryId = await this.resolveCategory(asText(val(row, 'group')), catByName);
        const unitId = await this.resolveUnit(asText(val(row, 'uom')), unitByName);
        const purchaseRate = asNumber(val(row, 'purchase_rate'));
        const openingQty = asNumber(val(row, 'opening_qty'));
        const openingDate = toDdmmyyyy(val(row, 'opening_date'));
        const code = asText(val(row, 'code')) || buildItemCode(name, asText(val(row, 'size')), asText(val(row, 'length')));

        const product = await productService.create({
          name,
          code: code || undefined,
          category_id: categoryId,
          unit_id: unitId,
          hsn: asText(val(row, 'hsn')) || null,
          size: asText(val(row, 'size')) || null,
          length: asText(val(row, 'length')) || null,
          gst_rate: asNumber(val(row, 'gst_rate')),
          sale_rate: asNumber(val(row, 'sale_rate')),
          purchase_rate: purchaseRate,
          size_diff: asNumber(val(row, 'size_diff')),
          batch_no: asText(val(row, 'batch_no')) || null,
          opening_stock_date: openingDate || null,
          unit_basis: 'quantity',
          is_active: true
        });

        if (openingQty > 0) {
          await inventoryService.recordStockTransaction({
            transaction_no: `OB-IMP-${Date.now()}-${r}`,
            source_type: 'stock_master',
            source_id: product.id,
            transaction_type: 'opening_balance',
            product_id: product.id,
            warehouse_id: 1,
            party_id: null,
            quantity: openingQty,
            rate: purchaseRate,
            amount: openingQty * purchaseRate,
            reference_no: openingDate || null,
            notes: 'Opening stock from Excel import'
          });
        }

        result.created += 1;
      } catch (err) {
        const message = cleanErr(err);
        if (/already exists|DUPLICATE|unique/i.test(message)) {
          result.skipped += 1;
          result.errors.push({ row: r, name, message: `${name}: ${message}` });
        } else {
          result.errors.push({ row: r, name, message: `${name}: ${message}` });
        }
      }
    }

    return result;
  }

  async importParties(sheet) {
    const result = { created: 0, skipped: 0, errors: [] };
    if (!sheet) {
      result.errors.push({ row: 0, message: 'No "PARTY" sheet found.' });
      return result;
    }

    const map = buildHeaderMap(sheet, PARTY_ALIASES);
    if (map.name == null) {
      result.errors.push({ row: 1, message: 'Could not find a "PARTY NAME" column.' });
      return result;
    }

    const val = (row, field) => (map[field] != null ? cellValue(row, map[field]) : '');

    for (let r = 2; r <= sheet.rowCount; r += 1) {
      const row = sheet.getRow(r);
      const name = asText(val(row, 'name'));
      if (!name) continue;

      try {
        await partyService.create({
          name,
          code: asText(val(row, 'code')) || undefined,
          gstin: asText(val(row, 'gstin')).toUpperCase() || '',
          address: asText(val(row, 'address')) || null,
          city: asText(val(row, 'city')) || null,
          district: asText(val(row, 'district')) || null,
          state: asText(val(row, 'state')) || null,
          pin_code: asText(val(row, 'pin_code')) || null,
          mobile: asText(val(row, 'mobile')) || null
        });
        result.created += 1;
      } catch (err) {
        const message = cleanErr(err);
        if (/already exists|DUPLICATE|unique/i.test(message)) result.skipped += 1;
        result.errors.push({ row: r, name, message: `${name}: ${message}` });
      }
    }

    return result;
  }

  async resolveCategory(group, catByName) {
    const key = group.trim().toLowerCase();
    if (!key) return null;
    if (catByName.has(key)) return catByName.get(key);
    let code = `GRP-${slug(group)}`;
    let created;
    try {
      created = await categoryService.create({ name: group.trim(), code });
    } catch {
      code = `GRP-${Date.now().toString().slice(-6)}`;
      created = await categoryService.create({ name: group.trim(), code });
    }
    catByName.set(key, created.id);
    return created.id;
  }

  async resolveUnit(uom, unitByName) {
    const key = uom.trim().toLowerCase();
    if (!key) return null;
    if (unitByName.has(key)) return unitByName.get(key);
    const created = await unitService.create({ name: uom.trim() });
    unitByName.set(key, created.id);
    return created.id;
  }
}
