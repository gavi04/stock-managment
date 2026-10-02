// Today's date as dd/mm/yyyy (voucher/stock dates are entered as plain text).
export function todayDdmmyyyy() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// Formats a Date / timestamp / ISO / 'yyyy-mm-dd' value as dd/mm/yyyy numerals
// (no month names, locale-independent).
export function formatDdmmyyyy(value) {
  if (value == null || value === '') return '';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const [y, m, d] = value.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  }
  const dt = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(dt.getTime())) return String(value);
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${dt.getFullYear()}`;
}

// dd/mm/yyyy HH:MM, 24-hour, numerals only.
export function formatDdmmyyyyTime(value) {
  if (value == null || value === '') return '';
  const dt = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(dt.getTime())) return String(value);
  const date = formatDdmmyyyy(dt);
  const hh = String(dt.getHours()).padStart(2, '0');
  const mi = String(dt.getMinutes()).padStart(2, '0');
  return `${date} ${hh}:${mi}`;
}
