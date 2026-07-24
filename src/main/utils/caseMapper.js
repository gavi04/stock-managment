// Prisma models use camelCase fields; the renderer/IPC contract was built around
// the original hand-written SQLite columns (snake_case, booleans as 0/1). These
// helpers translate at the repository boundary so the rest of the app is unaffected.

const BOOLEAN_FIELDS = new Set([
  'isActive',
  'isiMark',
  'isDefault',
  'isRecurring',
  'allowDuplicateBarcodes',
  'allowNegativeStock',
  'enableAutoBackup'
]);

function camelToSnake(key) {
  return key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

function snakeToCamel(key) {
  return key.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

export function toWire(value) {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map(toWire);
  if (typeof value !== 'object' || value instanceof Date) return value;

  const out = {};
  for (const [key, val] of Object.entries(value)) {
    const wireKey = camelToSnake(key);
    if (BOOLEAN_FIELDS.has(key) && typeof val === 'boolean') {
      out[wireKey] = val ? 1 : 0;
    } else if (val instanceof Date) {
      out[wireKey] = val.toISOString();
    } else {
      out[wireKey] = val;
    }
  }
  return out;
}

export function fromWire(data) {
  if (data == null) return data;

  const out = {};
  for (const [key, value] of Object.entries(data)) {
    const camelKey = snakeToCamel(key);
    if (BOOLEAN_FIELDS.has(camelKey)) {
      out[camelKey] = value === true || value === 1 || value === '1';
    } else {
      out[camelKey] = value;
    }
  }
  return out;
}
