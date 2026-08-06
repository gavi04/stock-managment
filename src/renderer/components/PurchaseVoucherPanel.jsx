import { useState, useEffect, useRef, useMemo } from 'react';
import { SearchableSelect } from './SearchableSelect.jsx';
import { handleGridKeyNav } from '../utils/gridKeyNav.js';
import { todayDdmmyyyy } from '../utils/dateFormat.js';
import { handleFormKeyNav } from '../utils/formKeyNav.js';
import { VoucherHistory } from './VoucherHistory.jsx';
import { useFocusFirstField } from '../utils/useFocusFirstField.js';

function createEmptyRow() {
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

// Recompute derived values downstream of the field the user just changed.
// net rate = base rate + size diff; taxable = basis(pcs|qty) * net; gst/amount follow.
function recalcRow(row, changedField) {
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

export function PurchaseVoucherPanel({ products, parties, busy, onSave }) {
  const [voucherNo, setVoucherNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(todayDdmmyyyy());
  const [customerId, setCustomerId] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [biltyNo, setBiltyNo] = useState('');
  const [brokerId, setBrokerId] = useState('');
  const [remarks, setRemarks] = useState('');

  const [items, setItems] = useState([createEmptyRow()]);
  const [error, setError] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);

  const gridRef = useRef(null);
  const rootRef = useFocusFirstField();

  useEffect(() => {
    window.stockOps.getNextPurchaseVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);

  const partyOptions = useMemo(
    () => parties.map((p) => ({ value: p.id, label: p.name, hint: p.gstin ? `| GST: ${p.gstin}` : p.code })),
    [parties]
  );

  const handleRowChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      const row = { ...next[index], [field]: value };

      if (field === 'product_id') {
        const product = products.find((p) => String(p.id) === String(value));
        if (product) {
          row.product_name = product.name ?? '';
          row.hsn = product.hsn ?? '';
          row.unit_basis = product.unit_basis === 'pcs' ? 'pcs' : 'quantity';
          row.size_diff = String(product.size_diff ?? 0);
          row.gst_rate = String(product.gst_rate ?? 0);
          row.base_rate = String(product.purchase_rate ?? 0);
          // Clear the basis that doesn't apply to this item.
          if (row.unit_basis === 'pcs') {
            row.quantity = '';
          } else {
            row.pcs = '';
          }
        }
      }

      next[index] = recalcRow(row, field);
      return next;
    });
  };

  const appendRow = () => {
    setItems((prev) => [...prev, createEmptyRow()]);
    setTimeout(() => {
      const rows = gridRef.current?.querySelectorAll('tbody tr');
      const lastRow = rows?.[rows.length - 1];
      lastRow?.querySelector('select, input:not([readonly]):not([disabled])')?.focus();
    }, 30);
  };

  const onGridKey = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });

  const removeRow = (index) => {
    if (items.length === 1) {
      setItems([createEmptyRow()]);
    } else {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const totals = items.reduce(
    (acc, item) => {
      acc.taxable += Number(item.taxable_value) || 0;
      acc.gst += Number(item.gst_amount) || 0;
      acc.grand += Number(item.amount) || 0;
      return acc;
    },
    { taxable: 0, gst: 0, grand: 0 }
  );

  const resetForm = async () => {
    setInvoiceNo('');
    setBatchNo('');
    setExpiryDate('');
    setVehicleNo('');
    setBiltyNo('');
    setBrokerId('');
    setRemarks('');
    setCustomerId('');
    setItems([createEmptyRow()]);
    const nextNo = await window.stockOps.getNextPurchaseVoucherNo();
    setVoucherNo(nextNo);
  };

  const handleSave = async () => {
    setError(null);
    try {
      const validItems = items.filter(
        (i) => i.product_id && (Number(i.quantity) > 0 || Number(i.pcs) > 0)
      );
      if (validItems.length === 0) throw new Error('Add at least one item with a pcs or quantity.');
      if (!customerId) throw new Error('Customer is required.');

      const brokerName = parties.find((p) => String(p.id) === String(brokerId))?.name || '';

      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        supplier_id: customerId,
        warehouse_id: 1, // Default warehouse
        purchase_date: purchaseDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker: brokerName,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map((i) => ({
          product_id: i.product_id,
          product_name: i.product_name,
          hsn: i.hsn,
          pcs: i.pcs || 0,
          quantity: i.quantity || 0,
          base_rate: i.base_rate || 0,
          size_diff: i.size_diff || 0,
          net_rate: i.net_rate || 0,
          taxable_value: i.taxable_value || 0,
          gst_rate: i.gst_rate || 0,
          gst_amount: i.gst_amount || 0,
          amount: i.amount || 0
        }))
      };

      await onSave(payload);
      await resetForm();
      setHistoryKey((k) => k + 1);
    } catch (err) {
      setError(err.message || 'Failed to save voucher');
    }
  };

  const inputStyle = { width: '100%', padding: '5px 6px', border: '1px solid #d5cfc3', borderRadius: '6px', background: '#fff', color: '#4f6166' };
  const readonlyStyle = { ...inputStyle, background: '#f2f0ea', color: '#5d6a6e' };

  return (
    <div ref={rootRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* HEADER SECTION */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2>Purchase Voucher</h2>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Date</span>
            <input type="text" placeholder="dd/mm/yyyy" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
          </label>
          <label className="field">
            <span>Voucher No.</span>
            <input value={voucherNo} readOnly style={{ background: '#f2f0ea' }} />
          </label>
          <label className="field">
            <span>Customer</span>
            <SearchableSelect
              options={partyOptions}
              value={customerId}
              onChange={setCustomerId}
              placeholder="Search customer…"
            />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Invoice No.</span>
            <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Batch No.</span>
            <input value={batchNo} onChange={(e) => setBatchNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Expiry Date</span>
            <input type="text" placeholder="dd/mm/yyyy" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <label className="field">
            <span>Vehicle No.</span>
            <input value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Bilty No.</span>
            <input value={biltyNo} onChange={(e) => setBiltyNo(e.target.value)} />
          </label>
          <div></div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="panel" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflow: 'auto', flex: 1 }}>
          <table ref={gridRef} className="voucher-grid" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8f8f6', zIndex: 1 }}>
              <tr>
                <th style={{ width: '28px' }}>#</th>
                <th style={{ width: '150px' }}>Item</th>
                <th style={{ width: '130px' }}>Stock Name</th>
                <th style={{ width: '58px' }}>HSN</th>
                <th style={{ width: '48px' }}>Pcs</th>
                <th style={{ width: '58px' }}>Qty</th>
                <th style={{ width: '66px' }}>Base</th>
                <th style={{ width: '58px' }}>Diff</th>
                <th style={{ width: '66px' }}>Net</th>
                <th style={{ width: '80px' }}>Taxable</th>
                <th style={{ width: '48px' }}>GST%</th>
                <th style={{ width: '82px' }}>Amount</th>
                <th style={{ width: '26px' }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => {
                const pcsMode = row.unit_basis === 'pcs';
                return (
                  <tr key={row.id}>
                    <td style={{ textAlign: 'center' }}>{i + 1}</td>
                    <td>
                      <select
                        value={row.product_id}
                        onChange={(e) => handleRowChange(i, 'product_id', e.target.value)}
                        onKeyDown={onGridKey}
                        style={inputStyle}
                      >
                        <option value=""></option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.code} - {p.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input value={row.product_name} readOnly tabIndex={-1} style={readonlyStyle} />
                    </td>
                    <td>
                      <input value={row.hsn} readOnly tabIndex={-1} style={readonlyStyle} />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.pcs}
                        disabled={!pcsMode}
                        onChange={(e) => handleRowChange(i, 'pcs', e.target.value)}
                        onKeyDown={onGridKey}
                        style={pcsMode ? inputStyle : readonlyStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.quantity}
                        disabled={pcsMode}
                        onChange={(e) => handleRowChange(i, 'quantity', e.target.value)}
                        onKeyDown={onGridKey}
                        style={pcsMode ? readonlyStyle : inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.base_rate}
                        onChange={(e) => handleRowChange(i, 'base_rate', e.target.value)}
                        onKeyDown={onGridKey}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.size_diff}
                        onChange={(e) => handleRowChange(i, 'size_diff', e.target.value)}
                        onKeyDown={onGridKey}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.net_rate}
                        onChange={(e) => handleRowChange(i, 'net_rate', e.target.value)}
                        onKeyDown={onGridKey}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.taxable_value}
                        onChange={(e) => handleRowChange(i, 'taxable_value', e.target.value)}
                        onKeyDown={onGridKey}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={row.gst_rate}
                        onChange={(e) => handleRowChange(i, 'gst_rate', e.target.value)}
                        onKeyDown={onGridKey}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input value={row.amount} readOnly tabIndex={-1} style={readonlyStyle} />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => removeRow(i)}
                        tabIndex={-1}
                        style={{ padding: '2px 6px', background: 'transparent', color: 'red', border: 'none' }}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="field">
              <span>Broker</span>
              <SearchableSelect
                options={partyOptions}
                value={brokerId}
                onChange={setBrokerId}
                placeholder="Search broker…"
              />
            </label>
            <label className="field">
              <span>Remarks</span>
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} style={{ resize: 'vertical' }} />
            </label>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px' }}>
              <span>Taxable Value:</span>
              <strong>₹ {totals.taxable.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px' }}>
              <span>GST Amount:</span>
              <strong>₹ {totals.gst.toFixed(2)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontSize: '1.2em', color: 'var(--good, #2ecc71)' }}>
              <span>Grand Total:</span>
              <strong>₹ {totals.grand.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #e5e1d8', paddingTop: '16px' }}>
          <button type="button" onClick={handleSave} disabled={busy} style={{ minWidth: '120px' }}>
            {busy ? 'Saving...' : 'Save Voucher'}
          </button>
        </div>
      </section>

      <VoucherHistory type="purchase" refreshToken={historyKey} title="Recent Purchase Vouchers" partyLabel="Supplier" />
    </div>
  );
}
