// Shared calculation + product auto-fill for voucher item grids so every voucher
// behaves the same and respects an item's measurement basis (pcs OR quantity).

export function emptyVoucherRow() {
  return {
    id: Date.now() + Math.random(),
    product_id: '',
    product_name: '',
    hsn: '',
    unit_basis: 'quantity',
    pcs: '',
    quantity: '',
    base_rate: '',
    size_diff: '0',
    net_rate: '',
    taxable_value: '',
    gst_rate: '0',
    gst_amount: '',
    amount: ''
  };
}

// net rate = base + size diff; taxable = (pcs or quantity, per basis) * net rate.
export function recalcVoucherRow(row, changedField) {
  const next = { ...row };
  const base = Number(next.base_rate) || 0;
  const diff = Number(next.size_diff) || 0;

  if (['base_rate', 'size_diff', 'product_id'].includes(changedField)) {
    next.net_rate = (base + diff).toFixed(2);
  }

  const net = Number(next.net_rate) || 0;
  const basisQty = next.unit_basis === 'pcs' ? Number(next.pcs) || 0 : Number(next.quantity) || 0;

  if (['base_rate', 'size_diff', 'net_rate', 'pcs', 'quantity', 'product_id'].includes(changedField)) {
    next.taxable_value = (basisQty * net).toFixed(2);
  }

  const taxable = Number(next.taxable_value) || 0;
  const gstRate = Number(next.gst_rate) || 0;
  next.gst_amount = (taxable * (gstRate / 100)).toFixed(2);
  next.amount = (taxable + Number(next.gst_amount)).toFixed(2);
  return next;
}

// Fills a row from the selected product. baseRateField is 'sale_rate' for
// sale-side vouchers and 'purchase_rate' for purchase-side vouchers.
export function applyProductToRow(row, product, baseRateField = 'purchase_rate') {
  const next = { ...row };
  next.product_name = product.name ?? '';
  next.hsn = product.hsn ?? '';
  next.unit_basis = product.unit_basis === 'pcs' ? 'pcs' : 'quantity';
  next.size_diff = String(product.size_diff ?? 0);
  next.gst_rate = String(product.gst_rate ?? 0);
  next.base_rate = String(product[baseRateField] ?? 0);
  // Clear the column that doesn't apply to this item's basis.
  if (next.unit_basis === 'pcs') next.quantity = '';
  else next.pcs = '';
  return next;
}

// A row is postable if it has a product and a positive value in its basis column.
export function rowHasQty(row) {
  return Boolean(row.product_id) && (Number(row.quantity) > 0 || Number(row.pcs) > 0);
}

// Normalises an item's numeric fields for sending to the backend.
export function toItemPayload(row) {
  return {
    product_id: Number(row.product_id),
    product_name: row.product_name || null,
    hsn: row.hsn || null,
    unit_basis: row.unit_basis || 'quantity',
    pcs: Number(row.pcs) || 0,
    quantity: Number(row.quantity) || 0,
    base_rate: Number(row.base_rate) || 0,
    size_diff: Number(row.size_diff) || 0,
    net_rate: Number(row.net_rate) || 0,
    taxable_value: Number(row.taxable_value) || 0,
    gst_rate: Number(row.gst_rate) || 0,
    gst_amount: Number(row.gst_amount) || 0,
    amount: Number(row.amount) || 0
  };
}
