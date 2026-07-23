import { useState, useEffect, useRef } from 'react';

function createEmptyRow() {
  return {
    id: Date.now() + Math.random(),
    product_id: '',
    hsn: '',
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

export function SaleVoucherPanel({ products, parties, busy, onSave }) {
  const [voucherNo, setVoucherNo] = useState('');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerId, setCustomerId] = useState('');
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
    window.stockOps.getNextSaleVoucherNo().then(setVoucherNo).catch(console.error);
  }, []);

  const calculateRow = (row) => {
    const qty = Number(row.quantity) || 0;
    const base = Number(row.base_rate) || 0;
    const diff = Number(row.size_diff) || 0;
    const net = Math.max(0, base - diff);
    const taxable = qty * net;
    const gstRate = Number(row.gst_rate) || 0;
    const gstAmount = taxable * (gstRate / 100);
    const amount = taxable + gstAmount;

    return {
      ...row,
      net_rate: net.toFixed(2),
      taxable_value: taxable.toFixed(2),
      gst_amount: gstAmount.toFixed(2),
      amount: amount.toFixed(2)
    };
  };

  const handleRowChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'product_id') {
      const product = products.find(p => String(p.id) === String(value));
      if (product) {
        newItems[index].gst_rate = '18';
      }
    }

    newItems[index] = calculateRow(newItems[index]);
    setItems(newItems);
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (colIndex === 8) {
        setItems(prev => [...prev, createEmptyRow()]);
        setTimeout(() => {
          const nextRow = gridRef.current?.querySelector(`tr:nth-child(${rowIndex + 2}) select`);
          nextRow?.focus();
        }, 50);
      } else {
        const inputs = Array.from(e.currentTarget.parentElement.parentElement.querySelectorAll('input, select'));
        const next = inputs[inputs.indexOf(e.currentTarget) + 1];
        next?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = gridRef.current?.querySelector(`tr:nth-child(${rowIndex + 2}) td:nth-child(${colIndex + 2}) input, tr:nth-child(${rowIndex + 2}) td:nth-child(${colIndex + 2}) select`);
      next?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = gridRef.current?.querySelector(`tr:nth-child(${rowIndex}) td:nth-child(${colIndex + 2}) input, tr:nth-child(${rowIndex}) td:nth-child(${colIndex + 2}) select`);
      prev?.focus();
    }
  };

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
      const validItems = items.filter(i => i.product_id && Number(i.quantity) > 0);
      if (validItems.length === 0) throw new Error('Add at least one valid item.');
      if (!customerId) throw new Error('Customer is required.');

      const payload = {
        voucher_no: voucherNo,
        invoice_no: invoiceNo,
        customer_id: customerId,
        warehouse_id: 1,
        sale_date: saleDate,
        batch_no: batchNo,
        expiry_date: expiryDate,
        vehicle_no: vehicleNo,
        bilty_no: biltyNo,
        broker,
        remarks,
        taxable_value: totals.taxable,
        gst_amount: totals.gst,
        total_amount: totals.grand,
        items: validItems.map(i => ({
          product_id: i.product_id, hsn: i.hsn, pcs: i.pcs,
          quantity: i.quantity, base_rate: i.base_rate, size_diff: i.size_diff,
          net_rate: i.net_rate, taxable_value: i.taxable_value,
          gst_rate: i.gst_rate, gst_amount: i.gst_amount, amount: i.amount
        }))
      };

      await onSave(payload);

      setInvoiceNo(''); setBatchNo(''); setExpiryDate('');
      setVehicleNo(''); setBiltyNo(''); setBroker(''); setRemarks('');
      setItems([createEmptyRow()]);
      const nextNo = await window.stockOps.getNextSaleVoucherNo();
      setVoucherNo(nextNo);
    } catch (err) {
      setError(err.message || 'Failed to save voucher');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* HEADER */}
      <section className="panel" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2>Sales Voucher</h2>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Date</span>
            <input type="date" value={saleDate} onChange={e => setSaleDate(e.target.value)} />
          </label>
          <label className="field">
            <span>Voucher No.</span>
            <input value={voucherNo} readOnly style={{ background: '#f5f5f5' }} />
          </label>
          <label className="field">
            <span>Customer</span>
            <select value={customerId} onChange={e => setCustomerId(e.target.value)} autoFocus>
              <option value="">-- Select Customer --</option>
              {parties.filter(p => p.type === 'customer' || p.type === 'both').map(p => (
                <option key={p.id} value={p.id}>{p.name} {p.gstin ? `| GST: ${p.gstin}` : ''}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <label className="field">
            <span>Invoice No.</span>
            <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Batch No.</span>
            <input value={batchNo} onChange={e => setBatchNo(e.target.value)} />
          </label>
          <label className="field">
            <span>Expiry Date</span>
            <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
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
          <table ref={gridRef} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8f9fa', zIndex: 1 }}>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th style={{ width: '200px' }}>Item</th>
                <th>HSN</th>
                <th>PCS</th>
                <th>Qty</th>
                <th>Base Rate</th>
                <th>Diff</th>
                <th>Net Rate</th>
                <th>Taxable</th>
                <th>GST %</th>
                <th>Amount</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center' }}>{i + 1}</td>
                  <td>
                    <select value={row.product_id} onChange={e => handleRowChange(i, 'product_id', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 0)} style={{ width: '100%', padding: '4px' }}>
                      <option value=""></option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
                    </select>
                  </td>
                  <td><input value={row.hsn} onChange={e => handleRowChange(i, 'hsn', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 1)} style={{ width: '100%', padding: '4px' }} /></td>
                  <td><input type="number" value={row.pcs} onChange={e => handleRowChange(i, 'pcs', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 2)} style={{ width: '100%', padding: '4px' }} /></td>
                  <td><input type="number" value={row.quantity} onChange={e => handleRowChange(i, 'quantity', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 3)} style={{ width: '100%', padding: '4px' }} /></td>
                  <td><input type="number" value={row.base_rate} onChange={e => handleRowChange(i, 'base_rate', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 4)} style={{ width: '100%', padding: '4px' }} /></td>
                  <td><input type="number" value={row.size_diff} onChange={e => handleRowChange(i, 'size_diff', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 5)} style={{ width: '100%', padding: '4px' }} /></td>
                  <td><input value={row.net_rate} readOnly tabIndex={-1} style={{ width: '100%', padding: '4px', background: '#f5f5f5' }} /></td>
                  <td><input value={row.taxable_value} readOnly tabIndex={-1} style={{ width: '100%', padding: '4px', background: '#f5f5f5' }} /></td>
                  <td><input type="number" value={row.gst_rate} onChange={e => handleRowChange(i, 'gst_rate', e.target.value)} onKeyDown={e => handleKeyDown(e, i, 8)} style={{ width: '100%', padding: '4px' }} /></td>
                  <td><input value={row.amount} readOnly tabIndex={-1} style={{ width: '100%', padding: '4px', background: '#f5f5f5' }} /></td>
                  <td style={{ textAlign: 'center' }}><button type="button" onClick={() => removeRow(i)} tabIndex={-1} style={{ padding: '2px 6px', background: 'transparent', color: 'red', border: 'none' }}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER */}
      <section className="panel" style={{ padding: '16px' }}>
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
