import { useState, useEffect, useRef } from 'react';
import { handleGridKeyNav } from '../utils/gridKeyNav.js';
import { todayDdmmyyyy } from '../utils/dateFormat.js';
import { handleFormKeyNav } from '../utils/formKeyNav.js';
import { emptyVoucherRow, recalcVoucherRow, applyProductToRow, rowHasQty, toItemPayload } from '../utils/voucherRow.js';

const createEmptyRow = emptyVoucherRow;

export function PurchaseReturnVoucherPanel({ products, parties, busy, onSave }) {
  const [voucherNo, setVoucherNo] = useState('');
  const [returnDate, setReturnDate] = useState(todayDdmmyyyy());
  const [supplierId, setSupplierId] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [biltyNo, setBiltyNo] = useState('');
  const [broker, setBroker] = useState('');
  const [remarks, setRemarks] = useState('');

  const [items, setItems] = useState([createEmptyRow()]);
  const [error, setError] = useState(null);

  const gridRef = useRef(null);

  useEffect(() => {
    window.stockOps.getNextPurchaseReturnVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);

  const handleRowChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      let row = { ...next[index], [field]: value };
      if (field === 'product_id') {
        const product = products.find((p) => String(p.id) === String(value));
        if (product) row = applyProductToRow(row, product, 'purchase_rate');
      }
      next[index] = recalcVoucherRow(row, field);
      return next;
    });
  };

  const appendRow = () => {
    setItems(prev => [...prev, createEmptyRow()]);
    setTimeout(() => {
      const rows = gridRef.current?.querySelectorAll('tbody tr');
      const last = rows?.[rows.length - 1];
      last?.querySelector('select, input:not([readonly]):not([disabled])')?.focus();
    }, 30);
  };

  // Full up/down/left/right grid navigation; extra args from JSX are ignored.
  const handleKeyDown = (e) => handleGridKeyNav(e, { onAppendRow: appendRow });

  const removeRow = (index) => {
    if (items.length === 1) setItems([createEmptyRow()]);
    else setItems(items.filter((_, i) => i !== index));
  };

  const totals = items.reduce((acc, item) => {
    acc.taxable += Number(item.taxable_value) || 0;
    acc.gst += Number(item.gst_amount) || 0;
    acc.grand += Number(item.amount) || 0;
    return acc;
  }, { taxable: 0, gst: 0, grand: 0 });

  const handleSave = async () => {
    setError(null);
    try {
      const validItems = items.filter(rowHasQty);
      if (validItems.length === 0) throw new Error('Add at least one item with a pcs or quantity.');
      if (!supplierId) throw new Error('Supplier is required.');

      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        supplier_id: supplierId,
        warehouse_id: 1,
        return_date: returnDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map(toItemPayload)
      };

      await onSave(payload);

      setInvoiceNo(''); setBatchNo(''); setExpiryDate('');
      setVehicleNo(''); setBiltyNo(''); setBroker(''); setRemarks('');
      setItems([createEmptyRow()]);
      const nextNo = await window.stockOps.getNextPurchaseReturnVoucherNo();
      setVoucherNo(nextNo);
    } catch (err) {
      setError(err.message || 'Failed to save voucher');
    }
  };

  const inputStyle = { width: '100%', border: '1px solid #d5cfc3', background: '#fff', color: '#4f6166' };
  const readonlyStyle = { ...inputStyle, background: '#f2f0ea', color: '#5d6a6e' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* HEADER */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2>Purchase Return Voucher</h2>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Date</span>
            <input type="text" placeholder="dd/mm/yyyy" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
          </label>
          <label className="field">
            <span>Voucher No.</span>
            <input value={voucherNo} readOnly style={{ background: '#f2f0ea' }} />
          </label>
          <label className="field">
            <span>Supplier</span>
            <select value={supplierId} onChange={e => setSupplierId(e.target.value)} autoFocus>
              <option value="">-- Select Supplier --</option>
              {parties.map(p => (
                <option key={p.id} value={p.id}>{p.name} {p.gstin ? `| GST: ${p.gstin}` : ''}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Orig. Invoice No.</span>
            <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Batch No.</span>
            <input value={batchNo} onChange={e => setBatchNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Expiry Date</span>
            <input type="text" placeholder="dd/mm/yyyy" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <label className="field">
            <span>Vehicle No.</span>
            <input value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Bilty No.</span>
            <input value={biltyNo} onChange={e => setBiltyNo(e.target.value)} />
          </label>
          <div></div>
        </div>
      </section>

      {/* GRID */}
      <section className="panel" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table ref={gridRef} className="voucher-grid" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8f8f6', zIndex: 1 }}>
              <tr>
                <th style={{ width: '28px' }}>#</th>
                <th style={{ width: '180px' }}>Item</th>
                <th style={{ width: '62px' }}>HSN</th>
                <th style={{ width: '52px' }}>Pcs</th>
                <th style={{ width: '62px' }}>Qty</th>
                <th style={{ width: '72px' }}>Base</th>
                <th style={{ width: '62px' }}>Diff</th>
                <th style={{ width: '72px' }}>Net</th>
                <th style={{ width: '86px' }}>Taxable</th>
                <th style={{ width: '52px' }}>GST%</th>
                <th style={{ width: '90px' }}>Amount</th>
                <th style={{ width: '26px' }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center' }}>{i + 1}</td>
                  <td>
                    <select value={row.product_id} onChange={e => handleRowChange(i, 'product_id', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 0)} style={inputStyle}>
                      <option value=""></option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
                    </select>
                  </td>
                  <td><input value={row.hsn} readOnly tabIndex={-1} style={readonlyStyle} /></td>
                  <td><input type="text" inputMode="decimal" value={row.pcs} disabled={row.unit_basis !== 'pcs'} onChange={e => handleRowChange(i, 'pcs', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 2)} style={row.unit_basis === 'pcs' ? inputStyle : readonlyStyle} /></td>
                  <td><input type="text" inputMode="decimal" value={row.quantity} disabled={row.unit_basis === 'pcs'} onChange={e => handleRowChange(i, 'quantity', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 3)} style={row.unit_basis === 'pcs' ? readonlyStyle : inputStyle} /></td>
                  <td><input type="text" inputMode="decimal" value={row.base_rate} onChange={e => handleRowChange(i, 'base_rate', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 4)} style={inputStyle} /></td>
                  <td><input type="text" inputMode="decimal" value={row.size_diff} onChange={e => handleRowChange(i, 'size_diff', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 5)} style={inputStyle} /></td>
                  <td><input value={row.net_rate} readOnly tabIndex={-1} style={readonlyStyle} /></td>
                  <td><input value={row.taxable_value} readOnly tabIndex={-1} style={readonlyStyle} /></td>
                  <td><input type="text" inputMode="decimal" value={row.gst_rate} onChange={e => handleRowChange(i, 'gst_rate', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 8)} style={inputStyle} /></td>
                  <td><input value={row.amount} readOnly tabIndex={-1} style={readonlyStyle} /></td>
                  <td style={{ textAlign: 'center' }}><button type="button" onClick={() => removeRow(i)} tabIndex={-1} style={{ padding: '2px 6px', background: 'transparent', color: 'red', border: 'none' }}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="field">
              <span>Broker</span>
              <input value={broker} onChange={e => setBroker(e.target.value)} />
            </label>
            <label className="field">
              <span>Remarks</span>
              <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={3} style={{ resize: 'vertical' }} />
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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontSize: '1.2em', color: '#2ecc71' }}>
              <span>Grand Total:</span>
              <strong>₹ {totals.grand.toFixed(2)}</strong>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #e8e8e8', paddingTop: '16px' }}>
          <button type="button" onClick={handleSave} disabled={busy} style={{ minWidth: '120px' }}>
            {busy ? 'Saving...' : 'Save (F2)'}
          </button>
        </div>
      </section>
    </div>
  );
}
