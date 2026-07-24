import { useState, useEffect, useRef, useMemo } from 'react';
import { SearchableSelect } from './SearchableSelect.jsx';

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
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
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

  const gridRef = useRef(null);

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

  const handleKeyDown = (e, rowIndex, colIndex, lastCol) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (colIndex === lastCol) {
        setItems((prev) => [...prev, createEmptyRow()]);
        setTimeout(() => {
          const nextRowInput = gridRef.current?.querySelector(`tr:nth-child(${rowIndex + 2}) select, tr:nth-child(${rowIndex + 2}) input`);
          nextRowInput?.focus();
        }, 50);
      } else {
        const inputs = Array.from(e.currentTarget.closest('tr').querySelectorAll('input:not([readonly]):not([disabled]), select'));
        const nextInput = inputs[inputs.indexOf(e.currentTarget) + 1];
        nextInput?.focus();
      }
    }
  };

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
    } catch (err) {
      setError(err.message || 'Failed to save voucher');
    }
  };

  const inputStyle = { width: '100%', padding: '5px 6px', border: '1px solid #d5cfc3', borderRadius: '6px', background: '#fff', color: '#4f6166' };
  const readonlyStyle = { ...inputStyle, background: '#f2f0ea', color: '#5d6a6e' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* HEADER SECTION */}
      <section className="panel" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2>Purchase Voucher</h2>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Date</span>
            <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
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
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
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
          <table ref={gridRef} style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1100px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8f8f6', zIndex: 1 }}>
              <tr>
                <th style={{ width: '36px' }}>#</th>
                <th style={{ width: '160px' }}>Item</th>
                <th style={{ width: '160px' }}>Stock Name</th>
                <th>HSN</th>
                <th>Pcs</th>
                <th>Qty</th>
                <th>Base Rate</th>
                <th>Size Diff</th>
                <th>Net Rate</th>
                <th>Taxable</th>
                <th>GST %</th>
                <th>Amount</th>
                <th style={{ width: '36px' }}></th>
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
                        onKeyDown={(e) => handleKeyDown(e, i, 0, 9)}
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
                      <input
                        value={row.product_name}
                        onChange={(e) => handleRowChange(i, 'product_name', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 1, 9)}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input value={row.hsn} readOnly tabIndex={-1} style={readonlyStyle} />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.pcs}
                        disabled={!pcsMode}
                        onChange={(e) => handleRowChange(i, 'pcs', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 2, 9)}
                        style={pcsMode ? inputStyle : readonlyStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.quantity}
                        disabled={pcsMode}
                        onChange={(e) => handleRowChange(i, 'quantity', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 3, 9)}
                        style={pcsMode ? readonlyStyle : inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.base_rate}
                        onChange={(e) => handleRowChange(i, 'base_rate', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 4, 9)}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.size_diff}
                        onChange={(e) => handleRowChange(i, 'size_diff', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 5, 9)}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.net_rate}
                        onChange={(e) => handleRowChange(i, 'net_rate', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 6, 9)}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.taxable_value}
                        onChange={(e) => handleRowChange(i, 'taxable_value', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 7, 9)}
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.gst_rate}
                        onChange={(e) => handleRowChange(i, 'gst_rate', e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i, 9, 9)}
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
      <section className="panel" style={{ padding: '16px' }}>
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
    </div>
  );
}
