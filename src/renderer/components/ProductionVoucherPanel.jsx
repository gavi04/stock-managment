import { useState, useEffect, useRef } from 'react';
import { handleGridKeyNav } from '../utils/gridKeyNav.js';
import { todayDdmmyyyy } from '../utils/dateFormat.js';
import { handleFormKeyNav } from '../utils/formKeyNav.js';

function createEmptyRow() {
  return {
    id: Date.now() + Math.random(),
    product_id: '',
    batch_no: '',
    issued_qty: '',
    issued_pcs: '',
    production_qty: '',
    production_pcs: ''
  };
}

export function ProductionVoucherPanel({ products, busy, onSave }) {
  const [voucherNo, setVoucherNo] = useState('');
  const [productionDate, setProductionDate] = useState(todayDdmmyyyy());
  const [isRecurring, setIsRecurring] = useState(false);
  const [remarks, setRemarks] = useState('');
  
  const [items, setItems] = useState([createEmptyRow()]);
  const [error, setError] = useState(null);

  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    showBatch: true,
    showPcs: true,
    defaultIssuedQty: '',
    defaultProductionQty: ''
  });

  const gridRef = useRef(null);

  useEffect(() => {
    window.stockOps.getNextProductionVoucherNo().then(setVoucherNo).catch(console.error);
    window.stockOps.getProductionSettings().then(savedSettings => {
      if (Object.keys(savedSettings).length > 0) {
        setSettings(prev => ({ ...prev, ...savedSettings }));
      }
    }).catch(console.error);
  }, []);

  const handleSaveSettings = async () => {
    try {
      await window.stockOps.updateProductionSettings(settings);
      setShowSettings(false);
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  const handleRowChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === 'product_id' && value) {
      if (settings.defaultIssuedQty && !newItems[index].issued_qty) {
        newItems[index].issued_qty = settings.defaultIssuedQty;
      }
      if (settings.defaultProductionQty && !newItems[index].production_qty) {
        newItems[index].production_qty = settings.defaultProductionQty;
      }
    }

    setItems(newItems);
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
    if (items.length === 1) {
      setItems([createEmptyRow()]);
    } else {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const totals = items.reduce((acc, item) => {
    acc.issued += Number(item.issued_qty) || 0;
    acc.produced += Number(item.production_qty) || 0;
    return acc;
  }, { issued: 0, produced: 0 });

  const handleSave = async () => {
    setError(null);
    try {
      const validItems = items.filter(i => i.product_id && (Number(i.issued_qty) > 0 || Number(i.production_qty) > 0));
      if (validItems.length === 0) throw new Error('Add at least one valid item with issued or production quantity.');

      const payload = {
        voucher_no: voucherNo,
        warehouse_id: 1, // Default warehouse
        production_date: productionDate,
        is_recurring: isRecurring,
        remarks,
        items: validItems.map(i => ({
          product_id: i.product_id,
          batch_no: i.batch_no,
          issued_qty: i.issued_qty,
          issued_pcs: i.issued_pcs,
          production_qty: i.production_qty,
          production_pcs: i.production_pcs
        }))
      };

      await onSave(payload);
      
      setRemarks('');
      setIsRecurring(false);
      setItems([createEmptyRow()]);
      const nextNo = await window.stockOps.getNextProductionVoucherNo();
      setVoucherNo(nextNo);

    } catch (err) {
      setError(err.message || 'Failed to save voucher');
    }
  };

  const inputStyle = { width: '100%', border: '1px solid #d5cfc3', background: '#fff', color: '#4f6166' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* HEADER SECTION */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2>Issue To Production</h2>
            <button type="button" className="secondary" onClick={() => setShowSettings(true)} style={{ padding: '4px 8px', fontSize: '0.9em' }}>
              ⚙️ Settings
            </button>
          </div>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px', marginBottom: '8px' }}>
          <label className="field">
            <span>Date</span>
            <input type="text" placeholder="dd/mm/yyyy" value={productionDate} onChange={e => setProductionDate(e.target.value)} />
          </label>
          <label className="field">
            <span>Voucher No.</span>
            <input value={voucherNo} readOnly style={{ background: '#f2f0ea' }} />
          </label>
          <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
            <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} style={{ width: 'auto' }} />
            <span>Make it Recurring</span>
          </label>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="panel" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table ref={gridRef} className="voucher-grid" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8f8f6', zIndex: 1 }}>
              <tr>
                <th style={{width: '40px'}}>#</th>
                <th style={{width: '250px'}}>Stock Item</th>
                {settings.showBatch && <th>Batch No.</th>}
                <th>Issued Qty</th>
                {settings.showPcs && <th>Issued PCS</th>}
                <th>Prod. Qty</th>
                {settings.showPcs && <th>Prod. PCS</th>}
                <th style={{width: '40px'}}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => {
                let colIdx = 0;
                return (
                  <tr key={row.id}>
                    <td style={{textAlign: 'center'}}>{i + 1}</td>
                    <td>
                      <select value={row.product_id} onChange={e => handleRowChange(i, 'product_id', e.target.value)} onKeyDown={e => handleKeyDown(e, i, colIdx++)} style={inputStyle}>
                        <option value=""></option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
                      </select>
                    </td>
                    {settings.showBatch && <td><input value={row.batch_no} onChange={e => handleRowChange(i, 'batch_no', e.target.value)} onKeyDown={e => handleKeyDown(e, i, colIdx++)} style={inputStyle} /></td>}
                    <td><input type="text" inputMode="decimal" value={row.issued_qty} onChange={e => handleRowChange(i, 'issued_qty', e.target.value)} onKeyDown={e => handleKeyDown(e, i, colIdx++)} style={inputStyle} /></td>
                    {settings.showPcs && <td><input type="text" inputMode="decimal" value={row.issued_pcs} onChange={e => handleRowChange(i, 'issued_pcs', e.target.value)} onKeyDown={e => handleKeyDown(e, i, colIdx++)} style={inputStyle} /></td>}
                    <td><input type="text" inputMode="decimal" value={row.production_qty} onChange={e => handleRowChange(i, 'production_qty', e.target.value)} onKeyDown={e => handleKeyDown(e, i, colIdx++)} style={inputStyle} /></td>
                    {settings.showPcs && <td><input type="text" inputMode="decimal" value={row.production_pcs} onChange={e => handleRowChange(i, 'production_pcs', e.target.value)} onKeyDown={e => handleKeyDown(e, i, colIdx++)} style={inputStyle} /></td>}
                    <td style={{textAlign: 'center'}}><button type="button" onClick={() => removeRow(i)} tabIndex={-1} style={{padding: '2px 6px', background: 'transparent', color: 'red', border: 'none'}}>x</button></td>
                  </tr>
                );
              })}
              {/* TOTAL ROW */}
              <tr style={{ background: '#f8f8f6', fontWeight: 'bold' }}>
                <td colSpan={settings.showBatch ? 3 : 2} style={{ textAlign: 'right', paddingRight: '16px' }}>Total:</td>
                <td style={{ padding: '8px' }}>{totals.issued.toFixed(2)}</td>
                {settings.showPcs && <td></td>}
                <td style={{ padding: '8px' }}>{totals.produced.toFixed(2)}</td>
                {settings.showPcs && <td></td>}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="panel" style={{ padding: '16px' }} onKeyDown={handleFormKeyNav}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="field">
              <span>Remarks</span>
              <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={2} style={{ resize: 'vertical' }} />
            </label>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
             <button type="button" onClick={handleSave} disabled={busy} style={{ minWidth: '120px' }}>
              {busy ? 'Saving...' : 'Save (F2)'}
            </button>
          </div>
        </div>
      </section>

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="panel" style={{ width: '400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3>Production Settings</h3>
            
            <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={settings.showBatch} onChange={e => setSettings(s => ({ ...s, showBatch: e.target.checked }))} />
              <span>Show Batch No. Column</span>
            </label>
            <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={settings.showPcs} onChange={e => setSettings(s => ({ ...s, showPcs: e.target.checked }))} />
              <span>Show PCS Columns</span>
            </label>

            <label className="field">
              <span>Default Issued Qty</span>
              <input type="text" inputMode="decimal" value={settings.defaultIssuedQty} onChange={e => setSettings(s => ({ ...s, defaultIssuedQty: e.target.value }))} />
            </label>

            <label className="field">
              <span>Default Production Qty</span>
              <input type="text" inputMode="decimal" value={settings.defaultProductionQty} onChange={e => setSettings(s => ({ ...s, defaultProductionQty: e.target.value }))} />
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button type="button" className="secondary" onClick={() => setShowSettings(false)}>Cancel</button>
              <button type="button" onClick={handleSaveSettings}>Save Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
